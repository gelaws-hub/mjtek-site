"use client";

import { useEffect, useState } from "react";
import { CartItem as CartItemType } from "./components/types";
import CartHeader from "./components/cartHeader";
import CartItem from "./components/cartItem";
import CartFooter from "./components/cartFooter";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import { ProductRecommendation } from "@/components/product/ProductRecommendation";
import { errorToast, successToast } from "@/components/toast/reactToastify";
import { redirect, useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalWeight = cartItems.reduce(
    (total, item) => total + (parseFloat(item.estimated_weight) || 0),
    0,
  );
  const checkedItems = cartItems.filter((item) => item.is_selected);

  const checkedTotalPrice = checkedItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const checkedTotalItems = checkedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const [isLoading, setIsLoading] = useState(false);

  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductCardItemProps[]
  >([]);

  const router = useRouter();

  // Fetch recommended products
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const categoryIds = cartItems.map((item) => item.category_id).join(",");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=1&categories=${categoryIds}`,
        );
        const data = await response.json();
        setRecommendedProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchRecommendedProducts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      // Ensure the response structure is as expected
      setCartItems(data.carts || []);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  const toCart = async (product_id: number, quantity = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          quantity: quantity,
        }),
        credentials: "include",
      });
      const data = await response.json();
      setCartItems((items) =>
        items.map((item) =>
          item.product_id === data.product_id
            ? { ...item, quantity: data.quantity }
            : item,
        ),
      );
      setIsLoading(false);
    } catch (error) {
      errorToast("Error saat memperbarui keranjang", "top-left");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [refresh]);

  const handleQuantityChange = (product_id: number, changeBy: number) => {
    toCart(product_id, changeBy);
  };

  const handleCheckItem = async (
    product_id?: number,
    is_selected?: boolean,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${product_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_selected: is_selected,
          }),
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setCartItems((items) =>
          items.map((item) =>
            item.product_id === data.updatedCartItem.product_id
              ? { ...item, is_selected: data.updatedCartItem.is_selected }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckAll = async (isChecked: boolean) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_selected: isChecked,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems((items) =>
          items.map((item) => {
            const updatedItem = data.cartItems.find(
              (cartItem: any) => cartItem.product_id === item.product_id,
            );
            return updatedItem
              ? { ...item, is_selected: updatedItem.is_selected }
              : item;
          }),
        );
      } else {
        console.error("Failed to update cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (product_id?: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart${product_id ? `/${product_id}` : ""}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        if (product_id) {
          // Delete a single item
          setCartItems((items) =>
            items.filter((item) => item.product_id !== product_id),
          );
        } else {
          // Clear the entire cart
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddToFavorite = (product_id: number) => {
    console.log(`Added product ${product_id} to favorites`);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.ok) {
        successToast("Checkout berhasil", "top-left");
        router.push(`/transactions/${data.transactionId}`);
        setRefresh((refresh) => !refresh);
      } else {
        errorToast("Checkout gagal", "top-left");
        setRefresh((refresh) => !refresh);
      }
    } catch (error) {
      errorToast("Checkout gagal", "top-left");
      setRefresh((refresh) => !refresh);
    }
  };

  if (!cartItems) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <CartHeader
        totalItems={totalItems}
        totalWeight={totalWeight}
        onDeleteAll={() => handleDelete()}
      />
      {cartItems.length !== 0 && (
        <div className="mb-1 border-b p-2">
          <label className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={cartItems.every((item) => item.is_selected)}
              onChange={(e) => handleCheckAll(e.target.checked)}
              className="m-1 h-3 w-3 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
            />
            Check semua
          </label>
        </div>
      )}
      <div className="flex-grow p-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.product_id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onCheckItem={handleCheckItem}
            onDeleteItem={handleDelete}
            onAddToFavorite={handleAddToFavorite}
            isLoading={isLoading}
          />
        ))}
      </div>
      {/* Product Recommendations */}
      <div className="mt-12 space-y-4">
        <h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
        <ProductRecommendation
          products={recommendedProducts}
          afterAddToCart={setRefresh}
        />
      </div>
      <CartFooter
        onCheckout={handleCheckout}
        totalPrice={checkedTotalPrice}
        totalItems={checkedTotalItems}
      />
    </div>
  );
}
