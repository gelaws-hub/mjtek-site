import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import Image from "next/image";
import { ChevronDown, Edit, Trash2 } from "lucide-react";
import { Product } from "./Interfaces";
import Link from "next/link";
import { formatIDR } from "@/lib/formatIdr";

interface ComponentSelectionProps {
  categoryId: string;
  socketId?: string | null;
  ramTypeId?: string | null;
  initialProduct?: Product | null;
  onAddToSimulation: (product: Product) => void;
  onDelete: () => void; // Add onDelete prop
}

export default function ComponentSelection({
  categoryId,
  socketId,
  ramTypeId,
  initialProduct,
  onAddToSimulation,
  onDelete,
}: ComponentSelectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct || null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Reset selected product when socketId or ramTypeId changes
  useEffect(() => {
    if (!socketId) {
      setSelectedProduct(null);
    }
  }, [socketId]);

  useEffect(() => {
    if (!ramTypeId) {
      setSelectedProduct(null);
    }
  }, [ramTypeId]);

  useEffect(() => {
    setSelectedProduct(initialProduct ?? null);
  }, [initialProduct]);

  const handleAddToSimulation = (product: Product) => {
    onAddToSimulation(product);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = () => {
    setSelectedProduct(null);
    onDelete();
  };

  const formatProductNameForUrl = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  // Construct the URL using the formatted product name and category
  const productUrl =
    selectedProduct && selectedProduct.category_name
      ? `/${encodeURIComponent(
          selectedProduct.category_name.toLowerCase(),
        )}/${formatProductNameForUrl(selectedProduct.product_name)}-${
          selectedProduct.id
        }`
      : "";

  return (
    <>
      {!selectedProduct && (
        <button
          onClick={() => setModalOpen(true)}
          className="w-full rounded-md bg-gray-100 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:text-gray-500"
          disabled={socketId == null || ramTypeId == null}
          title={
            socketId == null || ramTypeId == null
              ? "Tolong pilih konfigurasi dari awal"
              : ""
          }
        >
          Pilih
        </button>
      )}

      {/* Display selected product details */}
      {selectedProduct && (
        <div className="relative">
          <div className="w-full cursor-pointer rounded-lg border pr-4 text-left transition-colors hover:border-primary md:pr-0">
            <div className="flex items-start justify-center gap-2 p-2 sm:flex-row sm:gap-4 sm:p-4">
              <div className="relative flex aspect-square h-19 max-h-25 w-19 max-w-25 items-center justify-center md:h-full md:w-full">
                <img
                  src={selectedProduct.media_source}
                  alt={selectedProduct.product_name}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
              <div className="w-full min-w-0 flex-1">
                <div className="flex flex-col items-start justify-between gap-0 md:flex-row md:gap-4">
                  <div className="w-full sm:w-auto">
                    <h2 className="line-clamp-1 text-xs font-medium md:text-base">
                      {selectedProduct.product_name}
                    </h2>
                    <p className="line-clamp-2 flex gap-2 text-xs md:text-sm">
                      Merk :{" "}
                      <span className="text-blue-900">
                        {selectedProduct.brand.brand_name}
                      </span>
                      |
                      <span className="text-[0.75rem] text-blue-950 md:text-sm">
                        Stok: {selectedProduct.stock}
                      </span>
                    </p>
                    <h3 className="whitespace-nowrap text-[0.75rem] font-semibold text-blue-900 md:text-lg">
                      {formatIDR(selectedProduct.price.toString())}
                    </h3>
                    <Link
                      href={productUrl}
                      className="text-muted-foreground flex items-center gap-1 rounded px-2 py-1 text-xs hover:bg-gray-100 md:relative md:text-sm"
                    >
                      <ChevronDown className="h-4 w-4" />
                      <p className="inline">Lihat detail produk</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Utility Buttons */}
          <button
            onClick={() => setModalOpen(true)}
            className="absolute bottom-10 right-4 rounded-full bg-blue-900 p-2 text-white shadow-md hover:bg-blue-800 md:bottom-12"
            title="Delete Product"
          >
            <Edit className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button
            onClick={handleDeleteProduct}
            className="absolute bottom-2 right-4 rounded-full bg-red-600 p-2 text-white shadow-md hover:bg-red-700"
            title="Delete Product"
          >
            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
          </button>
        </div>
      )}

      {modalOpen && (
        <ProductModal
          categoryId={categoryId}
          socketId={socketId}
          ramTypeId={ramTypeId}
          onAddToSimulation={handleAddToSimulation}
          open={modalOpen}
          setOpen={setModalOpen}
        ></ProductModal>
      )}
    </>
  );
}
