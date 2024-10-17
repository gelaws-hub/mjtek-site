"use client";

import { usePathname } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "@/components/product/ProductCardItem";

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

interface Category {
  id: number;
  category_name: string;
}

export default function CategoryPage() {
  const pathname = usePathname(); // Use usePathname to get the current path
  const categoryName = pathname.split("/")[1]; // Assuming the category is the first part of the path
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );
      setCategories(response.data.data); // Assuming response.data contains an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (categoryName) {
      const categoryId = categories.find(
        (cat) => cat.category_name.toLowerCase() === categoryName.toLowerCase()
      )?.id;
      if (categoryId) {
        fetchProducts(categoryId);
      }
    }
  }, [categoryName, categories]);

  const fetchProducts = async (categoryId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product?categories=${categoryId}`
      );
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Products in Category: {categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCardItem key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
