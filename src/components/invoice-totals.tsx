"use client";

import { useWatch, type Control, type UseFormRegister } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  calculateSubtotal,
  calculateTaxAmount,
  calculateTotal,
  formatCurrency,
} from "@/lib/calculations";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

interface InvoiceTotalsProps {
  control: Control<InvoiceFormValues>;
  register: UseFormRegister<InvoiceFormValues>;
}

export function InvoiceTotals({ control, register }: InvoiceTotalsProps) {
  const lineItems = useWatch({ control, name: "lineItems", defaultValue: [] });
  const taxRate = useWatch({ control, name: "taxRate", defaultValue: 0 });
  const discount = useWatch({ control, name: "discount", defaultValue: 0 });
  const currency = useWatch({ control, name: "currency", defaultValue: "USD" });

  const subtotal = calculateSubtotal(lineItems ?? []);
  const taxAmount = calculateTaxAmount(subtotal, taxRate ?? 0);
  const total = calculateTotal(subtotal, taxAmount, discount ?? 0);

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="taxRate" className="w-32 shrink-0">
              Tax Rate (%)
            </Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              {...register("taxRate", { valueAsNumber: true })}
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="discount" className="w-32 shrink-0">
              Discount ($)
            </Label>
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              {...register("discount", { valueAsNumber: true })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Tax ({(taxRate ?? 0).toFixed(2)}%)
            </span>
            <span>{formatCurrency(taxAmount, currency)}</span>
          </div>
          {(discount ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>-{formatCurrency(discount ?? 0, currency)}</span>
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
