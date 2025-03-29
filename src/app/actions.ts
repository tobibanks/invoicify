"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import Stripe from "stripe";

import { db } from "@/db";
import { Customers, Invoices, type Status } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { headers } from "next/headers";

import { InvoiceCreatedEmail } from "@/emails/invoice-created";

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));
const resend = new Resend(process.env.RESEND_API_KEY);

export async function createAction(formData: FormData) {
  try {
    const { userId, orgId } = auth();
    console.log('userId', userId);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const value = Math.floor(
      Number.parseFloat(String(formData.get("value"))) * 100,
    );
    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Validate input
    if (!value || !description || !name || !email) {
      throw new Error('Missing required fields');
    }

    const [customer] = await db
      .insert(Customers)
      .values({
        name,
        email,
        userId,
        organizationId: orgId || null,
      })
      .returning({
        id: Customers.id,
      });

    if (!customer) {
      throw new Error('Failed to create customer');
    }

    const results = await db
      .insert(Invoices)
      .values({
        value,
        description,
        userId,
        customerId: customer.id,
        status: "open",
        organizationId: orgId || null,
      })
      .returning({
        id: Invoices.id,
      });

    if (!results.length) {
      throw new Error('Failed to create invoice');
    }

    await resend.emails.send({
      from: "BPZ<tobi@tobiodogwu.xyz>",
      to: [email],
      subject: "You Have a New Invoice",
      react: InvoiceCreatedEmail({ invoiceId: results[0].id }),
    });

    redirect(`/invoices/${results[0].id}`);
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

export async function updateStatusAction(formData: FormData) {
  const { userId, orgId } =  auth();

  // Updating disabled for demo
 // if ( userId !== process.env.ME_ID ) return;

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  if (orgId) {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.organizationId, orgId),
        ),
      );
  } else {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId),
        ),
      );
  }

  revalidatePath(`/invoices/${id}`, "page");
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId, orgId } = auth();

  // Deleting disabled for demo
 // if ( userId !== process.env.ME_ID ) return;

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;

  if (orgId) {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.organizationId, orgId),
        ),
      );
  } else {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, Number.parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId),
        ),
      );
  }

  redirect("/dashboard");
}


export async function createPayment(formData: FormData) {
  // Payments disabled for demo

  const headersList =await headers();
  const origin = await headersList.get("origin");
  const id = Number.parseInt(formData.get("id") as string);

  const [result] = await db
    .select({
      status: Invoices.status,
      value: Invoices.value,
    })
    .from(Invoices)
    .where(eq(Invoices.id, id))
    .limit(1);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product: "prod_RricaJpI9j2iQ2",
          unit_amount: result.value,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/invoices/${id}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/invoices/${id}/payment?status=canceled&session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.url) {
    throw new Error("Invalid Session");
  }

  redirect(session.url);
}