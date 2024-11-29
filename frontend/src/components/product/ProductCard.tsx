"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "./ProductCardItem";
import { Product } from "./ProductInterface";

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=1`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:max-w-[1024px]">
      {products &&
        products.map((product) => (
          <ProductCardItem key={product.id} product={product} />
        ))}
    </div>
  );
}
