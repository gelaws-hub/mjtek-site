import { Button } from "@/components/ui/button"

interface CartHeaderProps {
  totalItems: number
  totalWeight: number
  onDeleteAll: () => void
}

export default function CartHeader({ totalItems, totalWeight, onDeleteAll }: CartHeaderProps) {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
        <p className="text-sm text-gray-600">
          {totalItems} produk | {totalWeight.toFixed(2)} kg
        </p>
      </div>
      <Button variant="destructive" onClick={onDeleteAll}>Hapus</Button>
    </div>
  )
}

