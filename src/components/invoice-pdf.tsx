import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/calculations";

const styles = StyleSheet.create({
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


interface InvoicePDFProps {
  invoice: Invoice;
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.invoiceLabel}>Invoice</Text>
            <Text style={styles.invoiceNumber}>
              {invoice.invoiceNumber || "INV-001"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.statusBadge}>
              {invoice.status.charAt(0).toUpperCase() +
                invoice.status.slice(1)}
            </Text>
            <Text style={styles.dateText}>
              Issued: {invoice.issueDate || "—"}
            </Text>
            <Text style={styles.dateText}>Due: {invoice.dueDate || "—"}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionLabel}>From</Text>
            <Text style={styles.boldText}>
              {invoice.from.name || "Your Name"}
            </Text>
            {invoice.from.email ? (
              <Text style={styles.mutedText}>{invoice.from.email}</Text>
            ) : null}
            {invoice.from.address ? (
              <Text style={styles.mutedText}>{invoice.from.address}</Text>
            ) : null}
            {(invoice.from.city || invoice.from.state || invoice.from.zip) ? (
              <Text style={styles.mutedText}>
                {[invoice.from.city, invoice.from.state, invoice.from.zip].filter(Boolean).join(", ")}
              </Text>
            ) : null}
            {invoice.from.country ? (
              <Text style={styles.mutedText}>{invoice.from.country}</Text>
            ) : null}
          </View>
          <View style={styles.column}>
            <Text style={styles.sectionLabel}>Bill To</Text>
            <Text style={styles.boldText}>
              {invoice.to.name || "Client Name"}
            </Text>
            {invoice.to.email ? (
              <Text style={styles.mutedText}>{invoice.to.email}</Text>
            ) : null}
            {invoice.to.address ? (
              <Text style={styles.mutedText}>{invoice.to.address}</Text>
            ) : null}
            {(invoice.to.city || invoice.to.state || invoice.to.zip) ? (
              <Text style={styles.mutedText}>
                {[invoice.to.city, invoice.to.state, invoice.to.zip].filter(Boolean).join(", ")}
              </Text>
            ) : null}
            {invoice.to.country ? (
              <Text style={styles.mutedText}>{invoice.to.country}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, styles.colDescription]}>
            Description
          </Text>
          <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
          <Text style={[styles.tableHeaderCell, styles.colUnitPrice]}>
            Unit Price
          </Text>
          <Text style={[styles.tableHeaderCell, styles.colAmount]}>Amount</Text>
        </View>

        {invoice.lineItems.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.colDescription]}>
              {item.description || "—"}
            </Text>
            <Text style={[styles.colQty]}>{item.quantity}</Text>
            <Text style={[styles.colUnitPrice]}>
              {formatCurrency(item.rate, invoice.currency)}
            </Text>
            <Text style={[styles.colAmount]}>
              {formatCurrency(item.amount, invoice.currency)}
            </Text>
          </View>
        ))}

        <View style={styles.separator} />

        <View style={styles.totalsContainer}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>
              {formatCurrency(invoice.subtotal, invoice.currency)}
            </Text>
          </View>
          {invoice.taxRate > 0 && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>
                Tax ({invoice.taxRate}%)
              </Text>
              <Text style={styles.totalsValue}>
                {formatCurrency(invoice.taxAmount, invoice.currency)}
              </Text>
            </View>
          )}
          <View style={styles.totalsSeparator} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {invoice.notes ? (
          <>
            <View style={styles.separator} />
            <View style={styles.notesSection}>
              <Text style={styles.sectionLabel}>Notes</Text>
              <Text style={styles.notesText}>{invoice.notes}</Text>
            </View>
          </>
        ) : null}
      </Page>
    </Document>
  );
}
