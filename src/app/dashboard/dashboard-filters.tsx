"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parseSearchQuery } from "@/lib/ai";

const STATUSES = ["draft", "sent", "viewed", "paid", "overdue", "cancelled"] as const;

const SORT_OPTIONS = [
  { value: "date_desc", label: "Date: Newest first" },
  { value: "date_asc", label: "Date: Oldest first" },
  { value: "amount_desc", label: "Amount: High to low" },
  { value: "amount_asc", label: "Amount: Low to high" },
  { value: "status", label: "Status" },
  { value: "client", label: "Client name: A–Z" },
] as const;

function isNaturalLanguage(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length < 3) return false;
  return /\s/.test(trimmed) || /^[a-zA-Z]/.test(trimmed) && !/^INV-/i.test(trimmed);
}

interface DashboardFiltersProps {
  nlQuery?: string;
}

export function DashboardFilters({ nlQuery }: DashboardFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    nlQuery || searchParams.get("search") || ""
  );
  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") ?? "");
  const [aiLoading, setAiLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStatus = searchParams.get("status") ?? "";
  const currentSort = searchParams.get("sort") ?? "date_desc";
  const currentMinAmount = searchParams.get("minAmount") ?? "";
  const currentMaxAmount = searchParams.get("maxAmount") ?? "";

  function buildUrl(opts: {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    sort?: string;
    minAmount?: string;
    maxAmount?: string;
    nlQuery?: string;
  }) {
    const params = new URLSearchParams();
    if (opts.search) params.set("search", opts.search);
    if (opts.status) params.set("status", opts.status);
    if (opts.dateFrom) params.set("dateFrom", opts.dateFrom);
    if (opts.dateTo) params.set("dateTo", opts.dateTo);
    if (opts.sort && opts.sort !== "date_desc") params.set("sort", opts.sort);
    if (opts.minAmount) params.set("minAmount", opts.minAmount);
    if (opts.maxAmount) params.set("maxAmount", opts.maxAmount);
    if (opts.nlQuery) params.set("nlQuery", opts.nlQuery);
    const str = params.toString();
    return str ? `?${str}` : "";
  }

  async function handleSearchChange(value: string) {
    setInputValue(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (isNaturalLanguage(value) && value.trim().length >= 3) {
        setAiLoading(true);
        try {
          const filters = await parseSearchQuery(value.trim());
          if (filters) {
            router.push(buildUrl({
              search: filters.search,
              status: filters.status,
              dateFrom: filters.dateFrom,
              dateTo: filters.dateTo,
              minAmount: filters.minAmount !== undefined ? String(filters.minAmount) : undefined,
              maxAmount: filters.maxAmount !== undefined ? String(filters.maxAmount) : undefined,
              sort: currentSort,
              nlQuery: value.trim(),
            }));
            return;
          }
        } catch {
        } finally {
          setAiLoading(false);
        }
      }
      router.push(buildUrl({
        search: value,
        status: currentStatus,
        dateFrom,
        dateTo,
        sort: currentSort,
      }));
    }, 600);
  }

  function handleStatusChange(value: string) {
    const newStatus = value === "all" ? "" : value;
    router.push(buildUrl({
      search: nlQuery ? undefined : inputValue,
      nlQuery: nlQuery && !newStatus ? nlQuery : nlQuery,
      status: newStatus,
      dateFrom,
      dateTo,
      sort: currentSort,
      minAmount: currentMinAmount,
      maxAmount: currentMaxAmount,
    }));
  }

  function handleDateFromChange(value: string) {
    setDateFrom(value);
    router.push(buildUrl({
      search: nlQuery ? undefined : inputValue,
      nlQuery,
      status: currentStatus,
      dateFrom: value,
      dateTo,
      sort: currentSort,
      minAmount: currentMinAmount,
      maxAmount: currentMaxAmount,
    }));
  }

  function handleDateToChange(value: string) {
    setDateTo(value);
    router.push(buildUrl({
      search: nlQuery ? undefined : inputValue,
      nlQuery,
      status: currentStatus,
      dateFrom,
      dateTo: value,
      sort: currentSort,
      minAmount: currentMinAmount,
      maxAmount: currentMaxAmount,
    }));
  }

  function handleSortChange(value: string) {
    router.push(buildUrl({
      search: nlQuery ? undefined : inputValue,
      nlQuery,
      status: currentStatus,
      dateFrom,
      dateTo,
      sort: value,
      minAmount: currentMinAmount,
      maxAmount: currentMaxAmount,
    }));
  }

  function handleClear() {
    setInputValue("");
    setDateFrom("");
    setDateTo("");
    router.push("/dashboard");
  }

  const hasFilters =
    inputValue ||
    currentStatus ||
    dateFrom ||
    dateTo ||
    currentMinAmount ||
    currentMaxAmount ||
    (currentSort && currentSort !== "date_desc");

  const aiBadges: { label: string }[] = [];
  if (nlQuery) {
    if (currentStatus) aiBadges.push({ label: `Status: ${currentStatus}` });
    if (dateFrom || dateTo) {
      const range = [dateFrom, dateTo].filter(Boolean).join(" → ");
      aiBadges.push({ label: `Date: ${range}` });
    }
    if (currentMinAmount || currentMaxAmount) {
      const amtLabel = currentMinAmount && currentMaxAmount
        ? `Amount: $${currentMinAmount}–$${currentMaxAmount}`
        : currentMinAmount
        ? `Amount > $${currentMinAmount}`
        : `Amount < $${currentMaxAmount}`;
      aiBadges.push({ label: amtLabel });
    }
    if (searchParams.get("search")) {
      aiBadges.push({ label: `Client: ${searchParams.get("search")}` });
    }
  }

  return (
    <div className="mb-4 space-y-2">
      <div className="flex flex-wrap items-end gap-2">
        <div className="relative">
          <Input
            aria-label="Search invoices"
            placeholder="Search invoices or describe in plain English..."
            value={inputValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-xs pr-8"
          />
          {aiLoading && (
            <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <SelectRoot value={currentStatus || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <div className="flex items-end gap-1">
          <div className="flex flex-col gap-1">
            <Label htmlFor="dateFrom" className="text-xs text-muted-foreground">Issue Date From</Label>
            <Input
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="dateTo" className="text-xs text-muted-foreground">To</Label>
            <Input
              id="dateTo"
              type="date"
              value={dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
        <SelectRoot value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>

      {nlQuery && aiBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Sparkles className="h-3 w-3" />
            AI interpreted:
          </span>
          {aiBadges.map((b) => (
            <Badge key={b.label} variant="secondary" className="text-xs">
              {b.label}
            </Badge>
          ))}
          <button
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5"
            aria-label="Clear AI search"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
