import * as React from "react";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  loadingText?: string;
};

export function LoadingButton({
  children,
  className,
  disabled,
  isLoading = false,
  loadingText,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      aria-busy={isLoading}
      className={className}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {isLoading ? loadingText ?? children : children}
    </Button>
  );
}

type AsyncStatusTone = "loading" | "success" | "error" | "info";

const toneStyles: Record<
  AsyncStatusTone,
  {
    className: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  loading: {
    className: "border-amber-200 bg-amber-50 text-amber-800",
    icon: Loader2,
  },
  success: {
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    icon: CheckCircle2,
  },
  error: {
    className: "border-rose-200 bg-rose-50 text-rose-800",
    icon: AlertCircle,
  },
  info: {
    className: "border-sky-200 bg-sky-50 text-sky-800",
    icon: Info,
  },
};

type AsyncStatusProps = {
  className?: string;
  message?: string | null;
  tone: AsyncStatusTone;
};

export function AsyncStatus({
  className,
  message,
  tone,
}: AsyncStatusProps) {
  if (!message) {
    return null;
  }

  const { className: toneClassName, icon: Icon } = toneStyles[tone];

  return (
    <div
      aria-live="polite"
      className={cn(
        "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
        toneClassName,
        className
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      <Icon
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "loading" ? "animate-spin" : ""
        )}
      />
      <p>{message}</p>
    </div>
  );
}
