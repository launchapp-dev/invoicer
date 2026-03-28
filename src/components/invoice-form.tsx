"use client";

import { useEffect } from "react";
import { useFormContext, useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { InvoiceTotals } from "@/components/invoice-totals";
import { calcLineAmount, calcSubtotal, calcTaxAmount, calcTotal } from "@/lib/calculations";
import type { InvoiceFormValues } from "@/lib/invoice-schema";
import type { InvoiceFormValues as TotalsFormValues } from "@/types/invoice";

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
          <Input id={`${prefix}.name`} {...register(`${prefix}.name`)} error={!!e?.name} />
          {e?.name && <p className="text-xs text-destructive">{e.name.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${prefix}.email`}>Email</Label>
          <Input id={`${prefix}.email`} type="email" {...register(`${prefix}.email`)} />
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
  const { fields, append, remove } = useFieldArray<InvoiceFormValues, "lineItems">({
    control,
    name: "lineItems",
  });

  const lineItems = watch("lineItems");
  const taxRate = watch("taxRate");
  const currency = watch("currency");
  const discount = watch("discount");

  useEffect(() => {
    const subtotal = calcSubtotal(lineItems || []);
    const taxAmount = calcTaxAmount(subtotal, taxRate || 0);
    setValue("subtotal", subtotal);
    setValue("taxAmount", taxAmount);
    setValue("total", calcTotal(subtotal, taxAmount, discount || 0));
  }, [lineItems, taxRate, discount, setValue]);

  const handleLineChange = (index: number, field: "quantity" | "rate", value: string) => {
    const num = parseFloat(value) || 0;
    setValue(`lineItems.${index}.${field}`, num);
    const q = field === "quantity" ? num : (parseFloat(String(lineItems[index]?.quantity)) || 0);
    const r = field === "rate" ? num : (parseFloat(String(lineItems[index]?.rate)) || 0);
    setValue(`lineItems.${index}.amount`, calcLineAmount(q, r));
  };

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
            />
            {errors.invoiceNumber && (
              <p className="text-xs text-destructive">{errors.invoiceNumber.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input id="issueDate" type="date" {...register("issueDate")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" {...register("dueDate")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currency">Currency</Label>
            <SelectRoot value={currency} onValueChange={(val) => setValue("currency", val)}>
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
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_100px_100px_100px_auto] gap-2 items-end">
              <div className="grid gap-1">
                {index === 0 && <Label>Description</Label>}
                <Input {...register(`lineItems.${index}.description`)} placeholder="Item description" />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Qty</Label>}
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={field.quantity}
                  onChange={(e) => handleLineChange(index, "quantity", e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Rate</Label>}
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={field.rate}
                  onChange={(e) => handleLineChange(index, "rate", e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Amount</Label>}
                <Input
                  readOnly
                  tabIndex={-1}
                  value={(lineItems[index]?.amount ?? 0).toFixed(2)}
                  className="bg-muted"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={index === 0 ? "mt-6" : ""}
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                aria-label="Remove line item"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 })}
          >
            + Add Line Item
          </Button>
        </CardContent>
      </Card>

      <InvoiceTotals
        control={control as unknown as Control<TotalsFormValues>}
        register={register as unknown as UseFormRegister<TotalsFormValues>}
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
