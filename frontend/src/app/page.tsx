import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-1">
        <h1 className="text-xl font-bold my-4">Produk</h1>
        <ProductCard />
      </div>
    </>
  );
};