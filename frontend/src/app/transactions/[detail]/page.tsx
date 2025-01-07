"use client";

import Image from "next/image";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../../components/transaction/invoicePdf";

export default function TransactionDetailModal() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const path = usePathname();
  console.log("Path:", path);
  const transactionId = path.split("/")[2];
  console.log("Transaction ID:", transactionId);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/${transactionId}`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        if (response.ok) {
          setTransaction(data.transaction);
        } else {
          throw new Error(data.message || "Failed to fetch transaction");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, []);

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(price));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!transaction) {
    return null;
  }

  return (
    <div className="py-4">
      <section className="rounded-lg bg-white">
        <header className="flex flex-col items-start">
          <title>Detail Transaksi</title>
          <h3 className="text-left">Transaction ID: {transaction.id}</h3>
        </header>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white ${transaction.status.status_id === 0 && "bg-red-500"}`}
            >
              {transaction.status.status_name}
            </span>
          </div>

          <p className="mb-1 text-sm text-gray-600">
            Mulai: {formatDate(transaction.start_time)}
          </p>
          {transaction.end_time && (
            <p className="mb-4 text-sm text-gray-600">
              Selesai: {formatDate(transaction.end_time)}
            </p>
          )}
          <h3 className="mb-2 text-lg font-semibold">Produk</h3>
          <div className="pb-2">
            {transaction.products.map((product) => (
              <div
                key={product.product_id}
                className="flex items-center justify-start gap-2 border-t pt-4"
              >
                <div className="h-16 w-16">
                  <Image
                    src={product.media_source}
                    alt={product.product_name}
                    width={100}
                    height={100}
                    className="h-full w-full rounded"
                  />
                </div>
                <div className="w-full">
                  <p className="line-clamp-2 font-medium">
                    {product.product_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Jumlah: {product.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Harga: {formatPrice(product.price)}
                  </p>
                  <p className="text-sm font-semibold">
                    Total: {formatPrice(product.total_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-2 flex border-t pt-2 text-xl font-bold">
            Total:{" "}
            <span className="ml-auto">
              {formatPrice(transaction.total_price)}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <PDFDownloadLink
            document={<InvoicePDF transaction={transaction} />}
            fileName={`Invoice_${transaction.id}.pdf`}
          >
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              Download invoice
            </button>
          </PDFDownloadLink>
        </div>
      </section>
    </div>
  );
}
