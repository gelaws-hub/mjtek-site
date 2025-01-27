"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductLoadingPage() {
  return (
    <div className="mx-auto w-full bg-white pb-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Product Image Gallery */}
        <div className="lg:sticky lg:top-[9rem] lg:w-1/3 lg:flex-1 lg:basis-1/3 lg:self-start">
          <Skeleton className="aspect-square h-full w-full pb-[100%]" />
        </div>

        {/* Product Info and Order Section */}
        <div className="w-full lg:flex-1 lg:basis-2/3">
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-4/5 mb-4" />

          <div className="mb-6">
            <ul className="list-inside list-none space-y-1">
              <li>
                <Skeleton className="h-4 w-1/2" />
              </li>
              <li>
                <Skeleton className="h-4 w-1/2" />
              </li>
              <li>
                <Skeleton className="h-4 w-1/2" />
              </li>
              <li>
                <Skeleton className="h-4 w-1/2" />
              </li>
              <li>
                <Skeleton className="h-4 w-1/2" />
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-100 w-full" />
          </div>
        </div>
      </div>
      {/* Product Recommendation */}
      <div className="mt-12 space-y-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <Skeleton key={i} className="h-96 w-full" />
        ))}
      </div>
    </div>
  );
}

export function ProductRecommendationLoading({
  count = 1,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("mt-12 space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-96 w-full" />
      ))}
    </div>
  );
}
