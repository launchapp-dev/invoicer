import { sql } from "drizzle-orm";
import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const userSettings = sqliteTable("user_settings", {
  userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  businessName: text("business_name").notNull().default(""),
  businessEmail: text("business_email").notNull().default(""),
  businessAddress: text("business_address").notNull().default(""),
  businessCity: text("business_city").notNull().default(""),
  businessState: text("business_state").notNull().default(""),
  businessZip: text("business_zip").notNull().default(""),
  businessCountry: text("business_country").notNull().default(""),
  defaultCurrency: text("default_currency").notNull().default("USD"),
  defaultTaxRate: real("default_tax_rate").notNull().default(0),
  defaultNotes: text("default_notes").notNull().default(""),
  invoiceNumberPrefix: text("invoice_number_prefix").notNull().default("INV-"),
  logoUrl: text("logo_url").notNull().default(""),
  theme: text("theme", { enum: ["light", "dark", "system"] }).notNull().default("system"),
  invoiceTemplate: text("invoice_template", { enum: ["classic", "modern", "minimal"] }).notNull().default("classic"),
  businessTaxId: text("business_tax_id").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const recurringInvoices = sqliteTable("recurring_invoices", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  frequency: text("frequency", { enum: ["weekly", "biweekly", "monthly", "quarterly", "annually"] }).notNull(),
  nextRunAt: text("next_run_at").notNull(),
  lastRunAt: text("last_run_at"),
  status: text("status", { enum: ["active", "paused"] }).notNull().default("active"),
  templateJson: text("template_json").notNull(),
  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const clients = sqliteTable("clients", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  company: text("company").notNull().default(""),
  address: text("address").notNull().default(""),
  city: text("city").notNull().default(""),
  state: text("state").notNull().default(""),
  zip: text("zip").notNull().default(""),
  country: text("country").notNull().default(""),
  notes: text("notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
  index("clients_user_id_idx").on(table.userId),
]);

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  status: text("status", {
    enum: ["draft", "sent", "viewed", "paid", "overdue", "cancelled", "partial"],
  })
    .notNull()
    .default("draft"),
  issueDate: text("issue_date").notNull(),
  dueDate: text("due_date").notNull(),
  fromJson: text("from_json").notNull(),
  toJson: text("to_json").notNull(),
  lineItemsJson: text("line_items_json").notNull(),
  taxLinesJson: text("tax_lines_json"),
  subtotal: real("subtotal").notNull().default(0),
  taxRate: real("tax_rate").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  discount: real("discount").notNull().default(0),
  total: real("total").notNull().default(0),
  notes: text("notes").notNull().default(""),
  currency: text("currency").notNull().default("USD"),
  paidAt: text("paid_at"),
  paidMethod: text("paid_method"),
  paidReference: text("paid_reference"),
  shareToken: text("share_token").unique(),
  paymentTerms: text("payment_terms"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
  index("invoices_user_id_idx").on(table.userId),
  index("invoices_updated_at_idx").on(table.updatedAt),
  uniqueIndex("invoices_user_invoice_number_uniq").on(table.userId, table.invoiceNumber),
]);

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  clientId: text("client_id").references(() => clients.id, { onDelete: "set null" }),
  vendor: text("vendor").notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  date: text("date").notNull(),
  category: text("category", {
    enum: ["software", "hardware", "travel", "meals", "contractor", "marketing", "other"],
  }).notNull().default("other"),
  description: text("description").notNull().default(""),
  receiptPath: text("receipt_path"),
  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
  index("expenses_user_id_idx").on(table.userId),
]);

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  amount: real("amount").notNull(),
  paidAt: text("paid_at").notNull(),
  method: text("method").notNull(),
  reference: text("reference"),
  createdAt: text("created_at").notNull(),
});

export const attachments = sqliteTable("attachments", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
  index("attachments_invoice_id_idx").on(table.invoiceId),
  index("attachments_user_id_idx").on(table.userId),
]);
