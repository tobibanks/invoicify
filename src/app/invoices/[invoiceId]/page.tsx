import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import { headers } from 'next/headers';
import { Metadata } from 'next';

import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import Invoice from "./Invoice";

interface PageProps {
  params: { invoiceId: string };
  searchParams: {
    status?: string;
    session_id?: string;
  };
}

export const metadata: Metadata = {
  title: 'Invoice Details | Invoicify',
  description: 'View and manage your invoice details',
};

export default async function InvoicePage({ params, searchParams }: PageProps) {
  // Get headers first
  const headersList = await headers();
  
  // Then get auth
  const { userId, orgId } = await auth();
  
  if (!userId) {
    return null;
  }

  const invoiceId = Number.parseInt(params.invoiceId);

  if (Number.isNaN(invoiceId)) {
    notFound();
  }

  let [result]: Array<{
    invoices: typeof Invoices.$inferSelect;
    customers: typeof Customers.$inferSelect;
  }> = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers,
  };

  return <Invoice invoice={invoice} />;
}