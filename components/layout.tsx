import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Navbar from "./navbar";

const name = "Ben Halbach";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 w-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A personal site for Ben Halbach" />
      </Head>
      <Navbar />
      <main className="bg-gray-200  dark:bg-gray-900 flex flex-col min-h-screen flex-auto items-stretch pb-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
