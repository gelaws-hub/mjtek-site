"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvancedImageGallery } from "./AdvancedImageGallery";

interface ImageGalleryProps {
  images: { id: number; source: string; file_type: string }[];
  setShowAdvanced?: (show: boolean) => void;
}

export function ImageGallery({ images, setShowAdvanced = () => {} }: ImageGalleryProps) {
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
      <div className="z-999">
        <div
          className="relative aspect-square cursor-pointer rounded-lg"
          onClick={() => setShowAdvanced(true)}
        >
          <img
            src={images[currentIndex].source}
            alt={`Product image ${currentIndex + 1}`}
            width={1024}
            height={1024}
            className="h-full w-full rounded-md object-contain"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 h-full w-16 -translate-y-1/2 transform rounded-none border-none transition-all duration-300 ease-in-out hover:-left-4 hover:bg-gray-900 hover:bg-opacity-15 hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 h-full w-16 -translate-y-1/2 transform rounded-none border-none transition-all duration-300 ease-in-out hover:-right-4 hover:bg-gray-900 hover:bg-opacity-15 hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex space-x-2 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                className={`m-1 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                  index === currentIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
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
              className="absolute -left-2 top-1/2 h-8 w-8 -translate-y-1/2 transform bg-white"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {showRightArrow && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-2 top-1/2 h-8 w-8 -translate-y-1/2 transform bg-white"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
