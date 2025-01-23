"use client";

import { Search01Icon } from "@/components/icons/Search01Icon";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import { errorToast, successToast } from "@/components/toast/reactToastify";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BuyerListPage() {
  useAuth(["owner"]);
  const [users, setUsers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial state from the URL query params
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [userMeta, setUserMeta] = useState<any>({});

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?search=${search}&page=${page}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data.user);
        setUserMeta(data.meta);
        setTotalPages(data.meta.totalPages);
      }
    } catch (error) {
      errorToast("Gagal memuat data user. Silakan coba lagi.");
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [search, page]);

  const updateQueryParams = (newSearch: string, newPage: number) => {
    const query = new URLSearchParams();

    if (newSearch) query.set("search", newSearch);
    if (newPage > 1) query.set("page", newPage.toString());

    router.push(`?${query.toString()}`);
  };

  const onSearch = (e: any) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    updateQueryParams(newSearch, 1); // Reset to page 1 when searching
  };

  const changePage = (pageNo: number) => {
    const newPage = page + pageNo;
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      updateQueryParams(search, newPage);
    }
  };

  return (
    <DefaultLayout>
      <div className="mb-2 flex flex-col rounded-md p-2 dark:bg-boxdark">
        <div className="relative my-2 flex items-center dark:border-strokedark dark:bg-boxdark dark:text-white">
          <input
            onChange={onSearch}
            type="text"
            className="w-full rounded border bg-inherit py-2 pl-12 pr-4 dark:border-strokedark dark:bg-boxdark"
            placeholder="Cari berdasarkan Nama Pengguna..."
          />
          <Search01Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-inherit text-opacity-60" />
        </div>
      </div>
      <div className="mb-2 overflow-x-auto rounded-sm border border-stroke bg-white shadow-default scrollbar-thin scrollbar-thumb-blue-300 dark:border-strokedark dark:bg-boxdark dark:scrollbar-thumb-blue-700">
        <h1 className="p-2">Menampilkan {userMeta.total} pelanggan</h1>
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-boxdark">
              <th className="px-4 py-2 text-left font-medium">User</th>
              <th className="px-4 py-2 text-left font-medium">Nama</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">No HP</th>
              <th className="px-4 py-2 text-left font-medium">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`cursor-pointer text-black odd:bg-white even:bg-gray-50 hover:bg-primary/10 dark:border-strokedark dark:text-white dark:odd:bg-black dark:even:bg-strokedark dark:hover:bg-primary/20`}
              >
                <td className="whitespace-nowrap py-1">
                  <img
                    src={user.profile_pic}
                    alt={user.name}
                    className="mx-auto aspect-square h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2">{user.name}</td>
                <td className="whitespace-nowrap px-4 py-2">{user.email}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  {user.phone_number}
                </td>
                <td className="whitespace-nowrap px-4 py-2">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <Button onClick={() => changePage(-1)} disabled={page <= 1}>
          Prev
        </Button>
        <p>{page}</p>
        <Button onClick={() => changePage(1)} disabled={page >= totalPages}>
          Next
        </Button>
      </div>
    </DefaultLayout>
  );
}
