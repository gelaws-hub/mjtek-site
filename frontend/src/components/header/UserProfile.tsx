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

  const toggleUserInfo = () => {
    setOpenUserInfo(!openUserInfo);
  };

  const handleOutsideClick = (event: any) => {
    if (!event.target.closest(".toggle-user-info")) {
      setOpenUserInfo(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
    <div className="md:col-start-3 flex justify-center md:justify-start items-center gap-2">
      <div className="md:flex ml-1 md:ml-2 hidden">
        <button className="hover:bg-slate-100 rounded-xl">
          <ShoppingCart02Icon height={20} className="text-gray-700" />
        </button>
        <button className="hover:bg-slate-100 rounded-lg">
          <Notification03Icon height={20} className="text-gray-700" />
        </button>
        <button
          className="hover:bg-slate-100 rounded-lg"
          onClick={handleViewFavorite}
        >
          <FavouriteIcon height={20} className="text-gray-700" />
        </button>
      </div>
      {isLoggedIn ? (
        <div
          className="toggle-user-"
          onMouseEnter={toggleUserInfo}
          onMouseLeave={toggleUserInfo}
        >
          <div className="flex md:justify-start justify-center cursor-pointer md:gap-2 items-center md:mr-10 hover:bg-blue-900 hover:bg-opacity-10 rounded-xl md:px-3 md:py-1">
            <Image
              key="profile_image"
              src={user?.profile_pic ?? ""}
              alt="profile_image"
              width={28}
              height={28}
              className="h-8 w-8 rounded-full"
            />
            <p className="text-sm text-gray-600 font-medium md:inline hidden">
              {user?.name}
            </p>
          </div>
          {openUserInfo && (
            <UserInfoModal
              user={user}
              className="absolute"
              handleLogout={handleLogout}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <Link
            href="/login"
            className="group flex md:justify-center cursor-pointer md:gap-2 items-center hover:bg-blue-950 w-16 rounded-xl md:px-3 md:py-[0.3rem] border-2 border-blue-950 transition-colors duration-300 ease-in-out"
          >
            <p className="text-sm text-blue-950 group-hover:text-white transition-colors duration-300 ease-in-out">
              Masuk
            </p>
          </Link>
          <Link
            href="/register"
            className="flex md:justify-center cursor-pointer md:gap-2 items-center hover:bg-blue-950 rounded-xl md:min-w-16 md:py-[0.3rem] bg-blue-900 border-2 border-blue-900 hover:border-blue-950"
          >
            <p className="text-sm text-white">Daftar</p>
          </Link>
        </div>
      )}
    </div>
  );
}
