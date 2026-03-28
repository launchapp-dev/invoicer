"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { Sparkles, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceTotals } from "@/components/invoice-totals";
import { calcSubtotal, calcTaxLines, calcTaxAmountFromLines, calcTotal } from "@/lib/calculations";
import { LineItems } from "@/components/line-items";
import { RECURRING_FREQUENCIES, type InvoiceFormValues } from "@/lib/invoice-schema";
import { suggestLineItems, type SuggestedLineItem } from "@/lib/ai";
import type { Client } from "@/types/client";

const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
] as const;

const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "JPY", label: "JPY — Japanese Yen" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "CHF", label: "CHF — Swiss Franc" },
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "SGD", label: "SGD — Singapore Dollar" },
  { code: "AED", label: "AED — UAE Dirham" },
];

function ContactSection({ prefix, title, clients, onClientSelect }: {
  prefix: "from" | "to";
  title: string;
  clients?: Client[];
  onClientSelect?: (clientId: string | null) => void;
}) {
  const { register, setValue, formState: { errors } } = useFormContext<InvoiceFormValues>();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const e = errors[prefix];

  const hasClients = (clients ?? []).length > 0;
  const clientOptions = [
    ...(hasClients ? [{ value: "__clear__", label: "— Fill manually —" }] : []),
    ...(clients ?? []).map((c) => ({
      value: c.id,
      label: c.name + (c.email ? ` (${c.email})` : ""),
    })),
  ];

  function handleClientSelect(clientId: string) {
    if (!clientId || clientId === "__clear__") {
      setSelectedClientId("");
      onClientSelect?.(null);
      setValue(`${prefix}.name`, "", { shouldDirty: true });
      setValue(`${prefix}.email`, "", { shouldDirty: true });
      setValue(`${prefix}.address`, "", { shouldDirty: true });
      setValue(`${prefix}.city`, "", { shouldDirty: true });
      setValue(`${prefix}.state`, "", { shouldDirty: true });
      setValue(`${prefix}.zip`, "", { shouldDirty: true });
      setValue(`${prefix}.country`, "", { shouldDirty: true });
      return;
    }
    setSelectedClientId(clientId);
    onClientSelect?.(clientId);
    const client = (clients ?? []).find((c) => c.id === clientId);
    if (client) {
      setValue(`${prefix}.name`, client.name, { shouldDirty: true });
      setValue(`${prefix}.email`, client.email, { shouldDirty: true });
      setValue(`${prefix}.address`, client.address, { shouldDirty: true });
      setValue(`${prefix}.city`, client.city, { shouldDirty: true });
      setValue(`${prefix}.state`, client.state, { shouldDirty: true });
      setValue(`${prefix}.zip`, client.zip, { shouldDirty: true });
      setValue(`${prefix}.country`, client.country, { shouldDirty: true });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {prefix === "to" && (
          <div className="grid gap-2">
            <Label>Select client (optional)</Label>
            {clients !== undefined && !hasClients ? (
              <p className="text-sm text-muted-foreground">
                No clients saved yet.{" "}
                <Link href="/clients" className="underline underline-offset-2 text-foreground">
                  Add a client
                </Link>{" "}
                to autofill this section.
              </p>
            ) : (
              <Combobox
                options={clientOptions}
                value={selectedClientId}
                onValueChange={handleClientSelect}
                placeholder="Select a saved client…"
                searchPlaceholder="Search by name or email…"
                emptyText="No clients found"
              />
            )}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor={`${prefix}.name`}>Name</Label>
          <Input
            id={`${prefix}.name`}
            {...register(`${prefix}.name`)}
            error={!!e?.name}
            aria-invalid={!!e?.name}
            aria-describedby={e?.name ? `${prefix}-name-error` : undefined}
          />
          {e?.name && <p id={`${prefix}-name-error`} role="alert" className="text-xs text-destructive">{e.name.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${prefix}.email`}>Email</Label>
          <Input
            id={`${prefix}.email`}
            type="email"
            {...register(`${prefix}.email`)}
            error={!!e?.email}
            aria-invalid={!!e?.email}
            aria-describedby={e?.email ? `${prefix}-email-error` : undefined}
          />
          {e?.email && <p id={`${prefix}-email-error`} role="alert" className="text-xs text-destructive">{e.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${prefix}.address`}>Address</Label>
          <Input id={`${prefix}.address`} {...register(`${prefix}.address`)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}.city`}>City</Label>
            <Input id={`${prefix}.city`} {...register(`${prefix}.city`)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}.state`}>State</Label>
            <Input id={`${prefix}.state`} {...register(`${prefix}.state`)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}.zip`}>ZIP</Label>
            <Input id={`${prefix}.zip`} {...register(`${prefix}.zip`)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}.country`}>Country</Label>
            <Input id={`${prefix}.country`} {...register(`${prefix}.country`)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${prefix}.taxId`}>Tax ID / VAT No. <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input id={`${prefix}.taxId`} {...register(`${prefix}.taxId`)} placeholder="e.g. GB123456789" />
        </div>
      </CardContent>
    </Card>
  );
}

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

const PAYMENT_TERMS = [
  { value: "due_on_receipt", label: "Due on Receipt" },
  { value: "net15", label: "Net 15" },
  { value: "net30", label: "Net 30" },
  { value: "net60", label: "Net 60" },
  { value: "custom", label: "Custom" },
] as const;

function calcDueDate(issueDate: string, terms: string): string {
  if (!issueDate) return "";
  const date = new Date(issueDate);
  if (terms === "due_on_receipt") return issueDate;
  if (terms === "net15") { date.setDate(date.getDate() + 15); }
  else if (terms === "net30") { date.setDate(date.getDate() + 30); }
  else if (terms === "net60") { date.setDate(date.getDate() + 60); }
  return date.toISOString().slice(0, 10);
}

export function InvoiceForm({ clients }: { clients?: Client[] }) {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<InvoiceFormValues>();
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestedLineItem[] | null>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    setSuggestions(null);
    setLoadingSuggestions(false);
  }, [selectedClientId]);

  async function handleSuggestLineItems() {
    if (!selectedClientId) return;
    setLoadingSuggestions(true);
    setSuggestions(null);
    try {
      const items = await suggestLineItems(selectedClientId);
      setSuggestions(items);
    } catch {
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  }

  function addSuggestion(item: SuggestedLineItem) {
    const current = lineItems || [];
    setValue(
      "lineItems",
      [
        ...current,
        {
          id: crypto.randomUUID(),
          description: item.description,
          quantity: item.quantity,
          rate: item.unitPrice,
          amount: item.quantity * item.unitPrice,
        },
      ],
      { shouldDirty: true }
    );
  }

  const lineItems = watch("lineItems");
  const taxLines = watch("taxLines");
  const currency = watch("currency");
  const discount = watch("discount");
  const status = watch("status");
  const recurring = watch("recurring");
  const recurringFrequency = watch("recurringFrequency");
  const paymentTerms = watch("paymentTerms");
  const issueDate = watch("issueDate");

  useEffect(() => {
    const subtotal = calcSubtotal(lineItems || []);
    const safeDiscount = Number.isNaN(discount) ? 0 : (discount ?? 0);
    const computedTaxLines = calcTaxLines(subtotal, taxLines || []);
    const taxAmount = calcTaxAmountFromLines(computedTaxLines);
    setValue("subtotal", subtotal);
    computedTaxLines.forEach((line, i) => {
      setValue(`taxLines.${i}.amount`, line.amount);
    });
    setValue("taxAmount", taxAmount);
    setValue("total", calcTotal(subtotal, taxAmount, safeDiscount));
  }, [lineItems, taxLines, discount, setValue]);

  useEffect(() => {
    if (paymentTerms && paymentTerms !== "custom" && issueDate) {
      setValue("dueDate", calcDueDate(issueDate, paymentTerms), { shouldDirty: true });
    }
  }, [issueDate, paymentTerms, setValue]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              {...register("invoiceNumber")}
              error={!!errors.invoiceNumber}
              aria-invalid={!!errors.invoiceNumber}
              aria-describedby={errors.invoiceNumber ? "invoice-number-error" : undefined}
            />
            {errors.invoiceNumber && (
              <p id="invoice-number-error" role="alert" className="text-xs text-destructive">{errors.invoiceNumber.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              {...register("issueDate")}
              error={!!errors.issueDate}
              aria-invalid={!!errors.issueDate}
              aria-describedby={errors.issueDate ? "issue-date-error" : undefined}
            />
            {errors.issueDate && (
              <p id="issue-date-error" role="alert" className="text-xs text-destructive">{errors.issueDate.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <SelectRoot
              value={paymentTerms ?? "net30"}
              onValueChange={(val) => setValue("paymentTerms", val as InvoiceFormValues["paymentTerms"], { shouldDirty: true })}
            >
              <SelectTrigger id="paymentTerms">
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_TERMS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              disabled={!!paymentTerms && paymentTerms !== "custom"}
              error={!!errors.dueDate}
              aria-invalid={!!errors.dueDate}
              aria-describedby={errors.dueDate ? "due-date-error" : undefined}
            />
            {errors.dueDate && (
              <p id="due-date-error" role="alert" className="text-xs text-destructive">{errors.dueDate.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currency">Currency</Label>
            <SelectRoot value={currency} onValueChange={(val) => setValue("currency", val, { shouldDirty: true })}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <SelectRoot value={status} onValueChange={(val) => setValue("status", val as InvoiceFormValues["status"], { shouldDirty: true })}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <ContactSection prefix="from" title="From" />
        <ContactSection prefix="to" title="Bill To" clients={clients} onClientSelect={(id) => { setSelectedClientId(id); setValue("clientId", id ?? undefined, { shouldDirty: true }); }} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Line Items</CardTitle>
          {selectedClientId && suggestions === null && !loadingSuggestions && (
            <Button type="button" variant="outline" size="sm" onClick={handleSuggestLineItems} className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Suggest line items
            </Button>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          {loadingSuggestions && (
            <div className="grid gap-2 rounded-lg border border-border bg-muted/30 p-3">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-7 w-1/2" />
            </div>
          )}
          {!loadingSuggestions && suggestions !== null && (
            <div className="rounded-lg border border-border bg-muted/30 p-3 grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI suggestions from past invoices</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => setSuggestions(null)}
                >
                  Dismiss
                </Button>
              </div>
              {suggestions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((item, i) => (
                    <div key={i} className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-sm">
                      <span className="max-w-[200px] truncate">{item.description}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 shrink-0"
                        onClick={() => addSuggestion(item)}
                        title={`Add: ${item.description}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No suggestions available for this client.</p>
              )}
            </div>
          )}
          <LineItems />
          {errors.lineItems?.root?.message && (
            <p role="alert" className="text-xs text-destructive">
              {errors.lineItems.root.message}
            </p>
          )}
          {errors.lineItems?.message && (
            <p role="alert" className="text-xs text-destructive">
              {errors.lineItems.message}
            </p>
          )}
        </CardContent>
      </Card>

      <InvoiceTotals
        control={control}
        register={register}
      />

      <Card>
        <CardContent className="pt-6 grid gap-2">
          <Label htmlFor="notes">Notes / Terms</Label>
          <Textarea id="notes" rows={3} {...register("notes")} placeholder="Payment terms, thank you note, etc." />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 grid gap-4">
          <div className="flex items-center gap-3">
            <Switch
              id="recurring"
              checked={!!recurring}
              onCheckedChange={(checked) => {
                setValue("recurring", checked, { shouldDirty: true });
                if (!checked) setValue("recurringFrequency", undefined, { shouldDirty: true });
              }}
            />
            <Label htmlFor="recurring">Make this recurring</Label>
          </div>
          {recurring && (
            <div className="grid gap-2">
              <Label htmlFor="recurringFrequency">Frequency</Label>
              <SelectRoot
                value={recurringFrequency ?? ""}
                onValueChange={(val) =>
                  setValue("recurringFrequency", val as InvoiceFormValues["recurringFrequency"], { shouldDirty: true })
                }
              >
                <SelectTrigger id="recurringFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {RECURRING_FREQUENCIES.map((f) => (
                    <SelectItem key={f} value={f}>{FREQUENCY_LABELS[f]}</SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
