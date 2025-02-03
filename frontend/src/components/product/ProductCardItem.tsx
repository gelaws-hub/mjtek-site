import Image from "next/image";
import Link from "next/link";
import { ProductCardItemProps } from "./ProductInterface";
import AddToCardButton from "./AddToCartButton";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import ProductSkeleton from "./productSkeleton";

export default function ProductCardItem({
  className,
  product,
  afterAddToCart,
  loading = false,
}: {
  className?: string;
  product: ProductCardItemProps;
  afterAddToCart?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
}) {
  const formatProductNameForUrl = (productName: string) => {
    return productName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
  };

  // Construct the URL using the formatted product name and category
  const productUrl = `/${encodeURIComponent(
    product.category_name.toLowerCase(),
  )}/${formatProductNameForUrl(product.product_name)}-${product.id}`;

  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="group relative overflow-visible">
      <div
        className={cn(
          "relative flex max-w-[300px] flex-col rounded-lg border bg-white transition-all duration-300 ease-in-out [box-shadow:0px_-2px_5px_rgba(0,0,0,0.03),0px_2px_5px_rgba(0,0,0,0.03)] group-hover:z-10 group-hover:scale-[102%]",
          className,
        )}
      >
        {product.media_source && (
          <Link
            scroll={true}
            href={productUrl}
            className="relative flex aspect-[1/1] overflow-hidden"
          >
            <img
              src={product.media_source}
              alt={product.product_name}
              width={300}
              height={300}
              className="h-full w-full overflow-hidden rounded-t-md object-cover"
            />
            {product.stock <= 0 && (
              <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
                <p className="text-xs md:text-sm text-white">Habis</p>
              </div>
            )}
          </Link>
        )}
        <Link
          scroll={true}
          href={productUrl}
          className="flex flex-col gap-1 p-2"
        >
          <h2 className="mt-1 line-clamp-2 h-12 text-[0.8rem] font-medium">
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
        <div className="items-center justify-between p-2 group-hover:flex">
          <AddToCardButton
            className="h-9 w-full bg-blue-900 hover:bg-blue-950"
            product_id={product.id}
            afterAddToCart={afterAddToCart}
          >
            <ShoppingCart className="mr-1 h-4 w-4" /> Keranjang
          </AddToCardButton>
        </div>
      </div>
    </div>
  );
}
