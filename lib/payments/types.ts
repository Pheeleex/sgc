export type GuideOrderStatus = "pending" | "paid" | "failed";
export type GuideDeliveryStatus = "pending" | "sending" | "sent" | "failed";

export interface GuideOrderRecord {
  reference: string;
  purchaseKey: string;
  guideId: string;
  guideSlug: string;
  guideTitle: string;
  email: string;
  amount: number;
  currency: "NGN";
  status: GuideOrderStatus;
  deliveryStatus: GuideDeliveryStatus;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
  deliveryStartedAt: string | null;
  downloadToken: string;
  paystackAccessCode: string | null;
  paystackAuthorizationUrl: string | null;
  paystackTransactionId: number | null;
  lastError: string | null;
}

export interface PaystackCustomer {
  email?: string | null;
}

export interface PaystackVerificationData {
  id: number;
  amount: number;
  currency: string;
  customer?: PaystackCustomer | null;
  paid_at?: string | null;
  reference: string;
  status: string;
}

export interface ProcessGuideOrderResult {
  status: "success" | "pending" | "failed";
  message: string;
  order: GuideOrderRecord | null;
}
