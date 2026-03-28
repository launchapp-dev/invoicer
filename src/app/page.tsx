import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Invoicer</CardTitle>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <CardDescription>
            Create, preview, and download professional invoices in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button className="w-full">Create Invoice</Button>
          <Button variant="outline" className="w-full">View Invoices</Button>
        </CardContent>
      </Card>
    </main>
  );
}
