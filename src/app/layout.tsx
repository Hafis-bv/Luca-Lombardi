import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/widgets/Navbar";
import { TopNav } from "@/widgets/TopNav";
import { Footer } from "@/widgets/Footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Luca Lombardi",
    template: "%s | Luca Lombardi",
  },
  description:
    "Luca Lombardi is a stylish online fashion store offering minimalist clothing, premium accessories, quality materials, fast delivery, and effortless elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TopNav />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
