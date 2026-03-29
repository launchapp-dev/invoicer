"use client";

import { useState } from "react";
import { useWatch, type Control, type UseFormRegister, type FieldArrayWithId } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  calcSubtotal,
  calcTaxLines,
  calcTaxAmountFromLines,
  calcTotal,
  formatCurrency,
} from "@/lib/calculations";
import type { InvoiceFormValues } from "@/lib/invoice-schema";

interface TaxPreset {
  label: string;
  name: string;
  rate: number;
}

const TAX_PRESETS: { group: string; presets: TaxPreset[] }[] = [
  {
    group: "Australia",
    presets: [
      { label: "GST (10%)", name: "GST", rate: 10 },
    ],
  },
  {
    group: "Canada",
    presets: [
      { label: "GST (5%)", name: "GST", rate: 5 },
      { label: "HST — Ontario (13%)", name: "HST", rate: 13 },
      { label: "HST — Nova Scotia (15%)", name: "HST", rate: 15 },
      { label: "PST — BC (7%)", name: "PST", rate: 7 },
      { label: "PST — Saskatchewan (6%)", name: "PST", rate: 6 },
      { label: "QST — Quebec (9.975%)", name: "QST", rate: 9.975 },
    ],
  },
  {
    group: "EU VAT",
    presets: [
      { label: "Standard (20%)", name: "EU VAT", rate: 20 },
      { label: "Reduced (10%)", name: "EU VAT", rate: 10 },
      { label: "Austria (20%)", name: "VAT", rate: 20 },
      { label: "Belgium (21%)", name: "VAT", rate: 21 },
      { label: "Bulgaria (20%)", name: "VAT", rate: 20 },
      { label: "Croatia (25%)", name: "VAT", rate: 25 },
      { label: "Cyprus (19%)", name: "VAT", rate: 19 },
      { label: "Czech Republic (21%)", name: "VAT", rate: 21 },
      { label: "Denmark (25%)", name: "VAT", rate: 25 },
      { label: "Estonia (22%)", name: "VAT", rate: 22 },
      { label: "Finland (25.5%)", name: "VAT", rate: 25.5 },
      { label: "France (20%)", name: "VAT", rate: 20 },
      { label: "Germany (19%)", name: "VAT", rate: 19 },
      { label: "Greece (24%)", name: "VAT", rate: 24 },
      { label: "Hungary (27%)", name: "VAT", rate: 27 },
      { label: "Ireland (23%)", name: "VAT", rate: 23 },
      { label: "Italy (22%)", name: "VAT", rate: 22 },
      { label: "Latvia (21%)", name: "VAT", rate: 21 },
      { label: "Lithuania (21%)", name: "VAT", rate: 21 },
      { label: "Luxembourg (17%)", name: "VAT", rate: 17 },
      { label: "Malta (18%)", name: "VAT", rate: 18 },
      { label: "Netherlands (21%)", name: "VAT", rate: 21 },
      { label: "Poland (23%)", name: "VAT", rate: 23 },
      { label: "Portugal (23%)", name: "VAT", rate: 23 },
      { label: "Romania (19%)", name: "VAT", rate: 19 },
      { label: "Slovakia (20%)", name: "VAT", rate: 20 },
      { label: "Slovenia (22%)", name: "VAT", rate: 22 },
      { label: "Spain (21%)", name: "VAT", rate: 21 },
      { label: "Sweden (25%)", name: "VAT", rate: 25 },
    ],
  },
  {
    group: "United Kingdom",
    presets: [
      { label: "VAT (20%)", name: "VAT", rate: 20 },
      { label: "VAT reduced (5%)", name: "VAT", rate: 5 },
    ],
  },
  {
    group: "US Sales Tax",
    presets: [
      { label: "Alabama (4%)", name: "Sales Tax", rate: 4 },
      { label: "Arizona (5.6%)", name: "Sales Tax", rate: 5.6 },
      { label: "Arkansas (6.5%)", name: "Sales Tax", rate: 6.5 },
      { label: "California (7.25%)", name: "Sales Tax", rate: 7.25 },
      { label: "Colorado (2.9%)", name: "Sales Tax", rate: 2.9 },
      { label: "Connecticut (6.35%)", name: "Sales Tax", rate: 6.35 },
      { label: "Florida (6%)", name: "Sales Tax", rate: 6 },
      { label: "Georgia (4%)", name: "Sales Tax", rate: 4 },
      { label: "Hawaii (4%)", name: "Sales Tax", rate: 4 },
      { label: "Idaho (6%)", name: "Sales Tax", rate: 6 },
      { label: "Illinois (6.25%)", name: "Sales Tax", rate: 6.25 },
      { label: "Indiana (7%)", name: "Sales Tax", rate: 7 },
      { label: "Iowa (6%)", name: "Sales Tax", rate: 6 },
      { label: "Kansas (6.5%)", name: "Sales Tax", rate: 6.5 },
      { label: "Kentucky (6%)", name: "Sales Tax", rate: 6 },
      { label: "Louisiana (4.45%)", name: "Sales Tax", rate: 4.45 },
      { label: "Maine (5.5%)", name: "Sales Tax", rate: 5.5 },
      { label: "Maryland (6%)", name: "Sales Tax", rate: 6 },
      { label: "Massachusetts (6.25%)", name: "Sales Tax", rate: 6.25 },
      { label: "Michigan (6%)", name: "Sales Tax", rate: 6 },
      { label: "Minnesota (6.875%)", name: "Sales Tax", rate: 6.875 },
      { label: "Mississippi (7%)", name: "Sales Tax", rate: 7 },
      { label: "Missouri (4.225%)", name: "Sales Tax", rate: 4.225 },
      { label: "Nebraska (5.5%)", name: "Sales Tax", rate: 5.5 },
      { label: "Nevada (6.85%)", name: "Sales Tax", rate: 6.85 },
      { label: "New Jersey (6.625%)", name: "Sales Tax", rate: 6.625 },
      { label: "New Mexico (4.875%)", name: "Sales Tax", rate: 4.875 },
      { label: "New York (4%)", name: "Sales Tax", rate: 4 },
      { label: "North Carolina (4.75%)", name: "Sales Tax", rate: 4.75 },
      { label: "North Dakota (5%)", name: "Sales Tax", rate: 5 },
      { label: "Ohio (5.75%)", name: "Sales Tax", rate: 5.75 },
      { label: "Oklahoma (4.5%)", name: "Sales Tax", rate: 4.5 },
      { label: "Pennsylvania (6%)", name: "Sales Tax", rate: 6 },
      { label: "Rhode Island (7%)", name: "Sales Tax", rate: 7 },
      { label: "South Carolina (6%)", name: "Sales Tax", rate: 6 },
      { label: "South Dakota (4.5%)", name: "Sales Tax", rate: 4.5 },
      { label: "Tennessee (7%)", name: "Sales Tax", rate: 7 },
      { label: "Texas (6.25%)", name: "Sales Tax", rate: 6.25 },
      { label: "Utah (4.85%)", name: "Sales Tax", rate: 4.85 },
      { label: "Vermont (6%)", name: "Sales Tax", rate: 6 },
      { label: "Virginia (5.3%)", name: "Sales Tax", rate: 5.3 },
      { label: "Washington (6.5%)", name: "Sales Tax", rate: 6.5 },
      { label: "West Virginia (6%)", name: "Sales Tax", rate: 6 },
      { label: "Wisconsin (5%)", name: "Sales Tax", rate: 5 },
      { label: "Wyoming (4%)", name: "Sales Tax", rate: 4 },
    ],
  },
  {
    group: "Other",
    presets: [
      { label: "Singapore GST (9%)", name: "GST", rate: 9 },
    ],
  },
];

