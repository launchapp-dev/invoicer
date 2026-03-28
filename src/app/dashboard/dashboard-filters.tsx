"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStatus = searchParams.get("status") ?? "";

  function buildUrl(newSearch: string, newStatus: string) {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newStatus) params.set("status", newStatus);
    const str = params.toString();
    return str ? `?${str}` : "";
  }

  function handleSearchChange(value: string) {
    setInputValue(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      router.push(buildUrl(value, currentStatus));
    }, 300);
  }

  function handleStatusChange(value: string) {
    const newStatus = value === "all" ? "" : value;
    router.push(buildUrl(inputValue, newStatus));
  }

  function handleClear() {
    setInputValue("");
    router.push("/dashboard");
  }

  const hasFilters = inputValue || currentStatus;

  return (
    <div className="flex items-center gap-2 mb-4">
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
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
      )}
    </div>
  );
}
