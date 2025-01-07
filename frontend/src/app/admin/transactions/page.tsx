"use client";

import { useEffect, useState } from "react";
import { TransactionTable } from "./components/transaction-table";
import { fetchTransactionStatuses } from "./data/transactions";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
import { Transaction, TransactionStatus } from "./components/types";
import TransactionDetailModal from "./components/transaction-detail-modal";
import { errorToast, successToast } from "@/components/toast/reactToastify";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";

 const fetchTransactions = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "start_time",
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction?page=${page}&limit=${limit}&sortBy=${sortBy}`,
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
    return {
      transactions: data.transactions,
      pagination: data.pagination, // Pagination metadata from the backend
    };
  } else {
    throw new Error(data.message || data.error || "Failed to fetch data");
  }
};

const sortingOptions = [
  {
    value: "start_time",
    label: "Waktu Mulai", // Start Time
  },
  {
    value: "end_time",
    label: "Waktu Selesai", // End Time
  },
  {
    value: "total_price",
    label: "Harga", // Total Price
  },
  {
    value: "total_items",
    label: "Jumlah Barang", // Total Items
  },
  {
    value: "user_name",
    label: "Nama Pengguna", // User Name
  },
];

export default function TransactionPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionStatuses, setTransactionStatuses] = useState<
    TransactionStatus[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [selectedSorting, setSelectedSorting] = useState<any>(sortingOptions[0]);

  useEffect(() => {
    const fetchTransactionsAsync = async () => {
      try {
        const { transactions, pagination } = await fetchTransactions(
          currentPage,
          limit,
          selectedSorting.value,
        );
        const transactionStatuses = await fetchTransactionStatuses();
        setTransactions(transactions);
        setTransactionStatuses(transactionStatuses);
        setTotalPages(pagination.totalPages); // Update total pages
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactionsAsync();
  }, [currentPage, limit, selectedSorting]);

  const handleStatusChange = async (
    transactionId: string,
    statusId: number,
    statusName: string,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction/${transactionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status_id: statusId }),
          credentials: "include",
        },
      );
      if (!response.ok) {
        errorToast("Failed to update transaction status");
        throw new Error("Failed to update transaction status");
      }
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              status: { id: statusId, name: statusName, description: null },
            }
          : transaction,
      );
      successToast(
        `Transaction ${transactionId} status updated to ${statusName}`,
      );
      setTransactions([...updatedTransactions]);
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const PaginationControls = () => (
    <div className="mt-4 flex items-center justify-center">
      <Button
        className="rounded px-4 py-2"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className="rounded px-4 py-2"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );

  return (
    <DefaultLayout>
      <div className="container mx-auto overflow-x-hidden">
        <h1 className="mb-4 text-2xl font-bold">Transactions</h1>
        <div className="flex items-center gap-1">
          <p className="mr-2">Urutkan</p>
          <Combobox
            defaultOption={{ label: "Waktu Mulai", value: "start_time" }}
            options={sortingOptions}
            setOption={setSelectedSorting}
            label="Urutkan berdasarkan"
            className="w-48"
          />
        </div>
        <TransactionTable
          transactions={transactions}
          onSelectTransaction={setSelectedTransaction}
          statuses={transactionStatuses}
          onChangeStatus={handleStatusChange}
        />
        <PaginationControls />
        {selectedTransaction && (
          <TransactionDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
}
