import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollMood from "@/components/ScrollMood";
import SectionDots from "@/components/SectionDots";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aman Joshi — Full Stack Developer",
  description:
    "Portfolio of Aman Joshi, a full stack developer specializing in Java, Node.js, React, Next.js, and IoT systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground cursor-none-desktop">
        <ScrollMood />
        <div className="bg-grid fixed inset-0 -z-10" />
        <div className="grain" />
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <SectionDots />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
