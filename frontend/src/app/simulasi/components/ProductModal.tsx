import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Product } from "./Interfaces";
import { Search01Icon } from "@/components/icons/Search01Icon";
import Image from "next/image";

interface ProductModalProps {
  categoryId: string;
  socketId?: string | null;
  ramTypeId?: string | null;
  brandId?: string | null;
  onAddToSimulation: (product: Product) => void;
  onClose: () => void;
}

export default function ProductModal({
  categoryId,
  socketId,
  ramTypeId,
  onAddToSimulation,
  onClose,
}: ProductModalProps) {
  const [components, setComponents] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    try {
      let query = `${process.env.NEXT_PUBLIC_API_URL}/sim-product?q=${searchQuery}&categories=${categoryId}&page=${currentPage}`;
      if (socketId) query += `&socket_id=${socketId}`;
      if (ramTypeId) query += `&ram_type_id=${ramTypeId}`;

      const response = await axios.get(query);
      setComponents(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch components", error);
    }
  }, [searchQuery, currentPage, categoryId, socketId, ramTypeId]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelection = (product: Product) => {
    onAddToSimulation(product);
    onClose();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when a new search is performed
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <button
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
      style={{ touchAction: "none" }}
    >
      <div
        className="max-w-[90vw] rounded-lg bg-white p-6 shadow-lg z-99"
        onClick={(e) => e.stopPropagation()}
      >
        <label
          htmlFor="search"
          className="mb-4 text-xl font-semibold text-gray-800"
        >
          Cari produk
        </label>

        <div
          id="search"
          className="relative mb-4 flex items-center justify-between"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari produk..."
            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => fetchProducts()}
            className="absolute right-2 rounded-md px-2 py-1"
          >
            <Search01Icon className="h-5 w-5" />
          </button>
        </div>

        <ul className="max-h-60 space-y-2 overflow-y-auto">
          {components.length > 0 ? (
            components.map((component) => (
              <li
                key={component.id}
                className="flex items-center gap-1 border-b border-gray-200 p-1"
              >
                <div className="flex h-16 w-16">
                  <Image
                    src={component.media[0].source}
                    alt={component.product_name}
                    width={100}
                    height={100}
                    className="aspect-square h-full w-full rounded-md object-cover"
                  />
                </div>
                <div
                  className="flex w-full cursor-pointer items-center justify-between text-left text-xs hover:bg-gray-100 md:text-sm"
                  onClick={() => handleSelection(component)}
                >
                  <p>{component.product_name} </p>
                  <p className="text-gray-500">
                    Rp {component.price.toLocaleString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No products found</li>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md border bg-gray-200 px-2 py-1 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border bg-gray-200 px-2 py-1 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </button>
  );
}
