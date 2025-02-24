import Image from "next/image";
import Link from "next/link";
import { Product } from "./Interfaces";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingCart } from "lucide-react";
import ProductSkeleton from "@/components/product/productSkeleton";

export default function ProductCardSim({
  className,
  product,
  loading = false,
  onSelect = () => {},
}: {
  className?: string;
  product: Product;
  loading?: boolean;
  onSelect?: (product: Product) => void;
}) {
  const formatProductNameForUrl = (productName: string) => {
    return productName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
  };

  // Construct the URL using the formatted product name and category
  const productUrl = `/${encodeURIComponent(
    product.category_name.toLowerCase(),
  )}/${formatProductNameForUrl(product.product_name)}-${product.id}`;

  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <div
      className="group relative overflow-visible"
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
    >
      <div
        className={cn(
          "relative flex max-w-[300px] flex-col rounded-lg border bg-white transition-all duration-300 ease-in-out [box-shadow:0px_-2px_5px_rgba(0,0,0,0.03),0px_2px_5px_rgba(0,0,0,0.03)] group-hover:z-10 group-hover:scale-[102%]",
          className,
        )}
      >
        {product.media_source && (
          <div className="relative flex aspect-[1/1] overflow-hidden">
            <img
              src={product.media_source}
              alt={product.product_name}
              width={300}
              height={300}
              className="h-full w-full overflow-hidden rounded-t-md object-cover"
            />
            {product.stock <= 0 && (
              <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
                <p className="text-xs text-white md:text-sm">Habis</p>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-1 p-2">
          <h2 className="mt-1 line-clamp-2 h-12 text-[0.8rem] font-medium">
            {product.product_name}
          </h2>
          <p className="mb-1 text-sm font-medium text-blue-900">
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </div>
        {/* <Link
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto link flex w-full items-center justify-around rounded-lg bg-blue-900 py-2 text-sm text-white"
          href={productUrl}
        >
          Lihat Produk{" "}
          <ArrowRight className="link-hover:translate-x-1 h-5 w-5 duration-300 ease-in-out" />
        </Link> */}
      </div>
    </div>
  );
}
