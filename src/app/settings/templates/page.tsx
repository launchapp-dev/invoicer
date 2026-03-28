import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserSettings } from "@/lib/storage";
import { TemplatesClient } from "./templates-client";

export default async function TemplatesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const settings = await getUserSettings(session.user.id);
  const current = (settings?.invoiceTemplate ?? "classic") as "classic" | "modern" | "minimal";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm">Invoicer</span>
          <Link
            href="/settings"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Settings
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-2">Invoice Templates</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Choose a template for your invoice PDFs and previews.
        </p>
        <TemplatesClient current={current} />
      </main>
    </div>
  );
}
