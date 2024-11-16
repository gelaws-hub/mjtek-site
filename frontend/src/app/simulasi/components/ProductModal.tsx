import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Product } from "./Interfaces";

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
      let query = `${process.env.NEXT_PUBLIC_API_URL}/product?q=${searchQuery}&categories=${categoryId}&page=${currentPage}`;
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
  }, [fetchProducts]);

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
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Products</h3>
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by product name..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {components.length > 0 ? (
            components.map((component) => (
              <li
                key={component.id}
                className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelection(component)}
              >
                <span>{component.product_name}</span>
                <span className="text-gray-500">Rp {component.price.toLocaleString()}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No products found</li>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}
