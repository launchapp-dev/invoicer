import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { Invoice } from "@/types/invoice";
import { formatCurrency, formatDate } from "@/lib/calculations";

export type InvoiceTemplate = "classic" | "modern" | "minimal";

const PAYMENT_TERMS_LABELS: Record<NonNullable<Invoice["paymentTerms"]>, string> = {
  net15: "Net 15",
  net30: "Net 30",
  net60: "Net 60",
  due_on_receipt: "Due on Receipt",
  custom: "Custom",
};

const classicStyles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  invoiceLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#888",
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
  },
  statusBadge: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#555",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  dateText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    borderBottomStyle: "solid",
    marginVertical: 16,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 4,
  },
  column: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#888",
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 2,
  },
  mutedText: {
    color: "#666",
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    borderBottomStyle: "solid",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#888",
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    borderBottomStyle: "solid",
  },
  colDescription: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colUnitPrice: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1, textAlign: "right" },
  totalsContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 4,
  },
  totalsLabel: {
    color: "#666",
  },
  totalsValue: {},
  totalsSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    borderBottomStyle: "solid",
    width: 200,
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 4,
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  destructiveText: {
    color: "#dc2626",
  },
  notesSection: {
    marginTop: 8,
  },
  notesText: {
    color: "#666",
    lineHeight: 1.5,
  },
});

const modernStyles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111",
  },
  accentHeader: {
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 48,
    paddingVertical: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 0,
  },
  invoiceLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  statusBadge: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderStyle: "solid",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginBottom: 6,
  },
  dateText: {
    fontSize: 9,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  body: {
    paddingHorizontal: 48,
    paddingTop: 32,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    borderBottomStyle: "solid",
    marginVertical: 16,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 4,
  },
  column: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#1a1a2e",
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 2,
  },
  mutedText: {
    color: "#666",
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f8",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 0,
    borderRadius: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#1a1a2e",
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    borderBottomStyle: "solid",
  },
  colDescription: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colUnitPrice: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1, textAlign: "right" },
  totalsContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 4,
  },
  totalsLabel: {
    color: "#666",
  },
  totalsValue: {},
  totalsSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    borderBottomStyle: "solid",
    width: 200,
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#1a1a2e",
    borderRadius: 4,
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#ffffff",
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#ffffff",
  },
  destructiveText: {
    color: "#dc2626",
  },
  notesSection: {
    marginTop: 8,
  },
  notesText: {
    color: "#666",
    lineHeight: 1.5,
  },
});

