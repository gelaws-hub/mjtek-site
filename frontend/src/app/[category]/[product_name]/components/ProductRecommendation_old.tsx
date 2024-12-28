"use client";

import ProductCardItem from "@/components/product/ProductCardItem";
import axios from "axios";
import { useEffect, useState } from "react";

interface Media {
  source: string;
  file_type: string;
}

interface Product {
  id: number;
  product_name: string;
  price: number;
  media: Media[];
  category: {
    id: number;
    category_name: string;
  };
}

interface ProductRecommendationProps {
  category_id: number;
  currentProductId: number; // Add currentProductId to exclude it
}

export default function ProductRecommendation({
  category_id,
  currentProductId,
}: ProductRecommendationProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product?categories=${category_id - 1},${category_id},${category_id + 1}`
        );

        // Filter out the current product from the results
        const filteredProducts = response.data.products.filter(
          (product: Product) => product.id !== currentProductId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category_id) {
      fetchProducts();
    }
  }, [category_id, currentProductId]); // Include currentProductId as a dependency

  return (
    <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:max-w-[1024px]">
      {products.map((product) => (
        <ProductCardItem key={product.id} product={product} />
      ))}
    </div>
  );
}
