"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
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

const STATUSES = ["draft", "sent", "paid", "overdue", "cancelled"] as const;

export function DashboardFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("search") ?? "");
  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStatus = searchParams.get("status") ?? "";

  function buildUrl(newSearch: string, newStatus: string, newDateFrom: string, newDateTo: string) {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newStatus) params.set("status", newStatus);
    if (newDateFrom) params.set("dateFrom", newDateFrom);
    if (newDateTo) params.set("dateTo", newDateTo);
    const str = params.toString();
    return str ? `?${str}` : "";
  }

  function handleSearchChange(value: string) {
    setInputValue(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      router.push(buildUrl(value, currentStatus, dateFrom, dateTo));
    }, 300);
  }

  function handleStatusChange(value: string) {
    const newStatus = value === "all" ? "" : value;
    router.push(buildUrl(inputValue, newStatus, dateFrom, dateTo));
  }

  function handleDateFromChange(value: string) {
    setDateFrom(value);
    router.push(buildUrl(inputValue, currentStatus, value, dateTo));
  }

  function handleDateToChange(value: string) {
    setDateTo(value);
    router.push(buildUrl(inputValue, currentStatus, dateFrom, value));
  }

  function handleClear() {
    setInputValue("");
    setDateFrom("");
    setDateTo("");
    router.push("/dashboard");
  }

  const hasFilters = inputValue || currentStatus || dateFrom || dateTo;

  return (
    <div className="flex flex-wrap items-end gap-2 mb-4">
      <Input
        aria-label="Search invoices"
        placeholder="Search by invoice # or recipient..."
        value={inputValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="max-w-xs"
      />
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
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
      )}
    </div>
  );
}
