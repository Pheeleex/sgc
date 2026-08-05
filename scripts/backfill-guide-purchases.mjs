import crypto from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const GUIDE_ORDERS_COLLECTION = "guideOrders";
const GUIDE_PURCHASES_COLLECTION = "guidePurchases";
const writeChanges = process.argv.includes("--write");

function getFirebasePrivateKey() {
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!rawPrivateKey) {
    return undefined;
  }

  return rawPrivateKey
    .trim()
    .replace(/,$/, "")
    .trim()
    .replace(/^["']/, "")
    .replace(/["']$/, "")
    .replace(/\\n/g, "\n");
}

function getAdminApp() {
  const existingApp = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getFirebasePrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  return initializeApp({
    credential: cert({
      clientEmail,
      privateKey,
      projectId,
    }),
  });
}

function buildGuidePurchaseKey(email, guideSlug) {
  return crypto
    .createHash("sha256")
    .update(`${email.trim().toLowerCase()}\0${guideSlug.trim()}`)
    .digest("hex");
}

function getOrderPriority(order) {
  if (order.deliveryStatus === "sent") {
    return 5;
  }

  if (order.status === "paid") {
    return 4;
  }

  if (order.deliveryStatus === "sending") {
    return 3;
  }

  if (order.status === "pending" && order.paystackAccessCode) {
    return 2;
  }

  if (order.status === "pending") {
    return 1;
  }

  return 0;
}

function getOrderTime(order) {
  const time = new Date(order.updatedAt ?? order.createdAt).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function isPurchasePointerCandidate(order) {
  return order.status === "paid" || order.deliveryStatus === "sent";
}

function pickBestPointerOrder(left, right) {
  if (!left) {
    return right;
  }

  const priorityDifference = getOrderPriority(right) - getOrderPriority(left);

  if (priorityDifference > 0) {
    return right;
  }

  if (priorityDifference < 0) {
    return left;
  }

  return getOrderTime(right) > getOrderTime(left) ? right : left;
}

function normalizeOrder(snapshot) {
  const data = snapshot.data();
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const guideSlug = typeof data.guideSlug === "string" ? data.guideSlug.trim() : "";
  const reference =
    typeof data.reference === "string" && data.reference.trim()
      ? data.reference.trim()
      : snapshot.id;

  if (!email || !guideSlug || !reference) {
    return null;
  }

  return {
    ...data,
    email,
    guideSlug,
    purchaseKey: buildGuidePurchaseKey(email, guideSlug),
    reference,
  };
}

async function main() {
  const db = getFirestore(getAdminApp());
  const snapshot = await db.collection(GUIDE_ORDERS_COLLECTION).get();
  const pointerCandidates = new Map();
  const updates = [];
  let skipped = 0;

  for (const docSnapshot of snapshot.docs) {
    const order = normalizeOrder(docSnapshot);

    if (!order) {
      skipped += 1;
      continue;
    }

    updates.push({ docId: docSnapshot.id, order });

    if (isPurchasePointerCandidate(order)) {
      const current = pointerCandidates.get(order.purchaseKey);
      pointerCandidates.set(order.purchaseKey, pickBestPointerOrder(current, order));
    }
  }

  console.log(
    `${writeChanges ? "Writing" : "Dry run:"} ${updates.length} order updates and ${pointerCandidates.size} purchase pointers. Skipped ${skipped} malformed orders.`
  );

  if (!writeChanges) {
    console.log("Run again with --write to apply these changes.");
    return;
  }

  const writer = db.bulkWriter();
  const timestamp = new Date().toISOString();

  for (const { docId, order } of updates) {
    writer.set(
      db.collection(GUIDE_ORDERS_COLLECTION).doc(docId),
      {
        email: order.email,
        guideSlug: order.guideSlug,
        purchaseKey: order.purchaseKey,
        reference: order.reference,
        updatedAt: timestamp,
      },
      { merge: true }
    );
  }

  for (const [purchaseKey, order] of pointerCandidates) {
    writer.set(
      db.collection(GUIDE_PURCHASES_COLLECTION).doc(purchaseKey),
      {
        email: order.email,
        guideSlug: order.guideSlug,
        reference: order.reference,
        updatedAt: timestamp,
      },
      { merge: true }
    );
  }

  await writer.close();
  console.log("Backfill complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
