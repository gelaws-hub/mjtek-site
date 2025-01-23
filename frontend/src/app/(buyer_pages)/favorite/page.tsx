"use client";

import { useEffect, useState } from "react";
import useCheckSession from "../../(authentication)/auth/useCheckSession";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import ProductCardItem from "@/components/product/ProductCardItem";
import ProductSkeleton from "@/components/product/productSkeleton";
import useAuth from "@/hooks/useAuth";

export default function FavoritePage() {
  useAuth(["buyer"]);
  const { loading, error, isAuthenticated, roleName, user } = useCheckSession();
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/favorite`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const favProducts = data.favorites.flatMap((favorite: any) => favorite);
        setProducts(favProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoadingProducts(false);
    };

    fetchProducts();
  }, [isAuthenticated, user]);

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold">
        <span className="mx-4 rounded-md border-x-[6px] border-solid border-blue-900"></span>
        Produk yang disukai
      </h1>
      <div className="grid grid-cols-2 p-4 md:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">
        {loadingProducts ? (
          Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))
        ) : (
          <p>No favorite products found.</p>
        )}
      </div>
    </div>
  );
}
