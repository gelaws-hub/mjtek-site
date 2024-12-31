"use client";

import { useEffect, useState } from "react";
import useCheckSession from "../(authentication)/auth/useCheckSession";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import ProductCardItem from "@/components/product/ProductCardItem";

export default function FavoritePage() {
  const { loading, error, isAuthenticated, roleName, user } = useCheckSession();
  const [products, setProducts] = useState<ProductCardItemProps[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchProducts = async () => {
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
    };

    fetchProducts();
  }, [isAuthenticated, user]);

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold">
        <span className="mx-4 rounded-md border-x-[6px] border-solid border-blue-900"></span>
        Produk yang disukai
      </h1>
      <div className="grid grid-cols-2 p-4 md:grid-cols-[repeat(auto-fit,minmax(146px,1fr))]">
        {products.length > 0 ? (
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
