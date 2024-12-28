"use client";

import { useEffect, useState } from "react";
import { Heart, Share2, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ImageGallery } from "./components/ImageGallery";
import { ProductRecommendation } from "./components/ProductRecommendation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import QuantitySelector from "@/components/product/QtySelector";
import { ShoppingCart02Icon } from "@/components/icons/ShoppingCart02Icon";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export default function ProductDetailPage() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const pathname = usePathname();
  const [qty, setQty] = useState(0);

  const [product, setProduct] = useState<any>(null);
  const productId = pathname.split("-").pop();

  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductCardItemProps[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product?limit=10&page=1&categories=${product.category.id},${product.category.id + 1},${product.category.id - 1}`,
        );
        const data = await response.json();
        setRecommendedProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
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
    <div className="container mx-auto max-w-7xl bg-white px-6 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Product Image Gallery */}
        <div className="lg:sticky lg:top-[9.8rem] lg:w-1/2 lg:self-start">
          <ImageGallery images={product.media} />
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
        <ProductRecommendation products={recommendedProducts} />
      </div>

      {/* Order Section */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="">
              <h3 className="truncate font-semibold hidden lg:block">{product.product_name}</h3>
              <p className="text-base md:text-lg font-bold">{formatPrice(product.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <QuantitySelector
                qty={qty}
                onQtyChange={setQty}
                maxQty={product.stock}
              />
              <Button>
                <ShoppingCart02Icon className="text-white"  /> <span className="hidden md:block">Add to Cart</span>
              </Button>
              <Button variant="outline">
                <Heart className="h-4 w-4" />
              </Button>

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
    </div>
  );
}
