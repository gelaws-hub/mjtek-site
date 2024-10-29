import ProductCard from "@/components/product/ProductCard";
import dummyBanner from "./dummy_banner/DummyBanner.json"; // Adjust this path as needed
import BannerSlider from "@/components/product/BannerSlider";

export default function Home() {

  return (
    <>
      <div className="container mx-auto px-1">
        <BannerSlider 
        className="my-4"
        imageUrls={dummyBanner.DummyBanner} 
        interval={3} 
        imageMaxWidth={800}
        aspectRatio="2/1"
        />
        <ProductCard />
      </div>
    </>
  );
}
