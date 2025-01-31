"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import ProductCardItem from "./ProductCardItem";
import ProductSkeleton from "./productSkeleton";

export function ProductRecommendation({
  products,
  afterAddToCart,
  loading = false,
}: {
  products: ProductCardItemProps[];
  afterAddToCart?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
}) {
  const formatProductNameForUrl = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  if (!products) return null;

  return (
    <div className="relative mx-auto mb-10 w-full overflow-x-auto overflow-y-hidden scrollbar-thin py-4">
      {loading ? (
        <div className="flex gap-2 md:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton
              key={i}
              className="h-[250px] w-[150px] max-w-[200px] md:w-[170px]"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-2">
          {products.map((product) => (
            <ProductCardItem
              key={product.id}
              product={product}
              afterAddToCart={afterAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
