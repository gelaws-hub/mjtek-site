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
      <div className="relative flex flex-col bg-white transition-all duration-300 ease-in-out group-hover:absolute group-hover:z-10 group-hover:scale-[102%] group-hover:[box-shadow:0px_-4px_10px_rgba(0,0,0,0.1),0px_4px_10px_rgba(0,0,0,0.1)] max-w-[250px] rounded-lg border [box-shadow:0px_-2px_5px_rgba(0,0,0,0.03),0px_2px_5px_rgba(0,0,0,0.03)] ">
        {product.media_source && (
          <Link href={productUrl} className="relative flex aspect-[1/1]">
            <Image
              src={product.media_source}
              alt={product.product_name}
              width={300}
              height={300}
              className="h-full w-full overflow-hidden object-cover rounded-t-md"
            />
          </Link>
        )}
        <Link href={productUrl} className="flex flex-col gap-1 p-2">
          <h2 className="mt-1 truncate text-[0.8rem] font-medium group-hover:overflow-visible group-hover:text-clip group-hover:whitespace-normal">
            {product.product_name}
          </h2>
          <p className="mb-1 text-sm font-medium text-blue-900">
            Rp.{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </Link>
        <div className="hidden group-hover:flex p-2 justify-between items-center">
          <AddToCardButton className="w-full" product_id={product.id} afterAddToCart={afterAddToCart} />
        </div>
      </div>
    </div>
  );
}
