"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
}

export function PaginationControls({ page, totalPages }: PaginationControlsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </Button>
    </div>
  );
}
