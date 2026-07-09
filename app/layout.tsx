import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollStability from "@/components/ScrollStability";

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://davidokafor.vercel.app";
const siteTitle =
  "David Okafor | Frontend Developer, Mobile App Developer & Product Designer";
const siteDescription =
  "Official portfolio of David Okafor, a Frontend Developer, Mobile App Developer and Product Designer based in Lagos, Nigeria.";
const profileImage = `${siteUrl}/images/david-profile.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | David Okafor",
  },
  description: siteDescription,
  keywords: [
    "David Okafor",
    "Okafor Onyekachukwu David",
    "Frontend Developer Nigeria",
    "Mobile App Developer Lagos",
    "Product Designer Nigeria",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "Okafor Onyekachukwu David" }],
  verification: {
    google: "2QeFlvPWgpN4QlLr4oxE2el55ejEkgAalSv5WW1YTfg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "David Okafor Portfolio",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: profileImage,
        width: 1200,
        height: 630,
        alt: "Okafor Onyekachukwu David",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [profileImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Okafor Onyekachukwu David",
  alternateName: "David Okafor",
  url: siteUrl,
  image: profileImage,
  jobTitle: "Frontend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  sameAs: [
    "https://github.com/ominiknowette",
    "https://www.linkedin.com/in/onyekachukwu-okafor-445456313",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="relative flex min-h-screen flex-col bg-base text-ink">
        <ScrollStability />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="site-background" aria-hidden="true" />
        <div className="site-content relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
