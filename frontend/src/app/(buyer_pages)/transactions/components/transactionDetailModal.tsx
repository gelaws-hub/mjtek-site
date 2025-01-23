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
import InvoicePDF from "../../../../components/transaction/invoicePdf";

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
  AccentColor?: string;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
  AccentColor = "",
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
      <DialogContent className="max-h-[90vh] max-w-[90%] overflow-y-auto rounded-lg bg-white scrollbar-thin md:max-w-[620px]">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle>Detail Transaksi</DialogTitle>
          <DialogDescription className="text-left">
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        <div className="h-full">
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-xs text-white md:text-sm bg-${AccentColor}
              `}
            >
              {transaction.status.status_description}
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
          {transaction.payment_proof && (
            <div className="flex flex-col rounded-lg border p-2">
              <h3 className="mb-2 text-base font-semibold md:text-lg">
                Bukti Pembayaran
              </h3>
              <a
                href={transaction.payment_proof}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-24 w-full items-center justify-center"
              >
                <Image
                  src={transaction.payment_proof}
                  alt="Proof"
                  width={100}
                  height={100}
                  className="h-full w-full rounded object-cover"
                />
              </a>
            </div>
          )}
          <h3 className="mb-2 mt-2 text-base font-semibold md:text-lg">
            Produk
          </h3>
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
                  <p className="line-clamp-2 text-xs font-medium md:text-sm">
                    {product.product_name}
                  </p>
                  <p className="text-xs text-gray-600 md:text-sm">
                    Jumlah: {product.quantity}
                  </p>
                  <p className="text-xs text-gray-600 md:text-sm">
                    Harga: {formatPrice(product.price)}
                  </p>
                  <p className="text-xs font-semibold md:text-sm">
                    Total: {formatPrice(product.total_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-md mb-2 flex border-t pt-2 font-bold md:text-lg">
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
