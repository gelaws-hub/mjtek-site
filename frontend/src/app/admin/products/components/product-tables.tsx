"use client";

import Image from "next/image";
import { Product } from "./FullProductInterface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "./product-detail";
import { PencilEdit02Icon } from "@/components/icons/PencilEdit02Icon";
import { DeletePutBackIcon } from "@/components/icons/DeletePutBackIcon";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { TickDouble02Icon } from "@/components/icons/TickDouble02Icon";
import { Bounce, ToastContainer, toast } from "react-toastify";

function ProductTables() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); //for patching product

  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState<number | null>(null);

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
        setRefresh(false);
      });
  }, [currentPage, refresh]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  const handleDeleteButton = (id: number) => {
    setDeletedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!deletedProductId) {
      setIsDeleteModalOpen(false);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${deletedProductId}`, {
      method: "DELETE",
    }).then(() => {
      setRefresh(!refresh);
      setIsDeleteModalOpen(false);
      console.log("product : ", selectedProduct);
    });
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-2 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daftar Produk
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
                    <td className="flex items-center overflow-hidden w-full">
                      <p className="truncate pr-2 text-xs text-black dark:text-white md:text-sm">
                        Rp. {Intl.NumberFormat("id-ID").format(product.price)}
                      </p>
                    </td>

                    {/* Category Column */}
                    <td className="flex items-center overflow-hidden w-full">
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
                      <button
                        className="rounded-md bg-red p-1 text-white hover:bg-opacity-80"
                        onClick={() => handleDeleteButton(product.id)}
                      >
                        <DeletePutBackIcon
                          color="#fff"
                          width={16}
                          height={16}
                        />
                      </button>
                      <DeleteConfirmModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={handleDelete}
                        message="Apakah anda yakin untuk menghapus Produk ini?"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <h2 className="text-center ">Produk tidak ditemukan</h2>
              )}
            </tbody>
          </table>
        </div>
        {selectedProduct && (
          <ProductDetail
            setRefresh={setRefresh}
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
      <ToastContainer />
    </>
  );
}

export default ProductTables;
