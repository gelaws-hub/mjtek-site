import { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role_name: "buyer" | "owner" | "admin";
  profile_pic: string;
}

export default function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          method: "GET",
          credentials: "include", // Include cookies with the request
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return { user };
}
