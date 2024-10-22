"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>(""); // State for the selected image preview

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
      setSelectedImage(data.data.media[0].source); // Set the default preview image to the first one
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-[10%_45%_45%] gap-4 py-8 px-36 pt-12">
      {/* Thumbnail Section */}
      <div className="flex flex-col gap-2 content-center justify-center p-1">
        {product.data.media.map((media: any, index: number) => (
          <button
            key={media.id}
            className={`w-16 h-16 aspect-square transition-all duration-300 ease-in-out ${
              selectedImage === media.source ? "border-2 border-blue-500" : ""
            }`} // Add border if it's the selected image
            onMouseEnter={() => setSelectedImage(media.source)} // Change the main image on hover
          >
            <Image
              src={media.source}
              alt={media.file_type}
              width={100}
              height={100}
              className="object-cover overflow-hidden w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Main Image Preview */}
      <div className="">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Selected Image"
            width={1000}
            height={1000}
            className="w-full object-contain aspect-square"
          />
        )}
      </div>

      {/* Product Information */}
      <div className="bg-blue-500">
        <h1>{product.data.product_name}</h1>
        <p>Category: {product.data.category.category_name}</p>
        <p>Product Name: {product.data.product_name}</p>
      </div>
    </div>
  );
}
