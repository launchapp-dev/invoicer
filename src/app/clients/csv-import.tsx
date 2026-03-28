"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { batchUpsertClients } from "@/lib/storage";

const CSV_COLUMNS = ["name", "email", "address", "city", "state", "zip", "country", "phone", "company", "notes"] as const;

type CsvRow = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  company: string;
  notes: string;
};

type ParsedRow = CsvRow & {
  _status: "valid" | "invalid" | "duplicate";
  _reason?: string;
};

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
  return lines.slice(1)
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
    });
}

function classifyRows(raw: Record<string, string>[], existingEmails: Set<string>): ParsedRow[] {
  return raw.map((r) => {
    const row: CsvRow = {
      name: r.name ?? "",
      email: r.email ?? "",
      address: r.address ?? "",
      city: r.city ?? "",
      state: r.state ?? "",
      zip: r.zip ?? "",
      country: r.country ?? "",
      phone: r.phone ?? "",
      company: r.company ?? "",
      notes: r.notes ?? "",
    };
    if (!row.name.trim()) {
      return { ...row, _status: "invalid", _reason: "Missing name" };
    }
    if (row.email && existingEmails.has(row.email)) {
      return { ...row, _status: "duplicate", _reason: "Email already exists" };
    }
    return { ...row, _status: "valid" };
  });
}

interface CsvImportProps {
  existingEmails: string[];
}

export function CsvImportButton({ existingEmails }: CsvImportProps) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [result, setResult] = useState<{ imported: number; skipped: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const emailSet = new Set(existingEmails);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setParseError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const raw = parseCsv(text);
        if (raw.length === 0) {
          setParseError("No data rows found in CSV.");
          setRows([]);
          return;
        }
        setRows(classifyRows(raw, emailSet));
      } catch {
        setParseError("Failed to parse CSV file.");
        setRows([]);
      }
    };
    reader.readAsText(file);
  }

  async function handleImport() {
    const validRows = rows.filter((r) => r._status === "valid");
    if (validRows.length === 0) return;
    setLoading(true);
    try {
      const res = await batchUpsertClients(validRows.map(({ _status, _reason, ...r }) => ({ taxId: "", currencyPreference: "", ...r })));
      setResult(res);
      setRows([]);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setParseError("Import failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
    setRows([]);
    setParseError(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleClose() {
    setOpen(false);
    if (result) {
      window.location.reload();
    }
  }

  const validCount = rows.filter((r) => r._status === "valid").length;
  const invalidCount = rows.filter((r) => r._status === "invalid").length;
  const duplicateCount = rows.filter((r) => r._status === "duplicate").length;

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        Import CSV
      </Button>
      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Import Clients from CSV</DialogTitle>
          </DialogHeader>

          {result ? (
            <div className="py-6 text-center space-y-2">
              <p className="text-lg font-medium">{result.imported} client{result.imported !== 1 ? "s" : ""} imported</p>
              {result.skipped > 0 && (
                <p className="text-sm text-muted-foreground">{result.skipped} skipped (duplicate email)</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 min-h-0">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Required column: <code className="font-mono">name</code>. Optional: email, address, city, state, zip, country, phone, company, notes.
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="text-sm"
                />
              </div>

              {parseError && (
                <p className="text-sm text-destructive">{parseError}</p>
              )}

              {rows.length > 0 && (
                <div className="flex flex-col gap-2 min-h-0">
                  <div className="flex gap-3 text-sm">
                    <span className="text-muted-foreground">{rows.length} rows detected</span>
                    {validCount > 0 && <Badge variant="default">{validCount} valid</Badge>}
                    {duplicateCount > 0 && <Badge variant="secondary">{duplicateCount} duplicate</Badge>}
                    {invalidCount > 0 && <Badge variant="destructive">{invalidCount} invalid</Badge>}
                  </div>
                  <div className="overflow-auto flex-1 rounded-md border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Status</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Country</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((row, i) => (
                          <TableRow key={i} className={row._status === "invalid" ? "opacity-50" : ""}>
                            <TableCell>
                              {row._status === "valid" && <Badge variant="default">Valid</Badge>}
                              {row._status === "invalid" && <Badge variant="destructive" title={row._reason}>Invalid</Badge>}
                              {row._status === "duplicate" && <Badge variant="secondary" title={row._reason}>Duplicate</Badge>}
                            </TableCell>
                            <TableCell className="font-medium">{row.name || "—"}</TableCell>
                            <TableCell className="text-muted-foreground">{row.email || "—"}</TableCell>
                            <TableCell className="text-muted-foreground">{row.company || "—"}</TableCell>
                            <TableCell className="text-muted-foreground">{row.city || "—"}</TableCell>
                            <TableCell className="text-muted-foreground">{row.country || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              {result ? "Close" : "Cancel"}
            </Button>
            {!result && (
              <Button
                onClick={handleImport}
                disabled={validCount === 0 || loading}
              >
                {loading ? "Importing…" : `Import ${validCount > 0 ? validCount : ""} Client${validCount !== 1 ? "s" : ""}`}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