const minimalStyles = StyleSheet.create({
  page: {
    padding: 56,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  invoiceLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#999",
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  statusBadge: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#999",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 9,
    color: "#999",
    marginBottom: 2,
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    marginVertical: 20,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 4,
  },
  column: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#999",
    marginBottom: 6,
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 2,
  },
  mutedText: {
    color: "#777",
    marginBottom: 2,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#999",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  colDescription: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colUnitPrice: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1, textAlign: "right" },
  totalsContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 4,
  },
  totalsLabel: {
    color: "#777",
  },
  totalsValue: {},
  totalsSeparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    width: 200,
    marginVertical: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginBottom: 4,
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  destructiveText: {
    color: "#dc2626",
  },
  notesSection: {
    marginTop: 8,
  },
  notesText: {
    color: "#777",
    lineHeight: 1.5,
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
  logoUrl?: string;
  template?: InvoiceTemplate;
}

function ClassicPDF({ invoice, logoUrl }: { invoice: Invoice; logoUrl?: string }) {
  const s = classicStyles;
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
            {logoUrl ? (
              <Image src={logoUrl} style={{ height: 48, maxWidth: 120, objectFit: "contain" }} />
            ) : null}
            <View>
              <Text style={s.invoiceLabel}>Invoice</Text>
              <Text style={s.invoiceNumber}>{invoice.invoiceNumber || "INV-001"}</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={s.statusBadge}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Text>
            <Text style={s.dateText}>Issued: {formatDate(invoice.issueDate)}</Text>
            <Text style={s.dateText}>Due: {formatDate(invoice.dueDate)}</Text>
            {invoice.paymentTerms && (
              <Text style={s.dateText}>Terms: {PAYMENT_TERMS_LABELS[invoice.paymentTerms]}</Text>
            )}
          </View>
        </View>

        <View style={s.separator} />

        <View style={s.twoColumn}>
          <View style={s.column}>
            <Text style={s.sectionLabel}>From</Text>
            <Text style={s.boldText}>{invoice.from.name || "Your Name"}</Text>
            {invoice.from.email ? <Text style={s.mutedText}>{invoice.from.email}</Text> : null}
            {invoice.from.address ? <Text style={s.mutedText}>{invoice.from.address}</Text> : null}
            {(invoice.from.city || invoice.from.state || invoice.from.zip) ? (
              <Text style={s.mutedText}>
                {[invoice.from.city, invoice.from.state, invoice.from.zip].filter(Boolean).join(", ")}
              </Text>
            ) : null}
            {invoice.from.country ? <Text style={s.mutedText}>{invoice.from.country}</Text> : null}
          </View>
          <View style={s.column}>
            <Text style={s.sectionLabel}>Bill To</Text>
            <Text style={s.boldText}>{invoice.to.name || "Client Name"}</Text>
            {invoice.to.email ? <Text style={s.mutedText}>{invoice.to.email}</Text> : null}
            {invoice.to.address ? <Text style={s.mutedText}>{invoice.to.address}</Text> : null}
            {(invoice.to.city || invoice.to.state || invoice.to.zip) ? (
              <Text style={s.mutedText}>
                {[invoice.to.city, invoice.to.state, invoice.to.zip].filter(Boolean).join(", ")}
              </Text>
            ) : null}
            {invoice.to.country ? <Text style={s.mutedText}>{invoice.to.country}</Text> : null}
          </View>
        </View>

        <View style={s.separator} />

        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, s.colDescription]}>Description</Text>
          <Text style={[s.tableHeaderCell, s.colQty]}>Qty</Text>
          <Text style={[s.tableHeaderCell, s.colUnitPrice]}>Unit Price</Text>
          <Text style={[s.tableHeaderCell, s.colAmount]}>Amount</Text>
        </View>

        {invoice.lineItems.map((item) => (
          <View key={item.id} style={s.tableRow}>
            <Text style={s.colDescription}>{item.description || "—"}</Text>
            <Text style={s.colQty}>{item.quantity}</Text>
            <Text style={s.colUnitPrice}>{formatCurrency(item.rate, invoice.currency)}</Text>
            <Text style={s.colAmount}>{formatCurrency(item.amount, invoice.currency)}</Text>
          </View>
        ))}

        <View style={s.separator} />

        <View style={s.totalsContainer}>
          <View style={s.totalsRow}>
            <Text style={s.totalsLabel}>Subtotal</Text>
            <Text style={s.totalsValue}>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
          </View>
          {(invoice.taxLines ?? []).map((line) =>
            line.rate > 0 ? (
              <View key={line.id} style={s.totalsRow}>
                <Text style={s.totalsLabel}>{line.name || "Tax"} ({line.rate}%)</Text>
                <Text style={s.totalsValue}>{formatCurrency(line.amount, invoice.currency)}</Text>
              </View>
            ) : null
          )}
          {(invoice.discount ?? 0) > 0 && (
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Discount</Text>
              <Text style={[s.totalsValue, s.destructiveText]}>
                -{formatCurrency(invoice.discount, invoice.currency)}
              </Text>
            </View>
          )}
          <View style={s.totalsSeparator} />
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Total</Text>
            <Text style={s.totalValue}>{formatCurrency(invoice.total, invoice.currency)}</Text>
          </View>
        </View>

        {invoice.notes ? (
          <>
            <View style={s.separator} />
            <View style={s.notesSection}>
              <Text style={s.sectionLabel}>Notes</Text>
              <Text style={s.notesText}>{invoice.notes}</Text>
            </View>
          </>
        ) : null}
      </Page>
    </Document>
  );
}

