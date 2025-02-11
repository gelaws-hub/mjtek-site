import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useSessionCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          // If user not found in database, clear cookies and redirect to login
          Cookies.remove("accessToken");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Session check failed:", error);
        Cookies.remove("accessToken");
        window.location.href = "/login";
      }
    };

    // Only run the check if we have an accessToken
    if (Cookies.get("accessToken")) {
      checkSession();
    }
  }, []);
};
