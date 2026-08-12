import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Reem_Kufi, Tajawal } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/config";
import ogImage from "@/assets/images/studio-front.webp";
import "./globals.css";

// Identical type stack to the vitasilk_24k sibling, and deliberately so: four
// SKUs sit under one brand, and the palette is already doing the differentiating.
// Cormorant's high stroke contrast reads luxe on cream — it is the dark-theme
// siblings that had to drop it, because hairlines disappear against near-black.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vitasilk Coconut Smooth — Coco & Amande Douce 1L | زيت جوز الهند واللوز",
  description:
    "Vitasilk Coconut Smooth 1L — soin professionnel à l'huile de coco et à l'amande douce, porté par la protéine brésilienne. La coco pénètre la fibre au lieu de la couvrir. Sans formol ni acide glyoxylique. Complexe anti-frizz, nutrition profonde. Livraison gratuite au Maroc, paiement à la livraison.",
  openGraph: {
    title: "Vitasilk Coconut Smooth — Coco & Amande Douce 1L",
    description:
      "L'huile de coco pénètre la fibre au lieu de la couvrir. Amande douce, protéine brésilienne et complexe anti-frizz. Sans formol, sans acide glyoxylique. Livraison gratuite au Maroc — paiement à la livraison.",
    // dimensions come from the file, so they cannot drift out of sync with it
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }],
    locale: "ar_MA",
    alternateLocale: "fr_MA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} ${reemKufi.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
