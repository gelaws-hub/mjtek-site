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
import { useSearchParams } from "next/navigation"; // To access query params
import { Search01Icon } from "@/components/icons/Search01Icon";
import useAuth from "@/hooks/useAuth";

const fetchTransactions = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "start_time",
  status?: string,
  searchUser?: string,
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/admin/transaction`);
  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("sortBy", sortBy);

  if (searchUser) {
    url.searchParams.append("searchUser", searchUser); // Add searchUser to query params
  }

  if (status) {
    url.searchParams.append("status", status);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  if (response.ok) {
    return {
      transactions: data.transactions,
      pagination: data.pagination, // Pagination metadata from the backend
    };
  } else if (response.status === 404) {
    return {
      transactions: [],
      pagination: { totalPages: 0 },
    };
  } else {
    throw new Error(data.message || data.error || "Failed to fetch data");
  }
};

const sortingOptions = [
  { value: "start_time", label: "Waktu Mulai" },
  { value: "end_time", label: "Waktu Selesai" },
  { value: "total_price", label: "Harga" },
  { value: "total_items", label: "Jumlah Barang" },
  { value: "user_name", label: "Nama Pengguna" },
];

export default function TransactionPage() {
  useAuth(["admin"]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionStatuses, setTransactionStatuses] = useState<
    TransactionStatus[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [selectedSorting, setSelectedSorting] = useState<any>(
    sortingOptions[0],
  );
  const [searchUser, setSearchUser] = useState<string>(""); // State for search query
  const searchParams = useSearchParams(); // Use to get query parameters

  const statusQueryParam = searchParams.get("status"); // Get the status from query params

  useEffect(() => {
    const fetchTransactionsAsync = async () => {
      try {
        const { transactions, pagination } = await fetchTransactions(
          currentPage,
          limit,
          selectedSorting.value,
          statusQueryParam || undefined,
          searchUser || undefined, // Pass the searchUser query
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
  }, [currentPage, limit, selectedSorting, statusQueryParam, searchUser]); // Dependency on searchUser

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

  const handleSearchUserChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchUser(event.target.value);
    const url = new URL(window.location.href);
    url.searchParams.set("searchUser", event.target.value); // Update URL with search query
    window.history.pushState({}, "", url.toString()); // Update the browser URL
  };

  const PaginationControls = () => (
    <div className="mt-4 flex items-center justify-center">
      <Button
        className="rounded px-4 py-2"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1 || totalPages === 0}
      >
        Previous
      </Button>
      <span className="mx-4">
        Halaman {currentPage} dari {totalPages}
      </span>
      <Button
        className="rounded px-4 py-2"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </Button>
    </div>
  );

  const statuses = {
    all: undefined,
    checking: "menunggu konfirmasi",
    processing: "Diproses",
    shipping: "Dikirim",
    dispute: "Dikomplain",
    finished: "Selesai",
  };

  const handleStatusFilter = (status: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("status", status);
    window.history.pushState({}, "", url.toString());
  };

  return (
    <DefaultLayout>
      {/* User Search Input */}
      <div className="relative my-2 flex items-center dark:border-strokedark dark:bg-boxdark dark:text-white">
        <input
          type="text"
          value={searchUser}
          onChange={handleSearchUserChange}
          className="w-full rounded border bg-inherit py-2 pl-12 pr-4 dark:border-strokedark dark:bg-boxdark"
          placeholder="Cari berdasarkan Nama Pengguna..."
        />
        <Search01Icon className="absolute left-4 h-5 w-5 text-inherit text-opacity-60" />
      </div>
      <div className="mx-0 h-full w-full overflow-y-auto border-strokedark p-2 dark:border-strokedark dark:bg-boxdark">
        <h1 className="mb-4 text-2xl font-bold">Transaksi</h1>
        <div className="mb-2 flex items-center gap-1 md:mb-4">
          <p className="mr-2">Urutkan</p>
          <Combobox
            defaultOption={{ label: "Waktu Mulai", value: "start_time" }}
            options={sortingOptions}
            setOption={setSelectedSorting}
            label="Urutkan berdasarkan"
          />
        </div>
        {/* Status Filter Navbar */}
        <div className="w-full overflow-x-auto py-2 scrollbar-none">
          <div className="flex items-center md:justify-center gap-4">
            {Object.keys(statuses).map((key) => (
              <button
                key={key}
                onClick={() => handleStatusFilter(key)}
                className={`rounded-full px-4 h-9 whitespace-nowrap bg-none py-1 ${(!statusQueryParam && key === "all") || (statusQueryParam && key === statusQueryParam) ? "text-white bg-blue-900 dark:bg-blue-600" : "text"}`}
              >
                {statuses[key as keyof typeof statuses] === undefined
                  ? "Semua"
                  : statuses[key as keyof typeof statuses]}
              </button>
            ))}
          </div>
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
