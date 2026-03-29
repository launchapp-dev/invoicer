"use client";

import { useState, useTransition, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createExpense, updateExpense, deleteExpense } from "@/lib/expense-storage";
import { extractReceiptData } from "@/lib/ai";
import type { Expense, ExpenseCategory } from "@/lib/expense-storage";
import type { Client } from "@/types/client";

const CATEGORIES: ExpenseCategory[] = [
  "software", "hardware", "travel", "meals", "contractor", "marketing", "other",
];

const CATEGORY_COLORS: Record<ExpenseCategory, "default" | "secondary" | "outline" | "destructive"> = {
  software: "default",
  hardware: "secondary",
  travel: "outline",
  meals: "secondary",
  contractor: "default",
  marketing: "outline",
  other: "secondary",
};

const expenseSchema = z.object({
  vendor: z.string().min(1, "Vendor is required"),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().min(1),
  date: z.string().min(1, "Date is required"),
  category: z.enum(["software", "hardware", "travel", "meals", "contractor", "marketing", "other"]),
  description: z.string(),
  clientId: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amountCents / 100);
}

interface Props {
  initialExpenses: Expense[];
  clients: Client[];
}

const SORT_OPTIONS = [
  { value: "date-desc", label: "Date (newest first)" },
  { value: "date-asc", label: "Date (oldest first)" },
  { value: "amount-desc", label: "Amount (high to low)" },
  { value: "amount-asc", label: "Amount (low to high)" },
] as const;

type SortOption = typeof SORT_OPTIONS[number]["value"];

interface FilterState {
  search: string;
  category: string;
  clientId: string;
  dateFrom: string;
  dateTo: string;
  sort: SortOption;
}

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "all",
  clientId: "all",
  dateFrom: "",
  dateTo: "",
  sort: "date-desc",
};

