"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "./ProductCardItem";
import { ProductCardItemProps } from "./ProductInterface";

export default function ProductCard() {
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=16&page=1`,
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto grid max-w-[90%] grid-cols-2 gap-1 md:max-w-full md:grid-cols-[repeat(auto-fit,minmax(150px,200px))] md:gap-2">
      {products &&
        products.map((product) => (
          <ProductCardItem key={product.id} product={product} />
        ))}
    </div>
  );
}
