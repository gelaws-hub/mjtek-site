"use client";

import { useEffect, useState } from "react";
import ProductCardItem from "./ProductCardItem";
import { ProductCardItemProps } from "./ProductInterface";
import { cn } from "@/lib/utils";
import ProductSkeleton from "./productSkeleton";

export default function RecommendationSlider({
  className,
  category_ids = "1",
}: {
  className?: string;
  category_ids: string;
}) {
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=1&categories=${category_ids}`,
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
    setLoading(false);
  }, []);

  return (
    <div className={cn("w-full max-w-[95vw] overflow-x-scroll scrollbar-none border rounded-md", className)}>
      <div className="flex gap-2">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} className="md:w-[170px] w-[150px] max-w-[200px] h-[250px]" />)
        ) : (
          products.map((product) => (
            <ProductCardItem
              key={product.id}
              product={product}
              className="md:w-[170px] w-[150px] max-w-[200px]"
            />
          ))
        )}
      </div>
    </div>
  );
}
