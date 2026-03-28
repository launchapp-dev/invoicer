"use client";

import { useFieldArray, useWatch, Control, UseFormRegister } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceFormData } from "@/lib/invoice-schema";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

function LineItemSubtotal({
  control,
  index,
}: {
  control: Control<InvoiceFormData>;
  index: number;
}) {
  const quantity = useWatch({ control, name: `line_items.${index}.quantity` });
  const unitPrice = useWatch({ control, name: `line_items.${index}.unit_price` });
  const subtotal = (Number(quantity) || 0) * (Number(unitPrice) || 0);
  return <span className="text-sm">{formatCurrency(subtotal)}</span>;
}

interface LineItemsProps {
  control: Control<InvoiceFormData>;
  register: UseFormRegister<InvoiceFormData>;
}

export function LineItems({ control, register }: LineItemsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "line_items",
  });

  return (
    <div className="space-y-3">
      <Table aria-label="Invoice line items">
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="w-28">Quantity</TableHead>
            <TableHead className="w-36">Unit Price</TableHead>
            <TableHead className="w-32">Subtotal</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell className="py-2">
                <Input
                  {...register(`line_items.${index}.description`)}
                  placeholder="Description"
                  aria-label={`Line item ${index + 1} description`}
                />
              </TableCell>
              <TableCell className="py-2">
                <Input
                  {...register(`line_items.${index}.quantity`, { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="1"
                  aria-label={`Line item ${index + 1} quantity`}
                />
              </TableCell>
              <TableCell className="py-2">
                <Input
                  {...register(`line_items.${index}.unit_price`, { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  aria-label={`Line item ${index + 1} unit price`}
                />
              </TableCell>
              <TableCell className="py-2">
                <LineItemSubtotal control={control} index={index} />
              </TableCell>
              <TableCell className="py-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  aria-label={`Remove line item ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ description: "", quantity: 1, unit_price: 0 })}
      >
        Add Line Item
      </Button>
    </div>
  );
}
