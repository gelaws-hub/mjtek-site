import Image from "next/image";
import { Transaction } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/components/transaction/invoicePdf";
import Link from "next/link";
import { useState } from "react";

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
}: TransactionDetailModalProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

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

  // Function to get the payment proof URL using the transaction ID
  const getProofUrl = (transactionId: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction-proof/${transactionId}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="z-[999] max-w-[90%] rounded-lg bg-white dark:bg-boxdark dark:text-white md:max-w-[620px]">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle>Detail Transaksi</DialogTitle>
          <DialogDescription className="text-left">
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-blue-500 text-white px-3 py-1 text-sm font-semibold">
              {transaction.status.name}
            </span>
          </div>

          <p className="mb-1 text-sm text-gray-600 dark:text-slate-200">
            Mulai: {formatDate(transaction.start_time)}
          </p>
          {transaction.end_time && (
            <p className="mb-4 text-sm text-gray-600 dark:text-slate-200">
              Selesai: {formatDate(transaction.end_time)}
            </p>
          )}
          <h3 className="mb-2 text-lg font-semibold">Produk</h3>
          <div className="max-h-[300px] space-y-4 overflow-y-auto pb-2 scrollbar-thin">
            {transaction.products.map((product) => (
              <div
                key={product.product_id}
                className="flex items-center justify-start gap-2 border-t pt-4"
              >
                <div className="h-16 w-16">
                  {product.media_source && (
                    <img
                      src={product.media_source}
                      alt={product.product_name}
                      width={100}
                      height={100}
                      className="h-full w-full rounded"
                    />
                  )}
                </div>
                <div className="w-full">
                  <Link scroll={false} href={`/kategori/${product.product_name}-${product.product_id}`} className="line-clamp-1 font-medium">
                    {product.product_name} - {product.quantity}
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-slate-200">
                      Harga: {formatPrice(product.price)}
                    </p>
                    <p className="text-sm font-semibold text-gray-600 dark:text-slate-200">
                      Total: {formatPrice(product.total_price)}
                    </p>
                  </div>
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

          {/* Payment Proof Section */}
          {transaction.payment_proof && (
            <div className="mt-4 border-t pt-4">
              <h3 className="mb-2 text-lg font-semibold">Bukti Pembayaran</h3>
              <div className="flex flex-col space-y-4">
                <div className="w-full max-h-[400px] overflow-hidden rounded-lg border relative">
                  {transaction.payment_proof.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <>
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                        </div>
                      )}
                      <img
                        src={getProofUrl(transaction.id)}
                        alt="Bukti Pembayaran"
                        className="w-full h-full object-contain"
                        style={{ maxHeight: '400px' }}
                        onLoad={() => setIsImageLoading(false)}
                        onError={(e) => {
                          setIsImageLoading(false);
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/placeholder-image.png';
                        }}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] bg-gray-100 dark:bg-gray-800">
                      <p className="text-gray-500">Dokumen Bukti Pembayaran</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <a
                    href={getProofUrl(transaction.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    {transaction.payment_proof.match(/\.(jpg|jpeg|png|gif)$/i) 
                      ? 'Buka Gambar di Tab Baru' 
                      : 'Unduh Bukti Pembayaran'}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <button className="rounded px-4 py-2" onClick={onClose}>
            Tutup
          </button>
          {/* <PDFDownloadLink
            document={<InvoicePDF transaction={transaction} />}
            fileName={`Invoice_${transaction.id}.pdf`}
          >
            <button className="rounded bg-blue-500 px-4 py-2 text-white">Download invoice</button>
          </PDFDownloadLink> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
