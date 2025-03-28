import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InvoiceDetailsProps {
  invoice: {
    id: number;
    status: string;
    value: number;
    description: string;
  };
}

export function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-4 text-3xl font-semibold">
          Invoice {invoice.id}
          <Badge
            className={cn(
              "rounded-full capitalize",
              invoice.status === "open" && "bg-blue-500",
              invoice.status === "paid" && "bg-green-600",
              invoice.status === "void" && "bg-zinc-700",
              invoice.status === "uncollectible" && "bg-red-600",
            )}
          >
            {invoice.status}
          </Badge>
        </h1>
      </div>

      <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>
      <p className="text-lg mb-8">{invoice.description}</p>
    </div>
  );
}