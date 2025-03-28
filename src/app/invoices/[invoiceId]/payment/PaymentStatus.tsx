import { cn } from "@/lib/utils";

interface PaymentStatusProps {
  isError: boolean;
  isCanceled: boolean;
}

export function PaymentStatus({ isError, isCanceled }: PaymentStatusProps) {
  if (isError) {
    return (
      <p className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">
        Something went wrong, please try again!
      </p>
    );
  }

  if (isCanceled) {
    return (
      <p className="bg-yellow-100 text-sm text-yellow-800 text-center px-3 py-2 rounded-lg mb-6">
        Payment was canceled, please try again.
      </p>
    );
  }

  return null;
}