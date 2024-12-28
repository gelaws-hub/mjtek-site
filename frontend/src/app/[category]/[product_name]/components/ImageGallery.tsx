'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AdvancedImageGallery } from './AdvancedImageGallery'

interface ImageGalleryProps {
  images: { id: number; source: string; file_type: string }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    const updateArrows = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0)
        setShowRightArrow(
          scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        )
      }
    }

    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })

      setTimeout(() => {
        if (scrollRef.current) {
          setShowLeftArrow(scrollRef.current.scrollLeft > 0)
          setShowRightArrow(
            scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
          )
        }
      }, 100)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer" onClick={() => setShowAdvanced(true)}>
        <Image
          src={images[currentIndex].source}
          alt={`Product image ${currentIndex + 1}`}
          width={1024}
          height={1024}
          className="object-cover"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image.source}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
        {showLeftArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {showRightArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      {showAdvanced && (
        <AdvancedImageGallery images={images} onClose={() => setShowAdvanced(false)} />
      )}
    </div>
  )
}

