import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ben Halbach",
  description: "A personal site for Ben Halbach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const theme = cookies().get("theme");
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <Navbar />
        <main className="bg-gray-200  dark:bg-gray-900 flex flex-col min-h-screen flex-auto items-stretch pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
