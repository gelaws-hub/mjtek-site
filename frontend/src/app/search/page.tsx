"use client";

import ProductCardItem from "@/components/product/ProductCardItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

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

function SearchResultsComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product?q=${encodeURIComponent(
            query ?? ""
          )}`
        );
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [query]);

  useEffect(() => {
    const fetchProducts = async (searchTerm: string, categoryIds: number[]) => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/product`);
        url.searchParams.append("q", encodeURIComponent(searchTerm));
        if (categoryIds.length > 0) {
          url.searchParams.append("categories", categoryIds.join(","));
        }

        const response = await fetch(url.toString());
        const data = await response.json();
        setProducts(data.products);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (query) {
      fetchProducts(query, selectedCategories);
    }
  }, [query, selectedCategories]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="grid grid-cols-[25%_75%] mt-0">
      <div className="flex flex-col ml-36 border-r-2 border-r-gray-200 ">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 pt-6">Filter</h2>
        <div>
          <h3 className="text-xl font-semibold mb-2">Kategori</h3>
          <ul className="ml-4">
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
                <label
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer"
                >
                  {category.category_name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto py-4 pl-8 pr-28">
        <h1 className="text-2xl font-bold mb-4">
          <span className="border-x-8 border-blue-900 border-solid mx-4 rounded-md"></span>
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

export default function SearchResults() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsComponent />
      </Suspense>
  );
}
