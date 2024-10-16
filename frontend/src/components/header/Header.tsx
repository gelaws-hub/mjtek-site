import Image from "next/image";
import SearchBar from "./SearchBar";
import { ShoppingCart02Icon } from "../icons/ShoppingCart02Icon";
import { Notification03Icon } from "../icons/Notification03Icon";
import { FavouriteIcon } from "../icons/FavouriteIcon";
import Navbar from "./Navbar";
import { Location05Icon } from "../icons/Location05Icon";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 border-b-2 border-b-gray-100 mb-8 bg-white z-50">
      <div className="grid grid-cols-[70%_30%]  md:grid-cols-[25%_50%_25%] mx-auto pt-6 pb-4">
        <Link
          href="/"
          className="col-start-1 hidden  my-0 md:flex flex-row items-center gap-4 justify-center"
        >
          <Image
            key="logo-mjtek"
            src="/logo_mjtek_transparent.png"
            alt="logo-mjtek"
            width={60}
            height={50}
            className=""
          />
          <h1 className="text-3xl font-bold text-blue-900">MJ Teknologi</h1>
        </Link>
        <div className="md:col-start-2 ml-4 md:ml-0 self-stretch my-0 flex flex-col justify-center">
          <SearchBar />
        </div>
        <div className="md:col-start-3 flex">
          <div className="flex ml-1 md:ml-2">
            <button className="hover:bg-slate-100 rounded-xl">
              <ShoppingCart02Icon height={20} className="text-gray-700" />
            </button>
            <button className="hover:bg-slate-100 rounded-lg">
              <Notification03Icon height={20} className="text-gray-700" />
            </button>
            <button className="hover:bg-slate-100 rounded-lg">
              <FavouriteIcon height={20} className="text-gray-700" />
            </button>
          </div>
          <div className="ml-10 hidden md:flex gap-1 items-center cursor-pointer">
            <Image
              key="profile_image"
              src="/myImage.jpg"
              alt="profile_image"
              width={240}
              height={240}
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-md ml-2">Ibnu Fadhil</h1>
          </div>
        </div>
        <div className="col-span-2 md:col-start-2 row-start-2 md:flex overflow-hidden px-4">
          <Navbar />
        </div>
        <div className="md:col-start-3 row-start-2 relative">
          <button className="hidden md:flex items-center mx-auto gap-1">
            <Location05Icon width={16} height={16} className="text-xs" />
            <h2 className="text-xs md:text-sm">Alamat Rumahku</h2>
          </button>
        </div>
      </div>
    </header>
  );
}
