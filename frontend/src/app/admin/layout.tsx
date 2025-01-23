import type { Metadata } from "next";
import "@/css/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Admin MJ Teknologi Semarang",
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
    <html lang="id">
      <body>
        <Suspense>{children}</Suspense>
        <ToastContainer />
      </body>
    </html>
  );
}
