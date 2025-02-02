import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart02Icon } from "../icons/ShoppingCart02Icon";
import { Notification03Icon } from "../icons/Notification03Icon";
import { FavouriteIcon } from "../icons/FavouriteIcon";
import useCheckSession from "@/app/(authentication)/auth/useCheckSession";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/app/(authentication)/auth/useCurrentUser";
import UserCard from "../userCard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useUserData from "@/hooks/useUserData";

export default function UserProfile() {
  const [openUserInfo, setOpenUserInfo] = useState(false);
  // const { isAuthenticated } = useCheckSession();
  const { userData } = useUserData();
  const router = useRouter();

  const handleViewFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData?.id) {
      router.push(`/favorite?user=${encodeURIComponent(userData?.id)}`);
    }
  };

  const toggleUserInfo = (event: any) => {
    event.stopPropagation();
    setOpenUserInfo(!openUserInfo);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        Cookies.remove("accessToken");
        window.location.reload();
      }
      if(!response.ok){
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-around gap-2 md:col-start-3 md:justify-start">
      <div className="flex flex-nowrap gap-1 md:ml-2">
        <Popover>
          <PopoverTrigger>
            <ShoppingCart02Icon
              height={18}
              width={18}
              className="text-gray-700"
            />
          </PopoverTrigger>
          <PopoverContent className="max-w-[100px] border-t-4 border-t-blue-950 bg-white p-1 shadow-md">
            <div className="z-[99] flex flex-col items-center justify-start gap-1">
              <Link
                scroll={false}
                className="rounded-md p-1 text-left text-sm hover:bg-slate-100"
                href="/cart"
              >
                Keranjang
              </Link>
              <Link
                scroll={false}
                className="rounded-md p-1 text-left text-sm hover:bg-slate-100"
                href="/transactions"
              >
                Transaksi
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        <button className="rounded-lg hover:bg-slate-100">
          <Notification03Icon
            height={18}
            width={18}
            className="text-gray-700"
          />
        </button>
        <button
          className="rounded-lg hover:bg-slate-100"
          onClick={handleViewFavorite}
        >
          <FavouriteIcon height={18} width={18} className="text-gray-700" />
        </button>
      </div>
      {userData ? (
        <UserCard
          userData={userData}
          onLogout={handleLogout}
          btnTrigger={
            <button className="" onClick={toggleUserInfo}>
              <div className="flex cursor-pointer items-center justify-center rounded-xl hover:bg-blue-900 hover:bg-opacity-10 md:mr-10 md:justify-start md:gap-2 md:px-3 md:py-1">
                <img
                  key="profile_image"
                  src={"/image.png"}
                  alt="profile_image"
                  width={28}
                  height={28}
                  className="h-8 w-8 rounded-full"
                />
                <p className="hidden text-sm font-medium text-gray-600 md:inline">
                  {userData?.name}
                </p>
              </div>
            </button>
          }
        />
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Link
            scroll={false}
            href="/login"
            className="group flex w-12 cursor-pointer items-center justify-center rounded-xl border border-blue-950 py-1 transition-colors duration-300 ease-in-out hover:bg-blue-950 md:w-16 md:gap-2 md:px-3"
          >
            <p className="text-xs text-blue-950 transition-colors duration-300 ease-in-out group-hover:text-white md:text-sm">
              Masuk
            </p>
          </Link>
          <Link
            scroll={false}
            href="/register"
            className="hidden cursor-pointer items-center rounded-xl border-2 border-blue-900 bg-blue-900 hover:border-blue-950 hover:bg-blue-950 md:flex md:min-w-16 md:justify-center md:gap-2 md:py-[0.3rem]"
          >
            <p className="text-sm text-white">Daftar</p>
          </Link>
        </div>
      )}
    </div>
  );
}
