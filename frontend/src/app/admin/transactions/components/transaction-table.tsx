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
    return <div className="mx-auto text-center py-10">Tidak ada transaksi</div>;
  }

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-primary/10 dark:scrollbar-thumb-slate-50 dark:scrollbar-track-primary/30">
      <table className="w-full border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-boxdark">
            <th className="px-4 py-2 text-left font-medium">No</th>
            <th className="px-4 py-2 text-left font-medium">Produk</th>
            <th className="px-4 py-2 text-left font-medium">Pembeli</th>
            <th className="px-4 py-2 text-left font-medium">ID Transaksi</th>
            <th className="px-4 py-2 text-left font-medium">Tanggal Mulai</th>
            <th className="px-4 py-2 text-left font-medium">Barang</th>
            <th className="px-4 py-2 text-left font-medium">Total Harga</th>
            <th className="px-4 py-2 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.id}
              onClick={() => onSelectTransaction(transaction)}
              className={`cursor-pointer text-black odd:bg-white even:bg-gray-50 hover:bg-primary/10 dark:border-strokedark dark:text-white dark:odd:bg-black dark:even:bg-strokedark dark:hover:bg-primary/20`}
            >
              <td className="whitespace-nowrap px-4 py-2">{index + 1}</td>
              <td className="flex items-center gap-2 whitespace-nowrap px-4 py-2">
                <ProductImage product={transaction.products[0]} />
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                {transaction.user.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium">
                {transaction.id.slice(0, 12)}...
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                {new Intl.DateTimeFormat("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(transaction.start_time))}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                {transaction.total_items}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(parseFloat(transaction.total_price))}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <StatusComboBox
                  key={`${transaction.id}-${transaction.status.id}`}
                  statuses={statuses}
                  currentStatus={transaction.status}
                  onChangeStatus={(statusId, statusName) =>
                    onChangeStatus(transaction.id, statusId, statusName)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
