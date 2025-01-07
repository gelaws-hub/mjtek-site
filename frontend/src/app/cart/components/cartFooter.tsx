import { Button } from "@/components/ui/button";

interface CartFooterProps {
  onCheckout: () => void;
  totalPrice: number;
  totalItems: number;
}

export default function CartFooter({
  onCheckout,
  totalPrice,
  totalItems = 0,
}: CartFooterProps) {
  return (
    <div className="sticky bottom-0 rounded-md border bg-white p-4 z-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Total : {" "}
            <span className="text-sm text-blue-800">{totalItems} Barang</span>
          </p>
          <p className="text-xl font-bold">Rp {totalPrice.toLocaleString()}</p>
        </div>
        <Button size="lg" onClick={onCheckout}>Checkout</Button>
      </div>
    </div>
  );
}
