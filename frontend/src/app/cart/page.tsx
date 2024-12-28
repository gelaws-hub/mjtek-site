"use client";

import { useEffect, useState } from "react";
import { CartItem as CartItemType } from "./components/types";
import CartHeader from "./components/cartHeader";
import CartItem from "./components/cartItem";
import CartFooter from "./components/cartFooter";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Ensure these computations default to valid values if `cartItems` is empty
  const totalItems = cartItems.length || 0;
  const totalWeight = cartItems.reduce(
    (total, item) => total + (parseFloat(item.estimated_weight) || 0),
    0,
  );
  const checkedItems = cartItems.filter((item) => item.is_selected);
  const checkedTotalPrice = checkedItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0,
  );

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

  const toCart = async (id_product: number, quantity = 1) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_produk: id_product,
          quantity: quantity,
        }),
        credentials: "include",
      });
      const data = await response.json();
      setCartItems((items) =>
        items.map((item) =>
          item.id === data.id ? { ...item, quantity: data.quantity } : item,
        ),
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleQuantityChange = (id: number, changeBy: number) => {
    toCart(id, changeBy);
  };

  const handleCheckItem = (id: number, isChecked: boolean) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, is_selected: isChecked } : item,
      ),
    );
  };

  const handleCheckAll = (isChecked: boolean) => {
    setCartItems((items) =>
      items.map((item) => ({ ...item, is_selected: isChecked })),
    );
  };

  const handleDeleteItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    setCartItems([]);
  };

  const handleAddToFavorite = (id: number) => {
    console.log(`Added product ${id} to favorites`);
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
        onDeleteAll={handleDeleteAll}
      />
      <div className="flex-grow p-4 bg-slate-50">
        <div className="mb-1 p-2 border-b bg-white">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={cartItems.every((item) => item.is_selected)}
              onChange={(e) => handleCheckAll(e.target.checked)}
              className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600 m-1 cursor-pointer"
            />
            Check semua
          </label>
        </div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onCheckItem={handleCheckItem}
            onDeleteItem={handleDeleteItem}
            onAddToFavorite={handleAddToFavorite}
          />
        ))}
      </div>
      <CartFooter totalPrice={checkedTotalPrice} />
    </div>
  );
}
