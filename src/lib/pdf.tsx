import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Invoice } from '@/types/invoice';
import { formatCurrency, calculateTotals, lineItemTotal } from '@/lib/calculations';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
  },
  invoiceNum: {
    fontSize: 11,
    color: '#666',
    marginTop: 6,
  },
  label: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  muted: {
    color: '#666',
    marginTop: 2,
  },
  addresses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  colDesc: { flex: 1 },
  colQty: { width: 48, textAlign: 'right' },
  colRate: { width: 72, textAlign: 'right' },
  colAmt: { width: 80, textAlign: 'right' },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  totalsLabel: {
    width: 120,
    textAlign: 'right',
    color: '#666',
    paddingRight: 12,
  },
  totalsValue: {
    width: 88,
    textAlign: 'right',
  },
  grandTotalRow: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  grandTotalLabel: {
    width: 120,
    textAlign: 'right',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    paddingRight: 12,
  },
  grandTotalValue: {
    width: 88,
    textAlign: 'right',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
  },
  notes: {
    marginTop: 40,
  },
  notesText: {
    color: '#555',
    lineHeight: 1.5,
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  const { subtotal, discountAmount, taxAmount, total } = calculateTotals(
    invoice.lineItems,
    invoice.taxRate,
    invoice.discount
  );
  const fmt = (n: number) => formatCurrency(n, invoice.currency);

  return (
    <Document title={`Invoice ${invoice.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceNum}>#{invoice.invoiceNumber}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.bold}>{invoice.senderName}</Text>
            {invoice.senderEmail ? <Text style={styles.muted}>{invoice.senderEmail}</Text> : null}
            {invoice.senderAddress ? <Text style={styles.muted}>{invoice.senderAddress}</Text> : null}
          </View>
        </View>

        <View style={styles.addresses}>
          <View>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.bold}>{invoice.recipientName}</Text>
            {invoice.recipientEmail ? <Text style={styles.muted}>{invoice.recipientEmail}</Text> : null}
            {invoice.recipientAddress ? <Text style={styles.muted}>{invoice.recipientAddress}</Text> : null}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.label}>Issue Date</Text>
              <Text>{invoice.issueDate}</Text>
            </View>
            <View>
              <Text style={styles.label}>Due Date</Text>
              <Text>{invoice.dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.colDesc, styles.bold]}>Description</Text>
          <Text style={[styles.colQty, styles.bold]}>Qty</Text>
          <Text style={[styles.colRate, styles.bold]}>Rate</Text>
          <Text style={[styles.colAmt, styles.bold]}>Amount</Text>
        </View>

        {invoice.lineItems.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.colDesc}>{item.description}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colRate}>{fmt(item.rate)}</Text>
            <Text style={styles.colAmt}>{fmt(lineItemTotal(item))}</Text>
          </View>
        ))}

        <View style={styles.totalsSection}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>{fmt(subtotal)}</Text>
          </View>
          {invoice.discount > 0 && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Discount ({invoice.discount}%)</Text>
              <Text style={styles.totalsValue}>-{fmt(discountAmount)}</Text>
            </View>
          )}
          {invoice.taxRate > 0 && (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax ({invoice.taxRate}%)</Text>
              <Text style={styles.totalsValue}>{fmt(taxAmount)}</Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>{fmt(total)}</Text>
          </View>
        </View>

        {invoice.notes ? (
          <View style={styles.notes}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        ) : null}

        {invoice.paymentTerms ? (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Payment Terms</Text>
            <Text style={styles.notesText}>{invoice.paymentTerms}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
