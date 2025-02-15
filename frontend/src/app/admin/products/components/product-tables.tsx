"use client";

import Image from "next/image";
import { Product } from "./FullProductInterface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditProductModal } from "./editProductModal";
import { PencilEdit02Icon } from "@/components/icons/PencilEdit02Icon";
import { DeletePutBackIcon } from "@/components/icons/DeletePutBackIcon";
import { useRefreshContext } from "./refreshContext";
import DeleteAlert from "./DeleteAlert";
import {
  deleteToast,
  errorToast,
} from "../../../../components/toast/reactToastify";
import Link from "next/link";
import { Combobox } from "@/components/ui/combobox";
import { Search01Icon } from "@/components/icons/Search01Icon";

function ProductTables() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [refresh, setRefresh] = useRefreshContext();

  const [deletedProduct, setDeletedProduct] = useState<Product | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin-products?page=${currentPage}&limit=${limit}&q=${search}`,
      { method: "GET", credentials: "include" },
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalProducts(data.totalCount);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });
  }, [currentPage, refresh, search, limit]);

  const handleDeleteButton = (product: Product) => {
    setDeletedProduct(product);
  };

  const handleDelete = () => {
    if (!deletedProduct) {
      setDeletedProduct(null);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${deletedProduct.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status_code === 200) {
          setRefresh(!refresh);
          deleteToast(`Produk ${deletedProduct.product_name} berhasil dihapus`);
          setDeletedProduct(null);
        } else {
          errorToast(`Gagal menghapus produk ${deletedProduct.product_name}`);
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const updateQueryParams = (
    newSearch: string,
    newPage: number,
    newLimit: number,
  ) => {
    const query = new URLSearchParams();

    if (newSearch) query.set("search", newSearch);
    if (newPage > 1) query.set("page", newPage.toString());
    if (newLimit) query.set("limit", newLimit.toString());

    router.push(`?${query.toString()}`);
  };

  const handleChangeSearch = (search: string) => {
    setSearch(search);
    updateQueryParams(search, 1, limit);
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams(search, newPage, limit);
  };

  const handleLimitChange = (newLimit: number) => {
    updateQueryParams(search, 1, newLimit);
  };

  const limitOptions = [10, 20, 30, 40, 50, 100];

  return (
    <>
      {/* <form className="relative mb-2 flex w-full gap-4 rounded-sm border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
          className="w-full rounded-lg bg-inherit py-1 pl-9 pr-2"
          placeholder="Cari produk..."
        />
        <Search01Icon
          width={18}
          height={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-inherit focus:outline-none focus:ring-0"
        />
      </form> */}
      <form className="relative mb-2 flex w-full gap-4 rounded-sm border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
          className="w-full rounded-lg bg-inherit py-1 pl-9 pr-2"
          placeholder="Cari produk..."
          aria-label="Cari produk"
        />
        <Search01Icon
          width={18}
          height={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-inherit focus:outline-none focus:ring-0"
          aria-hidden="true"
        />
      </form>
      {currentPage > totalPages ? (
        <div className="flex items-center justify-center text-xl">
          <p>Halaman yang anda cari tidak ada, </p>
          <span>
            &nbsp;
            {/* <Link
              scroll={false}
              className="text-blue-500"
              // href={`/admin/products?page=1`}
              href={`/admin/products`}
            >
              kembali ke halaman awal
            </Link> */}
            <Link
              scroll={false}
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              href="/admin/products"
              onClick={(e) => {
                e.preventDefault();
                setSearch(""); // Clear search
                router.push("/admin/products"); // Reset URL
                router.refresh(); // Refresh data
              }}
              aria-label="Kembali ke halaman awal dan reset pencarian"
            >
              kembali ke halaman awal
            </Link>
          </span>{" "}
        </div>
      ) : (
        <div className="rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 py-2 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Menampilkan {totalProducts} Produk
            </h4>
          </div>
          <div className="flex w-full overflow-x-auto">
            <table className="mx-auto w-full min-w-[600px] border-collapse border-t border-stroke text-xs dark:border-strokedark md:text-sm">
              <thead>
                <tr className="grid grid-cols-[25px_3fr_1.4fr_1fr_0.5fr_1fr] px-4 py-4.5 sm:grid-cols-[40px_3fr_1fr_1fr_0.5fr_1fr] md:px-6 2xl:px-7.5">
                  <th className="text-left font-medium">No</th>
                  <th className="text-center font-medium">Produk</th>
                  <th className="text-left font-medium">Harga</th>
                  <th className="text-left font-medium">Kategori</th>
                  <th className="text-center font-medium">Stok</th>
                  <th className="text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products ? (
                  products.map((product, key) => (
                    <tr
                      className={`grid grid-cols-[25px_3fr_1.4fr_1fr_0.5fr_1fr] border-t border-stroke px-4 py-4.5 odd:bg-white even:bg-gray-50 hover:bg-primary/10 dark:border-strokedark
          dark:odd:bg-black dark:even:bg-strokedark dark:hover:bg-primary/20 sm:grid-cols-[40px_3fr_1fr_1fr_0.5fr_1fr] md:px-6 2xl:px-7.5`}
                      key={product.id}
                    >
                      {/* No Column */}
                      <td className="flex items-center justify-start">
                        <p className="truncate text-xs text-black dark:text-white md:text-sm">
                          {limit * (currentPage - 1) + (key + 1)}
                        </p>
                      </td>

                      {/* Product Name Column */}
                      <td className="mr-2 flex items-center gap-2">
                        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-sm sm:rounded-md md:h-12 md:w-12">
                          {product.media ? (
                            <img
                              className="h-full w-full object-cover"
                              src={product.media[0].source}
                              width={64}
                              height={64}
                              alt={product.product_name}
                            />
                          ) : null}
                        </div>
                        <p className="line-clamp-2 px-2 text-xs text-black dark:text-white md:text-sm">
                          {product.product_name}
                        </p>
                      </td>

                      {/* Price Column */}
                      <td className="flex w-full items-center overflow-hidden">
                        <p className="truncate pr-2 text-xs text-black dark:text-white md:text-sm">
                          Rp. {Intl.NumberFormat("id-ID").format(product.price)}
                        </p>
                      </td>

                      {/* Category Column */}
                      <td className="flex w-full items-center overflow-hidden">
                        <p className="truncate text-xs text-black dark:text-white md:text-sm">
                          {product.category.category_name}
                        </p>
                      </td>

                      {/* Stock Column */}
                      <td className="flex items-center justify-center">
                        <p className="text-xs text-black dark:text-white md:text-sm">
                          {product.stock}
                        </p>
                      </td>

                      {/* Actions Column */}
                      <td className="flex items-center justify-center gap-1 text-xs text-white md:text-sm">
                        <button
                          className="rounded-md bg-primary p-1 text-white hover:bg-opacity-80"
                          onClick={() => setSelectedProduct(product)}
                          aria-label={`Edit ${product.product_name}`}
                          role="button"
                        >
                          <PencilEdit02Icon
                            color="#fff"
                            width={16}
                            height={16}
                            aria-hidden="true"
                          />
                        </button>
                        <DeleteAlert
                          actionComponent={<span>Hapus</span>}
                          action={handleDelete}
                          deleteMessage={`Apakah anda yakin akan menghapus <strong>${product.product_name}</strong> ?`}
                        >
                          <button
                            className="rounded-md bg-red p-1 text-white hover:bg-opacity-80"
                            onClick={() => handleDeleteButton(product)}
                            aria-label={`Hapus ${product.product_name}`}
                            role="button"
                          >
                            <DeletePutBackIcon
                              color="#fff"
                              width={16}
                              height={16}
                              aria-hidden="true"
                            />
                          </button>
                        </DeleteAlert>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center ">Produk tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {selectedProduct && (
            <EditProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          <div className="mt-4 flex items-center justify-center gap-4 dark:text-white">
            <Button
              className="text-white"
              onClick={() =>
                handlePageChange(
                  currentPage > 1 ? currentPage - 1 : currentPage,
                )
              }
              aria-label="Halaman sebelumnya"
              disabled={currentPage <= 1}
            >
              Prev
            </Button>
            <span role="status" aria-live="polite">
              Halaman {currentPage} dari {totalPages}
            </span>
            <Button
              className="text-white"
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : currentPage,
                )
              }
              aria-label="Halaman berikutnya"
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
          <ul className="mt-4 flex items-center justify-center gap-4">
            {limitOptions.map((option) => (
              // <li
              //   key={option}
              //   className={`cursor-pointer text-inherit ${
              //     limit === option ? "font-semibold text-primary underline" : ""
              //   }`}
              // >
              //   <button
              //     onClick={(e) => {
              //       e.preventDefault();
              //       handleLimitChange(option);
              //     }}
              //   >
              //     {option}
              <li key={option}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLimitChange(option);
                  }}
                  className={`cursor-pointer text-inherit ${
                    limit === option
                      ? "font-semibold text-primary underline"
                      : ""
                  }`}
                  aria-label={`Tampilkan ${option} item per halaman`}
                  aria-current={limit === option ? "true" : undefined}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ProductTables;
