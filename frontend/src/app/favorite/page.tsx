"use client";

import { useEffect, useState } from "react";
import useCheckSession from "../(authentication)/auth/useCheckSession";
import { Product } from "@/components/product/ProductInterface";
import ProductCardItem from "@/components/product/ProductCardItem";

export default function FavoritePage() {
  const { loading, error, isAuthenticated, roleName, user } = useCheckSession();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/favorite`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const favProducts = data.favorites.flatMap((favorite: any) => favorite.product);
        setProducts(favProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [isAuthenticated, user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[60%] mx-auto">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCardItem key={product.id} product={product} />
        ))
      ) : (
        <p>No favorite products found.</p>
      )}
    </div>
  );
}
