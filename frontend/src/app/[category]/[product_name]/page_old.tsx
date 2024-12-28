"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import OrderSection from "./components/OrderSection";
import ThumbnailImageSection from "../../../components/product/ThumbnailImageSection";
import ProductRecommendation from "./components/ProductRecommendation_old";
import Loading from "@/app/loading";
import Image from "next/image";

export default function ProductDetail() {
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [product, setProduct] = useState<any>(null);

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
        `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`,
      );
      const data = await response.json();
      setProduct(data);
      setSelectedImage(data.data.media[0].source);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col bg-white">
      <section className="mx-auto flex max-w-[90%] flex-col gap-10 pt-2 md:grid md:max-w-[97%] md:grid-cols-[minmax(0,70%)_minmax(0,30%)] md:pt-12 lg:max-w-[1024px]">
        {/* Thumbnail Section */}
        <div className="top-[10.6rem] md:sticky md:self-start">
          <ThumbnailImageSection
            media={product.data.media}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          {/* Product Main Info */}
          <div>
            {/* Description */}
            <section className="text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.data.description
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/\n/g, "<br />"),
                }}
              />
              <h2 className="mt-4 text-title-lg font-bold">Galeri</h2>
              <div className="col-span-3 grid grid-cols-2 gap-4 p-4 md:gap-6 xl:gap-8">
                {product.data.media.map((media: any, index: number) => (
                  <a
                    key={index}
                    href="#"
                    className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
                  >
                    {" "}
                    <Image
                      src={media.source}
                      alt={`${product.data.product_name} ${index + 1}`}
                      width={1000}
                      height={1000}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      // onLoadingComplete={() => setIsLoading(false)} // Set loading to false when complete
                    />{" "}
                    <span className="relative mb-3 ml-4 inline-block text-sm text-white md:ml-5 md:text-lg">
                      Gambar {index + 1}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Order Section */}
        <div className="sticky top-[10.9rem] md:self-start">
          <h1 className="text-base font-bold lg:text-lg">
            {product.data.product_name}
          </h1>
          <div className="flex flex-row content-center gap-12">
            <h2 className="py-4 text-base font-medium lg:text-2xl">
              Rp.{" "}
              {new Intl.NumberFormat("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.data.price)}
            </h2>
            <h4 className="py-4 text-base font-medium text-blue-900 lg:text-xl">
              <span className="mr-4">|</span>Stok : {product.data.stock}
            </h4>
          </div>
          <OrderSection
            productId={product.data.id}
            price={product.data.price}
            productQty={product.data.stock}
          />
        </div>
      </section>
      {/* Product Recommendation */}
      <div className="mx-auto flex max-w-[1024px] flex-col pt-8">
        <h1 className="text-xl font-bold">Produk Lainya</h1>
        {product.data.category?.id && (
          <ProductRecommendation
            currentProductId={product.data.id}
            category_id={product.data.category.id}
          />
        )}
      </div>
    </div>
  );
}
