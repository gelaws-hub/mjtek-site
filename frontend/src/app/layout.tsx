import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MJ Teknologi Semarang",
  description:
    "Beli aneka produk di Toko MJ Teknologi Semarang secara online sekarang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

