"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardItemProps } from "@/components/product/ProductInterface";
import Link from "next/link";

export function ProductRecommendation({
  products,
}: {
  products: ProductCardItemProps[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCards(1);
      else if (width < 768) setVisibleCards(2);
      else if (width < 1024) setVisibleCards(3);
      else setVisibleCards(4);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const cardWidth = clientWidth / visibleCards;
      const scrollAmount = cardWidth * visibleCards;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

      setTimeout(() => {
        if (scrollRef.current) {
          setShowLeftArrow(scrollRef.current.scrollLeft > 0);
          setShowRightArrow(
            scrollRef.current.scrollLeft <
              scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
          );
        }
      }, 100);
    }
  };

  const formatProductNameForUrl = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="relative h-[350px]">
      <div ref={scrollRef} className="flex space-x-4 scrollbar-none">
        {products.map((product) => (
          <Link
            href={`/${encodeURIComponent(
              product.category_name.toLowerCase(),
            )}/${formatProductNameForUrl(product.product_name)}-${product.id}`}
            key={product.id}
            className="group w-64 transform transition-transform duration-300 ease-in-out sm:w-72 rounded-lg"
          >
            <div className="relative">
            <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out relative group-hover:scale-105 group-hover:z-10 group-hover:overflow-visible group-hover:shadow-lg group-hover:bg-white">
                <Image
                  src={product.media_source ? product.media_source : ""}
                  alt={product.product_name}
                  width={288}
                  height={288}
                  className="h-48 w-full object-cover rounded-t-md"
                />
                <div className="flex flex-grow flex-col p-4">
                  <h3 className="mb-2 truncate text-md font-semibold group-hover:whitespace-normal">
                    {product.product_name}
                  </h3>
                  <p className="mt-auto text-gray-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(product.price)}
                  </p>
                  <Button className="mt-2 w-full">+ Keranjang</Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 transform"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
