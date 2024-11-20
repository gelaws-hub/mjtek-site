import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    profile_pic: string;
    role_name: string;
  }

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("accessToken");
      if (token) {
        setToken(token);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setIsLoggedIn(true);
            setUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn, user, token };
}
