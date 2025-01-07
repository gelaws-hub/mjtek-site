import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductImage } from "./product-image";
import { Transaction, TransactionStatus } from "./types";
import { StatusComboBox } from "./status-combobox";

export function TransactionTable({
  transactions,
  onSelectTransaction,
  statuses,
  onChangeStatus,
}: {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
  statuses: TransactionStatus[];
  onChangeStatus: (
    transactionId: string,
    statusId: number,
    statusName: string,
  ) => void;
}) {
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }

  return (
    <Table className="truncate text-xs md:text-sm">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Produk</TableHead>
          <TableHead>Pembeli</TableHead>
          <TableHead>ID Transaksi</TableHead>
          <TableHead>Tanggal mulai</TableHead>
          <TableHead>Barang</TableHead>
          <TableHead>Total Harga</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow
            key={transaction.id}
            onClick={() => onSelectTransaction(transaction)}
            className="hover:bg-muted cursor-pointer text-xs hover:bg-slate-100 dark:hover:bg-boxdark md:text-sm"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell className="justify-start py-0">
              <ProductImage product={transaction.products[0]} />
            </TableCell>
            <TableCell>{transaction.user.name}</TableCell>
            <TableCell className="font-medium">
              {transaction.id.slice(0, 12)}...
            </TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(transaction.start_time))}
            </TableCell>
            <TableCell>{transaction.total_items}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(parseFloat(transaction.total_price))}
            </TableCell>
            <TableCell className="">
              <StatusComboBox
                key={`${transaction.id}-${transaction.status.id}`}
                statuses={statuses}
                currentStatus={transaction.status}
                onChangeStatus={(statusId, statusName) =>
                  onChangeStatus(transaction.id, statusId, statusName)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
