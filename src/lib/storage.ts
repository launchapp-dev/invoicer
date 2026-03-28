"use server";

import { and, count, desc, eq, like, or, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Invoice, InvoiceStatus } from "@/types/invoice";

async function getCurrentUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function escapeLike(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

const emptyParty = { name: "", email: "", address: "", city: "", state: "", zip: "", country: "" };

function rowToInvoice(row: typeof invoices.$inferSelect): Invoice {
  return {
    id: row.id,
    invoiceNumber: row.invoiceNumber,
    status: row.status,
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    from: safeJsonParse(row.fromJson, emptyParty),
    to: safeJsonParse(row.toJson, emptyParty),
    lineItems: safeJsonParse(row.lineItemsJson, []),
    subtotal: row.subtotal,
    taxRate: row.taxRate,
    taxAmount: row.taxAmount,
    discount: row.discount,
    total: row.total,
    notes: row.notes,
    currency: row.currency,
  };
}

export async function getNextInvoiceNumber(): Promise<string> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select({ invoiceNumber: invoices.invoiceNumber })
    .from(invoices)
    .where(and(eq(invoices.userId, userId), like(invoices.invoiceNumber, "INV-%")))
    .orderBy(desc(sql`length(${invoices.invoiceNumber})`), desc(invoices.invoiceNumber))
    .limit(1);
  const match = row?.invoiceNumber.match(/^INV-(\d+)$/);
  const max = match ? parseInt(match[1], 10) : 0;
  return `INV-${String(max + 1).padStart(3, "0")}`;
}

export async function saveInvoice(invoice: Invoice): Promise<void> {
  const userId = await getCurrentUserId();
  const now = new Date().toISOString();
  const fields = {
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    fromJson: JSON.stringify(invoice.from),
    toJson: JSON.stringify(invoice.to),
    lineItemsJson: JSON.stringify(invoice.lineItems),
    subtotal: invoice.subtotal,
    taxRate: invoice.taxRate,
    taxAmount: invoice.taxAmount,
    discount: invoice.discount,
    total: invoice.total,
    notes: invoice.notes,
    currency: invoice.currency,
  };
  const existing = await db
    .select({ id: invoices.id })
    .from(invoices)
    .where(and(eq(invoices.id, invoice.id), eq(invoices.userId, userId)))
    .limit(1);
  try {
    if (existing.length > 0) {
      await db
        .update(invoices)
        .set({ ...fields, updatedAt: now })
        .where(and(eq(invoices.id, invoice.id), eq(invoices.userId, userId)));
    } else {
      await db.insert(invoices).values({ ...fields, id: invoice.id, userId, updatedAt: now });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("UNIQUE constraint failed") && msg.includes("invoice_number")) {
      throw new Error(`Invoice number "${invoice.invoiceNumber}" is already in use. Please choose a different number.`);
    }
    throw err;
  }
}

interface InvoiceFilters {
  search?: string;
  status?: InvoiceStatus;
}

export async function listInvoices(limit = 25, offset = 0, filters?: InvoiceFilters): Promise<Invoice[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, userId),
        filters?.search
          ? or(
              sql`${invoices.invoiceNumber} LIKE ${"%" + escapeLike(filters.search) + "%"} ESCAPE '\\'`,
              sql`json_extract(${invoices.toJson}, '$.name') LIKE ${"%" + escapeLike(filters.search) + "%"} ESCAPE '\\'`,
              sql`json_extract(${invoices.toJson}, '$.email') LIKE ${"%" + escapeLike(filters.search) + "%"} ESCAPE '\\'`
            )
          : undefined,
        filters?.status ? eq(invoices.status, filters.status) : undefined,
      )
    )
    .orderBy(desc(invoices.updatedAt))
    .limit(limit)
    .offset(offset);
  return rows.map(rowToInvoice);
}

export async function countInvoices(filters?: InvoiceFilters): Promise<number> {
  const userId = await getCurrentUserId();
  const [result] = await db
    .select({ total: count() })
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, userId),
        filters?.search
          ? or(
              sql`${invoices.invoiceNumber} LIKE ${"%" + escapeLike(filters.search) + "%"} ESCAPE '\\'`,
              sql`json_extract(${invoices.toJson}, '$.name') LIKE ${"%" + escapeLike(filters.search) + "%"} ESCAPE '\\'`,
              sql`json_extract(${invoices.toJson}, '$.email') LIKE ${"%" + escapeLike(filters.search) + "%"} ESCAPE '\\'`
            )
          : undefined,
        filters?.status ? eq(invoices.status, filters.status) : undefined,
      )
    );
  return result?.total ?? 0;
}

export async function loadInvoice(id: string): Promise<Invoice | null> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
  return row ? rowToInvoice(row) : null;
}

export async function deleteInvoice(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .delete(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(invoices)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

export async function duplicateInvoice(id: string): Promise<Invoice | null> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
  if (!row) return null;
  const baseNumber = row.invoiceNumber.replace(/ \(\d+\)$/, "");
  const existing = await db
    .select({ invoiceNumber: invoices.invoiceNumber })
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, userId),
        or(
          eq(invoices.invoiceNumber, baseNumber),
          like(invoices.invoiceNumber, `${baseNumber} (%)`)
        )
      )
    );
  let maxSuffix = 1;
  for (const { invoiceNumber } of existing) {
    const match = invoiceNumber.match(/ \((\d+)\)$/);
    if (match) maxSuffix = Math.max(maxSuffix, parseInt(match[1], 10));
  }
  const newInvoiceNumber = `${baseNumber} (${maxSuffix + 1})`;
  const now = new Date().toISOString();
  const newId = crypto.randomUUID();
  await db.insert(invoices).values({
    id: newId,
    userId,
    invoiceNumber: newInvoiceNumber,
    status: "draft",
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    fromJson: row.fromJson,
    toJson: row.toJson,
    lineItemsJson: row.lineItemsJson,
    subtotal: row.subtotal,
    taxRate: row.taxRate,
    taxAmount: row.taxAmount,
    discount: row.discount,
    total: row.total,
    notes: row.notes,
    currency: row.currency,
    updatedAt: now,
  });
  const [newRow] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, newId));
  return newRow ? rowToInvoice(newRow) : null;
}
