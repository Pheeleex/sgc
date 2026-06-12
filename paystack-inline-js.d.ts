declare module "@paystack/inline-js" {
  interface PaystackPopupCallbacks {
    onCancel?: () => void;
    onError?: (error: { message: string }) => void;
    onLoad?: (payload: { accessCode: string; customer: Record<string, unknown>; id: number }) => void;
    onSuccess?: (payload: { id: number; message: string; reference: string }) => void;
  }

  export default class PaystackPop {
    isLoaded(): boolean;
    resumeTransaction(accessCode: string, callbacks?: PaystackPopupCallbacks): unknown;
  }
}
