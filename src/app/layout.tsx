import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WarpBackground } from "@/components/ui/warp-background";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
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
      className={`${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <WarpBackground />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
