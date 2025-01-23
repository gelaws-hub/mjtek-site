"use client";

import { useEffect, useState } from "react";
import { Heart, Share2, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "./components/ImageGallery";
import { ProductRecommendation } from "../../../../components/product/ProductRecommendation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import QuantitySelector from "@/components/product/QtySelector";
import { ShoppingCart02Icon } from "@/components/icons/ShoppingCart02Icon";
import AddToCartButton from "@/components/product/AddToCartButton";
import FavoriteButton from "@/components/product/FavoriteButton";
import { AdvancedImageGallery } from "./components/AdvancedImageGallery";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export default function ProductDetailPage() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const pathname = usePathname();
  const [qty, setQty] = useState(1);

  const [product, setProduct] = useState<any>(null);
  const productId = pathname.split("-").pop();
  const [showAdvancedImage, setShowAdvancedImage] = useState(false);

  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductCardItemProps[]
  >([]);

  const [reccomendationLoading, setRecommendationLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setRecommendationLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=1&categories=${product.category.id},${product.category.id + 1},${product.category.id - 1}`,
        );
        const data = await response.json();
        setRecommendedProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setRecommendationLoading(false);
    };

    fetchProducts();
  }, [product]);

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
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct share URL, so we'll just copy the link
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard. You can now paste it on Instagram.");
        return;
      default:
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard.");
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  if (!product) {
    return <p>Loading</p>;
  }

  return (
    <div className="mx-auto w-full bg-white pb-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Product Image Gallery */}
        <div className="lg:sticky lg:top-[9rem] lg:w-1/3 lg:self-start">
          <ImageGallery setShowAdvanced={setShowAdvancedImage} images={product.media} />
        </div>

        {/* Product Info and Order Section */}
        <div className="space-y-6 lg:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">{product.product_name}</h1>
          <p className="mb-4 text-2xl font-semibold">
            {formatPrice(product.price)}
          </p>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Product Details</h2>
            <ul className="list-inside list-disc space-y-1">
              <li>Category: {product.category.category_name}</li>
              <li>Brand: {product.brand.brand_name}</li>
              <li>
                RAM Type:{" "}
                {product.product_ram_type
                  .map((ramType: any) => ramType.ram_type.ram_type_name)
                  .join(", ")}
              </li>
              <li>Estimated Weight: {product.estimated_weight} kg</li>
              <li>Stock: {product.stock} units</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="mt-12 space-y-4">
        <h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
        <ProductRecommendation products={recommendedProducts} loading={reccomendationLoading} />
      </div>

      {/* Order Section */}
      <div className="z-[99] fixed bottom-0 left-0 right-0 m-2 mb-1 rounded-md border bg-white bg-opacity-50 shadow-lg backdrop-blur-lg md:backdrop-blur-none md:bg-opacity-100">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="">
              <h3 className="hidden truncate font-semibold lg:block">
                {product.product_name}
              </h3>
              <p className="text-sm font-bold md:text-lg">
                Rp. {(product.price * qty).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex h-5 items-center gap-1">
              <QuantitySelector
                qty={qty}
                onQtyChange={setQty}
                maxQty={product.stock}
              />
              <AddToCartButton
                className="border bg-inherit"
                product_id={product.id}
              >
                <ShoppingCart02Icon className="" />{" "}
              </AddToCartButton>
              <FavoriteButton height="10" productId={product.id} />
              {/* Share */}
              <Popover
                open={showShareOptions}
                onOpenChange={setShowShareOptions}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="grid gap-4 p-4">
                    <Button
                      onClick={() => handleShare("whatsapp")}
                      className="w-full"
                    >
                      WhatsApp
                    </Button>
                    <Button
                      onClick={() => handleShare("facebook")}
                      className="w-full"
                    >
                      <Facebook className="mr-2 h-4 w-4" /> Facebook
                    </Button>
                    <Button
                      onClick={() => handleShare("instagram")}
                      className="w-full"
                    >
                      <Instagram className="mr-2 h-4 w-4" /> Instagram
                    </Button>
                    <Button
                      onClick={() => handleShare("copy")}
                      className="w-full"
                    >
                      Copy Link
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      {showAdvancedImage && (
        <AdvancedImageGallery
          images={product.media}
          onClose={() => setShowAdvancedImage(false)}
        />
      )}
    </div>
  );
}
