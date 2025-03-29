import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import Invoice from "./Invoice";

interface PageProps {
  params: Promise<{ invoiceId: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Invoice Details",
  description: "View and manage your invoice details",
};

export default async function InvoicePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const invoiceId = Number.parseInt(resolvedParams.invoiceId);

  if (Number.isNaN(invoiceId)) {
    notFound();
  }

  const { userId, orgId } = auth();

  if (!userId) {
    return null;
  }

  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!invoice) {
    notFound();
  }

  return <Invoice invoice={invoice} />;
}