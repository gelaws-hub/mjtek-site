import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Product } from "./Interfaces";
import { Search01Icon } from "@/components/icons/Search01Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProductSkeleton from "@/components/product/productSkeleton";
import ProductCardSim from "./ProductCardSim";

interface ProductModalProps {
  categoryId: string;
  socketId?: string | null;
  ramTypeId?: string | null;
  brandId?: string | null;
  onAddToSimulation: (product: Product) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  children?: React.ReactNode;
}

export default function ProductModal({
  open,
  setOpen,
  categoryId,
  socketId,
  ramTypeId,
  onAddToSimulation,
  children,
}: ProductModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [open, setOpen] = useState(false);

  const debouncedFetchProducts = debounce(async () => {
    setLoading(true);
    try {
      let query = `${process.env.NEXT_PUBLIC_API_URL}/sim-product?q=${searchRef.current?.value ?? ""}&categories=${categoryId}&page=${currentPage}`;
      if (socketId) query += `&socket_id=${socketId}`;
      if (ramTypeId) query += `&ram_type_id=${ramTypeId}`;

      const response = await axios.get(query);
      setResponseData(response.data);
    } catch (error) {
      console.error("Failed to fetch components", error);
    } finally {
      setLoading(false);
    }
  }, 500);

  const fetchProducts = useCallback(() => {
    debouncedFetchProducts();
  }, [categoryId, currentPage, socketId, ramTypeId]);

  function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: number | null = null;
    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    };
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSelection = (product: Product) => {
    onAddToSimulation(product);
    setOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchRef.current?.value;
    setCurrentPage(1);
    console.log("searchRef", searchRef.current?.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchSubmit = () => {
    if (!loading) {
      fetchProducts();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      fetchProducts();
    }
  };

  // if (!responseData) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={`Pilih ${!loading && responseData.categories[0] ? responseData.categories[0].category_name : null}`}
        className="flex h-[80vh] w-[90%] max-w-[1024px] flex-col rounded-lg bg-white"
      >
        <DialogHeader className="space-y-1.5 border-b border-gray-200 pb-4">
          <DialogTitle className="text-left">
            Pilih{" "}
            {!loading && responseData.categories[0]
              ? responseData.categories[0].category_name
              : null}{" "}
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="relative flex w-full items-center border-gray-200">
            <Input
              ref={searchRef}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown} // Listen for Enter key
              id="name"
              placeholder={`Cari ${!loading && responseData.categories[0] ? responseData.categories[0].category_name : "Produk"}... `}
              className="col-span-3"
            />
            <Button
              className="absolute right-0 h-full bg-blue-900 p-4 hover:bg-blue-800"
              onClick={handleSearchSubmit}
              disabled={loading}
            >
              <Search01Icon color="#FFFFFF" />
            </Button>
          </div>
        </DialogHeader>
        <div className="grid h-full gap-4 overflow-y-scroll py-4 scrollbar-thin">
          <div className="mx-auto grid w-full max-w-[96%] grid-cols-2 gap-2 md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:gap-3">
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : responseData.products.length > 0 ? (
              responseData.products.map((product: Product) => (
                <ProductCardSim
                  className="max-h-[300px] max-w-[200px]"
                  key={product.id}
                  product={product}
                  onSelect={handleSelection}
                />
              ))
            ) : (
              <p className="col-span-full mx-auto my-auto w-full text-center">
                Oops, Tidak ada produk yang ditemukan. Silahkan gunakan
                konfigurasi lain
              </p>
            )}
          </div>
        </div>
        {!loading && (
          <DialogFooter className="flex w-full flex-row items-center justify-center border-t border-gray-200 p-4 sm:flex-row sm:justify-center sm:space-x-2">
            <Button
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </Button>
            <select
              className="px-4 py-2"
              onChange={(e) => handlePageChange(parseInt(e.target.value))}
              value={currentPage}
              content="Current Page"
            >
              {Array.from({ length: responseData.totalPages }).map(
                (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ),
              )}
            </select>
            <Button
              disabled={currentPage >= responseData.totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
