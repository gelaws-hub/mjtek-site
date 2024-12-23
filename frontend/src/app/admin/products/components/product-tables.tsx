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
import { deleteToast } from "./reactToastify";
import Link from "next/link";

function ProductTables() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [refresh, setRefresh] = useRefreshContext();

  const [deletedProduct, setDeletedProduct] = useState<Product | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 10;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product?page=${currentPage}&limit=${limit}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });
  }, [currentPage, refresh]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

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
    }).then(() => {
      setRefresh(!refresh);
      deleteToast(`Produk ${deletedProduct.product_name} berhasil dihapus`);
      setDeletedProduct(null);
    });
  };

  if (currentPage > totalPages) {
    return (
      <div className="flex items-center justify-center text-xl">
        <p>Halaman yang anda cari tidak ada, </p>
        <span>
          &nbsp;
          <Link
            className="text-blue-500"
            href={`/admin/products?page=1`}
          >
            kembali ke halaman awal
          </Link>
        </span>{" "}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-2 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Menampilkan {limit} Produk
          </h4>
          
        </div>
        <div className="flex max-w-[90vw] overflow-x-auto sm:max-w-full">
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
                          <Image
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
                      >
                        <PencilEdit02Icon color="#fff" width={16} height={16} />
                      </button>
                      <DeleteAlert
                        actionComponent={<span>Hapus</span>}
                        action={handleDelete}
                        deleteMessage={`Apakah anda yakin akan menghapus <strong>${product.product_name}</strong> ?`}
                      >
                        <button
                          className="rounded-md bg-red p-1 text-white hover:bg-opacity-80"
                          onClick={() => handleDeleteButton(product)}
                        >
                          <DeletePutBackIcon
                            color="#fff"
                            width={16}
                            height={16}
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
              handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Prev
          </Button>
          <span>
            {currentPage} dari {totalPages}
          </span>
          <Button
            className="text-white"
            onClick={() =>
              handlePageChange(
                currentPage < totalPages ? currentPage + 1 : currentPage,
              )
            }
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductTables;
