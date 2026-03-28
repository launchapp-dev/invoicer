"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Paperclip, Trash2, Download, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listAttachments, type Attachment } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface InvoiceAttachmentsProps {
  invoiceId: string;
  onCountChange?: (count: number) => void;
}

export function InvoiceAttachments({ invoiceId, onCountChange }: InvoiceAttachmentsProps) {
  const [files, setFiles] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listAttachments(invoiceId)
      .then((rows) => {
        setFiles(rows);
        onCountChange?.(rows.length);
      })
      .catch(() => {});
  }, [invoiceId, onCountChange]);

  const uploadFiles = useCallback(
    async (selected: FileList | File[]) => {
      const toUpload = Array.from(selected);
      const errors: string[] = [];

      for (const file of toUpload) {
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`"${file.name}" exceeds the 10 MB limit`);
          continue;
        }
        if (files.length + uploading.length >= MAX_FILES) {
          errors.push(`Maximum ${MAX_FILES} files per invoice`);
          break;
        }

        const tempId = `uploading-${crypto.randomUUID()}`;
        setUploading((prev) => [...prev, tempId]);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("invoiceId", invoiceId);

        try {
          const res = await fetch("/api/attachments", { method: "POST", body: formData });
          if (!res.ok) {
            const data = await res.json() as { error?: string };
            throw new Error(data.error ?? "Upload failed");
          }
          const attachment = await res.json() as Attachment;
          setFiles((prev) => {
            const updated = [...prev, attachment];
            onCountChange?.(updated.length);
            return updated;
          });
        } catch (err) {
          errors.push(`"${file.name}": ${err instanceof Error ? err.message : "Upload failed"}`);
        } finally {
          setUploading((prev) => prev.filter((id) => id !== tempId));
        }
      }

      for (const msg of errors) {
        toast.error(msg);
      }
    },
    [files.length, invoiceId, onCountChange, uploading.length]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
      e.target.value = "";
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  async function handleDelete(id: string) {
    setDeleteConfirm(null);
    setDeleting((prev) => [...prev, id]);
    try {
      const res = await fetch(`/api/attachments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setFiles((prev) => {
        const updated = prev.filter((f) => f.id !== id);
        onCountChange?.(updated.length);
        return updated;
      });
    } catch {
      toast.error("Failed to delete attachment");
    } finally {
      setDeleting((prev) => prev.filter((d) => d !== id));
    }
  }

  const totalCount = files.length + uploading.length;
  const canUpload = totalCount < MAX_FILES;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Attachments</span>
          {totalCount > 0 && (
            <Badge variant="secondary" className="text-xs">{totalCount}</Badge>
          )}
        </div>
        {canUpload && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            Add files
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      {canUpload && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
          }`}
        >
          <Upload className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Any file type · Max 10 MB per file · Up to {MAX_FILES} files
          </p>
        </div>
      )}

      {(files.length > 0 || uploading.length > 0) && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Paperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate font-medium">{file.fileName}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatBytes(file.fileSize)}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  asChild
                >
                  <a href={`/api/attachments/${file.id}`} download={file.fileName}>
                    <Download className="h-3.5 w-3.5" />
                    <span className="sr-only">Download</span>
                  </a>
                </Button>
                {deleteConfirm === file.id ? (
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => handleDelete(file.id)}
                      disabled={deleting.includes(file.id)}
                    >
                      {deleting.includes(file.id) ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setDeleteConfirm(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteConfirm(file.id)}
                    disabled={deleting.includes(file.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                )}
              </div>
            </li>
          ))}
          {uploading.map((tempId) => (
            <li
              key={tempId}
              className="flex items-center gap-3 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-muted-foreground"
            >
              <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
              <span>Uploading…</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
