import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart02Icon } from "../icons/ShoppingCart02Icon";
import { Notification03Icon } from "../icons/Notification03Icon";
import { FavouriteIcon } from "../icons/FavouriteIcon";
import UserInfoModal from "./UserInfoModal";
import { useAuth } from "@/app/(authentication)/auth/useAuth";
import { useRouter } from "next/navigation";
import { UserSidebar } from "../UserSidebar";

export default function UserProfile() {
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  const handleViewFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
    }
    if (user?.id) {
      router.push(`/favorite?user=${encodeURIComponent(user?.id)}`);
    }
  };

  const toggleUserInfo = (event: any) => {
    event.stopPropagation();
    setOpenUserInfo(!openUserInfo);
  };

  // const handleOutsideClick = (event: any) => {
  //   event.stopPropagation();
  //   if (!event.target.closest(".toggle-user-info")) {
  //     setOpenUserInfo(!openUserInfo);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  const handleLogout = async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Cookies.remove("accessToken");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 md:col-start-3 md:justify-start">
      <div className="ml-1 hidden md:ml-2 md:flex">
        <Link href="/cart" className="rounded-xl hover:bg-slate-100">
          <ShoppingCart02Icon height={20} className="text-gray-700" />
        </Link>
        <button className="rounded-lg hover:bg-slate-100">
          <Notification03Icon height={20} className="text-gray-700" />
        </button>
        <button
          className="rounded-lg hover:bg-slate-100"
          onClick={handleViewFavorite}
        >
          <FavouriteIcon height={20} className="text-gray-700" />
        </button>
      </div>
      {isLoggedIn ? (
        <button className="" onClick={toggleUserInfo}>
          <div className="flex cursor-pointer items-center justify-center rounded-xl hover:bg-blue-900 hover:bg-opacity-10 md:mr-10 md:justify-start md:gap-2 md:px-3 md:py-1">
            <Image
              key="profile_image"
              src={user?.profile_pic ?? ""}
              alt="profile_image"
              width={28}
              height={28}
              className="h-8 w-8 rounded-full"
            />
            <p className="hidden text-sm font-medium text-gray-600 md:inline">
              {user?.name}
            </p>
          </div>
          {openUserInfo && (
            <UserInfoModal
              user={user}
              className="absolute lg:fixed"
              handleLogout={handleLogout}
            />
          )}
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/login"
            className="group flex w-12 cursor-pointer items-center justify-center rounded-xl border-2 border-blue-950 py-[0.3rem] transition-colors duration-300 ease-in-out hover:bg-blue-950 md:w-16 md:gap-2 md:px-3"
          >
            <p className="text-xs text-blue-950 transition-colors duration-300 ease-in-out group-hover:text-white md:text-sm">
              Masuk
            </p>
          </Link>
          <Link
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
