import ProductCard from "@/components/product/ProductCard";
import dummyBanner from "./dummy_data/DummyBanner.json";
import DummySidebar from "./dummy_data/DummySidebar.json";
import BannerSlider from "@/components/product/BannerSlider";
import Sidebar from "@/components/Sidebar";
import CategoryHomepage from "@/components/homepage/CategoryHomepage";
import CategoryData from "@/components/homepage/CategoryData.json";
import RecommendationSlider from "@/components/product/RecommendationSlider";

export default function Home() {
  return (
    <div className="mx-auto flex w-[96%] flex-row md:grid md:grid-cols-[25%_75%]">
      <div className="hidden max-h-[40%] md:flex">
        <Sidebar sidebarData={DummySidebar.DummySidebar} />
      </div>
      <div className="w-full max-w-[1024px] bg-white">
        <BannerSlider
          className="my-4"
          imageUrls={dummyBanner.DummyBanner}
          interval={3}
          imageMaxWidth={1200}
          aspectRatio="2/1"
        />
        <h1 className="mb-4 mt-8 text-2xl font-bold">
          <span className="mx-4 rounded-md border-x-[6px] border-solid border-blue-900"></span>
          Rekomendasi CPU
        </h1>
        <RecommendationSlider category_ids="1" className="p-4" />
        <h1 className="mb-4 mt-8 text-2xl font-bold">
          <span className="mx-4 rounded-md border-x-[6px] border-solid border-blue-900"></span>
          Rekomendasi VGA
        </h1>
        <RecommendationSlider category_ids="3" className="p-4" />
        <CategoryHomepage categoryData={CategoryData.category} />
      </div>
    </div>
  );
}
