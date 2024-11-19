import Image from "next/image";
import { User } from "./UserProfile";
import { DiscAlbum } from "lucide-react";

export interface UserInfoModalProps {
  user: User | null;
  className?: string;
  handleLogout: () => void;
}

export default function UserInfoModal({
  user,
  className = "",
  handleLogout,
}: UserInfoModalProps) {

  if (!user) return null;
  return (
    <>
      <div
        className={`min-w-[50px] flex flex-col bg-white z-[100] p-2 rounded-xl shadow-lg ${className}`}
      >
        <div className="flex items-center justify-right p-1 rounded-xl bg-white gap-2 pl-2 shadow-md">
          <Image
            src={user.profile_pic}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-sm">{user.name}</p>
        </div>
        <p>{user.email}</p>
        <p>{user.role_name}</p>
        <button 
        onClick={handleLogout}
        className="text-red-600 hover:bg-gray-100 rounded-lg p-1">Keluar</button>
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen z-[99] bg-black opacity-30 pointer-events-none"></div>
    </>
  );
}
