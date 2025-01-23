import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "./types";
import FavoriteButton from "@/components/product/FavoriteButton";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, changeBy: number) => void;
  onCheckItem: (id: number, isChecked: boolean) => void;
  onDeleteItem: (id: number) => void;
  onAddToFavorite: (id: number) => void;
  isLoading?: boolean;
}

export default function CartItem({
  item,
  onQuantityChange,
  onCheckItem,
  onDeleteItem,
  onAddToFavorite,
  isLoading = false,
}: CartItemProps) {
  return (
    <div className="mb-2 flex flex-col items-center  rounded-md border bg-white p-4 pb-2">
      <div className="flex w-full flex-row items-center justify-start border-b border-opacity-30 pb-1">
        <input
          type="checkbox"
          checked={item.is_selected}
          onChange={(e) => onCheckItem(item.product_id, e.target.checked)}
          className="m-1 my-auto h-4 w-4 cursor-pointer rounded-md border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />
        <Image
          src={item.media_source}
          alt={item.product_name}
          width={100}
          height={100}
          className="mx-2 h-[100px] w-[100px] rounded-lg object-cover"
        />
        <div className="flex-grow">
          <h2 className="line-clamp-1 font-semibold">{item.product_name}</h2>
          <p className="text-sm text-gray-600">ID: {item.product_id}</p>
          <p className="text-sm text-gray-600">
            Berat: {item.estimated_weight} kg
          </p>
          <div className="flex items-center justify-start">
            <p className="font-bold">Rp {item.price.toLocaleString()}</p>
            <p className="ml-auto mr-2 text-sm text-gray-600">
              Stock: {item.stock}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full justify-start pl-7">
        <div className="flex items-center gap-2 border-gray-200 text-gray-600 hover:border-gray-400">
          <FavoriteButton height="7" productId={item.product_id} />
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDeleteItem(item.product_id)}
            className="h-7 w-7 transition-all duration-300 ease-in-out hover:bg-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="ml-auto flex items-center transition-all duration-300 ease-in-out">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(item.product_id, -1)}
            disabled={item.quantity <= 1 || isLoading}
            className="h-7 w-7 transition-all duration-300 ease-in-out hover:bg-blue-400"
          >
            -
          </Button>
          <span className="mx-2 w-5 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(item.product_id, +1)}
            disabled={item.quantity >= item.stock || isLoading}
            className="h-7 w-7 transition-all duration-300 ease-in-out hover:bg-blue-400"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
