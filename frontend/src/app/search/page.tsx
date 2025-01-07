"use client";

import ProductCardItem from "@/components/product/ProductCardItem";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface Category {
  id: number;
  category_name: string;
}

function SearchResultsComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const pageParam = searchParams.get("page");
  const [page, setPage] = useState<number>(pageParam ? parseInt(pageParam) : 1);
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
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
        const url = new URL(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=${page}`
        );
        url.searchParams.append("q", encodeURIComponent(searchTerm));
        if (categoryIds.length > 0) {
          url.searchParams.append("categories", categoryIds.join(","));
        }

        const response = await fetch(url.toString());
        const data = await response.json();
        setProducts(data.products);
        setTotalCount(data.totalCount);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (query) {
      fetchProducts(query, selectedCategories);
    }
  }, [query, selectedCategories, page]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="grid grid-cols-[25%_75%] mt-0 bg-white min-h-screen">
      <div className="flex flex-col lg:ml-20 border-r border-r-gray-200 ">
        <h2 className="text-lg md:text-3xl font-bold text-blue-900 mb-4 pt-6">Filter</h2>
        <div>
          <h3 className="text-md md:text-xl font-semibold mb-2">Kategori</h3>
          <ul className="text-xs md:text-sm px-1">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center mb-2 truncate">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-1 w-2 rounded-full h-2 bg-blue-900"
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
      <div className="mr-auto py-4 pl-8 max-w-[968px]">
        <h1 className="text-md lg:text-2xl font-bold mb-4">
          <span className="border-x-6 border-blue-900 border-solid lg:mx-4 rounded-md mr-1"></span>
          Menampilkan {totalCount} produk untuk{" "}
          <strong className="text-blue-900">{query}</strong>
        </h1>
        <div className="border-l-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.length > 0 ? (
            products.map((product: ProductCardItemProps) => (
              <ProductCardItem key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
        {products.length > 0 && (
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-900 px-4 py-2 text-white rounded-md"
              onClick={handlePrev}
            >
              Prev
            </button>
            <span className="mx-4">
              Page {page} of {totalPages}
            </span>
            <button
              className="bg-blue-900 px-4 py-2 text-white rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
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
