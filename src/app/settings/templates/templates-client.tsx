"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { saveMyTemplate } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";
import type { InvoiceTemplate } from "@/components/invoice-pdf";

const TEMPLATES: { id: InvoiceTemplate; name: string; description: string }[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean layout with subtle borders and neutral tones.",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold dark header band with white text for a polished look.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple black & white with no decorative borders.",
  },
];

function ClassicThumbnail() {
  return (
    <div className="w-full aspect-[3/4] bg-white border border-border rounded overflow-hidden p-3 space-y-2 text-[6px] leading-tight font-sans select-none">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[5px] text-gray-400 uppercase tracking-widest mb-0.5">Invoice</div>
          <div className="font-bold text-[8px] text-gray-900">INV-001</div>
        </div>
        <div className="text-right space-y-0.5">
          <div className="border border-gray-300 text-gray-500 text-[5px] px-1.5 py-0.5 rounded inline-block">Draft</div>
          <div className="text-gray-400 text-[5px] block">Issued: Jan 1, 2025</div>
          <div className="text-gray-400 text-[5px] block">Due: Jan 31, 2025</div>
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex gap-3">
        <div className="flex-1 space-y-0.5">
          <div className="text-[4px] text-gray-400 uppercase tracking-widest">From</div>
          <div className="font-semibold text-gray-800">Acme Corp</div>
          <div className="text-gray-500">acme@example.com</div>
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="text-[4px] text-gray-400 uppercase tracking-widest">Bill To</div>
          <div className="font-semibold text-gray-800">Client Inc</div>
          <div className="text-gray-500">client@example.com</div>
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex justify-between text-gray-400 border-b border-gray-200 pb-1">
        <span className="flex-[3]">Description</span>
        <span className="flex-1 text-right">Qty</span>
        <span className="flex-1 text-right">Amount</span>
      </div>
      <div className="flex justify-between text-gray-700 border-b border-gray-100 pb-0.5">
        <span className="flex-[3]">Web Design</span>
        <span className="flex-1 text-right">1</span>
        <span className="flex-1 text-right">$1,200</span>
      </div>
      <div className="flex justify-end">
        <div className="w-16 space-y-0.5">
          <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>$1,200</span></div>
          <div className="border-t border-gray-200 pt-0.5 flex justify-between font-bold text-gray-900"><span>Total</span><span>$1,200</span></div>
        </div>
      </div>
    </div>
  );
}

