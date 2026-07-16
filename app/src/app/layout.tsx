import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Splash } from "@/components/Splash";
import "./globals.css";

/** Outfit — official Midnight Brand Hub typeface (applied via className so spaces/glyphs load correctly). */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "VaultPass · Midnight",
  description: "Prove membership without revealing your private credential. Built on Midnight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} h-full antialiased`}>
      <body className={`${outfit.className} flex min-h-full flex-col bg-surface text-on-surface`}>
        <Splash />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
