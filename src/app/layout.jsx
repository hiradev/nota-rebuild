import { Inter, Instrument_Serif } from "next/font/google";
import { getGlobal, getHomepage, strapiMediaUrl } from "@/lib/strapi";
import "./globals.css";
import "./sections.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// This build reuses a design that isn't ours — kept live only for
// investor/fundraising review, not for public discovery. Force noindex
// unconditionally (ignore any CMS-set metaRobots) until the round closes,
// at which point the site comes down entirely.
const ROBOTS = "noindex, nofollow";

export async function generateMetadata() {
  const [global, homepage] = await Promise.all([getGlobal(), getHomepage()]);
  // The homepage single type's own `seo` field overrides global.defaultSeo
  // when an editor has filled it in; otherwise fall back to the site default.
  const seo = homepage?.seo?.metaTitle ? homepage.seo : global?.defaultSeo;

  const faviconUrl = strapiMediaUrl(global?.favicon);
  const icons = faviconUrl ? { icon: faviconUrl } : undefined;

  if (!seo) {
    const defaultSeo = global?.defaultSeo;
    return {
      metadataBase: new URL(SITE_URL),
      title: global?.siteName,
      description: global?.siteDescription,
      keywords: defaultSeo?.keywords || undefined,
      alternates: defaultSeo?.canonicalURL ? { canonical: defaultSeo.canonicalURL } : undefined,
      robots: ROBOTS,
      icons,
    };
  }

  const shareImageUrl = strapiMediaUrl(seo.shareImage);

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords || undefined,
    alternates: seo.canonicalURL ? { canonical: seo.canonicalURL } : undefined,
    robots: ROBOTS,
    icons,
    openGraph: shareImageUrl
      ? { title: seo.metaTitle, description: seo.metaDescription, images: [shareImageUrl] }
      : undefined,
    twitter: shareImageUrl
      ? {
          card: "summary_large_image",
          title: seo.metaTitle,
          description: seo.metaDescription,
          images: [shareImageUrl],
        }
      : undefined,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} root--primary`}>
        {children}
      </body>
    </html>
  );
}
