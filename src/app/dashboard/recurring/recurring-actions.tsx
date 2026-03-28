"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { myPauseRecurringInvoice, myResumeRecurringInvoice, myDeleteRecurringInvoice } from "@/lib/recurring-actions";
import { toast } from "@/components/ui/sonner";

interface RecurringActionsProps {
  id: string;
  status: "active" | "paused";
}

export function RecurringActions({ id, status }: RecurringActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      if (status === "active") {
        await myPauseRecurringInvoice(id);
        toast.success("Paused");
      } else {
        await myResumeRecurringInvoice(id);
        toast.success("Resumed");
      }
      router.refresh();
    } catch {
      toast.error("Action failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await myDeleteRecurringInvoice(id);
      toast.success("Deleted");
      router.refresh();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleToggle} disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : status === "active" ? "Pause" : "Resume"}
      </Button>
      <Button variant="outline" size="sm" onClick={handleDelete} disabled={loading}>
        Delete
      </Button>
    </div>
  );
}
