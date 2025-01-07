import Image from 'next/image'
import { Product } from './types'

export function ProductImage({ product }: { product: Product }) {
  // In a real application, you would fetch the image URL based on the productId
  // For this example, we'll use a placeholder image
  return (
    <div className="w-16 h-16 relative">
      <Image
        src={`${product.media_source}`}
        alt={`Product ${product.product_name}`}
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />
    </div>
  )
}

