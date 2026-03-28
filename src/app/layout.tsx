import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserSettings } from "@/lib/storage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoicer",
  description: "Create, preview, and download professional invoices",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let serverTheme: "light" | "dark" | "system" = "system";
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user?.id) {
      const settings = await getUserSettings(session.user.id);
      if (settings?.theme) serverTheme = settings.theme;
    }
  } catch {
    // unauthenticated or headers unavailable (e.g. static generation)
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased${serverTheme === "dark" ? " dark" : ""}`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");if(s==="dark"){document.documentElement.classList.add("dark")}else if(s==="light"){document.documentElement.classList.remove("dark")}else if(s===null||s==="system"){if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}}catch(e){}})()`,
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
