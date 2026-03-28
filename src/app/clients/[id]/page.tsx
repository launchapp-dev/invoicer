import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getClient } from "@/lib/storage";
import { Separator } from "@/components/ui/separator";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm">Invoicer</span>
          <Link
            href="/clients"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Clients
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-1">{client.name}</h1>
        {client.company && (
          <p className="text-muted-foreground text-sm mb-6">{client.company}</p>
        )}

        <Separator className="mb-6" />

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {client.email && (
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email</dt>
              <dd className="text-sm">{client.email}</dd>
            </div>
          )}
          {client.phone && (
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Phone</dt>
              <dd className="text-sm">{client.phone}</dd>
            </div>
          )}
          {(client.address || client.city || client.state || client.zip || client.country) && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Address</dt>
              <dd className="text-sm">
                {[client.address, client.city, client.state, client.zip, client.country]
                  .filter(Boolean)
                  .join(", ")}
              </dd>
            </div>
          )}
          {client.notes && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Notes</dt>
              <dd className="text-sm whitespace-pre-wrap">{client.notes}</dd>
            </div>
          )}
        </dl>
      </main>
    </div>
  );
}
