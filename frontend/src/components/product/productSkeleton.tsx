import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProductSkeleton({className = ""}: {className?: string}) {
  return (
    <div className={cn("flex flex-col space-y-3 rounded-xl p-4 shadow-md", className)}>
      <Skeleton className="aspect-square h-full w-full rounded-xl max-w-[300px] max-h-[300px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
}
