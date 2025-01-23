"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "@/components/product/ProductCardItem";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import { Button } from "@/components/ui/button";
import ProductSkeleton from "@/components/product/productSkeleton";

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
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const categoryName = pathname.split("/")[1].toLowerCase(); // Convert categoryName to lowercase
  const [data, setData] = useState<any>(null);
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const pageParam = Number(params.get("page")) || 1;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
      );
      setCategories(response.data.data); // Assuming response.data contains an array of categories
      setLoading(false)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (categoryName) {
      const categoryId = categories.find(
        (cat) =>
          cat.category_name.toLowerCase().replace(/\s+/g, "-") === categoryName,
      )?.id;
      if (categoryId) {
        fetchProducts(categoryId);
      }
    }
  }, [categoryName, categories, pageParam]);

  const fetchProducts = async (categoryId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product?categories=${categoryId}&page=${pageParam}`,
      );
      const data = await response.json();
      setData(data);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  const changeParams = (newPage: number) => {
    const query = new URLSearchParams();
    query.set("page", newPage.toString());
    router.push(`?${query.toString()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {data?.totalCount} Produk Dengan Kategori{" "}
        <span className="text-blue-900">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </span>
      </h1>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-6 w-full">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton key={i} className="md:w-[170px] w-[150px] max-w-[200px] h-[250px]" />
          ))
        ) : products.length > 0 ? (
          products.map((product: ProductCardItemProps) => (
            <ProductCardItem key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <div className="w-full flex justify-center items-center space-x-4 mt-4 gap-4">
        <Button onClick={() => changeParams(Number(pageParam) - 1)} disabled={pageParam === 1} >
          Prev
        </Button>
        <span>{pageParam} dari {data?.totalPages}</span>
        <Button onClick={() => changeParams(Number(pageParam) + 1)} disabled={products.length < 10}>
          Prev
        </Button>
      </div>
    </div>
  );
}
