"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "@/types/invoice";

type InvoiceFormValues = Omit<Invoice, "lineItems"> & {
  lineItems: { id: string; description: string; quantity: number; unitPrice: number }[];
};

const defaultValues: InvoiceFormValues = {
  invoiceNumber: "INV-001",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  status: "draft",
  senderName: "",
  senderEmail: "",
  senderAddress: "",
  recipientName: "",
  recipientEmail: "",
  recipientAddress: "",
  lineItems: [{ id: "1", description: "", quantity: 1, unitPrice: 0 }],
  taxRate: 0,
  discountRate: 0,
  notes: "",
};

interface InvoiceFormProps {
  onValueChange: (values: Invoice) => void;
}

export function InvoiceForm({ onValueChange }: InvoiceFormProps) {
  const { register, control, watch } = useForm<InvoiceFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const values = watch();

  useEffect(() => {
    onValueChange(values as Invoice);
  }, [values, onValueChange]);

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-base font-semibold">Invoice Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input id="invoiceNumber" {...register("invoiceNumber")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              {...register("status")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input id="issueDate" type="date" {...register("issueDate")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" {...register("dueDate")} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-base font-semibold">From</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="senderName">Name</Label>
            <Input id="senderName" placeholder="Your name or company" {...register("senderName")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="senderEmail">Email</Label>
            <Input id="senderEmail" type="email" placeholder="your@email.com" {...register("senderEmail")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="senderAddress">Address</Label>
            <Input id="senderAddress" placeholder="123 Main St, City, Country" {...register("senderAddress")} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-base font-semibold">Bill To</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="recipientName">Name</Label>
            <Input id="recipientName" placeholder="Client name or company" {...register("recipientName")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="recipientEmail">Email</Label>
            <Input id="recipientEmail" type="email" placeholder="client@email.com" {...register("recipientEmail")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="recipientAddress">Address</Label>
            <Input id="recipientAddress" placeholder="456 Client Ave, City, Country" {...register("recipientAddress")} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-base font-semibold">Line Items</h2>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_80px_100px_32px] gap-2 items-end">
              <div className="space-y-1.5">
                {index === 0 && <Label>Description</Label>}
                <Input
                  placeholder="Service or product"
                  {...register(`lineItems.${index}.description`)}
                />
              </div>
              <div className="space-y-1.5">
                {index === 0 && <Label>Qty</Label>}
                <Input
                  type="number"
                  min="0"
                  step="1"
                  {...register(`lineItems.${index}.quantity`)}
                />
              </div>
              <div className="space-y-1.5">
                {index === 0 && <Label>Unit Price</Label>}
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  {...register(`lineItems.${index}.unitPrice`)}
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex h-10 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove line item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 })
          }
        >
          + Add Line Item
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-base font-semibold">Totals</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input id="taxRate" type="number" min="0" max="100" step="0.1" {...register("taxRate")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="discountRate">Discount (%)</Label>
            <Input id="discountRate" type="number" min="0" max="100" step="0.1" {...register("discountRate")} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          {...register("notes")}
          placeholder="Payment terms, thank you notes, etc."
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>
    </div>
  );
}
