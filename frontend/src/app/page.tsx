import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-1">
        <h1 className="text-xl font-bold mb-6">Produk</h1>
        <ProductCard />
      </div>
    </>
  );
};