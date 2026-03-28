"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calcLineAmount, calcSubtotal, calcTaxAmount, calcTotal } from "@/lib/calculations";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

export function LineItems() {
  const { register, watch, setValue } = useFormContext<InvoiceFormValues>();
  const { fields, append, remove } = useFieldArray<InvoiceFormValues, "lineItems">({
    name: "lineItems",
  });

  const lineItems = watch("lineItems");
  const taxRate = watch("taxRate");
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
    const taxAmount = calcTaxAmount(subtotal, taxRate || 0);
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
                <Input {...register(`lineItems.${index}.description`)} placeholder="Item description" />
              </div>
              <div className="grid gap-1">
                {index === 0 && <Label>Qty</Label>}
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={lineItems[index]?.quantity ?? field.quantity}
                  onChange={(e) => handleLineChange(index, "quantity", e.target.value)}
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
                onClick={() => {
                  remove(index);
                  const updated = lineItems.filter((_, i) => i !== index);
                  const subtotal = calcSubtotal(updated);
                  const taxAmount = calcTaxAmount(subtotal, taxRate || 0);
                  setValue("subtotal", subtotal);
                  setValue("taxAmount", taxAmount);
                  setValue("total", calcTotal(subtotal, taxAmount, discount || 0));
                }}
                aria-label={`Remove line item ${index + 1}`}
                disabled={fields.length === 1}
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