function ModernPDF({ invoice, logoUrl }: { invoice: Invoice; logoUrl?: string }) {
  const s = modernStyles;
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.accentHeader}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 12 }}>
            {logoUrl ? (
              <Image src={logoUrl} style={{ height: 44, maxWidth: 110, objectFit: "contain" }} />
            ) : null}
            <View>
              <Text style={s.invoiceLabel}>Invoice</Text>
              <Text style={s.invoiceNumber}>{invoice.invoiceNumber || "INV-001"}</Text>
            </View>
          </View>
          <View style={s.headerRight}>
            <Text style={s.statusBadge}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Text>
            <Text style={s.dateText}>Issued: {formatDate(invoice.issueDate)}</Text>
            <Text style={s.dateText}>Due: {formatDate(invoice.dueDate)}</Text>
            {invoice.paymentTerms && (
              <Text style={s.dateText}>Terms: {PAYMENT_TERMS_LABELS[invoice.paymentTerms]}</Text>
            )}
          </View>
        </View>

        <View style={s.body}>
          <View style={s.twoColumn}>
            <View style={s.column}>
              <Text style={s.sectionLabel}>From</Text>
              <Text style={s.boldText}>{invoice.from.name || "Your Name"}</Text>
              {invoice.from.email ? <Text style={s.mutedText}>{invoice.from.email}</Text> : null}
              {invoice.from.address ? <Text style={s.mutedText}>{invoice.from.address}</Text> : null}
              {(invoice.from.city || invoice.from.state || invoice.from.zip) ? (
                <Text style={s.mutedText}>
                  {[invoice.from.city, invoice.from.state, invoice.from.zip].filter(Boolean).join(", ")}
                </Text>
              ) : null}
              {invoice.from.country ? <Text style={s.mutedText}>{invoice.from.country}</Text> : null}
            </View>
            <View style={s.column}>
              <Text style={s.sectionLabel}>Bill To</Text>
              <Text style={s.boldText}>{invoice.to.name || "Client Name"}</Text>
              {invoice.to.email ? <Text style={s.mutedText}>{invoice.to.email}</Text> : null}
              {invoice.to.address ? <Text style={s.mutedText}>{invoice.to.address}</Text> : null}
              {(invoice.to.city || invoice.to.state || invoice.to.zip) ? (
                <Text style={s.mutedText}>
                  {[invoice.to.city, invoice.to.state, invoice.to.zip].filter(Boolean).join(", ")}
                </Text>
              ) : null}
              {invoice.to.country ? <Text style={s.mutedText}>{invoice.to.country}</Text> : null}
            </View>
          </View>

          <View style={s.separator} />

          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderCell, s.colDescription]}>Description</Text>
            <Text style={[s.tableHeaderCell, s.colQty]}>Qty</Text>
            <Text style={[s.tableHeaderCell, s.colUnitPrice]}>Unit Price</Text>
            <Text style={[s.tableHeaderCell, s.colAmount]}>Amount</Text>
          </View>

          {invoice.lineItems.map((item) => (
            <View key={item.id} style={s.tableRow}>
              <Text style={s.colDescription}>{item.description || "—"}</Text>
              <Text style={s.colQty}>{item.quantity}</Text>
              <Text style={s.colUnitPrice}>{formatCurrency(item.rate, invoice.currency)}</Text>
              <Text style={s.colAmount}>{formatCurrency(item.amount, invoice.currency)}</Text>
            </View>
          ))}

          <View style={s.separator} />

          <View style={s.totalsContainer}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Subtotal</Text>
              <Text style={s.totalsValue}>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
            </View>
            {(invoice.taxLines ?? []).map((line) =>
              line.rate > 0 ? (
                <View key={line.id} style={s.totalsRow}>
                  <Text style={s.totalsLabel}>{line.name || "Tax"} ({line.rate}%)</Text>
                  <Text style={s.totalsValue}>{formatCurrency(line.amount, invoice.currency)}</Text>
                </View>
              ) : null
            )}
            {(invoice.discount ?? 0) > 0 && (
              <View style={s.totalsRow}>
                <Text style={s.totalsLabel}>Discount</Text>
                <Text style={[s.totalsValue, s.destructiveText]}>
                  -{formatCurrency(invoice.discount, invoice.currency)}
                </Text>
              </View>
            )}
            <View style={{ marginTop: 8 }}>
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Total</Text>
                <Text style={s.totalValue}>{formatCurrency(invoice.total, invoice.currency)}</Text>
              </View>
            </View>
          </View>

          {invoice.notes ? (
            <>
              <View style={s.separator} />
              <View style={s.notesSection}>
                <Text style={s.sectionLabel}>Notes</Text>
                <Text style={s.notesText}>{invoice.notes}</Text>
              </View>
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}

function MinimalPDF({ invoice, logoUrl }: { invoice: Invoice; logoUrl?: string }) {
  const s = minimalStyles;
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
            {logoUrl ? (
              <Image src={logoUrl} style={{ height: 40, maxWidth: 100, objectFit: "contain" }} />
            ) : null}
            <View>
              <Text style={s.invoiceLabel}>Invoice</Text>
              <Text style={s.invoiceNumber}>{invoice.invoiceNumber || "INV-001"}</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={s.statusBadge}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Text>
            <Text style={s.dateText}>Issued: {formatDate(invoice.issueDate)}</Text>
            <Text style={s.dateText}>Due: {formatDate(invoice.dueDate)}</Text>
            {invoice.paymentTerms && (
              <Text style={s.dateText}>Terms: {PAYMENT_TERMS_LABELS[invoice.paymentTerms]}</Text>
            )}
          </View>
        </View>

        <View style={s.separator} />

        <View style={s.twoColumn}>
          <View style={s.column}>
            <Text style={s.sectionLabel}>From</Text>
            <Text style={s.boldText}>{invoice.from.name || "Your Name"}</Text>
            {invoice.from.email ? <Text style={s.mutedText}>{invoice.from.email}</Text> : null}
            {invoice.from.address ? <Text style={s.mutedText}>{invoice.from.address}</Text> : null}
            {(invoice.from.city || invoice.from.state || invoice.from.zip) ? (
              <Text style={s.mutedText}>
                {[invoice.from.city, invoice.from.state, invoice.from.zip].filter(Boolean).join(", ")}
              </Text>
            ) : null}
            {invoice.from.country ? <Text style={s.mutedText}>{invoice.from.country}</Text> : null}
          </View>
          <View style={s.column}>
            <Text style={s.sectionLabel}>Bill To</Text>
            <Text style={s.boldText}>{invoice.to.name || "Client Name"}</Text>
            {invoice.to.email ? <Text style={s.mutedText}>{invoice.to.email}</Text> : null}
            {invoice.to.address ? <Text style={s.mutedText}>{invoice.to.address}</Text> : null}
            {(invoice.to.city || invoice.to.state || invoice.to.zip) ? (
              <Text style={s.mutedText}>
                {[invoice.to.city, invoice.to.state, invoice.to.zip].filter(Boolean).join(", ")}
              </Text>
            ) : null}
            {invoice.to.country ? <Text style={s.mutedText}>{invoice.to.country}</Text> : null}
          </View>
        </View>

        <View style={s.separator} />

        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, s.colDescription]}>Description</Text>
          <Text style={[s.tableHeaderCell, s.colQty]}>Qty</Text>
          <Text style={[s.tableHeaderCell, s.colUnitPrice]}>Unit Price</Text>
          <Text style={[s.tableHeaderCell, s.colAmount]}>Amount</Text>
        </View>

        {invoice.lineItems.map((item) => (
          <View key={item.id} style={s.tableRow}>
            <Text style={s.colDescription}>{item.description || "—"}</Text>
            <Text style={s.colQty}>{item.quantity}</Text>
            <Text style={s.colUnitPrice}>{formatCurrency(item.rate, invoice.currency)}</Text>
            <Text style={s.colAmount}>{formatCurrency(item.amount, invoice.currency)}</Text>
          </View>
        ))}

        <View style={s.separator} />

        <View style={s.totalsContainer}>
          <View style={s.totalsRow}>
            <Text style={s.totalsLabel}>Subtotal</Text>
            <Text style={s.totalsValue}>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
          </View>
          {(invoice.taxLines ?? []).map((line) =>
            line.rate > 0 ? (
              <View key={line.id} style={s.totalsRow}>
                <Text style={s.totalsLabel}>{line.name || "Tax"} ({line.rate}%)</Text>
                <Text style={s.totalsValue}>{formatCurrency(line.amount, invoice.currency)}</Text>
              </View>
            ) : null
          )}
          {(invoice.discount ?? 0) > 0 && (
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Discount</Text>
              <Text style={[s.totalsValue, s.destructiveText]}>
                -{formatCurrency(invoice.discount, invoice.currency)}
              </Text>
            </View>
          )}
          <View style={s.totalsSeparator} />
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Total</Text>
            <Text style={s.totalValue}>{formatCurrency(invoice.total, invoice.currency)}</Text>
          </View>
        </View>

        {invoice.notes ? (
          <>
            <View style={s.separator} />
            <View style={s.notesSection}>
              <Text style={s.sectionLabel}>Notes</Text>
              <Text style={s.notesText}>{invoice.notes}</Text>
            </View>
          </>
        ) : null}
      </Page>
    </Document>
  );
}

export function InvoicePDF({ invoice, logoUrl, template = "classic" }: InvoicePDFProps) {
  if (template === "modern") return <ModernPDF invoice={invoice} logoUrl={logoUrl} />;
  if (template === "minimal") return <MinimalPDF invoice={invoice} logoUrl={logoUrl} />;
  return <ClassicPDF invoice={invoice} logoUrl={logoUrl} />;
}
