import Image from "next/image";
import Link from "next/link";
// import FavoriteButton from "./FavoriteButton";
import { ProductCardItemProps } from "./ProductInterface";
import AddToCardButton from "./AddToCartButton";

export default function ProductCardItem({
  product,
  afterAddToCart,
}: {
  product: ProductCardItemProps;
  afterAddToCart?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formatProductNameForUrl = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  // Construct the URL using the formatted product name and category
  const productUrl = `/${encodeURIComponent(
    product.category_name.toLowerCase(),
  )}/${formatProductNameForUrl(product.product_name)}-${product.id}`;

  return (
    <div
      // className="bg-white overflow-hidden p-2 rounded-lg transition-transform duration-200 ease-in-out relative hover:scale-105 hover:z-10" >
      className="group relative overflow-visible"
    >
      <div className="relative flex flex-col rounded-lg bg-white p-2 transition-all duration-300 ease-in-out group-hover:absolute group-hover:z-10 group-hover:scale-[102%] group-hover:[box-shadow:0px_-4px_10px_rgba(0,0,0,0.1),0px_4px_10px_rgba(0,0,0,0.1)]">
        {product.media_source && (
          <Link href={productUrl} className="relative flex aspect-[1/1]">
            <Image
              src={product.media_source}
              alt={product.product_name}
              width={300}
              height={300}
              className="h-full w-full overflow-hidden object-cover"
            />
            <button className="absolute right-2 top-2 z-10 rounded-full bg-white shadow-md">
              {/* <FavoriteButton productId={product.id.toString()} /> */}
            </button>
          </Link>
        )}
        <Link href={productUrl} className="flex flex-col gap-1">
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
        </Link>
        <AddToCardButton className="hidden group-hover:block" product_id={product.id} afterAddToCart={afterAddToCart} />
      </div>
    </div>
  );
}
