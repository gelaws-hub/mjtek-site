"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { error } from "console";

const useUserData = (deps: any[] = []) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any | null>(null);

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
