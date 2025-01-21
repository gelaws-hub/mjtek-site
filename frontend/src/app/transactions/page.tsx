"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Transaction } from "@/types/transaction";
import TransactionCard from "./components/transactionCard";
import TransactionDetailModal from "./components/transactionDetailModal";
import Loading from "../loading";
import { Combobox } from "@/components/ui/combobox";
import Link from "next/link";
import ProofUploaderModal from "./components/proofUploaderModal";
import Image from "next/image";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proofTransaction, setProofTransaction] = useState<Transaction | null>(
    null,
  );

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1"),
  );
  const [currentFilter, setCurrentFilter] = useState<string>(
    searchParams.get("filter") || "all",
  );

  const statuses = {
    all: undefined,
    checking: "menunggu konfirmasi",
    processing: "Diproses",
    shipping: "Dikirim",
    dispute: "Dikomplain",
    finished: "Selesai",
  };

  const status_color = {
    0: "red-500", //cancelled
    1: "blue-500", //checking
    2: "yellow-500", //pending payment
    3: "blue-500", //payment confirmation
    4: "blue-500", //processing
    5: "blue-500", //building pc
    6: "yellow-500", //choosing expedition
    7: "blue-500", //cod
    8: "blue-500", //shipping
    9: "green-500", //received
    10: "yellow-600", //dispute
    11: "blue-500", //finished
    99: "red-500", //payment declined
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        ...(currentFilter !== "all" && { status: currentFilter }),
        page: currentPage.toString(),
        limit: "10",
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
      } else {
        throw new Error(data.message || "Failed to fetch transactions");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the filter or page changes
  useEffect(() => {
    fetchTransactions();
  }, [currentFilter, currentPage]);

  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleFilterChange = (option: { label: string; value: string }) => {
    setCurrentFilter(option.value);
    setCurrentPage(1); // Reset to the first page when changing filter
    router.push(`?filter=${option.value}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?filter=${currentFilter}&page=${page}`);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("proof", file);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction-proof/${proofTransaction?.id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Upload error:", error);
    }
    setProofTransaction(null);
    fetchTransactions();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex py-4">
      {/* Sidebar Filter */}
      <div className="hidden pr-4 lg:block lg:w-1/4">
        <h2 className="text-md mb-1 font-bold">Filter status</h2>
        <ul className="space-y-2 rounded-md border py-2 shadow-sm">
          {Object.entries(statuses).map(([key, value]) => (
            <li key={key}>
              <button
                className={`ml-1 block truncate rounded-full px-2 py-1 text-left hover:bg-gray-100 md:text-sm ${
                  currentFilter === key
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : ""
                }`}
                onClick={() =>
                  handleFilterChange({
                    label: value || "Semua transaksi",
                    value: key,
                  })
                }
              >
                {value
                  ? value.charAt(0).toUpperCase() + value.slice(1) // Capitalize the value
                  : "Semua transaksi"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Transactions */}
      <div className="min-h-100 w-full rounded-lg border-[0] md:border md:p-4 lg:w-3/4">
        <Combobox
          defaultOption={{
            value: currentFilter,
            label:
              statuses[currentFilter as keyof typeof statuses] ||
              "Semua transaksi",
          }}
          options={Object.entries(statuses).map(([key, value]) => ({
            value: key,
            label: value || "Semua transaksi",
          }))}
          setOption={handleFilterChange}
          label="Status"
          className="my-2"
        />
        {transactions.length === 0 && (
          <div className="text-md my-10 mb-6 flex flex-col items-center justify-center text-center">
            <h1 className="">
              Tidak ada transaksi yang{" "}
              {currentFilter !== "all"
                ? ` ${statuses[currentFilter as keyof typeof statuses]}`
                : "tersedia"}
            </h1>
            <button
              onClick={() => setCurrentFilter("all")}
              className="text-blue-500"
            >
              {" "}
              Tampilkan semua Transaksi
            </button>
          </div>
        )}
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onOpenModal={() => handleOpenModal(transaction)}
              AccentColor={
                transaction.status.status_id in status_color
                  ? `${status_color[transaction.status.status_id as keyof typeof status_color]}`
                  : ""
              }
            >
              {transaction.status.status_id === 2 && (
                <button
                  className="font-base mx-auto mb-2 rounded-md border border-dashed border-yellow-500 px-2 py-1 text-center text-sm text-yellow-500 hover:underline"
                  onClick={() => setProofTransaction(transaction)}
                >
                  Upload Bukti Pembayaran
                </button>
              )}
              {transaction.status.status_id === 3 &&
                transaction.payment_proof && (
                  <div
                    className={`m-1 flex items-center gap-2 rounded-md border border-dashed border-${status_color[3]} px-4`}
                  >
                    <Link
                      href={transaction.payment_proof}
                      className="m-1 mx-auto h-16 w-16 overflow-hidden"
                    >
                      <Image
                        src={transaction.payment_proof}
                        alt={transaction.id}
                        width={500}
                        height={500}
                        className="mx-auto aspect-auto h-full w-full rounded-md object-cover"
                      />
                    </Link>
                    <button
                      className={`font-base rounded-md border border-dashed border-${status_color[3]} px-2 py-1 text-center text-sm text-${status_color[3]} h-10 w-full hover:underline`}
                      onClick={() => setProofTransaction(transaction)}
                    >
                      Upload ulang Bukti Pembayaran
                    </button>
                  </div>
                )}
            </TransactionCard>
          ))}
        </div>

        {/* Pagination */}
        {transactions.length > 10 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              className="rounded-md bg-gray-300 px-4 py-2"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} {/* Add total pages here if available */}
            </span>
            <button
              className="rounded-md bg-gray-300 px-4 py-2"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Upload Bukti Pembayaran Modal */}
      {proofTransaction && (
        <ProofUploaderModal
          onClose={() => setProofTransaction(null)}
          onSubmit={handleImageUpload}
          openState={proofTransaction}
        />
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
          AccentColor={
            selectedTransaction.status.status_id in status_color
              ? `${status_color[selectedTransaction.status.status_id as keyof typeof status_color]}` // Get the color based on the status id
              : ""}
        />
      )}
    </div>
  );
}
