"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { InvoiceTotals } from "@/components/invoice-totals";
import { calcSubtotal, calcTaxAmount, calcTotal } from "@/lib/calculations";
import { LineItems } from "@/components/line-items";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

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

function ContactSection({ prefix, title }: { prefix: "from" | "to"; title: string }) {
  const { register, formState: { errors } } = useFormContext<InvoiceFormValues>();
  const e = errors[prefix];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
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
      </CardContent>
    </Card>
  );
}

export function InvoiceForm() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<InvoiceFormValues>();

  const lineItems = watch("lineItems");
  const taxRate = watch("taxRate");
  const currency = watch("currency");
  const discount = watch("discount");
  const status = watch("status");

  useEffect(() => {
    const subtotal = calcSubtotal(lineItems || []);
    const safeTaxRate = Number.isNaN(taxRate) ? 0 : (taxRate ?? 0);
    const safeDiscount = Number.isNaN(discount) ? 0 : (discount ?? 0);
    const taxAmount = calcTaxAmount(subtotal, safeTaxRate);
    setValue("subtotal", subtotal);
    setValue("taxAmount", taxAmount);
    setValue("total", calcTotal(subtotal, taxAmount, safeDiscount));
  }, [lineItems, taxRate, discount, setValue]);

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
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
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
        <ContactSection prefix="to" title="Bill To" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
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
    </div>
  );
}
