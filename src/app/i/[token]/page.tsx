import { getInvoiceByShareToken, markInvoiceViewed } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { PublicInvoiceView } from "./public-invoice-view";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function PublicInvoicePage({ params }: Props) {
  const { token } = await params;

  await markInvoiceViewed(token);
  const invoice = await getInvoiceByShareToken(token);

  if (!invoice) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-semibold">Invoice not found</p>
            <p className="text-sm text-muted-foreground">
              This link is invalid or the invoice has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <PublicInvoiceView invoice={invoice} />;
}
