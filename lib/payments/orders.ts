import "server-only";

import crypto from "node:crypto";

import { getAdminFirestore } from "@/lib/firebase/admin";
import type { GuideOrderRecord } from "@/lib/payments/types";

const GUIDE_ORDERS_COLLECTION = "guideOrders";
const GUIDE_PURCHASES_COLLECTION = "guidePurchases";
const DELIVERY_LOCK_TTL_MS = 10 * 60 * 1000;
const INITIALIZING_CHECKOUT_TTL_MS = 2 * 60 * 1000;

function getGuideOrderRef(reference: string) {
  return getAdminFirestore().collection(GUIDE_ORDERS_COLLECTION).doc(reference);
}

function getGuidePurchaseRef(purchaseKey: string) {
  return getAdminFirestore().collection(GUIDE_PURCHASES_COLLECTION).doc(purchaseKey);
}

function getGuideOrdersByEmailQuery(email: string) {
  return getAdminFirestore()
    .collection(GUIDE_ORDERS_COLLECTION)
    .where("email", "==", email.trim().toLowerCase());
}

export function buildGuidePurchaseKey(email: string, guideSlug: string) {
  return crypto
    .createHash("sha256")
    .update(`${email.trim().toLowerCase()}\0${guideSlug.trim()}`)
    .digest("hex");
}

function isStaleDeliveryLock(deliveryStartedAt: string | null | undefined) {
  if (!deliveryStartedAt) {
    return true;
  }

  const startedAtTime = new Date(deliveryStartedAt).getTime();

  if (Number.isNaN(startedAtTime)) {
    return true;
  }

  return Date.now() - startedAtTime > DELIVERY_LOCK_TTL_MS;
}

function isRecentTimestamp(value: string | null | undefined, ttlMs: number) {
  if (!value) {
    return false;
  }

  const time = new Date(value).getTime();

  if (Number.isNaN(time)) {
    return false;
  }

  return Date.now() - time <= ttlMs;
}

function shouldReuseOrderForCheckout(order: GuideOrderRecord) {
  if (order.status === "paid" || order.deliveryStatus === "sent") {
    return true;
  }

  if (order.deliveryStatus === "sending") {
    return !isStaleDeliveryLock(order.deliveryStartedAt);
  }

  if (order.status !== "pending") {
    return false;
  }

  if (order.paystackAccessCode) {
    return true;
  }

  return isRecentTimestamp(order.createdAt, INITIALIZING_CHECKOUT_TTL_MS);
}

function getOrderPriority(order: GuideOrderRecord) {
  if (order.deliveryStatus === "sent") {
    return 5;
  }

  if (order.status === "paid") {
    return 4;
  }

  if (order.deliveryStatus === "sending" && !isStaleDeliveryLock(order.deliveryStartedAt)) {
    return 3;
  }

  if (order.status === "pending" && order.paystackAccessCode) {
    return 2;
  }

  if (order.status === "pending" && isRecentTimestamp(order.createdAt, INITIALIZING_CHECKOUT_TTL_MS)) {
    return 1;
  }

  return 0;
}

