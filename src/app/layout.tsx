import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import NavPill from "@/components/NavPill";
import Footer from "@/components/Footer";
import "./globals.css";

/**
 * Type system.
 *
 * Space Grotesk for display: it descends from Space Mono, so it keeps genuine
 * engineering character — squared bowls, a distinctive single-storey `g` — but
 * resolves as elegant rather than quirky at headline sizes.
 * Inter for body: neutral, high x-height, built for screen reading.
 * JetBrains Mono for eyebrows, labels and spec tables — the "techy" register
 * lives in the small type, which is where it belongs.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ff-grotesk",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: "Nest connects ERP, business communications, cloud, websites, mobile apps, and digital marketing for growing businesses in Egypt.",
  applicationName: site.name,
  keywords: [
    "ERP Egypt", "ERPNext", "Odoo", "Oracle", "OneSpace ERP", "MiraVoice",
    "nsdCloud", "IP PBX", "cloud hosting", "web development",
    "mobile apps", "digital marketing", "Nest Software Development",
  ],
  authors: [{ name: site.name, url: site.url }],
  icons: { icon: site.favicon },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description:
      "Connect the systems behind your business and the experiences your customers see with Nest Software Development.",
    images: [{ url: "/illustrations/onespace.png", width: 1536, height: 1024, alt: "Connected business operations by Nest" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: "Connected business systems and digital experiences, built around your next step.",
    images: ["/illustrations/onespace.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e0dbd8",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}${site.logo}`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "6th Of October City",
    addressRegion: "Giza",
    addressCountry: "EG",
  },
  sameAs: [site.social.linkedin, site.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`no-js ${display.variable} ${body.variable} ${mono.variable}`}
    >
      {/*
        Browser extensions (Grammarly writes `data-gr-ext-installed` and
        `data-new-gr-c-s-check-loaded`, password managers and translators write
        their own) mutate <body> before React hydrates, which React reports as
        a hydration mismatch even though nothing in this app is inconsistent.

        suppressHydrationWarning applies one level deep only — it silences
        attribute diffs on <body> itself and nothing inside it, so genuine
        mismatches in the tree are still reported.
      */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <Footer />
        <NavPill />
      </body>
    </html>
  );
}
