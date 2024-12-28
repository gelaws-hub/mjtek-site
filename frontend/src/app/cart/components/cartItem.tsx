import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "./types";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, changeBy: number) => void;
  onCheckItem: (id: number, isChecked: boolean) => void;
  onDeleteItem: (id: number) => void;
  onAddToFavorite: (id: number) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onCheckItem,
  onDeleteItem,
  onAddToFavorite,
}: CartItemProps) {
  return (
    <div className="flex items-center rounded-lg border-b bg-white p-4">
      <input
        type="checkbox"
        checked={item.is_selected}
        onChange={(e) => onCheckItem(item.id, e.target.checked)}
        className="m-1 h-3 w-3 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <Image
        src={item.media_source}
        alt={item.product_name}
        width={100}
        height={100}
        className="mr-4"
      />
      <div className="flex-grow">
        <h2 className="font-semibold">{item.product_name}</h2>
        <p className="text-sm text-gray-600">ID: {item.id}</p>
        <p className="text-sm text-gray-600">
          Weight: {item.estimated_weight} kg
        </p>
        <p className="text-sm text-gray-600">Stock: {item.stock}</p>
        <p className="font-bold">Rp {item.price.toLocaleString()}</p>
        <div className="mt-2 flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(item.id, -1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(item.id, +1)}
            disabled={item.quantity >= item.stock}
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onAddToFavorite(item.id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDeleteItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
