import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
      <p className="text-gray-600 mb-8">
        There was an error processing your payment. Please try again.
      </p>
      <Link href={`/invoices/${params.invoiceId}`}>
        <Button>Return to Invoice</Button>
      </Link>
    </div>
  );
}