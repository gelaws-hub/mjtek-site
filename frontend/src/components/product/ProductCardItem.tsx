import Image from "next/image";
import Link from "next/link";
// import FavoriteButton from "./FavoriteButton";
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
    product.category.category_name.toLowerCase(),
  )}/${formatProductNameForUrl(product.product_name)}-${product.id}`;

  return (
    <Link
      href={productUrl}
      // className="bg-white overflow-hidden p-2 rounded-lg transition-transform duration-200 ease-in-out relative hover:scale-105 hover:z-10" >
      className="group relative overflow-visible"
    >
      <div className="p-2 flex flex-col relative group-hover:absolute group-hover:scale-[102%] group-hover:shadow-lg group-hover:z-10 transition-all duration-300 ease-in-out bg-white rounded-lg">
        {product.media && product.media.length > 0 && (
          <div className="relative flex aspect-[1/1]">
            <Image
              src={product.media[0].source}
              alt={product.product_name}
              width={300}
              height={300}
              className="h-full w-full overflow-hidden object-cover"
            />
            <button className="absolute right-2 top-2 z-10 rounded-full bg-white shadow-md">
              {/* <FavoriteButton productId={product.id.toString()} /> */}
            </button>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h2 className="mt-2 truncate text-[0.8rem] font-medium group-hover:overflow-visible group-hover:text-clip group-hover:whitespace-normal">
            {product.product_name}
          </h2>
          <p className="mb-4 text-sm font-medium text-blue-900">
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
