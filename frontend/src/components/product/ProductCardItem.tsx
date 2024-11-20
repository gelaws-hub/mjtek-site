import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { Product } from "./ProductInterface";

interface ProductCardItemProps {
  product: Product;
}

export default function ProductCardItem({ product }: ProductCardItemProps) {
  // Function to format the URL-friendly product name
  const formatProductNameForUrl = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  // Construct the URL using the formatted product name and category
  const productUrl = `/${encodeURIComponent(
    product.category.category_name.toLowerCase()
  )}/${formatProductNameForUrl(product.product_name)}-${product.id}`;

  return (
    <Link
      href={productUrl}
      className="bg-white overflow-hidden w-full p-2 rounded-lg hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 ease-in-out"
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
          <button className="absolute top-2 right-2 bg-white rounded-full shadow-md z-10">
            <FavoriteButton productId={product.id.toString()} />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium truncate mt-2">
          {product.product_name}
        </h2>
        <p className="text-blue-900 mb-4 text-sm font-medium">
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
