import dummyBanner from "../dummy_data/DummyBanner.json";
import DummySidebar from "../dummy_data/DummySidebar.json";
import BannerSlider from "@/components/product/BannerCarousel";
import Sidebar from "@/components/Sidebar";
import SkeletonHome from "@/components/homepage/SkeletonHome";

export default function Loading() {
  return (
    <div className="mx-auto flex w-[90%] flex-col justify-center md:w-[80%] lg:w-[75%]">
      <div className="mx-auto flex w-[96%] flex-row md:grid md:grid-cols-[25%_75%]">
        <div className="hidden max-h-[40%] md:flex">
          <Sidebar sidebarData={DummySidebar.DummySidebar} />
        </div>
        <div className="w-full bg-white">
          <BannerSlider
            className="m-4"
            imageUrls={dummyBanner.DummyBanner}
            interval={3}
            imageMaxWidth={1200}
            aspectRatio="2/1"
          />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col">
        <SkeletonHome />
      </div>
    </div>
  );
}
