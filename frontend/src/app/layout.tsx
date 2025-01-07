import type { Metadata } from "next";
import "@/css/style.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/BreadCrump"; // Import Breadcrumb
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "MJ Teknologi Semarang",
  description:
    "Beli aneka produk di Toko MJ Teknologi Semarang secara online sekarang.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
