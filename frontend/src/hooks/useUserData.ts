"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { error } from "console";

interface UserData {
  id: string;
  name: string;
  email: string;
  role_name: string;
  iat: number;
  exp: number;
  sub: string;
}

const useUserData = (deps: any[] = []) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    try {
      const payload = jwtDecode(accessToken) as any;
      setUserData(payload);
    } catch (error) {
      console.error("Invalid token:", error);
      router.replace("/login");
    }
  }, [router, ...deps]);

  return { userData };
};

export default useUserData;
