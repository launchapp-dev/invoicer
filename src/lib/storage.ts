"use server";

import { and, asc, count, desc, eq, gte, inArray, like, lte, or, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { clients, invoices, payments, userSettings } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Invoice, InvoiceStatus, Payment } from "@/types/invoice";
import type { Client } from "@/types/client";

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

function rowToInvoice(row: typeof invoices.$inferSelect, paymentRows?: typeof payments.$inferSelect[]): Invoice {
  const taxLines = row.taxLinesJson
    ? safeJsonParse(row.taxLinesJson, null)
    : null;
  const resolvedTaxLines = taxLines ?? (
    row.taxRate > 0
      ? [{ id: crypto.randomUUID(), name: "Tax", rate: row.taxRate, amount: row.taxAmount }]
      : [{ id: crypto.randomUUID(), name: "Tax", rate: 0, amount: 0 }]
  );
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
    taxLines: resolvedTaxLines,
    taxRate: row.taxRate,
    taxAmount: row.taxAmount,
    discount: row.discount,
    total: row.total,
    notes: row.notes,
    currency: row.currency,
    ...(row.paidAt ? { paidAt: row.paidAt } : {}),
    ...(row.paidMethod ? { paidMethod: row.paidMethod as Invoice["paidMethod"] } : {}),
    ...(row.paidReference ? { paidReference: row.paidReference } : {}),
    ...(paymentRows
      ? {
          payments: paymentRows.map((p) => ({
            id: p.id,
            invoiceId: p.invoiceId,
            amount: p.amount,
            paidAt: p.paidAt,
            method: p.method,
            ...(p.reference ? { reference: p.reference } : {}),
          })),
        }
      : {}),
    ...(row.shareToken ? { shareToken: row.shareToken } : {}),
    ...(row.paymentTerms ? { paymentTerms: row.paymentTerms as Invoice["paymentTerms"] } : {}),
  };
}

