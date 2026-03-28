"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { parseInvoiceIntent } from "@/lib/ai";

export function AiInvoiceCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = useCallback(() => {
    setPrompt("");
    setOpen(true);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpen();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleOpen]);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const parsed = await parseInvoiceIntent(prompt.trim());
      const encoded = btoa(JSON.stringify(parsed));
      setOpen(false);
      router.push(`/invoices/new?prefill=${encoded}`);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to parse invoice details.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  }

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        <Sparkles className="h-4 w-4 mr-2" />
        Create with AI
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Invoice with AI</DialogTitle>
            <DialogDescription>
              Describe your invoice in plain English and AI will pre-fill the
              form for you.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Textarea
              placeholder='e.g. "Invoice Acme Corp $5,000 for March consulting, net 30"'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              className="resize-none"
              disabled={loading}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="rounded border border-border px-1 py-0.5 text-xs font-mono">
                ⌘ Enter
              </kbd>{" "}
              to generate
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
