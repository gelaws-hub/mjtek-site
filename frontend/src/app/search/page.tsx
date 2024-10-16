"use client";

import ProductCardItem from "@/components/product/ProductCardItem";
import { useSearchParams } from "next/navigation";
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
}

interface Category {
  id: number;
  category_name: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
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
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/product`);
      url.searchParams.append("q", encodeURIComponent(searchTerm));
      if (categoryIds.length > 0) {
        url.searchParams.append("categories", categoryIds.join(",")); // Join selected categories
      }

      const response = await fetch(url.toString());
      const data = await response.json();
      setProducts(data.products);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
      const data = await response.json();
      setCategories(data.data); // Assuming data contains an array of categories
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
              <li key={category.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.id}`} className="cursor-pointer">
                  {category.category_name}
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
            products.map((product: Product) => (
              <ProductCardItem key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
