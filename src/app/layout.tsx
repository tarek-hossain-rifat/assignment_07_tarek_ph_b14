import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import MarqueesComponent from "./components/MarqueesComponent";
import Footer from "./components/Footer";
import { Toast } from "@heroui/react";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.className} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-green-600/4">
        <Toast.Provider placement="top" />
        {/* Fixed Header */}
        <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm">
          <Navbar />
          <MarqueesComponent />
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-42 pb-16">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
