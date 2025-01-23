import { errorToast, successToast } from "@/components/toast/reactToastify";

export default function CancelTransactionBtn({
  transactionId,
}: {
  transactionId: string;
}) {

  const cancelTransaction = async (transactionId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${transactionId}`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        successToast("Transaksi berhasil dibatalkan", "top-left");
        return data.transactions;
      } else {
        errorToast("Gagal membatalkan transaksi", "top-left");
        throw new Error(data.message || "Failed to cancel transaction");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw new Error("cancel transaction data failed");
    }
  };
  
  const handleCancelTransaction = async () => {
    try {
      await cancelTransaction(transactionId);
    } catch (err: any) {
      errorToast(err.message || "An error occurred", "top-left");
    }
  };

  return (
    <button
      className=""
      onClick={handleCancelTransaction}
    >
      Cancel
    </button>
  );
}
