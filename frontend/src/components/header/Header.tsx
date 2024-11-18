'use client';

import Image from "next/image";
import SearchBar from "./SearchBar";
import { ShoppingCart02Icon } from "../icons/ShoppingCart02Icon";
import { Notification03Icon } from "../icons/Notification03Icon";
import { FavouriteIcon } from "../icons/FavouriteIcon";
import Navbar from "./Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const hideHeaderPaths = ["/login", "/register", "/admin"];

export default function Header() {
  const pathname = usePathname();
  if (hideHeaderPaths.some((path) => pathname?.startsWith(path))) return null;
  return (
    <header className="sticky top-0 border-b-2 border-b-gray-100 bg-white z-50 ">
      <div className="grid grid-cols-[10%_80%_10%] md:grid-cols-[25%_50%_25%] mx-auto pt-6 md:pb-4 w-[96%]">
        <Link
          href="/"
          className="col-start-1  my-0 md:flex flex-row items-center gap-4 justify-center md:justify-end md:mr-4 lg:mr-[20%]"
        >
          <Image
            key="logo-mjtek"
            src="/logo_mjtek_transparent.png"
            alt="logo-mjtek"
            width={50}
            height={40}
            className="lg:max-h-[50px] md:max-h-[30px] md:max-w-[30px] max-h-[50px]"
          />
          <h1 className="hidden md:block text-lg xl:text-2xl font-bold text-blue-900">
            MJ Teknologi
          </h1>
        </Link>
        <div className="md:col-start-2 mx-1 md:ml-0 self-stretch my-0 flex justify-normal items-center">
          <SearchBar />
        </div>
        <Link href="/login" className="md:col-start-3 flex justify-center md:justify-start items-center">
          <div className="md:flex ml-1 md:ml-2 hidden">
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
          <div className="flex md:justify-start justify-center cursor-pointer md:gap-2 items-center md:mr-10 hover:bg-blue-900 hover:bg-opacity-10 rounded-xl md:px-3">
            <Image
              key="profile_image"
              src="/myImage.jpg"
              alt="profile_image"
              width={28}
              height={28}
              className="h-8 w-8 rounded-full"
            />
            <p className="text-sm text-gray-700 md:inline hidden">
              Ibnu Fadhil
            </p>
          </div>
        </Link>
        <div className="py-2 col-span-2 md:col-start-2 row-start-2 md:flex overflow-hidden px-4 md:py-0 md:mt-2">
          <Navbar />
        </div>
        {/* <div className="md:col-start-3 row-start-2 relative">
          <button className="hidden md:flex items-center gap-1 ml-auto cursor-pointer mr-10">
            <Location05Icon
              width={16}
              height={16}
              className="text-sm text-gray-700"
            />
            <p className="text-sm text-gray-700">Alamat Rumahku</p>
          </button>
        </div> */}
      </div>
    </header>
  );
}


