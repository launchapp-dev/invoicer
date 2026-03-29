export type ChangeType = "feature" | "fix" | "improvement";

export interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  description: string;
  type: ChangeType;
}

export const changelogEntries: ChangelogEntry[] = [
  {
    date: "2024-03-15",
    version: "1.4.0",
    title: "AI Invoice Creation",
    description:
      "Describe your project and let AI automatically fill in line items, pricing, and terms. Save time on every invoice.",
    type: "feature",
  },
  {
    date: "2024-03-10",
    version: "1.3.2",
    title: "Multi-currency Support",
    description:
      "Invoice clients in any currency with automatic exchange rates and proper formatting for 150+ currencies.",
    type: "feature",
  },
  {
    date: "2024-03-05",
    version: "1.3.1",
    title: "PDF Generation Fix",
    description:
      "Resolved an issue where certain special characters would not render correctly in downloaded PDFs.",
    type: "fix",
  },
  {
    date: "2024-02-28",
    version: "1.3.0",
    title: "Recurring Invoices",
    description:
      "Set up automatic billing cycles for retainers and subscriptions. Never forget to invoice again.",
    type: "feature",
  },
  {
    date: "2024-02-20",
    version: "1.2.1",
    title: "Dashboard Performance",
    description:
      "Improved load times on the dashboard by 40% with optimized data fetching and caching.",
    type: "improvement",
  },
  {
    date: "2024-02-15",
    version: "1.2.0",
    title: "Client CSV Import",
    description:
      "Bulk import your existing client list via CSV. Get started with Invoicer in minutes, not hours.",
    type: "feature",
  },
  {
    date: "2024-02-10",
    version: "1.1.1",
    title: "Mobile Responsiveness",
    description:
      "Enhanced mobile experience throughout the app. Create and manage invoices on the go.",
    type: "improvement",
  },
  {
    date: "2024-02-01",
    version: "1.1.0",
    title: "Invoice Attachments",
    description:
      "Attach contracts, receipts, or any file to your invoices. Keep everything organized in one place.",
    type: "feature",
  },
  {
    date: "2024-01-25",
    version: "1.0.2",
    title: "Tax Calculation Fix",
    description:
      "Fixed rounding issues in tax calculations for certain jurisdictions. Now accurate to the penny.",
    type: "fix",
  },
  {
    date: "2024-01-20",
    version: "1.0.1",
    title: "Dark Mode Polish",
    description:
      "Refined dark mode colors for better contrast and accessibility throughout the application.",
    type: "improvement",
  },
  {
    date: "2024-01-15",
    version: "1.0.0",
    title: "Initial Release",
    description:
      "The first public release of Invoicer. Create beautiful invoices, track payments, and get paid faster.",
    type: "feature",
  },
];