function getOrderTime(order: GuideOrderRecord) {
  const time = new Date(order.updatedAt ?? order.createdAt).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function pickReusableOrder(
  orders: GuideOrderRecord[],
  guideSlug: string
): GuideOrderRecord | null {
  return orders
    .filter((order) => order.guideSlug === guideSlug && shouldReuseOrderForCheckout(order))
    .sort((left, right) => {
      const priorityDifference = getOrderPriority(right) - getOrderPriority(left);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return getOrderTime(right) - getOrderTime(left);
    })[0] ?? null;
}

export async function createGuideOrder(
  order: Omit<
    GuideOrderRecord,
    | "createdAt"
    | "updatedAt"
    | "paidAt"
    | "deliveredAt"
    | "deliveryStartedAt"
    | "paystackAccessCode"
    | "paystackAuthorizationUrl"
    | "paystackTransactionId"
    | "lastError"
  >
): Promise<GuideOrderRecord> {
  const timestamp = new Date().toISOString();

  const record: GuideOrderRecord = {
    ...order,
    createdAt: timestamp,
    updatedAt: timestamp,
    paidAt: null,
    deliveredAt: null,
    deliveryStartedAt: null,
    paystackAccessCode: null,
    paystackAuthorizationUrl: null,
    paystackTransactionId: null,
    lastError: null,
  };

  await getGuideOrderRef(order.reference).set(record);

  return record;
}

export async function reserveGuideOrderPurchase(
  order: Omit<
    GuideOrderRecord,
    | "createdAt"
    | "updatedAt"
    | "paidAt"
    | "deliveredAt"
    | "deliveryStartedAt"
    | "paystackAccessCode"
    | "paystackAuthorizationUrl"
    | "paystackTransactionId"
    | "lastError"
  >
): Promise<{ created: boolean; order: GuideOrderRecord }> {
  const db = getAdminFirestore();
  const orderRef = getGuideOrderRef(order.reference);
  const purchaseRef = getGuidePurchaseRef(order.purchaseKey);

  return db.runTransaction(async (transaction) => {
    const purchaseSnapshot = await transaction.get(purchaseRef);
    const existingReference = purchaseSnapshot.exists
      ? (purchaseSnapshot.data()?.reference as string | undefined)
      : undefined;
    const existingOrderRef = existingReference
      ? getGuideOrderRef(existingReference)
      : null;
    const existingOrderSnapshot = existingOrderRef
      ? await transaction.get(existingOrderRef)
      : null;

    if (existingOrderSnapshot?.exists) {
      const existingOrder = existingOrderSnapshot.data() as GuideOrderRecord;

      if (shouldReuseOrderForCheckout(existingOrder)) {
        return { created: false, order: existingOrder };
      }
    }

    const historicalOrdersSnapshot = await transaction.get(
      getGuideOrdersByEmailQuery(order.email)
    );
    const reusableHistoricalOrder = pickReusableOrder(
      historicalOrdersSnapshot.docs.map((snapshot) => ({
        ...(snapshot.data() as GuideOrderRecord),
        reference: (snapshot.data() as GuideOrderRecord).reference ?? snapshot.id,
      })),
      order.guideSlug
    );

    if (reusableHistoricalOrder) {
      const timestamp = new Date().toISOString();
      const historicalOrderRef = getGuideOrderRef(reusableHistoricalOrder.reference);
      const normalizedHistoricalOrder: GuideOrderRecord = {
        ...reusableHistoricalOrder,
        purchaseKey: order.purchaseKey,
      };

      transaction.set(
        historicalOrderRef,
        {
          purchaseKey: order.purchaseKey,
          updatedAt: timestamp,
        },
        { merge: true }
      );
      transaction.set(
        purchaseRef,
        {
          email: order.email,
          guideSlug: order.guideSlug,
          reference: reusableHistoricalOrder.reference,
          updatedAt: timestamp,
        },
        { merge: true }
      );

      return { created: false, order: normalizedHistoricalOrder };
    }

    const timestamp = new Date().toISOString();
    const record: GuideOrderRecord = {
      ...order,
      createdAt: timestamp,
      updatedAt: timestamp,
      paidAt: null,
      deliveredAt: null,
      deliveryStartedAt: null,
      paystackAccessCode: null,
      paystackAuthorizationUrl: null,
      paystackTransactionId: null,
      lastError: null,
    };

    transaction.set(orderRef, record);
    transaction.set(
      purchaseRef,
      {
        email: order.email,
        guideSlug: order.guideSlug,
        reference: order.reference,
        updatedAt: timestamp,
      },
      { merge: true }
    );

    return { created: true, order: record };
  });
}

export async function getGuideOrder(reference: string): Promise<GuideOrderRecord | null> {
  const snapshot = await getGuideOrderRef(reference).get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as GuideOrderRecord;
}

export async function updateGuideOrder(
  reference: string,
  updates: Partial<GuideOrderRecord>
): Promise<GuideOrderRecord | null> {
  await getGuideOrderRef(reference).set(
    {
      ...updates,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return getGuideOrder(reference);
}

export async function acquireGuideOrderDeliveryLock(reference: string): Promise<{
  acquired: boolean;
  order: GuideOrderRecord | null;
}> {
  const db = getAdminFirestore();
  const orderRef = getGuideOrderRef(reference);

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(orderRef);

    if (!snapshot.exists) {
      return { acquired: false, order: null };
    }

    const order = snapshot.data() as GuideOrderRecord;

    if (order.deliveryStatus === "sent") {
      return { acquired: false, order };
    }

    if (
      order.deliveryStatus === "sending" &&
      !isStaleDeliveryLock(order.deliveryStartedAt)
    ) {
      return { acquired: false, order };
    }

    const timestamp = new Date().toISOString();
    const lockedOrder: GuideOrderRecord = {
      ...order,
      deliveryStartedAt: timestamp,
      deliveryStatus: "sending",
      updatedAt: timestamp,
    };

    transaction.set(
      orderRef,
      {
        deliveryStartedAt: timestamp,
        deliveryStatus: "sending",
        lastError: null,
        updatedAt: timestamp,
      },
      { merge: true }
    );

    return { acquired: true, order: lockedOrder };
  });
}

export function toPublicGuideOrder(order: GuideOrderRecord) {
  const {
    downloadToken: _downloadToken,
    paystackAccessCode: _paystackAccessCode,
    paystackAuthorizationUrl: _paystackAuthorizationUrl,
    purchaseKey: _purchaseKey,
    ...publicOrder
  } = order;

  return publicOrder;
}
