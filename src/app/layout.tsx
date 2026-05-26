import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PaperRippleBg } from "@/components/ui/paper-ripple-bg";
import { Cursor } from "@/components/ui/cursor";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devanté Heywood",
  description:
    "Operator and systems engineer. I build operational systems that non-technical teams actually use.",
  openGraph: {
    title: "Devanté Heywood",
    description:
      "I build operational systems that non-technical teams actually use.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devanté Heywood",
    description:
      "I build operational systems that non-technical teams actually use.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <PaperRippleBg />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        <Cursor />
      </body>
    </html>
  );
}
