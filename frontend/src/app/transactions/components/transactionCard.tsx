import Image from "next/image";
import { Transaction } from "@/types/transaction";
import { ShoppingBag, Store, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CancelTransactionBtn from "./cancelTransactionBtn";
import { cn } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
  onOpenModal: () => void;
  className?: string;
  AccentColor?: string;
  children?: React.ReactNode;
}

export default function TransactionCard({
  transaction,
  onOpenModal,
  className = "",
  AccentColor = "",
  children = null,
}: TransactionCardProps) {
  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const firstProduct = transaction.products[0];

  return (
    <div className={cn("rounded-lg border bg-white shadow-sm flex flex-col relative", className)}>
      {/* Header */}
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex w-full flex-col items-start justify-start gap-2 md:flex-row md:items-center">
          <div className="flex flex-col items-start">
            <p className={`w-full text-sm text-${AccentColor || "blue-600"}`}>
              {formatDate(transaction.start_time)}
              {transaction.end_time && (
                <span>
                  {" - "}
                  {formatDate(transaction.end_time)}
                </span>
              )}
            </p>
            <p className="ml-auto text-xs text-gray-500">{transaction.id}</p>
          </div>
          <p
            className={`ml-auto rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-${AccentColor || "blue-600"}`}
          >
            {transaction.status.status_description}
          </p>
        </div>
      </div>

      {/* Product */}
      <div className="flex items-start gap-4 p-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={firstProduct.media_source}
            alt={firstProduct.product_name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <div className="flex-grow">
          <h3 className="line-clamp-2 text-sm font-medium">
            {firstProduct.product_name}
          </h3>
          <p className="text-sm text-gray-500">
            {firstProduct.quantity} barang x {formatPrice(firstProduct.price)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total Belanja</p>
          <p className="font-bold">{formatPrice(transaction.total_price)}</p>
        </div>
      </div>

      {children}

      {/* Actions */}
      <div className="flex items-center justify-between border-t px-4 py-3">
        <Button
          variant="link"
          className={`p-0 text-${AccentColor?.startsWith("gray") ? "blue-600" : AccentColor || "blue-600"}`}
          onClick={onOpenModal}
        >
          Lihat Detail Transaksi
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className={`w-full bg-${AccentColor?.startsWith("gray") ? "blue-600" : AccentColor || "blue-600"}`}
          >
            Beli Lagi
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem className="cursor-pointer text-red hover:bg-gray-100">
                <CancelTransactionBtn transactionId={transaction.id} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  const phoneNumber = "08976607559";
                  const message = `Halo admin, saya mau tanya mengenai transaksi saya di website MJ Teknologi ${transaction.id}`;
                  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(waUrl, "_blank");
                }}
              >
                Contact Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
