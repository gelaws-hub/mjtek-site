"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

interface ProductBannersProps {
  imageUrls: string[];
  aspectRatio?: string; // default is 2/1
  imageMaxWidth?: number; // in pixels default is 800px
  interval?: number; // in seconds, default is 3
  className?: string;
}

export default function BannerSlider({
  imageUrls,
  aspectRatio = "2/1",
  imageMaxWidth = 1200,
  interval = 3,
  className = "",
}: ProductBannersProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollNext = useCallback(() => {
    setCurrentImage((index) => (index === imageUrls.length - 1 ? 0 : index + 1));
  }, [setCurrentImage, imageUrls]);

  const scrollPrev = () => {
    setCurrentImage((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(scrollNext, interval * 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, interval, scrollNext]);

  return (
    <section
      className={`relative overflow-hidden rounded-md cursor-pointer focus-visible:outline-1 ${className}`}
      style={{ maxWidth: `${imageMaxWidth}px`, aspectRatio: `${aspectRatio}` }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex mb-4 md:overflow-hidden scrollbar-none w-full">
        {imageUrls.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Banner Image ${index + 1}`}
            className="w-full h-full ease-in-out duration-300 grow-0 shrink-0 object-cover"
            style={{
              maxWidth: `${imageMaxWidth}px`,
              translate: `${-100 * currentImage}%`,
            }}
            width={1200}
            height={800}
          />
        ))}
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-95 text-gray-700 w-7 h-7 rounded-full block hover:bg-blue-500 hover:text-white"
        aria-label="Previous Button"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-95 text-gray-700 w-7 h-7 rounded-full block hover:bg-blue-500 hover:text-white"
        aria-label="Next Button"
      >
        ›
      </button>
      <div className="flex gap-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-700">
        {imageUrls.map((_, index) => (
          <button
            className={`w-2 h-2 rounded-full ${
              index === currentImage ? "bg-gray-100" : "bg-gray-400"
            }`}
            onClick={() => setCurrentImage(index)}
            key={index}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
