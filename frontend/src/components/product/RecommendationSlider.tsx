"use client";

import { useEffect, useState } from "react";
import ProductCardItem from "./ProductCardItem";
import { ProductCardItemProps } from "./ProductInterface";
import { cn } from "@/lib/utils";

export default function RecommendationSlider({
  className,
  category_ids = "1",
}: {
  className?: string;
  category_ids: string;
}) {
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=1&categories=${category_ids}`,
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={cn("w-full max-w-[95vw] overflow-x-scroll scrollbar-none border rounded-md", className)}>
      <div className="flex gap-2">
        {products.map((product) => (
          <ProductCardItem
            key={product.id}
            product={product}
            className="md:w-[170px] w-[150px] max-w-[200px]"
          />
        ))}
      </div>
    </div>
  );
}
