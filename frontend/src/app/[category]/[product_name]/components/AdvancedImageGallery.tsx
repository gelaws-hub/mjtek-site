"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AdvancedImageGalleryProps {
  images: { id: number; source: string; file_type: string }[];
  onClose: () => void;
}

export function AdvancedImageGallery({
  images,
  onClose,
}: AdvancedImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const updateArrows = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0);
        setShowRightArrow(
          scrollRef.current.scrollLeft <
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
        );
      }
    };

    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

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

  return (
    <>
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 z-[999] m-4 flex items-center justify-center bg-opacity-20 backdrop-blur-sm">
        <Card className="z-[999] flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-white">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-bold">Image Gallery</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="relative flex-grow p-2">
            <div className="aspect-square cursor-pointer rounded-lg max-h-[450px] mx-auto">
              <Image
                src={images[currentIndex].source}
                alt={`Product image ${currentIndex + 1}`}
                width={1024}
                height={1024}
                className="rounded-md object-contain h-full w-full"
              />
            </div>

            <Button
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-blue-950 bg-opacity-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-blue-950 bg-opacity-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative p-4">
            <div
              ref={scrollRef}
              className="scrollbar-hide flex space-x-2 overflow-x-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                    index === currentIndex ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={image.source}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </button>
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
        </Card>
      </div>
    </>
  );
}
