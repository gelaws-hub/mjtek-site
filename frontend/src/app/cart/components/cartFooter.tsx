import { Button } from "@/components/ui/button"

interface CartFooterProps {
  totalPrice: number
}

export default function CartFooter({ totalPrice }: CartFooterProps) {
  return (
    <div className="bg-white shadow-md p-4 sticky bottom-0">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total:</p>
          <p className="text-xl font-bold">Rp {totalPrice.toLocaleString()}</p>
        </div>
        <Button size="lg">Checkout</Button>
      </div>
    </div>
  )
}

