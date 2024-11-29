"use client";
import { usePathname } from "next/navigation";

const hideHeaderPaths = ["/login", "/register", "/admin"]; //Header won't be visible on these paths
export default function Footer() {
  const pathname = usePathname();
  if (hideHeaderPaths.some((path) => pathname?.startsWith(path))) return null;
  return (
    <footer className="bg-[#1B224B] px-4 py-8 pt-12 text-white md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold md:text-3xl">
              MJ Teknologi Semarang
            </h2>
            <p className="text-gray-300">
              Toko Komputer, Hardware PC Kota Semarang
            </p>
            <p className="text-gray-300">
              Buka Sejak <span className="font-semibold">Agustus 2016</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-gray-300 md:items-end">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>MJ Teknologi Semarang</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>08976607559</span>
            </div>
          </div>
          <p className="col-span-2 text-sm leading-relaxed text-gray-300">
            Beli aneka produk di Toko MJ Teknologi Semarang secara online
            sekarang. Kamu bisa beli produk dari Toko MJ Teknologi Semarang
            dengan aman & mudah dari Kota Semarang. Ingin belanja lebih hemat &
            terjangkau di Toko MJ Teknologi Semarang? Kamu bisa gunakan fitur
            Cicilan 0% dari berbagai bank dan fitur Bebas Ongkir di Toko MJ
            Teknologi Semarang sehingga kamu bisa belanja online dengan nyaman
            di Tokopedia. Beli aneka produk terbaru di Toko MJ Teknologi
            Semarang dengan mudah dari genggaman tangan kamu menggunakan
            Aplikasi Tokopedia. Cek terus juga Toko MJ Teknologi Semarang untuk
            update Produk, Kode Voucher hingga Promo Terbaru dari Toko MJ
            Teknologi Semarang Terbaru secara online di Tokopedia!
          </p>
        </div>
        <div className="pt-8">
          <a href="#">
            <p className="text-center text-sm text-gray-400">
              Copyright MJ Teknologi Semarang 2024. All right reserved
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}
