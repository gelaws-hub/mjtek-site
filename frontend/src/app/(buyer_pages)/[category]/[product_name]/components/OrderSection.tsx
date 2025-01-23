"use client";

import { useState } from "react";
import { Share01Icon } from "@/components/icons/Share01Icon";
import { FavouriteIcon } from "@/components/icons/FavouriteIcon";
import QuantitySelector from "@/components/product/QtySelector";
import { ShoppingCart02Icon } from "@/components/icons/ShoppingCart02Icon";
import FavoriteButton from "@/components/product/FavoriteButton";

interface OrderSectionProps {
  price: number;
  productQty?: number;
  productId: string;
}

export default function OrderSection({
  price,
  productQty,
  productId,
}: OrderSectionProps) {
  const [qty, setQty] = useState<number>(1);
  const [copySuccess, setCopySuccess] = useState<string>("");

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopySuccess("Berhasil copy URL ke clipboard!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      (error) => {
        console.error("Failed to copy URL:", error);
      }
    );
  };

  return (
    <>
      <aside className="hidden md:block border border-gray-400 md:p-4 rounded-lg h-auto">
        <p className="md:block font-semibold text-base lg:text-lg mb-2">
          Atur jumlah pembelian
        </p>
        <div className="flex flex-row items-center justify-between py-2 text-sm lg:text-base">
          <label htmlFor="quantity-input" className="font-medium">
            Jumlah :
          </label>
          <QuantitySelector
            qty={qty}
            onQtyChange={setQty}
            maxQty={productQty}
          />
        </div>
        <div className="flex flex-row items-center justify-between py-2 text-sm lg:text-base">
          <p className="font-normal">Subtotal :</p>
          <p className="font-semibold ml-auto text-blue-900">
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(price * qty)}
          </p>
        </div>
        <button className="bg-blue-950 text-white py-2 font-medium rounded-md h-10 w-full">
          Beli
        </button>
        <div className="flex flex-row items-center justify-around py-2 relative">
          <button
            onClick={copyToClipboard}
            className="flex items-center font-medium text-gray-700 hover:bg-slate-100 p-2 rounded-lg"
          >
            <Share01Icon height={16} className="text-gray-700" />
            <span className="text-xs">Bagikan</span>
          </button>
          {copySuccess && (
            <p className="text-blue-900 text-xs mt-1 absolute top-10">
              {copySuccess}
            </p>
          )}
          <span className="text-gray-500 text-xs">|</span>
            <FavoriteButton productId={productId} text="Favorit"/>
        </div>
      </aside>
      {/* Mobile */}
      <aside className="md:hidden fixed bottom-0 p-2 bg-white w-full flex gap-2 items-center px-4 justify-around">
        <QuantitySelector
          qty={qty}
          onQtyChange={setQty}
          maxQty={productQty}
          className="p-2 border-[1px] border-gray-400 rounded-lg"
        />
        <div className="p-2 border-[1px] border-gray-400 rounded-lg">
          <ShoppingCart02Icon
            height={24}
            width={24}
            className="text-gray-700 "
          />
        </div>
        <button className="bg-blue-950 text-white font-medium rounded-md h-10 px-10">
          Beli
        </button>
      </aside>
    </>
  );
}