function TaxPresetPicker({ onSelect }: { onSelect: (preset: TaxPreset) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = TAX_PRESETS.map((group) => ({
    ...group,
    presets: group.presets.filter(
      (p) =>
        !search ||
        p.label.toLowerCase().includes(search.toLowerCase()) ||
        group.group.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((g) => g.presets.length > 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Tax Presets
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-72" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search jurisdiction…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-64">
            <CommandEmpty>No presets found.</CommandEmpty>
            {filtered.map((group) => (
              <CommandGroup key={group.group} heading={group.group}>
                {group.presets.map((preset) => (
                  <CommandItem
                    key={`${group.group}-${preset.label}`}
                    onSelect={() => {
                      onSelect(preset);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {preset.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface InvoiceTotalsProps {
  control: Control<InvoiceFormValues>;
  register: UseFormRegister<InvoiceFormValues>;
  taxLineFields: FieldArrayWithId<InvoiceFormValues, "taxLines">[];
  appendTaxLine: (value: InvoiceFormValues["taxLines"][number]) => void;
  removeTaxLine: (index: number) => void;
  updateTaxLine: (index: number, value: InvoiceFormValues["taxLines"][number]) => void;
}

export function InvoiceTotals({ control, register, taxLineFields, appendTaxLine, removeTaxLine, updateTaxLine }: InvoiceTotalsProps) {
  const lineItems = useWatch({ control, name: "lineItems", defaultValue: [] });
  const taxLinesWatch = useWatch({ control, name: "taxLines", defaultValue: [] });
  const discount = useWatch({ control, name: "discount", defaultValue: 0 });
  const currency = useWatch({ control, name: "currency", defaultValue: "USD" });

  const fields = taxLineFields;
  const append = appendTaxLine;
  const remove = removeTaxLine;
  const update = updateTaxLine;

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
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ id: crypto.randomUUID(), name: "", rate: 0, amount: 0 })}
            >
              Add Tax
            </Button>
            <TaxPresetPicker
              onSelect={(preset) => {
                const firstEmpty = fields.findIndex(
                  (_, i) => taxLinesWatch?.[i]?.name === "" && (taxLinesWatch?.[i]?.rate === 0 || taxLinesWatch?.[i]?.rate === undefined)
                );
                if (firstEmpty !== -1) {
                  update(firstEmpty, { id: fields[firstEmpty].id, name: preset.name, rate: preset.rate, amount: 0 });
                } else {
                  append({ id: crypto.randomUUID(), name: preset.name, rate: preset.rate, amount: 0 });
                }
              }}
            />
          </div>
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
