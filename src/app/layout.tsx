import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Joshi — Full Stack Developer",
  description:
    "Portfolio of Aman Joshi, a full stack developer specializing in Java, Node.js, React, Next.js, payment gateways, and IoT systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full font-sans">
        <AppProvider>
          <Preloader />
          <Cursor />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
