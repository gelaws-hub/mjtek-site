import ProductCard from "@/components/product/ProductCard";
import dummyBanner from "./dummy_data/DummyBanner.json";
import DummySidebar from "./dummy_data/DummySidebar.json";
import BannerSlider from "@/components/product/BannerSlider";
import Sidebar from "@/components/Sidebar";
import CategoryHomepage from "@/components/homepage/CategoryHomepage";
import CategoryData from "@/components/homepage/CategoryData.json"

export default function Home() {
  return (
    <div className="flex flex-row md:grid md:grid-cols-[25%_75%] mx-auto w-[96%]">
      <div className="hidden md:flex max-h-[40%]">
        <Sidebar sidebarData={DummySidebar.DummySidebar} />
      </div>
      <div className="max-w-[1024px] md:pl-4 bg-white md:pr-4">
        <BannerSlider
          className="my-4"
          imageUrls={dummyBanner.DummyBanner}
          interval={3}
          imageMaxWidth={1200}
          aspectRatio="2/1"
        />
        <h1 className="text-2xl font-bold mb-4 mt-8">
          <span className="border-x-[6px] border-blue-900 border-solid mx-4 rounded-md"></span>
          Rekomendasi hari ini
        </h1>
        <ProductCard />
        <CategoryHomepage categoryData={CategoryData.category} />
      </div>
    </div>
  );
}
