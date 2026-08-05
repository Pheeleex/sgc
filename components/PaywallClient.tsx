"use client";

import { useEffect, useRef, useState } from "react";
import { PortableText } from "next-sanity";
import {
  ArrowRight,
  Check,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface PaywallClientProps {
  guide: Product;
}

type CheckoutPhase = "checkout" | "verifying" | "success" | "failed";
type GuideFilePreview = { name: string; url?: string };
type ConfirmPaymentResponse = {
  message?: string;
  order?: {
    deliveryStatus: "pending" | "sending" | "sent" | "failed";
    email: string;
    lastError?: string | null;
    reference: string;
    status: "pending" | "paid" | "failed";
  };
  status?: "failed" | "pending" | "success";
};
type InitializePaymentResponse = {
  accessCode?: string;
  error?: string;
  message?: string;
  order?: ConfirmPaymentResponse["order"];
  reference?: string;
  reusedCheckout?: boolean;
  status?: "already_purchased" | "checkout" | "failed" | "pending";
};

const defaultGuidePrice = 3500;

const formatNaira = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function PaywallClient({ guide }: PaywallClientProps) {
  const [phase, setPhase] = useState<CheckoutPhase>("checkout");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>(
    "We’ll deliver your product as soon as Paystack confirms the payment."
  );
  const [generalError, setGeneralError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const confirmAttemptsRef = useRef(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const hasDeliverableFiles = (guide.files?.length ?? 0) > 0;
  const previewFiles = (guide.files ?? []) as GuideFilePreview[];
  const isFreeProduct = guide.accessType === "free" || guide.price === 0;
  const guidePrice = isFreeProduct ? 0 : guide.price ?? defaultGuidePrice;
  const formattedPrice = formatNaira(guidePrice);
  const categoryLabel = guide.category
    ? guide.category.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "Digital Product";
  const includedCountLabel = `${previewFiles.length} item${
    previewFiles.length === 1 ? "" : "s"
  } included`;
  const successEmail = email.trim() || "you@example.com";
  const hasBodyContent = Array.isArray(guide.body) && guide.body.length > 0;
  const productImages = [
    ...(guide.url ? [{ alt: guide.title, url: guide.url }] : []),
    ...(guide.gallery ?? []),
  ].filter((image, index, images) => {
    return image.url && images.findIndex((item) => item.url === image.url) === index;
  });
  const activeImage = productImages[activeImageIndex] ?? productImages[0];
  const hasMultipleImages = productImages.length > 1;

  const showPreviousImage = () => {
    setActiveImageIndex((index) =>
      index === 0 ? productImages.length - 1 : index - 1
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((index) =>
      index === productImages.length - 1 ? 0 : index + 1
    );
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const clearReferenceFromUrl = () => {
    router.replace(pathname, { scroll: false });
  };

  const confirmPayment = async (reference: string, attempt = 0) => {
    confirmAttemptsRef.current = Math.max(confirmAttemptsRef.current, 1);
    setPhase("verifying");
    setOrderReference(reference);

    try {
      const response = await fetch("/api/paystack/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      });

      const payload = (await response.json()) as ConfirmPaymentResponse & {
        error?: string;
      };

      if (response.ok && payload.status === "success") {
        setPhase("success");
        setGeneralError("");
        setStatusMessage(
          payload.message ?? "Payment confirmed. Your product is on the way to your inbox."
        );
        setEmail(payload.order?.email ?? email);
        confirmAttemptsRef.current = 0;
        clearReferenceFromUrl();
        return;
      }

      if (response.status === 202 || payload.status === "pending") {
        setStatusMessage(
          payload.message ??
            "Payment is still being confirmed by Paystack. We’ll email your product as soon as that completes."
        );

        if (attempt < 7) {
          window.setTimeout(() => {
            void confirmPayment(reference, attempt + 1);
          }, 3000);
          return;
        }

        setPhase("failed");
        setGeneralError(
          "We could not confirm this payment automatically yet. Refresh this page in a moment or contact support if the email does not arrive."
        );
        return;
      }

      setPhase("failed");
      setGeneralError(
        payload.order?.lastError ??
        payload.error ??
          payload.message ??
          "We could not confirm the payment for this product."
      );
    } catch (error) {
      setPhase("failed");
      setGeneralError(
        error instanceof Error
          ? error.message
          : "We could not confirm the payment for this product."
      );
    }
  };

  const launchPaystackCheckout = async () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!hasDeliverableFiles) {
      setGeneralError(
        "This product is not ready for delivery yet because no files are attached to it."
      );
      return;
    }

    setGeneralError("");
    setEmailError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          guideSlug: guide.slug,
          productSlug: guide.slug,
        }),
      });

      const payload = (await response.json()) as InitializePaymentResponse;

      if (payload.status === "already_purchased" && payload.order) {
        setPhase("success");
        setIsSubmitting(false);
        setOrderReference(payload.reference ?? payload.order.reference);
        setEmail(payload.order.email ?? email);
        setStatusMessage(
          payload.message ??
            "You already purchased this product. We’ve sent your access again."
        );
        return;
      }

      if (response.status === 202 || payload.status === "pending") {
        setPhase("checkout");
        setIsSubmitting(false);
        setOrderReference(payload.reference ?? null);
        setStatusMessage(
          payload.message ??
            "Your checkout is already being prepared. Please try again in a moment."
        );
        return;
      }

      if (!response.ok || !payload.accessCode) {
        throw new Error(payload.error ?? "We could not start Paystack checkout.");
      }

      setOrderReference(payload.reference ?? null);
      setStatusMessage(
        payload.reusedCheckout
          ? "We reopened your recent checkout so you won’t start a duplicate payment."
          : "Finish the payment in Paystack and we’ll confirm it here."
      );

      const { default: PaystackPop } = await import("@paystack/inline-js");
      const popup = new PaystackPop();
      popup.resumeTransaction(payload.accessCode, {
        onCancel: () => {
          setIsSubmitting(false);
          setStatusMessage("Checkout was cancelled before payment was completed.");
        },
        onError: (popupError) => {
          setIsSubmitting(false);
          setGeneralError(popupError.message || "Paystack could not open the checkout.");
        },
        onSuccess: ({ reference }) => {
          setIsSubmitting(false);
          setStatusMessage("Payment received. We’re confirming it and preparing your email.");
          confirmAttemptsRef.current = 1;
          router.replace(`${pathname}?reference=${reference}`, { scroll: false });
          void confirmPayment(reference);
        },
      });
    } catch (error) {
      setGeneralError(
        error instanceof Error
          ? error.message
          : "We could not start Paystack checkout."
      );
      setIsSubmitting(false);
    }
  };

  const handleCheckoutPreview = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await launchPaystackCheckout();
  };

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference || confirmAttemptsRef.current > 0) {
      return;
    }

    confirmAttemptsRef.current = 1;
    setOrderReference(reference);
    setStatusMessage("Payment detected. We’re confirming it with Paystack now.");
    void confirmPayment(reference);
  }, [searchParams]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.82fr)] lg:items-start">
          <div className="lg:sticky lg:top-10">
            {activeImage ? (
              <div className="relative border border-[#eee6e8] bg-[#fffaf8]">
                <img
                  alt={activeImage.alt ?? guide.title}
                  className="aspect-[4/3] w-full object-cover"
                  src={activeImage.url}
                />

                {hasMultipleImages ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous product image"
                      onClick={showPreviousImage}
                      className="absolute left-0 top-1/2 flex h-16 w-12 -translate-y-1/2 items-center justify-center bg-[#9a9a9a]/85 text-white transition hover:bg-[#7e7e7e]"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next product image"
                      onClick={showNextImage}
                      className="absolute right-0 top-1/2 flex h-16 w-12 -translate-y-1/2 items-center justify-center bg-[#9a9a9a]/85 text-white transition hover:bg-[#7e7e7e]"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>

                    <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                      {productImages.map((image, index) => (
                        <button
                          key={image.url}
                          type="button"
                          aria-label={`Show product image ${index + 1}`}
                          onClick={() => setActiveImageIndex(index)}
                          className={cn(
                            "h-2.5 w-2.5 rounded-full border border-white transition",
                            activeImageIndex === index
                              ? "bg-white"
                              : "bg-white/35 hover:bg-white/70"
                          )}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-[#eadde1] bg-[#fffaf8] text-sm text-[#806873]">
                Add a cover image in Studio
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#8d6170]">
                <span className="rounded-full bg-[#f9ecef] px-3 py-1 font-medium text-[#945265]">
                  {categoryLabel}
                </span>
                <span>{includedCountLabel}</span>
                <span>
                  {isFreeProduct
                    ? "Direct download"
                    : "Secure email delivery after payment"}
                </span>
              </div>

              <h1 className="mt-5 font-serif text-5xl leading-tight text-[#181114] sm:text-6xl lg:text-7xl">
                {guide.title}
              </h1>

              <p className="mt-5 font-serif text-3xl text-[#2f2027]">
                {isFreeProduct ? "Free" : formattedPrice}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#6f5560] sm:text-lg">
                {guide.description}
              </p>

              <div className="mt-8 grid gap-5">
                <div className="rounded-[1.75rem] border border-[#f0d7de] bg-[linear-gradient(145deg,#fff4f7_0%,#fffdfc_58%,#fef0e6_100%)] p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b15b73]">
                        What&apos;s Included
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#7a5d66]">
                        {hasDeliverableFiles
                          ? "Your files stay protected until access is ready."
                          : "No deliverable files have been attached to this product yet."}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-medium text-[#945265] shadow-sm">
                      <Lock className="h-3.5 w-3.5" />
                      {isFreeProduct ? "Email Access" : "Locked Until Payment"}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {hasDeliverableFiles ? (
                      previewFiles.slice(0, 3).map((file, index) => (
                        <div
                          key={file.name}
                          className={cn(
                            "flex items-center gap-4 rounded-[1.4rem] border border-white/80 bg-white/85 px-4 py-4 shadow-sm backdrop-blur",
                            index > 0 ? "ml-3" : ""
                          )}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f9e5ea] text-[#a3576b]">
                            <Lock className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#4a2f38]">
                              {file.name}
                            </p>
                            <p className="mt-1 text-xs text-[#8d6f77]">
                              {isFreeProduct
                                ? "Available for direct download"
                                : "Delivered by email after a successful payment"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[1.4rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
                        This product is not ready for download yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: Sparkles,
                    label: "Beautifully designed",
                    copy: "A polished digital product experience that feels calm, clear, and easy to use.",
                  },
                  {
                    icon: CreditCard,
                    label: isFreeProduct ? "Simple access" : "Secure payment",
                    copy: isFreeProduct
                      ? "Download the product files directly without waiting for an email."
                      : "Checkout is quick and protected through Paystack.",
                  },
                  {
                    icon: Mail,
                    label: isFreeProduct ? "Instant download" : "Inbox delivery",
                    copy: isFreeProduct
                      ? "Free files open from protected download links."
                      : "Your receipt and access details are sent straight to your email.",
                  },
                ].map(({ icon: Icon, label, copy }) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-[#f1dde2] bg-[#fffdfc] p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f9e9ee] text-[#9e5c6e]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold text-[#4a2f38]">
                      {label}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#7a5d66]">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>

              {hasBodyContent ? (
                <div className="mt-10 text-[#5f4851]">
                  <div className="space-y-5 text-base leading-8">
                    <PortableText
                      value={guide.body ?? []}
                      components={{
                        block: {
                          h2: ({ children }) => (
                            <h2 className="pt-3 font-serif text-3xl leading-tight text-[#3d2630]">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="pt-2 text-xl font-semibold text-[#3d2630]">
                              {children}
                            </h3>
                          ),
                          normal: ({ children }) => (
                            <p className="text-base leading-8 text-[#6f5560]">
                              {children}
                            </p>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="space-y-2 pl-5 text-base leading-7 text-[#6f5560]">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="space-y-2 pl-5 text-base leading-7 text-[#6f5560]">
                              {children}
                            </ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => (
                            <li className="list-disc marker:text-[#b15b73]">{children}</li>
                          ),
                          number: ({ children }) => (
                            <li className="list-decimal marker:text-[#b15b73]">{children}</li>
                          ),
                        },
                        types: {
                          image: ({ value }) =>
                            value?.url ? (
                              <img
                                alt={value.alt ?? guide.title}
                                className="w-full rounded-2xl border border-[#f1dde2] object-cover"
                                src={value.url}
                              />
                            ) : null,
                        },
                      }}
                    />
                  </div>
                </div>
              ) : null}
            <div className="mt-8 rounded-[1rem] border border-[#ecd5dc] bg-white p-5 sm:p-6">
              {phase === "checkout" ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b15b73]">
                        {isFreeProduct ? "Free Delivery" : "Secure Checkout"}
                      </p>
                      <h2 className="mt-3 font-serif text-3xl text-[#3d2630]">
                        {isFreeProduct ? "Get this product" : "Complete your order"}
                      </h2>
                    </div>

                    <div className="rounded-full border border-[#eed8de] bg-[#fff7f4] px-3 py-2 text-xs font-medium text-[#945265]">
                      {isFreeProduct ? "Free" : "Paystack"}
                    </div>
                  </div>

                  {isFreeProduct ? (
                    <>
                      <p className="mt-4 text-sm leading-6 text-[#6f5560]">
                        Download the available files directly. No email delivery is needed for free products.
                      </p>

                      <div className="mt-6 space-y-3">
                        {previewFiles.map((file, index) => (
                          <a
                            key={file.name}
                            href={`/api/products/${encodeURIComponent(guide.slug)}/files/${index}`}
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#a54f68] px-5 text-sm font-semibold text-white transition hover:bg-[#8f4258]"
                          >
                            <Download className="h-4 w-4" />
                            Download {file.name}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-4 text-sm leading-6 text-[#6f5560]">
                        Enter your email to receive your receipt and delivery details after checkout.
                      </p>

                      <div className="mt-6 rounded-[1.75rem] border border-[#f1dde2] bg-[linear-gradient(180deg,#fff9f7_0%,#fff3f0_100%)] p-5">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-sm text-[#7d5d67]">Total</p>
                            <p className="mt-1 font-serif text-4xl text-[#3d2630]">
                              {formattedPrice}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white px-3 py-2 text-xs font-medium text-[#945265] shadow-sm">
                            Email delivery after payment
                          </div>
                        </div>

                        <div className="mt-5 space-y-3 text-sm text-[#6f5560]">
                          <div className="flex items-center justify-between gap-4">
                            <span>{guide.title}</span>
                            <span>{formattedPrice}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span>Secure checkout</span>
                            <span>Included</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 border-t border-[#f1dde2] pt-3 font-semibold text-[#4a2f38]">
                            <span>Order total</span>
                            <span>{formattedPrice}</span>
                          </div>
                        </div>
                      </div>

                      <form className="mt-6 space-y-4" onSubmit={handleCheckoutPreview}>
                        <div className="space-y-2">
                          <label
                            htmlFor="guide-email"
                            className="block text-sm font-medium text-[#4a2f38]"
                          >
                            Email for receipt and delivery
                          </label>

                          <Input
                            aria-describedby={emailError ? "guide-email-error" : "guide-email-note"}
                            aria-invalid={Boolean(emailError)}
                            className="h-12 rounded-xl border-[#e8cfd7] bg-[#fffdfc] text-[#3d2630] placeholder:text-[#b08b96]"
                            id="guide-email"
                            onChange={(event) => {
                              setEmail(event.target.value);
                              if (emailError) {
                                setEmailError("");
                              }
                            }}
                            placeholder="you@example.com"
                            type="email"
                            value={email}
                          />

                          {emailError ? (
                            <p className="text-sm text-rose-600" id="guide-email-error">
                              {emailError}
                            </p>
                          ) : (
                            <p className="text-xs leading-5 text-[#8c6e78]" id="guide-email-note">
                              We&apos;ll send your receipt and access details here.
                            </p>
                          )}

                          {generalError ? (
                            <p className="text-sm text-rose-600">{generalError}</p>
                          ) : null}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#a54f68] px-5 text-sm font-semibold text-white transition hover:bg-[#8f4258]"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Opening Paystack
                            </>
                          ) : (
                            <>
                              Proceed
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </>
              ) : phase === "verifying" ? (
                <>
                  <div className="rounded-[1.75rem] border border-[#dbe6f1] bg-[linear-gradient(180deg,#fbfdff_0%,#f2f7fb_100%)] p-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#48627a] shadow-sm">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Confirming Payment
                    </div>

                    <h2 className="mt-4 font-serif text-3xl text-[#243647]">
                      We&apos;re verifying your order
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#53697d]">
                      {statusMessage}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-[#dde7ef] bg-white p-4">
                    <p className="text-sm font-semibold text-[#314556]">
                      What happens next
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5e7486]">
                      {[
                        "Paystack confirms the final transaction status.",
                        "We prepare your product files for delivery.",
                        "Your receipt and document links are sent to your email.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#edf3f8] text-[#5d7992]">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {orderReference ? (
                      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#7d92a3]">
                        Reference: {orderReference}
                      </p>
                    ) : null}
                  </div>
                </>
              ) : phase === "success" ? (
                <>
                  <div className="rounded-[1.75rem] border border-[#d7eadc] bg-[linear-gradient(180deg,#f7fffa_0%,#eefaf1_100%)] p-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#4a8f63] shadow-sm">
                      <Check className="h-3.5 w-3.5" />
                      Payment Received
                    </div>

                    <h2 className="mt-4 font-serif text-3xl text-[#234130]">
                      Your product is on the way
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#4d6b59]">
                      {statusMessage}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-[#ecdae0] bg-[#fffaf8] p-5">
                    <p className="text-sm font-semibold text-[#4a2f38]">
                      Delivery email
                    </p>
                    <p className="mt-2 text-sm text-[#6f5560]">
                      Your access details will be sent to
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#3d2630]">
                      {successEmail}
                    </p>

                    {orderReference ? (
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#8a6d76]">
                        Reference: {orderReference}
                      </p>
                    ) : null}

                    <div className="mt-5 space-y-3">
                      {previewFiles.map((file) => (
                        <div
                          key={file.name}
                          className="flex items-center gap-3 rounded-[1.25rem] border border-[#e5efe7] bg-white px-4 py-3"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e8f6ec] text-[#4a8f63]">
                            <Check className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[#355141]">
                              {file.name}
                            </p>
                            <p className="mt-1 text-xs text-[#62806d]">
                              Access details will be delivered to your inbox
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-[#ecdae0] bg-white p-4">
                    <p className="text-sm font-semibold text-[#4a2f38]">
                      What happens next
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#6f5560]">
                      {[
                        isFreeProduct
                          ? "Your product access details are sent to your inbox."
                          : "A receipt is sent to your inbox.",
                        isFreeProduct
                          ? "You can save the delivery email for later access."
                          : "Your product access details follow by email.",
                        "You can return here anytime if you need help with your order.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8e7ec] text-[#9f5b6f]">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#e6d1d8] bg-white text-sm font-medium text-[#684b56] transition hover:bg-[#fff7f4]"
                    onClick={() => {
                      setPhase("checkout");
                      setGeneralError("");
                      setOrderReference(null);
                      setStatusMessage(
                        isFreeProduct
                          ? "We’ll deliver your product to your inbox."
                          : "We’ll deliver your product as soon as Paystack confirms the payment."
                      );
                    }}
                  >
                    Return to checkout
                  </button>
                </>
              ) : (
                <>
                  <div className="rounded-[1.75rem] border border-[#f0d7d9] bg-[linear-gradient(180deg,#fffafa_0%,#fff3f4_100%)] p-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#b2556a] shadow-sm">
                      <TriangleAlert className="h-3.5 w-3.5" />
                      Confirmation Needed
                    </div>

                    <h2 className="mt-4 font-serif text-3xl text-[#4e2430]">
                      We couldn&apos;t finish confirming this payment
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#7a4a58]">
                      {generalError}
                    </p>
                  </div>

                  {orderReference ? (
                    <div className="mt-6 rounded-[1.5rem] border border-[#ecdae0] bg-white p-4">
                      <p className="text-sm font-semibold text-[#4a2f38]">
                        Payment reference
                      </p>
                      <p className="mt-2 text-sm text-[#6f5560]">{orderReference}</p>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#a54f68] px-5 text-sm font-semibold text-white transition hover:bg-[#8f4258]"
                    onClick={() => {
                      if (orderReference) {
                        setGeneralError("");
                        setStatusMessage(
                          "We’re checking Paystack again and preparing your email."
                        );
                        void confirmPayment(orderReference);
                        return;
                      }

                      setPhase("checkout");
                      setGeneralError("");
                    }}
                  >
                    {orderReference ? "Try confirmation again" : "Return to checkout"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
