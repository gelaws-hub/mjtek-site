"use client";

import { usePathname } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "@/components/product/ProductCardItem";

interface Media {
  sumber: string;
  tipe_file: string;
}

interface Produk {
  id_produk: number;
  nama_produk: string;
  harga: number;
  media: Media[];
}

interface Category {
  id_kategori: number;
  nama_kategori: string;
}

export default function CategoryPage() {
  const pathname = usePathname(); // Use usePathname to get the current path
  const categoryName = pathname.split("/")[1]; // Assuming the category is the first part of the path
  const [products, setProducts] = useState<Produk[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/kategori`
      );
      setCategories(response.data); // Assuming response.data contains an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (categoryName) {
      const categoryId = categories.find(
        (cat) => cat.nama_kategori.toLowerCase() === categoryName.toLowerCase()
      )?.id_kategori;
      if (categoryId) {
        fetchProducts(categoryId);
      }
    }
  }, [categoryName, categories]);

  const fetchProducts = async (categoryId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/produk?category=${categoryId}`
      );
      const data = await response.json();
      setProducts(data.produks);
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
          products.map((product: Produk) => (
            <ProductCardItem key={product.id_produk} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