export async function getNextInvoiceNumber(): Promise<string> {
  const userId = await getCurrentUserId();
  const settings = await getUserSettings(userId);
  const prefix = settings?.invoiceNumberPrefix || "INV-";
  const [row] = await db
    .select({ invoiceNumber: invoices.invoiceNumber })
    .from(invoices)
    .where(and(eq(invoices.userId, userId), like(invoices.invoiceNumber, escapeLike(prefix) + "%")))
    .orderBy(desc(sql`length(${invoices.invoiceNumber})`), desc(invoices.invoiceNumber))
    .limit(1);
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = row?.invoiceNumber.match(new RegExp(`^${escapedPrefix}(\\d+)$`));
  const max = match ? parseInt(match[1], 10) : 0;
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

export async function getMySettings(): Promise<typeof userSettings.$inferSelect | null> {
  const userId = await getCurrentUserId();
  return getUserSettings(userId);
}

export async function saveInvoice(invoice: Invoice): Promise<void> {
  const userId = await getCurrentUserId();
  const now = new Date().toISOString();
  const taxRate = invoice.taxLines
    ? invoice.taxLines.reduce((sum, l) => sum + (l.rate || 0), 0)
    : (invoice.taxRate ?? 0);
  const fields = {
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    fromJson: JSON.stringify(invoice.from),
    toJson: JSON.stringify(invoice.to),
    lineItemsJson: JSON.stringify(invoice.lineItems),
    taxLinesJson: JSON.stringify(invoice.taxLines ?? []),
    subtotal: invoice.subtotal,
    taxRate,
    taxAmount: invoice.taxAmount,
    discount: invoice.discount,
    total: invoice.total,
    notes: invoice.notes,
    currency: invoice.currency,
    paidAt: invoice.paidAt ?? null,
    paidMethod: invoice.paidMethod ?? null,
    paidReference: invoice.paidReference ?? null,
    paymentTerms: invoice.paymentTerms ?? null,
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

export type InvoiceSort = "date_desc" | "date_asc" | "amount_desc" | "amount_asc" | "status" | "client";

interface InvoiceFilters {
  search?: string;
  status?: InvoiceStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  sort?: InvoiceSort;
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
        filters?.dateFrom ? gte(invoices.issueDate, filters.dateFrom) : undefined,
        filters?.dateTo ? lte(invoices.issueDate, filters.dateTo) : undefined,
        filters?.minAmount !== undefined ? gte(invoices.total, filters.minAmount) : undefined,
        filters?.maxAmount !== undefined ? lte(invoices.total, filters.maxAmount) : undefined,
      )
    )
    .orderBy(
      filters?.sort === "date_asc" ? asc(invoices.createdAt) :
      filters?.sort === "amount_desc" ? desc(invoices.total) :
      filters?.sort === "amount_asc" ? asc(invoices.total) :
      filters?.sort === "status" ? asc(invoices.status) :
      filters?.sort === "client" ? asc(sql`json_extract(${invoices.toJson}, '$.name')`) :
      desc(invoices.createdAt)
    )
    .limit(limit)
    .offset(offset);
  return rows.map((row) => rowToInvoice(row));
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
        filters?.dateFrom ? gte(invoices.issueDate, filters.dateFrom) : undefined,
        filters?.dateTo ? lte(invoices.issueDate, filters.dateTo) : undefined,
        filters?.minAmount !== undefined ? gte(invoices.total, filters.minAmount) : undefined,
        filters?.maxAmount !== undefined ? lte(invoices.total, filters.maxAmount) : undefined,
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
  if (!row) return null;
  const paymentRows = await db
    .select()
    .from(payments)
    .where(and(eq(payments.invoiceId, id), eq(payments.userId, userId)))
    .orderBy(asc(payments.paidAt));
  return rowToInvoice(row, paymentRows);
}

export async function deleteInvoice(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .delete(invoices)
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

export async function getInvoiceStats(): Promise<{
  totalOutstanding: number;
  outstandingCount: number;
  paidThisMonth: number;
  paidThisMonthCount: number;
  overdueAmount: number;
  overdueCount: number;
  currency: string;
}> {
  const userId = await getCurrentUserId();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [statsRow, currencyRow] = await Promise.all([
    db
      .select({
        totalOutstanding: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.status} IN ('draft', 'sent') THEN ${invoices.total} ELSE 0 END), 0)`,
        outstandingCount: sql<number>`COUNT(CASE WHEN ${invoices.status} IN ('draft', 'sent') THEN 1 ELSE NULL END)`,
        paidThisMonth: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.status} = 'paid' AND strftime('%Y-%m', ${invoices.updatedAt}) = ${currentMonth} THEN ${invoices.total} ELSE 0 END), 0)`,
        paidThisMonthCount: sql<number>`COUNT(CASE WHEN ${invoices.status} = 'paid' AND strftime('%Y-%m', ${invoices.updatedAt}) = ${currentMonth} THEN 1 ELSE NULL END)`,
        overdueAmount: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.status} = 'overdue' THEN ${invoices.total} ELSE 0 END), 0)`,
        overdueCount: sql<number>`COUNT(CASE WHEN ${invoices.status} = 'overdue' THEN 1 ELSE NULL END)`,
      })
      .from(invoices)
      .where(eq(invoices.userId, userId))
      .then((rows) => rows[0]),
    db
      .select({ currency: invoices.currency, cnt: count() })
      .from(invoices)
      .where(eq(invoices.userId, userId))
      .groupBy(invoices.currency)
      .orderBy(desc(count()))
      .limit(1)
      .then((rows) => rows[0]),
  ]);

  return {
    totalOutstanding: statsRow?.totalOutstanding ?? 0,
    outstandingCount: statsRow?.outstandingCount ?? 0,
    paidThisMonth: statsRow?.paidThisMonth ?? 0,
    paidThisMonthCount: statsRow?.paidThisMonthCount ?? 0,
    overdueAmount: statsRow?.overdueAmount ?? 0,
    overdueCount: statsRow?.overdueCount ?? 0,
    currency: currencyRow?.currency ?? "USD",
  };
}

export async function bulkDeleteInvoices(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const userId = await getCurrentUserId();
  await db
    .delete(invoices)
    .where(and(eq(invoices.userId, userId), inArray(invoices.id, ids)));
}

export async function bulkUpdateInvoiceStatus(ids: string[], status: InvoiceStatus): Promise<void> {
  if (ids.length === 0) return;
  const userId = await getCurrentUserId();
  await db
    .update(invoices)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(and(eq(invoices.userId, userId), inArray(invoices.id, ids)));
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(invoices)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

export async function recordPayment(
  id: string,
  payment: { paidAt: string; paidMethod: string; paidReference?: string }
): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(invoices)
    .set({
      status: "paid",
      paidAt: payment.paidAt,
      paidMethod: payment.paidMethod,
      paidReference: payment.paidReference ?? null,
      updatedAt: new Date().toISOString(),
    })
    .where(and(eq(invoices.id, id), eq(invoices.userId, userId)));
}

async function recalculateInvoiceStatus(invoiceId: string, userId: string): Promise<void> {
  const [inv] = await db
    .select({ total: invoices.total })
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)));
  if (!inv) return;
  const rows = await db
    .select({ amount: payments.amount })
    .from(payments)
    .where(and(eq(payments.invoiceId, invoiceId), eq(payments.userId, userId)));
  const totalPaid = rows.reduce((sum, r) => sum + r.amount, 0);
  let status: InvoiceStatus;
  if (totalPaid >= inv.total) {
    status = "paid";
  } else if (totalPaid > 0) {
    status = "partial";
  } else {
    status = "sent";
  }
  await db
    .update(invoices)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)));
}

export async function addPayment(
  invoiceId: string,
  payment: Omit<Payment, "id" | "invoiceId">
): Promise<Payment> {
  const userId = await getCurrentUserId();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.insert(payments).values({
    id,
    invoiceId,
    userId,
    amount: payment.amount,
    paidAt: payment.paidAt,
    method: payment.method,
    reference: payment.reference ?? null,
    createdAt: now,
  });
  await recalculateInvoiceStatus(invoiceId, userId);
  return { id, invoiceId, amount: payment.amount, paidAt: payment.paidAt, method: payment.method, ...(payment.reference ? { reference: payment.reference } : {}) };
}

export async function getPaymentsForInvoice(invoiceId: string): Promise<Payment[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(payments)
    .where(and(eq(payments.invoiceId, invoiceId), eq(payments.userId, userId)))
    .orderBy(asc(payments.paidAt));
  return rows.map((p) => ({
    id: p.id,
    invoiceId: p.invoiceId,
    amount: p.amount,
    paidAt: p.paidAt,
    method: p.method,
    ...(p.reference ? { reference: p.reference } : {}),
  }));
}

export async function deletePayment(paymentId: string): Promise<void> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select({ invoiceId: payments.invoiceId })
    .from(payments)
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)));
  if (!row) return;
  await db.delete(payments).where(and(eq(payments.id, paymentId), eq(payments.userId, userId)));
  await recalculateInvoiceStatus(row.invoiceId, userId);
}

export async function getUserSettings(userId: string): Promise<typeof userSettings.$inferSelect | null> {
  const [row] = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
  return row ?? null;
}

export async function upsertUserSettings(
  userId: string,
  data: Partial<Omit<typeof userSettings.$inferInsert, "userId" | "updatedAt">>
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .insert(userSettings)
    .values({ userId, ...data, updatedAt: now })
    .onConflictDoUpdate({
      target: userSettings.userId,
      set: { ...data, updatedAt: now },
    });
}

export async function saveMyBusinessProfile(data: {
  businessName?: string;
  businessEmail?: string;
  businessAddress?: string;
  businessCity?: string;
  businessState?: string;
  businessZip?: string;
  businessCountry?: string;
  businessTaxId?: string;
}): Promise<void> {
  const userId = await getCurrentUserId();
  await upsertUserSettings(userId, data);
}

export async function saveMyInvoiceDefaults(data: {
  defaultCurrency?: string;
  defaultTaxRate?: number;
  defaultNotes?: string;
  invoiceNumberPrefix?: string;
}): Promise<void> {
  const userId = await getCurrentUserId();
  await upsertUserSettings(userId, data);
}

export async function saveMyLogoUrl(logoUrl: string): Promise<void> {
  const userId = await getCurrentUserId();
  await upsertUserSettings(userId, { logoUrl });
}

export async function saveMyTheme(theme: "light" | "dark" | "system"): Promise<void> {
  const userId = await getCurrentUserId();
  await upsertUserSettings(userId, { theme });
}

export async function saveMyTemplate(invoiceTemplate: "classic" | "modern" | "minimal"): Promise<void> {
  const userId = await getCurrentUserId();
  await upsertUserSettings(userId, { invoiceTemplate });
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
    taxLinesJson: row.taxLinesJson,
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

function rowToClient(row: typeof clients.$inferSelect): Client {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    address: row.address,
    city: row.city,
    state: row.state,
    zip: row.zip,
    country: row.country,
    notes: row.notes,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function listClients(): Promise<Client[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(clients)
    .where(eq(clients.userId, userId))
    .orderBy(desc(clients.updatedAt));
  return rows.map(rowToClient);
}

export async function getClient(id: string): Promise<Client | null> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, id), eq(clients.userId, userId)));
  return row ? rowToClient(row) : null;
}

export async function createClient(data: Omit<Client, "id" | "createdAt" | "updatedAt">): Promise<Client> {
  const userId = await getCurrentUserId();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.insert(clients).values({ ...data, id, userId, createdAt: now, updatedAt: now });
  const [row] = await db.select().from(clients).where(eq(clients.id, id));
  return rowToClient(row);
}

export async function updateClient(id: string, data: Partial<Omit<Client, "id" | "createdAt" | "updatedAt">>): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(clients)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(and(eq(clients.id, id), eq(clients.userId, userId)));
}

export async function batchUpsertClients(
  rows: Array<Omit<Client, "id" | "createdAt" | "updatedAt">>
): Promise<{ imported: number; skipped: number }> {
  const userId = await getCurrentUserId();
  const existingRows = await db
    .select({ email: clients.email })
    .from(clients)
    .where(eq(clients.userId, userId));
  const emailSet = new Set(existingRows.map((r) => r.email).filter(Boolean));
  let imported = 0;
  let skipped = 0;
  const now = new Date().toISOString();
  for (const row of rows) {
    if (row.email && emailSet.has(row.email)) {
      skipped++;
      continue;
    }
    const id = crypto.randomUUID();
    await db.insert(clients).values({ ...row, id, userId, createdAt: now, updatedAt: now });
    if (row.email) emailSet.add(row.email);
    imported++;
  }
  return { imported, skipped };
}

export async function deleteClient(id: string): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .delete(clients)
    .where(and(eq(clients.id, id), eq(clients.userId, userId)));
}

export async function getInvoicesByClientId(clientId: string, limit = 10): Promise<Invoice[]> {
  const userId = await getCurrentUserId();
  const [clientRow] = await db
    .select({ name: clients.name })
    .from(clients)
    .where(and(eq(clients.id, clientId), eq(clients.userId, userId)));
  if (!clientRow) return [];
  const rows = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, userId),
        sql`json_extract(${invoices.toJson}, '$.name') = ${clientRow.name}`
      )
    )
    .orderBy(desc(invoices.issueDate))
    .limit(limit);
  return rows.map((row) => rowToInvoice(row));
}

export async function getClientInvoices(clientName: string): Promise<Invoice[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.userId, userId),
        sql`json_extract(${invoices.toJson}, '$.name') = ${clientName}`
      )
    )
    .orderBy(desc(invoices.issueDate));
  return rows.map((row) => rowToInvoice(row));
}

export async function generateShareLink(invoiceId: string): Promise<string> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select({ shareToken: invoices.shareToken })
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)));
  if (!row) throw new Error("Invoice not found");
  if (row.shareToken) return `/i/${row.shareToken}`;
  const token = crypto.randomUUID();
  await db
    .update(invoices)
    .set({ shareToken: token, updatedAt: new Date().toISOString() })
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)));
  return `/i/${token}`;
}

export interface CashFlowWeek {
  weekStart: string;
  weekLabel: string;
  amount: number;
  count: number;
}

export interface CashFlowData {
  expectedThisMonth: number;
  expectedThisMonthCount: number;
  atRisk: number;
  atRiskCount: number;
  upcomingByWeek: CashFlowWeek[];
  currency: string;
}

export async function getCashFlowData(): Promise<CashFlowData> {
  const userId = await getCurrentUserId();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const monthEnd = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const [activeRows, currencyRow] = await Promise.all([
    db
      .select({
        total: invoices.total,
        dueDate: invoices.dueDate,
        status: invoices.status,
      })
      .from(invoices)
      .where(
        and(
          eq(invoices.userId, userId),
          inArray(invoices.status, ["sent", "viewed", "partial", "overdue"]),
        )
      ),
    db
      .select({ currency: invoices.currency, cnt: count() })
      .from(invoices)
      .where(eq(invoices.userId, userId))
      .groupBy(invoices.currency)
      .orderBy(desc(count()))
      .limit(1)
      .then((rows) => rows[0]),
  ]);

  const currency = currencyRow?.currency ?? "USD";
  let expectedThisMonth = 0;
  let expectedThisMonthCount = 0;
  let atRisk = 0;
  let atRiskCount = 0;

  const weekMap = new Map<string, { label: string; amount: number; count: number }>();

  for (const row of activeRows) {
    const isOverdue = row.status === "overdue" || row.dueDate < todayStr;

    if (isOverdue) {
      atRisk += row.total;
      atRiskCount++;
    } else {
      if (row.dueDate >= monthStart && row.dueDate <= monthEnd) {
        expectedThisMonth += row.total;
        expectedThisMonthCount++;
      }

      const dueDate = new Date(row.dueDate + "T00:00:00");
      const daysDiff = Math.floor((dueDate.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
      if (daysDiff >= 0 && daysDiff <= 56) {
        const weekNum = Math.floor(daysDiff / 7);
        const weekStartDate = new Date(today);
        weekStartDate.setDate(new Date(today).getDate() - new Date(today).getDay() + weekNum * 7);
        const weekStartStr = weekStartDate.toISOString().split("T")[0];

        if (!weekMap.has(weekStartStr)) {
          const weekLabel =
            weekNum === 0 ? "This week" :
            weekNum === 1 ? "Next week" :
            `Week of ${weekStartDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
          weekMap.set(weekStartStr, { label: weekLabel, amount: 0, count: 0 });
        }
        const week = weekMap.get(weekStartStr)!;
        week.amount += row.total;
        week.count++;
      }
    }
  }

  const upcomingByWeek: CashFlowWeek[] = Array.from(weekMap.entries())
    .map(([weekStart, { label, amount, count }]) => ({ weekStart, weekLabel: label, amount, count }))
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart));

  return { expectedThisMonth, expectedThisMonthCount, atRisk, atRiskCount, upcomingByWeek, currency };
}

export async function getInvoiceByShareToken(token: string): Promise<Invoice | null> {
  const [row] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.shareToken, token));
  return row ? rowToInvoice(row) : null;
}

export async function markInvoiceViewed(token: string): Promise<void> {
  const [row] = await db
    .select({ id: invoices.id, status: invoices.status })
    .from(invoices)
    .where(eq(invoices.shareToken, token));
  if (!row) return;
  if (row.status === "sent") {
    await db
      .update(invoices)
      .set({ status: "viewed", updatedAt: new Date().toISOString() })
      .where(eq(invoices.shareToken, token));
  }
}
