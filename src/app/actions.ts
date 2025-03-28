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
//const resend = new Resend(process.env.RESEND_API_KEY);

export async function createAction(formData: FormData) {
  const { userId, orgId } = auth();
console.log('userId', userId);
  // Creation disabled for demo
  //if ( userId !== process.env.ME_ID ) return;

  if (!userId) {
    return;
  }

  const value = Math.floor(
    Number.parseFloat(String(formData.get("value"))) * 100,
  );
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

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

  // await resend.emails.send({
  //   from: "Space Jelly <info@test.spacejelly.dev>",
  //   to: [email],
  //   subject: "You Have a New Invoice",
  //   react: InvoiceCreatedEmail({ invoiceId: results[0].id }),
  // });

  redirect(`/invoices/${results[0].id}`);
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

// export async function createPayment(formData: FormData) {
//   //console.log(formData)
//   try {
//     // Payments disabled for demo
//     // const { userId } = auth();
//     // if (!userId || userId !== process.env.ME_ID) {
//     //   throw new Error("Unauthorized");
//     // }

//     // Get headers with timeout handling
//     const headersList = await Promise.race([
//       headers(),
//       new Promise((_, reject) => 
//         setTimeout(() => reject(new Error('Headers timeout')), 5000)
//       )
//     ]) as Headers;

//     const origin = headersList.get("origin");
//     //console.log('origin: ', origin);
//     if (!origin) {
//       throw new Error("Origin header not found");
//     }

//     const id = Number.parseInt(formData.get("id") as string);
//     if (isNaN(id)) {
//       throw new Error("Invalid invoice ID");
//     }

//     const [result] = await db
//       .select({
//         status: Invoices.status,
//         value: Invoices.value,
//       })
//       .from(Invoices)
//       .where(eq(Invoices.id, id))
//       .limit(1);

// //console.log('result: ', result);
      
//     if (!result) {
//       throw new Error("Invoice not found");
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product: "prod_RricaJpI9j2iQ2",
//             unit_amount: result.value,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${origin}/invoices/${id}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${origin}/invoices/${id}/payment?status=canceled&session_id={CHECKOUT_SESSION_ID}`,
//     });

//     if (!session.url) {
//       throw new Error("Invalid Session");
//     }

//     redirect(session.url);
//   } catch (error) {
//     console.error('Payment creation failed:', error);
//     redirect(`/invoices/${formData.get("id")}/error`);
//   }
// }

export async function createPayment(formData: FormData) {
  try {
    // Get the header without timeout - Next.js handles this internally
    const headersList = await Promise.race([
             headers(),
             new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Headers timeout')), 5000)
             )
           ]) as Headers;
    const origin = headersList.get("origin");

    if (!origin) {
      throw new Error("Missing origin header");
    }

    // Parse and validate invoice ID
    const rawId = formData.get("id");
    if (!rawId) {
      throw new Error("Missing invoice ID");
    }

    const id = Number.parseInt(rawId as string);
    if (isNaN(id)) {
      throw new Error("Invalid invoice ID format");
    }

    // Get invoice details with status check
    const [invoice] = await db
      .select({
        status: Invoices.status,
        value: Invoices.value,
      })
      .from(Invoices)
      .where(eq(Invoices.id, id))
      .limit(1);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    if (invoice.status !== "open") {
      throw new Error("Invoice cannot be paid");
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: "prod_RricaJpI9j2iQ2",
            unit_amount: invoice.value,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        invoiceId: id,
      },
      success_url: `${origin}/invoices/${id}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/invoices/${id}/payment?status=canceled`,
    });

    if (!session?.url) {
      throw new Error("Failed to create Stripe session");
    }

    return redirect(session.url);
  } catch (error) {
    console.error('Payment creation failed:', error);
    
    // Type-safe error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return redirect(`/invoices/${formData.get("id")}/error?message=${encodeURIComponent(errorMessage)}`);
  }
}