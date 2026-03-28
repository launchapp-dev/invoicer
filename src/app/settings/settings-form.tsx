"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveMyBusinessProfile, saveMyInvoiceDefaults, saveMyLogoUrl, saveMyTheme, saveMyBrandSettings } from "@/lib/storage";
import type { userSettings } from "@/db/schema";

type UserSettings = typeof userSettings.$inferSelect;

const businessProfileSchema = z.object({
  businessName: z.string(),
  businessEmail: z.string(),
  businessAddress: z.string(),
  businessCity: z.string(),
  businessState: z.string(),
  businessZip: z.string(),
  businessCountry: z.string(),
  businessTaxId: z.string(),
});

const invoiceDefaultsSchema = z.object({
  defaultCurrency: z.string().min(1),
  defaultTaxRate: z.number().min(0).max(100),
  defaultNotes: z.string(),
  invoiceNumberPrefix: z.string(),
  defaultPaymentTerms: z.string(),
});

type BusinessProfileValues = z.infer<typeof businessProfileSchema>;
type InvoiceDefaultsValues = z.infer<typeof invoiceDefaultsSchema>;

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF"];

interface SettingsFormProps {
  settings: UserSettings | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingDefaults, setSavingDefaults] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>(settings?.logoUrl ?? "");
  const [savingLogo, setSavingLogo] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">(settings?.theme ?? "system");
  const [savingTheme, setSavingTheme] = useState(false);
  const [brandColor, setBrandColor] = useState<string>(settings?.brandColor ?? "#2563eb");
  const [brandFont, setBrandFont] = useState<"inter" | "roboto" | "playfair" | "merriweather">(
    (settings?.brandFont as "inter" | "roboto" | "playfair" | "merriweather") ?? "inter"
  );
  const [savingBrand, setSavingBrand] = useState(false);

  const businessForm = useForm<BusinessProfileValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: settings?.businessName ?? "",
      businessEmail: settings?.businessEmail ?? "",
      businessAddress: settings?.businessAddress ?? "",
      businessCity: settings?.businessCity ?? "",
      businessState: settings?.businessState ?? "",
      businessZip: settings?.businessZip ?? "",
      businessCountry: settings?.businessCountry ?? "",
      businessTaxId: settings?.businessTaxId ?? "",
    },
  });

  const defaultsForm = useForm<InvoiceDefaultsValues>({
    resolver: zodResolver(invoiceDefaultsSchema),
    defaultValues: {
      defaultCurrency: settings?.defaultCurrency ?? "USD",
      defaultTaxRate: settings?.defaultTaxRate ?? 0,
      defaultNotes: settings?.defaultNotes ?? "",
      invoiceNumberPrefix: settings?.invoiceNumberPrefix ?? "INV-",
      defaultPaymentTerms: settings?.defaultPaymentTerms ?? "",
    },
  });

  async function handleSaveProfile(data: BusinessProfileValues) {
    setSavingProfile(true);
    try {
      await saveMyBusinessProfile(data);
      toast.success("Business profile saved");
    } catch {
      toast.error("Failed to save business profile");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setLogoUrl(dataUrl);
      setSavingLogo(true);
      try {
        await saveMyLogoUrl(dataUrl);
        toast.success("Logo saved");
      } catch {
        toast.error("Failed to save logo");
      } finally {
        setSavingLogo(false);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleRemoveLogo() {
    setLogoUrl("");
    setSavingLogo(true);
    try {
      await saveMyLogoUrl("");
      toast.success("Logo removed");
    } catch {
      toast.error("Failed to remove logo");
    } finally {
      setSavingLogo(false);
    }
  }

  async function handleThemeChange(value: string) {
    const newTheme = value as "light" | "dark" | "system";
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (newTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    } catch {}
    setSavingTheme(true);
    try {
      await saveMyTheme(newTheme);
      toast.success("Theme saved");
    } catch {
      toast.error("Failed to save theme");
    } finally {
      setSavingTheme(false);
    }
  }

  async function handleSaveBrandSettings() {
    setSavingBrand(true);
    try {
      await saveMyBrandSettings({ brandColor, brandFont });
      toast.success("Brand settings saved");
    } catch {
      toast.error("Failed to save brand settings");
    } finally {
      setSavingBrand(false);
    }
  }

  async function handleSaveDefaults(data: InvoiceDefaultsValues) {
    setSavingDefaults(true);
    try {
      await saveMyInvoiceDefaults(data);
      toast.success("Invoice defaults saved");
    } catch {
      toast.error("Failed to save invoice defaults");
    } finally {
      setSavingDefaults(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={businessForm.handleSubmit(handleSaveProfile)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  {...businessForm.register("businessName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessEmail">Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  {...businessForm.register("businessEmail")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Address</Label>
              <Input
                id="businessAddress"
                {...businessForm.register("businessAddress")}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="businessCity">City</Label>
                <Input
                  id="businessCity"
                  {...businessForm.register("businessCity")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessState">State</Label>
                <Input
                  id="businessState"
                  {...businessForm.register("businessState")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessZip">ZIP</Label>
                <Input
                  id="businessZip"
                  {...businessForm.register("businessZip")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessCountry">Country</Label>
              <Input
                id="businessCountry"
                {...businessForm.register("businessCountry")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessTaxId">Business Tax ID <span className="text-muted-foreground font-normal">(VAT / EIN / ABN, optional)</span></Label>
              <Input
                id="businessTaxId"
                placeholder="e.g. GB123456789"
                {...businessForm.register("businessTaxId")}
              />
            </div>
            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logoUrl ? (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt="Business logo"
                  className="h-16 w-auto max-w-[200px] object-contain rounded border border-border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveLogo}
                  disabled={savingLogo}
                >
                  {savingLogo ? "Removing…" : "Remove Logo"}
                </Button>
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="logoUpload">
                {logoUrl ? "Replace Logo" : "Upload Logo"}
              </Label>
              <Input
                id="logoUpload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoChange}
                disabled={savingLogo}
              />
              <p className="text-xs text-muted-foreground">
                PNG, JPG, or WebP — max 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <SelectRoot value={theme} onValueChange={handleThemeChange} disabled={savingTheme}>
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </SelectRoot>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand &amp; Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brandColor">Brand Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="brandColor"
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded border border-input bg-transparent p-0.5"
                />
                <span className="text-sm font-mono text-muted-foreground">{brandColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandFont">Invoice Font</Label>
              <SelectRoot value={brandFont} onValueChange={(v) => setBrandFont(v as typeof brandFont)}>
                <SelectTrigger id="brandFont">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="playfair">Playfair Display</SelectItem>
                  <SelectItem value="merriweather">Merriweather</SelectItem>
                </SelectContent>
              </SelectRoot>
            </div>
            <Button onClick={handleSaveBrandSettings} disabled={savingBrand}>
              {savingBrand ? "Saving…" : "Save Brand & Style"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Defaults</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={defaultsForm.handleSubmit(handleSaveDefaults)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Default Currency</Label>
                <SelectRoot
                  value={defaultsForm.watch("defaultCurrency")}
                  onValueChange={(value) =>
                    defaultsForm.setValue("defaultCurrency", value)
                  }
                >
                  <SelectTrigger id="defaultCurrency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                <Input
                  id="defaultTaxRate"
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  {...defaultsForm.register("defaultTaxRate", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNumberPrefix">Invoice Number Prefix</Label>
              <Input
                id="invoiceNumberPrefix"
                placeholder="INV-"
                {...defaultsForm.register("invoiceNumberPrefix")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultPaymentTerms">Default Payment Terms</Label>
              <SelectRoot
                value={defaultsForm.watch("defaultPaymentTerms") || "none"}
                onValueChange={(value) =>
                  defaultsForm.setValue("defaultPaymentTerms", value === "none" ? "" : value)
                }
              >
                <SelectTrigger id="defaultPaymentTerms">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Not set</SelectItem>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net60">Net 60</SelectItem>
                  <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                </SelectContent>
              </SelectRoot>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultNotes">Default Notes</Label>
              <Textarea
                id="defaultNotes"
                rows={3}
                {...defaultsForm.register("defaultNotes")}
              />
            </div>
            <Button type="submit" disabled={savingDefaults}>
              {savingDefaults ? "Saving…" : "Save Defaults"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
