import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "@bahalbach/next-view-transitions";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ben Halbach",
  description: "A personal site for Ben Halbach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`bg-background min-h-screen flex flex-col`}>
          <Analytics />
          <ThemeProvider>
            <Navbar />
            <main className=" flex flex-col w-full max-w-6xl mx-auto flex-auto items-stretch pb-10">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
