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
  updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  status: text("status", {
    enum: ["draft", "sent", "paid", "overdue", "cancelled"],
  })
    .notNull()
    .default("draft"),
  issueDate: text("issue_date").notNull(),
  dueDate: text("due_date").notNull(),
  fromJson: text("from_json").notNull(),
  toJson: text("to_json").notNull(),
  lineItemsJson: text("line_items_json").notNull(),
  subtotal: real("subtotal").notNull().default(0),
  taxRate: real("tax_rate").notNull().default(0),
  taxAmount: real("tax_amount").notNull().default(0),
  discount: real("discount").notNull().default(0),
  total: real("total").notNull().default(0),
  notes: text("notes").notNull().default(""),
  currency: text("currency").notNull().default("USD"),
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
