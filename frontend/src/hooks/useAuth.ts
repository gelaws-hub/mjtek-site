"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = (allowedRoles: string[]) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("accessToken="));

    if (!accessToken) {
      router.replace("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      setUserData(payload);

      if (!allowedRoles.includes(payload.role_name)) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      router.replace("/login");
    }
  }, [router]);

  return { userData };
};

export default useAuth;

