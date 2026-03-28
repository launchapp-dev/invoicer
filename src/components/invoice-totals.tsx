"use client";

import { useWatch, useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  calcSubtotal,
  calcTaxLines,
  calcTaxAmountFromLines,
  calcTotal,
  formatCurrency,
} from "@/lib/calculations";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

interface InvoiceTotalsProps {
  control: Control<InvoiceFormValues>;
  register: UseFormRegister<InvoiceFormValues>;
}

export function InvoiceTotals({ control, register }: InvoiceTotalsProps) {
  const lineItems = useWatch({ control, name: "lineItems", defaultValue: [] });
  const taxLinesWatch = useWatch({ control, name: "taxLines", defaultValue: [] });
  const discount = useWatch({ control, name: "discount", defaultValue: 0 });
  const currency = useWatch({ control, name: "currency", defaultValue: "USD" });

  const { fields, append, remove } = useFieldArray({ control, name: "taxLines" });

  const safeDiscount = Number.isNaN(discount) ? 0 : (discount ?? 0);
  const subtotal = calcSubtotal(lineItems ?? []);
  const computedTaxLines = calcTaxLines(subtotal, taxLinesWatch ?? []);
  const taxAmount = calcTaxAmountFromLines(computedTaxLines);
  const total = calcTotal(subtotal, taxAmount, safeDiscount);
  const isDiscountExcessive = safeDiscount > subtotal + taxAmount;

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-3">
              <div className="flex-1 grid gap-1">
                {index === 0 && <Label>Tax Name</Label>}
                <Input
                  placeholder="e.g. GST, VAT"
                  {...register(`taxLines.${index}.name`)}
                />
              </div>
              <div className="w-28 grid gap-1">
                {index === 0 && <Label>Rate (%)</Label>}
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  {...register(`taxLines.${index}.rate`, { valueAsNumber: true })}
                />
              </div>
              <div className="w-32 grid gap-1">
                {index === 0 && <Label>Amount</Label>}
                <Input
                  readOnly
                  tabIndex={-1}
                  className="bg-muted"
                  value={formatCurrency(computedTaxLines[index]?.amount ?? 0, currency)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={fields.length <= 1}
                onClick={() => remove(index)}
                aria-label={`Remove tax line ${index + 1}`}
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ id: crypto.randomUUID(), name: "", rate: 0, amount: 0 })}
          >
            Add Tax
          </Button>
          <div className="flex items-center gap-3">
            <Label htmlFor="discount" className="w-32 shrink-0">
              Discount
            </Label>
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              aria-invalid={isDiscountExcessive}
              aria-describedby={isDiscountExcessive ? "discount-error" : undefined}
              {...register("discount", { valueAsNumber: true })}
            />
          </div>
          {isDiscountExcessive && (
            <p id="discount-error" role="alert" className="text-xs text-destructive">
              Discount exceeds invoice total — total is clamped to {formatCurrency(0, currency)}
            </p>
          )}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
          {computedTaxLines.map((line, index) =>
            line.rate > 0 ? (
              <div key={fields[index]?.id ?? index} className="flex justify-between">
                <span className="text-muted-foreground">
                  {line.name || "Tax"} ({line.rate}%)
                </span>
                <span>{formatCurrency(line.amount, currency)}</span>
              </div>
            ) : null
          )}
          {safeDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>-{formatCurrency(safeDiscount, currency)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total, currency)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
