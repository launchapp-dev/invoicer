"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calcLineAmount, calcSubtotal, calcTaxAmountFromLines, calcTaxLines, calcTotal } from "@/lib/calculations";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

export function LineItems() {
  const { watch, setValue, control } = useFormContext<InvoiceFormValues>();
  const { fields, append, remove } = useFieldArray<InvoiceFormValues, "lineItems">({
    name: "lineItems",
  });

  const lineItems = watch("lineItems");
  const taxLines = watch("taxLines");
  const discount = watch("discount");

  const handleLineChange = (index: number, field: "quantity" | "rate", value: string) => {
    const num = parseFloat(value) || 0;
    setValue(`lineItems.${index}.${field}`, num);
    const q = field === "quantity" ? num : (parseFloat(String(lineItems[index]?.quantity)) || 0);
    const r = field === "rate" ? num : (parseFloat(String(lineItems[index]?.rate)) || 0);
    const amount = calcLineAmount(q, r);
    setValue(`lineItems.${index}.amount`, amount);

    const updatedItems = lineItems.map((item, i) => {
      if (i === index) return { ...item, [field]: num, amount };
      return item;
    });
    const subtotal = calcSubtotal(updatedItems);
    const computedTaxLines = calcTaxLines(subtotal, taxLines || []);
    const taxAmount = calcTaxAmountFromLines(computedTaxLines);
    setValue("subtotal", subtotal);
    setValue("taxAmount", taxAmount);
    setValue("total", calcTotal(subtotal, taxAmount, discount || 0));
  };

  return (
    <div className="grid gap-4">
      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_100px_100px_100px_44px] gap-2 items-end mb-2">
              <div className="grid gap-1">
                {index === 0 && <Label>Description</Label>}
                <Controller
                  control={control}
                  name={`lineItems.${index}.description`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Item description"
                      aria-label={`Line item ${index + 1} description`}
                    />
                  )}
                />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Qty</Label>}
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={lineItems[index]?.quantity ?? field.quantity}
                  onChange={(e) => handleLineChange(index, "quantity", e.target.value)}
                  aria-label={`Line item ${index + 1} quantity`}
                />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Rate</Label>}
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={lineItems[index]?.rate ?? field.rate}
                  onChange={(e) => handleLineChange(index, "rate", e.target.value)}
                  aria-label={`Line item ${index + 1} rate`}
                />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Amount</Label>}
                <Input
                  readOnly
                  tabIndex={-1}
                  value={(lineItems[index]?.amount ?? 0).toFixed(2)}
                  className="bg-muted"
                  aria-label={`Line item ${index + 1} amount (read-only)`}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={fields.length <= 1}
                className={index === 0 ? "mt-6" : ""}
                onClick={() => {
                  remove(index);
                  const updated = lineItems.filter((_, i) => i !== index);
                  const subtotal = calcSubtotal(updated);
                  const computedTaxLines = calcTaxLines(subtotal, taxLines || []);
                  const taxAmount = calcTaxAmountFromLines(computedTaxLines);
                  setValue("subtotal", subtotal);
                  setValue("taxAmount", taxAmount);
                  setValue("total", calcTotal(subtotal, taxAmount, discount || 0));
                }}
                aria-label={`Remove line item ${index + 1}`}

              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 })}
      >
        Add Line Item
      </Button>
    </div>
  );
}
