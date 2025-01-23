"use client";

import Loading from "@/app/removed_loading";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Media {
  id: number;
  source: string;
  file_type: string;
}

interface ThumbnailImageSectionProps {
  media: Media[];
  selectedImage: string;
  setSelectedImage: (image: string) => void;
}

export default function ThumbnailImageSection({
  media,
  selectedImage,
  setSelectedImage,
}: ThumbnailImageSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());

  // This effect can be used to set the initial selected image if media is available
  useEffect(() => {
    if (media.length > 0) {
      setSelectedImage(media[0].source); // Set the initial selected image
    }
  }, [media, setSelectedImage]);

  // Function to handle image load
  const handleImageLoad = (src: string) => {
    setImageCache((prevCache) => new Map(prevCache).set(src, src)); // Cache the image
    setIsLoading(false); // Set loading to false
  };

  return (
    <section className="flex flex-col items-center">
      {/* Main Image Preview */}
      <div className="flex">
        {selectedImage && (
          <div className="w-full h-full max-h-[50vh]">
            {isLoading ? (
              <Loading />
            ) : (
              <Image
                src={selectedImage}
                alt="Selected Image"
                width={1000}
                height={1000}
                className="max-h-[50vh] object-contain aspect-square rounded-lg"
                onLoadingComplete={() => setIsLoading(false)} // Set loading to false when complete
              />
            )}
          </div>
        )}
      </div>
      {/* Thumbnails */}
      <div className="flex flex-row scrollbar-none w-full overflow-hidden">
        <div className="flex flex-row gap-2 content-center py-1 justify-center">
          {media.map((mediaItem) => (
            <button
              key={mediaItem.id}
              className={`max-w-[60px] max-h-[60px] aspect-square flex items-center justify-center border-2 rounded-lg transition-all ${
                selectedImage === mediaItem.source ? "border-blue-800" : ""
              }`}
              onMouseEnter={() => {
                // Check if the image is already in the cache
                if (imageCache.has(mediaItem.source)) {
                  setSelectedImage(mediaItem.source); // If cached, set immediately
                } else {
                  setIsLoading(true); // Show loading if not cached
                  setSelectedImage(mediaItem.source); // Set selected image
                }
              }}
            >
              <Image
                src={mediaItem.source}
                alt={mediaItem.file_type}
                width={60}
                height={60}
                className="object-contain max-w-[60px] max-h-[60px] p-1 aspect-square rounded-lg"
                loading="lazy" // Enable lazy loading
                onLoadingComplete={() => handleImageLoad(mediaItem.source)} // Cache the image on load
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
