import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    console.log(token);
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);


  return (
    <div>
      <h3>{user?.name}</h3>
    </div>
  );
}
