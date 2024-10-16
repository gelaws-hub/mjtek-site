import Image from "next/image";
import Link from "next/link";
import { FavouriteIcon } from "../icons/FavouriteIcon";

interface Media {
  source: string;
  file_type: string;
}

interface Product {
  id: number;
  product_name: string;
  price: number;
  media: Media[];
  category: {
    id: number;
    category_name: string;
  };
}

interface ProductCardItemProps {
  product: Product;
}

export default function ProductCardItem({ product }: ProductCardItemProps) {
  return (
    <Link
      href={`/${encodeURIComponent(product.category.category_name)}/${encodeURIComponent(product.product_name)}`}
      className="bg-white overflow-hidden w-full p-2"
    >
      {product.media && product.media.length > 0 && (
        <div className="relative flex aspect-[1/1]">
          <Image
            src={product.media[0].source}
            alt={product.product_name}
            width={300}
            height={300}
            className="w-full h-full object-cover overflow-hidden"
          />
          <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10">
            <FavouriteIcon width={20} height={20} />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-semibold truncate mt-2">
          {product.product_name}
        </h2>
        <p className="text-blue-900 font-semibold mb-4">
          Rp.{" "}
          {new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(product.price)}
        </p>
      </div>
    </Link>
  );
}
