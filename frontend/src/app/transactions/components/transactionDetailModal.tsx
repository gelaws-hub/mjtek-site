import Image from "next/image";
import { Transaction } from "@/types/transaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../../components/transaction/invoicePdf";

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
}: TransactionDetailModalProps) {
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] rounded-lg bg-white md:max-w-[620px]">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle>Detail Transaksi</DialogTitle>
          <DialogDescription className="text-left">
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>
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
          <h3 className="mb-2 text-lg font-semibold">Bukti Pembayaran</h3>
          {transaction.payment_proof && (
              <a
                href={transaction.payment_proof}
                target="_blank"
                rel="noopener noreferrer"
                className="h-24 w-24 flex items-center justify-center"
              >
                <Image
                  src={transaction.payment_proof}
                  alt="Proof"
                  width={100}
                  height={100}
                  className="rounded object-contain w-full h-full"
                />
              </a>
          )}
          <h3 className="mb-2 text-lg font-semibold">Produk</h3>
          <div className="max-h-[300px] space-y-4 overflow-y-auto pb-2 scrollbar-thin">
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
          <button className="rounded bg-gray-200 px-4 py-2" onClick={onClose}>
            Tutup
          </button>
          <PDFDownloadLink
            document={<InvoicePDF transaction={transaction} />}
            fileName={`Invoice_${transaction.id}.pdf`}
          >
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              Download invoice
            </button>
          </PDFDownloadLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}
