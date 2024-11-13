"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import OrderSection from "./components/OrderSection";
import ThumbnailImageSection from "./components/ThumbnailImageSection";
import ProductRecommendation from "./components/ProductRecommendation";

export default function ProductDetail() {
  const pathname = usePathname();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Extract the product ID from the pathname
  const productId = pathname.split("-").pop(); // Get the last part of the URL

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  const fetchProductById = async (productId: string | null) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
      );
      const data = await response.json();
      setProduct(data);
      setSelectedImage(data.data.media[0].source);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section className="grid grid-cols-[minmax(0,30%)_minmax(0,45%)_minmax(0,25%)] gap-10 pt-12 max-w-[1024px] mx-auto">
        {/* Thumbnail Section */}
        <div className="self-start sticky top-[10.6rem] h-auto">
          <ThumbnailImageSection
            media={product.data.media}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Product Main Info */}
        <section>
          <h1 className="text-lg font-bold">{product.data.product_name}</h1>
          <div className="flex flex-row content-center gap-12">
            <h2 className="text-2xl font-medium py-4">
              Rp.{" "}
              {new Intl.NumberFormat("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.data.price)}
            </h2>
            <h4 className="text-xl font-medium text-blue-900 py-4">
              <span className="mr-4">|</span>Stok : {product.data.stock}
            </h4>
          </div>

          {/* Description */}
          <section className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: product.data.description
                  .replace(/\n\n/g, "</p><p>")
                  .replace(/\n/g, "<br />"),
              }}
            />
          </section>
        </section>

        {/* Order Section */}
        <section className="self-start sticky top-[10.9rem] h-auto">
          <OrderSection
            price={product.data.price}
            productQty={product.data.stock}
          />
        </section>
      </section>

      {/* Product Recommendation */}
      <section className="pt-8 max-w-[1024px] mx-auto flex flex-col">
        <h1 className="text-xl font-bold">Produk Lainya</h1>
        {product.data.category?.id && (
          <ProductRecommendation
            currentProductId={product.data.id}
            category_id={product.data.category.id}
          />
        )}
      </section>
    </div>
  );
}
