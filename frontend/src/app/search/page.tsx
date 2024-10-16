"use client";

import ProductCardItem from "@/components/product/ProductCardItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Produk[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]); // State to store selected categories

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  useEffect(() => {
    if (query) {
      fetchProducts(query, selectedCategories); // Fetch products based on query and selected categories
    }
  }, [query, selectedCategories]); // Add selectedCategories to dependencies

  const fetchProducts = async (searchTerm: string, categoryIds: number[]) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/produk`);
      url.searchParams.append("q", encodeURIComponent(searchTerm));
      if (categoryIds.length > 0) {
        url.searchParams.append("categories", categoryIds.join(",")); // Join selected categories
      }

      const response = await fetch(url.toString());
      const data = await response.json();
      setProducts(data.produks);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kategori`);
      const data = await response.json();
      setCategories(data); // Assuming data contains an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId); // Remove category if already selected
      } else {
        return [...prev, categoryId]; // Add category if not selected
      }
    });
  };

  return (
    <div className="grid grid-cols-[15%_85%]">
      <div className="flex flex-col ml-24">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Filter</h2>
        <div>
          <h3 className="text-xl font-bold">Kategori</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id_kategori} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category.id_kategori}`}
                  value={category.id_kategori}
                  checked={selectedCategories.includes(category.id_kategori)}
                  onChange={() => handleCategoryChange(category.id_kategori)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.id_kategori}`} className="cursor-pointer">
                  {category.nama_kategori}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          <span className="border-x-8 border-blue-900 border-solid mx-4 rounded-sm"></span>
          Menampilkan {totalCount} produk untuk{" "}
          <strong className="text-blue-900">{query}</strong>
        </h1>
        <div className="border-l-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product: Produk) => (
              <ProductCardItem key={product.id_produk} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
