import ProductSkeleton from "../product/productSkeleton";

export default function SkeletonHome() {
  return (
    <div className="mx-auto grid max-w-[90%] grid-cols-2 gap-1 md:max-w-full md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:gap-2">
      {[...Array(20)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
