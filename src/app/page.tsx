import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Invoicer</CardTitle>
          <p className="text-sm text-muted-foreground">
            Create, send, and track invoices in seconds.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