function ModernThumbnail() {
  return (
    <div className="w-full aspect-[3/4] bg-white border border-border rounded overflow-hidden text-[6px] leading-tight font-sans select-none">
      <div className="bg-[#1a1a2e] px-3 py-3 flex justify-between items-end">
        <div>
          <div className="text-[5px] text-white/50 uppercase tracking-widest mb-0.5">Invoice</div>
          <div className="font-bold text-[9px] text-white">INV-001</div>
        </div>
        <div className="text-right space-y-0.5">
          <div className="border border-white/30 text-white text-[5px] px-1.5 py-0.5 rounded inline-block">Draft</div>
          <div className="text-white/60 text-[5px] block">Issued: Jan 1, 2025</div>
          <div className="text-white/60 text-[5px] block">Due: Jan 31, 2025</div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex gap-3">
          <div className="flex-1 space-y-0.5">
            <div className="text-[4px] text-[#1a1a2e] uppercase tracking-widest font-semibold">From</div>
            <div className="font-semibold text-gray-800">Acme Corp</div>
            <div className="text-gray-500">acme@example.com</div>
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="text-[4px] text-[#1a1a2e] uppercase tracking-widest font-semibold">Bill To</div>
            <div className="font-semibold text-gray-800">Client Inc</div>
            <div className="text-gray-500">client@example.com</div>
          </div>
        </div>
        <div className="border-t border-gray-200" />
        <div className="bg-gray-100 rounded flex justify-between px-1 py-0.5 text-gray-500">
          <span className="flex-[3] font-semibold">Description</span>
          <span className="flex-1 text-right font-semibold">Qty</span>
          <span className="flex-1 text-right font-semibold">Amount</span>
        </div>
        <div className="flex justify-between px-1 text-gray-700 border-b border-gray-100 pb-0.5">
          <span className="flex-[3]">Web Design</span>
          <span className="flex-1 text-right">1</span>
          <span className="flex-1 text-right">$1,200</span>
        </div>
        <div className="flex justify-end">
          <div className="w-20 space-y-0.5">
            <div className="flex justify-between text-gray-500 px-1"><span>Subtotal</span><span>$1,200</span></div>
            <div className="bg-[#1a1a2e] rounded px-1 py-0.5 flex justify-between font-bold text-white mt-1"><span>Total</span><span>$1,200</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MinimalThumbnail() {
  return (
    <div className="w-full aspect-[3/4] bg-white border border-border rounded overflow-hidden p-3 space-y-2 text-[6px] leading-tight font-sans select-none">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[5px] text-gray-400 uppercase tracking-[0.25em] mb-0.5">Invoice</div>
          <div className="font-bold text-[8px] text-black">INV-001</div>
        </div>
        <div className="text-right space-y-0.5">
          <div className="text-gray-400 text-[5px]">Draft</div>
          <div className="text-gray-400 text-[5px]">Issued: Jan 1, 2025</div>
          <div className="text-gray-400 text-[5px]">Due: Jan 31, 2025</div>
        </div>
      </div>
      <div className="border-t border-gray-300" style={{ borderWidth: "0.5px" }} />
      <div className="flex gap-3">
        <div className="flex-1 space-y-0.5">
          <div className="text-[4px] text-gray-400 uppercase tracking-widest">From</div>
          <div className="font-semibold text-black">Acme Corp</div>
          <div className="text-gray-500">acme@example.com</div>
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="text-[4px] text-gray-400 uppercase tracking-widest">Bill To</div>
          <div className="font-semibold text-black">Client Inc</div>
          <div className="text-gray-500">client@example.com</div>
        </div>
      </div>
      <div className="border-t border-gray-300" style={{ borderWidth: "0.5px" }} />
      <div className="flex justify-between text-gray-400 border-b border-gray-200 pb-1" style={{ borderWidth: "0.5px" }}>
        <span className="flex-[3]">Description</span>
        <span className="flex-1 text-right">Qty</span>
        <span className="flex-1 text-right">Amount</span>
      </div>
      <div className="flex justify-between text-gray-700 pb-0.5">
        <span className="flex-[3]">Web Design</span>
        <span className="flex-1 text-right">1</span>
        <span className="flex-1 text-right">$1,200</span>
      </div>
      <div className="flex justify-end">
        <div className="w-16 space-y-0.5">
          <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>$1,200</span></div>
          <div className="border-t border-gray-300 pt-0.5 flex justify-between font-bold text-black" style={{ borderWidth: "0.5px" }}><span>Total</span><span>$1,200</span></div>
        </div>
      </div>
    </div>
  );
}

const THUMBNAILS: Record<InvoiceTemplate, React.FC> = {
  classic: ClassicThumbnail,
  modern: ModernThumbnail,
  minimal: MinimalThumbnail,
};

interface TemplatesClientProps {
  current: InvoiceTemplate;
}

export function TemplatesClient({ current }: TemplatesClientProps) {
  const [active, setActive] = useState<InvoiceTemplate>(current);
  const [saving, setSaving] = useState<InvoiceTemplate | null>(null);

  async function handleSelect(id: InvoiceTemplate) {
    setSaving(id);
    try {
      await saveMyTemplate(id);
      setActive(id);
      toast.success("Template updated");
    } catch {
      toast.error("Failed to save template");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {TEMPLATES.map(({ id, name, description }) => {
        const Thumb = THUMBNAILS[id];
        const isActive = active === id;
        return (
          <Card
            key={id}
            className={`relative transition-all ${isActive ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
          >
            {isActive && (
              <div className="absolute top-3 right-3 z-10">
                <Badge>Active</Badge>
              </div>
            )}
            <CardHeader className="p-4 pb-2">
              <Thumb />
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
              <div>
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>
              <Button
                size="sm"
                variant={isActive ? "secondary" : "default"}
                className="w-full"
                disabled={isActive || saving === id}
                onClick={() => handleSelect(id)}
              >
                {saving === id ? "Saving…" : isActive ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
