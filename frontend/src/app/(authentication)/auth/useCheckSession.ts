"use client"; // Make sure this is client-side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useCheckSession() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleName, setRoleName] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/validate-session`,
          {
            method: "GET",
            credentials: "include", // Include cookies with the request
          },
        );

        if (res.status === 401) {
          setError("Unauthorized");
        } else {
          const data = await res.json();
          setRoleName(data.user.role_name);
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setError("Error while checking session");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  return { loading, error, isAuthenticated, roleName, user };
}
