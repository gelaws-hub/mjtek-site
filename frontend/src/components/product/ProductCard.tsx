"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "./ProductCardItem"; // Adjust the import path as needed


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

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-48">
      {products.map((product) => (
        <ProductCardItem key={product.id} product={product} />
      ))}
    </div>
  );
}