export function ExpensesManager({ initialExpenses, clients }: Props) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      vendor: "",
      amount: "",
      currency: "USD",
      date: new Date().toISOString().slice(0, 10),
      category: "other",
      description: "",
      clientId: undefined,
    },
  });

  function openAdd() {
    setEditingExpense(null);
    form.reset({
      vendor: "",
      amount: "",
      currency: "USD",
      date: new Date().toISOString().slice(0, 10),
      category: "other",
      description: "",
      clientId: undefined,
    });
    setSheetOpen(true);
  }

  function openEdit(expense: Expense) {
    setEditingExpense(expense);
    form.reset({
      vendor: expense.vendor,
      amount: (expense.amount / 100).toFixed(2),
      currency: expense.currency,
      date: expense.date,
      category: expense.category,
      description: expense.description,
      clientId: expense.clientId ?? undefined,
    });
    setSheetOpen(true);
  }

  async function handleReceiptUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const data = await extractReceiptData(base64);
        if (data) {
          form.setValue("vendor", data.vendor);
          form.setValue("amount", data.amount.toFixed(2));
          if (data.date) form.setValue("date", data.date);
          if (data.category) form.setValue("category", data.category);
          if (data.description) form.setValue("description", data.description);
          toast.success("Receipt data extracted — please review and confirm.");
        } else {
          toast.error("Could not extract data from receipt.");
        }
        setIsExtracting(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to process receipt.");
      setIsExtracting(false);
    }
  }

  function onSubmit(values: ExpenseFormValues) {
    const amountCents = Math.round(parseFloat(values.amount) * 100);
    if (isNaN(amountCents) || amountCents <= 0) {
      form.setError("amount", { message: "Enter a valid amount" });
      return;
    }

    startTransition(async () => {
      try {
        if (editingExpense) {
          await updateExpense(editingExpense.id, {
            vendor: values.vendor,
            amount: amountCents,
            currency: values.currency,
            date: values.date,
            category: values.category,
            description: values.description,
            clientId: values.clientId ?? null,
          });
          setExpenses((prev) =>
            prev.map((e) =>
              e.id === editingExpense.id
                ? {
                    ...e,
                    vendor: values.vendor,
                    amount: amountCents,
                    currency: values.currency,
                    date: values.date,
                    category: values.category,
                    description: values.description,
                    clientId: values.clientId ?? null,
                  }
                : e
            )
          );
          toast.success("Expense updated.");
        } else {
          const newExpense = await createExpense({
            vendor: values.vendor,
            amount: amountCents,
            currency: values.currency,
            date: values.date,
            category: values.category,
            description: values.description,
            clientId: values.clientId ?? null,
            receiptPath: null,
          });
          setExpenses((prev) => [newExpense, ...prev]);
          toast.success("Expense added.");
        }
        setSheetOpen(false);
      } catch {
        toast.error("Failed to save expense.");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteExpense(id);
        setExpenses((prev) => prev.filter((e) => e.id !== id));
        toast.success("Expense deleted.");
      } catch {
        toast.error("Failed to delete expense.");
      }
    });
  }

  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c.name]));

  const filteredExpenses = useMemo(() => {
    let result = expenses;

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.vendor.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    if (filters.category !== "all") {
      result = result.filter((e) => e.category === filters.category);
    }

    if (filters.clientId !== "all") {
      result = result.filter((e) => e.clientId === filters.clientId);
    }

    if (filters.dateFrom) {
      result = result.filter((e) => e.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter((e) => e.date <= filters.dateTo);
    }

    result = [...result].sort((a, b) => {
      if (filters.sort === "date-desc") return b.date.localeCompare(a.date);
      if (filters.sort === "date-asc") return a.date.localeCompare(b.date);
      if (filters.sort === "amount-desc") return b.amount - a.amount;
      if (filters.sort === "amount-asc") return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [expenses, filters]);

  const hasActiveFilters =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.category !== DEFAULT_FILTERS.category ||
    filters.clientId !== DEFAULT_FILTERS.clientId ||
    filters.dateFrom !== DEFAULT_FILTERS.dateFrom ||
    filters.dateTo !== DEFAULT_FILTERS.dateTo ||
    filters.sort !== DEFAULT_FILTERS.sort;

  function setFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Expenses</h1>
        <Button onClick={openAdd}>Add Expense</Button>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search vendor or description…"
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
            />
          </div>
          <Select value={filters.category} onValueChange={(v) => setFilter("category", v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {clients.length > 0 && (
            <Select value={filters.clientId} onValueChange={(v) => setFilter("clientId", v)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All clients</SelectItem>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={filters.sort} onValueChange={(v) => setFilter("sort", v as SortOption)}>
            <SelectTrigger className="w-[190px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1.5">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">From</Label>
            <Input
              type="date"
              className="w-[150px] h-8 text-sm"
              value={filters.dateFrom}
              onChange={(e) => setFilter("dateFrom", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">To</Label>
            <Input
              type="date"
              className="w-[150px] h-8 text-sm"
              value={filters.dateTo}
              onChange={(e) => setFilter("dateTo", e.target.value)}
            />
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters(DEFAULT_FILTERS)}
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No expenses yet. Add one to get started.
        </p>
      ) : filteredExpenses.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No expenses match the current filters.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="text-sm">{expense.date}</TableCell>
                <TableCell className="text-sm font-medium">{expense.vendor}</TableCell>
                <TableCell>
                  <Badge variant={CATEGORY_COLORS[expense.category] ?? "secondary"}>
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {expense.clientId ? clientMap[expense.clientId] ?? "—" : "—"}
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {formatCurrency(expense.amount, expense.currency)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(expense)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-xs text-destructive hover:opacity-80 transition-opacity"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingExpense ? "Edit Expense" : "Add Expense"}</SheetTitle>
          </SheetHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="vendor">Vendor</Label>
              <Input id="vendor" {...form.register("vendor")} placeholder="e.g. AWS" />
              {form.formState.errors.vendor && (
                <p className="text-xs text-destructive">{form.formState.errors.vendor.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" {...form.register("amount")} placeholder="0.00" />
                {form.formState.errors.amount && (
                  <p className="text-xs text-destructive">{form.formState.errors.amount.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" {...form.register("currency")} placeholder="USD" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...form.register("date")} />
              {form.formState.errors.date && (
                <p className="text-xs text-destructive">{form.formState.errors.date.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(v) => form.setValue("category", v as ExpenseCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {clients.length > 0 && (
              <div className="space-y-1.5">
                <Label>Client (optional)</Label>
                <Select
                  value={form.watch("clientId") ?? "none"}
                  onValueChange={(v) => form.setValue("clientId", v === "none" ? undefined : v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Link to client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No client</SelectItem>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="description">Description (optional)</Label>
              <Input id="description" {...form.register("description")} placeholder="What was this for?" />
            </div>

            <div className="space-y-1.5">
              <Label>Upload Receipt</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleReceiptUpload}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isExtracting}
                onClick={() => fileInputRef.current?.click()}
              >
                {isExtracting ? "Extracting..." : "Upload Receipt (AI Extract)"}
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? "Saving..." : editingExpense ? "Save Changes" : "Add Expense"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSheetOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
