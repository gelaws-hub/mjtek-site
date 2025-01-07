"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "./UserProfile";

const hideHeaderPaths = ["/login", "/register", "/admin"]; //Header won't be visible on these paths

export default function Header() {

  const pathname = usePathname();
  if (hideHeaderPaths.some((path) => pathname?.startsWith(path))) return null;
  return (
    <header className="sticky top-0 border-b-2 border-b-gray-100 bg-white z-50 ">
      <div className="grid grid-cols-[10%_60%_30%] md:grid-cols-[25%_50%_25%] mx-auto pt-6 md:pb-4 w-[96%]">
        <Link
          href="/"
          className="col-start-1 my-0 md:flex flex-row items-center gap-4 justify-center md:justify-end md:mr-4 lg:mr-[20%]"
        >
          <Image
            key="logo-mjtek"
            src="/logo_mjtek_transparent.png"
            alt="logo-mjtek"
            width={50}
            height={40}
            className="md:flex lg:max-h-[50px] md:max-h-[30px] md:max-w-[30px] max-h-8 max-w-8 m-auto md:m-0"
          />
          <h1 className="hidden md:block text-lg xl:text-2xl font-bold text-blue-900">
            MJ Teknologi
          </h1>
        </Link>
        <div className="md:col-start-2 mx-1 md:ml-0 self-stretch my-0 flex justify-normal items-center">
          <SearchBar />
        </div>
        <UserProfile />
        <div className="relative py-2 col-span-3 md:col-span-2 md:col-start-2 row-start-2 md:flex overflow-auto px-4 md:py-0 md:mt-2 scrollbar-none">
          <Navbar />
        </div>
      </div>
    </header>
  );
}
