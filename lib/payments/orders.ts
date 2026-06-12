import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { GuideOrderRecord } from "@/lib/payments/types";

const GUIDE_ORDERS_COLLECTION = "guideOrders";

function getGuideOrderRef(reference: string) {
  return doc(db, GUIDE_ORDERS_COLLECTION, reference);
}

export async function createGuideOrder(
  order: Omit<
    GuideOrderRecord,
    "createdAt" | "updatedAt" | "paidAt" | "deliveredAt" | "paystackTransactionId" | "lastError"
  >
): Promise<GuideOrderRecord> {
  const timestamp = new Date().toISOString();

  const record: GuideOrderRecord = {
    ...order,
    createdAt: timestamp,
    updatedAt: timestamp,
    paidAt: null,
    deliveredAt: null,
    paystackTransactionId: null,
    lastError: null,
  };

  await setDoc(getGuideOrderRef(order.reference), record);

  return record;
}

export async function getGuideOrder(reference: string): Promise<GuideOrderRecord | null> {
  const snapshot = await getDoc(getGuideOrderRef(reference));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as GuideOrderRecord;
}

export async function updateGuideOrder(
  reference: string,
  updates: Partial<GuideOrderRecord>
): Promise<GuideOrderRecord | null> {
  await setDoc(
    getGuideOrderRef(reference),
    {
      ...updates,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return getGuideOrder(reference);
}
