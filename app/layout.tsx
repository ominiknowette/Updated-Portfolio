import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://david-portfolio.vercel.app"),
  title: {
    default: "David — Frontend & Mobile Developer, Product Designer",
    template: "%s — David",
  },
  description:
    "David (Okafor Onyekachukwu David) is a Lagos-based frontend developer, mobile app developer, and product designer building clean, thoughtful digital products.",
  keywords: [
    "David",
    "Okafor Onyekachukwu David",
    "Frontend Developer Lagos",
    "Mobile App Developer Nigeria",
    "Product Designer",
    "Next.js Developer",
  ],
  authors: [{ name: "Okafor Onyekachukwu David" }],
  openGraph: {
    title: "David — Frontend & Mobile Developer, Product Designer",
    description:
      "Building digital experiences that are simple, thoughtful, and easy to use. Lagos, Nigeria.",
    url: "https://david-portfolio.vercel.app",
    siteName: "David",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "David — Frontend & Mobile Developer, Product Designer",
    description: "Building digital experiences that are simple, thoughtful, and easy to use.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="relative bg-base text-ink min-h-screen flex flex-col">
        <AuroraBackground />
        <div className="pointer-events-none fixed inset-0 bg-noise opacity-[0.4] z-0" />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
