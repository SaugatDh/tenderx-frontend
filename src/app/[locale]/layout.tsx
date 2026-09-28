import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Manrope, Noto_Sans_Devanagari } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import { AuthProvider } from "@/lib/auth-context";
import { BidProvider } from "@/lib/bid-context";
import { QueryProvider } from "@/lib/query-provider";
import { RevealProvider } from "@/components/public/RevealProvider";
import "../globals.css";
import "../desk.css";
import "../hero.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TenderX Nepal — Joint Venture Bid Workspace",
  description:
    "Prepare joint-venture bids with partner details, signatures, documents, and reusable company profiles in one organised workspace.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "TenderX Nepal — Joint Venture Bid Workspace",
    description:
      "Prepare joint-venture bids with partner details, signatures, documents, and reusable company profiles in one organised workspace.",
    images: [{ url: "/logo.png", width: 321, height: 211, alt: "TenderX" }],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.variable} ${notoDevanagari.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AuthProvider>
              <BidProvider>
                <RevealProvider>{children}</RevealProvider>
              </BidProvider>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
