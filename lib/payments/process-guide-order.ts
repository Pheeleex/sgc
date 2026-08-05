import { getProductBySlug } from "@/lib/data/products";
import { buildGuideFileDownloadUrl, sendGuideFilesEmail } from "@/lib/payments/email";
import {
  acquireGuideOrderDeliveryLock,
  getGuideOrder,
  updateGuideOrder,
} from "@/lib/payments/orders";
import { isPaystackTerminalFailure, verifyPaystackTransaction } from "@/lib/payments/paystack";
import type { ProcessGuideOrderResult } from "@/lib/payments/types";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function formatDeliveryErrorMessage(message: string) {
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "";

  if (!fromEmail.includes("resend.dev")) {
    return message;
  }

  return `${message} Hint: Resend's test sender (${fromEmail}) can usually only deliver to your own account email. For testing, use your own Resend account email as the recipient or verify a custom sending domain in Resend.`;
}

export async function processGuideOrderPayment(
  reference: string
): Promise<ProcessGuideOrderResult> {
  const existingOrder = await getGuideOrder(reference);

  if (!existingOrder) {
    return {
      status: "failed",
      message: "We could not find an order for this payment reference.",
      order: null,
    };
  }

  if (existingOrder.deliveryStatus === "sent") {
    return {
      status: "success",
      message: "Payment confirmed and your guide email has already been sent.",
      order: existingOrder,
    };
  }

  const transaction = await verifyPaystackTransaction(reference);

  if (transaction.reference !== existingOrder.reference) {
    const failedOrder = await updateGuideOrder(reference, {
      lastError: "Paystack reference mismatch.",
      status: "failed",
    });

    return {
      status: "failed",
      message: "The payment reference did not match this order.",
      order: failedOrder,
    };
  }

  if (transaction.amount !== existingOrder.amount) {
    const failedOrder = await updateGuideOrder(reference, {
      lastError: "Paystack amount mismatch.",
      status: "failed",
    });

    return {
      status: "failed",
      message: "The confirmed payment amount did not match this guide.",
      order: failedOrder,
    };
  }

  if (transaction.currency !== existingOrder.currency) {
    const failedOrder = await updateGuideOrder(reference, {
      lastError: "Paystack currency mismatch.",
      status: "failed",
    });

    return {
      status: "failed",
      message: "The confirmed payment currency did not match this guide.",
      order: failedOrder,
    };
  }

  if (
    transaction.customer?.email &&
    normalizeEmail(transaction.customer.email) !== normalizeEmail(existingOrder.email)
  ) {
    const failedOrder = await updateGuideOrder(reference, {
      lastError: "Customer email mismatch.",
      status: "failed",
    });

    return {
      status: "failed",
      message: "The payment email did not match the order email.",
      order: failedOrder,
    };
  }

  if (transaction.status !== "success") {
    const maybeFailedOrder = isPaystackTerminalFailure(transaction.status)
      ? await updateGuideOrder(reference, {
          lastError: `Paystack reported a ${transaction.status} transaction.`,
          status: "failed",
        })
      : existingOrder;

    return {
      status: isPaystackTerminalFailure(transaction.status) ? "failed" : "pending",
      message:
        transaction.status === "pending" || transaction.status === "ongoing" || transaction.status === "processing"
          ? "Payment is still being confirmed by Paystack. We’ll deliver your guide as soon as that clears."
          : `Paystack reported this transaction as ${transaction.status}.`,
      order: maybeFailedOrder,
    };
  }

  const paidOrder = await updateGuideOrder(reference, {
    lastError: null,
    paidAt: transaction.paid_at ?? new Date().toISOString(),
    paystackTransactionId: transaction.id,
    status: "paid",
  });

  if (paidOrder?.deliveryStatus === "sent") {
    return {
      status: "success",
      message: "Payment confirmed and your guide email has already been sent.",
      order: paidOrder,
    };
  }

  const deliveryLock = await acquireGuideOrderDeliveryLock(reference);

  if (!deliveryLock.order) {
    return {
      status: "failed",
      message: "We could not find an order for this payment reference.",
      order: null,
    };
  }

  if (!deliveryLock.acquired) {
    return {
      status: deliveryLock.order.deliveryStatus === "sent" ? "success" : "pending",
      message:
        deliveryLock.order.deliveryStatus === "sent"
          ? "Payment confirmed and your guide email has already been sent."
          : "Payment confirmed. Your guide delivery is already being prepared.",
      order: deliveryLock.order,
    };
  }

  const deliveryOrder = deliveryLock.order;
  const guide = await getProductBySlug(deliveryOrder.guideSlug);

  if (!guide || !guide.files?.length) {
    const failedOrder = await updateGuideOrder(reference, {
      deliveryStartedAt: null,
      deliveryStatus: "failed",
      lastError: "Guide files are unavailable for delivery.",
    });

    return {
      status: "failed",
      message: "Payment is confirmed, but this guide is not ready for delivery yet.",
      order: failedOrder,
    };
  }

  try {
    await sendGuideFilesEmail({
      email: deliveryOrder.email,
      files: guide.files.map((file, index) => ({
        downloadUrl: buildGuideFileDownloadUrl({
          fileIndex: index,
          reference: deliveryOrder.reference,
          token: deliveryOrder.downloadToken,
        }),
        name: file.name,
      })),
      guideTitle: guide.title,
    });
  } catch (error) {
    const baseMessage =
      error instanceof Error ? error.message : "Failed to send the guide email.";
    const message = formatDeliveryErrorMessage(baseMessage);

    const failedOrder = await updateGuideOrder(reference, {
      deliveryStartedAt: null,
      deliveryStatus: "failed",
      lastError: message,
    });

    return {
      status: "failed",
      message:
        "Payment is confirmed, but we could not send the delivery email yet. Please contact support so we can help.",
      order: failedOrder,
    };
  }

  const deliveredOrder = await updateGuideOrder(reference, {
    deliveredAt: new Date().toISOString(),
    deliveryStartedAt: null,
    deliveryStatus: "sent",
    lastError: null,
  });

  return {
    status: "success",
    message: "Payment confirmed. Your guide is on the way to your inbox.",
    order: deliveredOrder,
  };
}
