import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import Image from "next/image";
import { ChevronDown, Trash2 } from "lucide-react";
import { Product } from "./Interfaces";
import Link from "next/link";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct || null
  );

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddToSimulation = (product: Product) => {
    onAddToSimulation(product);
    setSelectedProduct(product);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = () => {
    setSelectedProduct(null);
    onDelete();
  };

  const getValidImageSource = (media: Product["media"]) => {
    for (let i = 0; i < media.length; i++) {
      if (media[i].file_type.startsWith("image")) {
        return media[i].source;
      }
    }
    return "";
  };

  const formatProductNameForUrl = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  // Construct the URL using the formatted product name and category
  const productUrl =
    selectedProduct && selectedProduct.category
      ? `/${encodeURIComponent(
          selectedProduct.category.category_name.toLowerCase()
        )}/${formatProductNameForUrl(selectedProduct.product_name)}-${
          selectedProduct.id
        }`
      : "";

  return (
    <>
      {!selectedProduct && (
        <button
          onClick={handleModalOpen}
          className="w-full py-2 px-4 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={socketId == null || ramTypeId == null}
          title={socketId == null || ramTypeId == null ? "Tolong pilih konfigurasi dari awal" : ""}
        >
          Pilih
        </button>
      )}

      {/* Modal Component */}
      {isModalOpen && (
        <ProductModal
          categoryId={categoryId}
          socketId={socketId}
          ramTypeId={ramTypeId}
          onAddToSimulation={handleAddToSimulation}
          onClose={handleModalClose}
        />
      )}

      {/* Display selected product details */}
      {selectedProduct && (
        <div className="relative">
          <div
            onClick={handleModalOpen}
            className="pr-10 md:pr-0 w-full text-left border rounded-lg hover:border-primary transition-colors cursor-pointer"
          >
            <div className="p-2 sm:p-4 flex sm:flex-row items-start gap-2 sm:gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                <Image
                  src={
                    getValidImageSource(selectedProduct.media) ||
                    "/default-image.jpg"
                  }
                  alt={selectedProduct.product_name}
                  className="object-cover rounded-md"
                  sizes="(max-width: 120px) 10vw, (max-width: 120px) 10vw, 10vw"
                  fill
                />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-col md:flex-row items-start justify-between gap-0 md:gap-4">
                  <div className="w-full sm:w-auto">
                    <h3 className="text-xs font-medium md:text-base line-clamp-2">
                      {selectedProduct.product_name}
                    </h3>
                    <p className="line-clamp-1 text-xs md:text-sm text-muted-foreground mt-1 sm:line-clamp-2">
                      {selectedProduct.description}
                    </p>
                    <button
                      className="flex items-center justify-between top-0 right-20"
                      onClick={() => {}}
                    >
                      <Link scroll={false}
                        href={productUrl}
                        className="absolute top-2 right-2 md:relative text-xs flex items-center gap-1 md:text-sm text-muted-foreground hover:bg-gray-100 px-2 py-1 rounded"
                      >
                        <ChevronDown className="h-4 w-4" />
                        <p className="hidden md:inline">Lihat detail produk</p>
                      </Link>
                    </button>
                  </div>
                  <div className="flex flex-row md:flex-col items-start sm:items-end gap-4 sm:justify-start w-full sm:w-auto flex-shrink-0">
                    {selectedProduct.stock !== undefined && (
                      <span className="text-[0.75rem] md:text-sm text-blue-950">
                        Stok: {selectedProduct.stock}
                      </span>
                    )}
                    <span className="text-[0.75rem] md:text-lg font-semibold whitespace-nowrap">
                      Rp {selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDeleteProduct}
            className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700"
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
