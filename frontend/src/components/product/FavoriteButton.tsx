"use client";

import { useEffect, useState } from "react";
import { FavouriteIcon } from "@/components/icons/FavouriteIcon";
import { useAuth } from "@/app/(authentication)/auth/useAuth";

interface FavoriteButtonProps {
  productId: string;
  text?: string;
}

const FavoriteButton = ({ productId, text }: FavoriteButtonProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { isLoggedIn, user, token } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      checkFavoriteStatus();
    } else {
      setIsFavourite(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/isfavorite/${user?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: productId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavourite(data.isFavorite);
      }
    } catch (error) {
      console.error("Failed to check favorite status:", error);
    }
  };

  const handleFavoriteToggle = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Please log in to manage favorites.");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/favorite/${user?.id}`;
    const method = isFavourite ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (response.ok) {
        setIsFavourite((prev) => !prev);
      } else {
        console.error("Failed to update favorite status.");
      }
    } catch (error) {
      console.error("An error occurred while toggling favorite:", error);
    }
  };
  
  console.log("isLoggedIn", isLoggedIn);

  return (
    <button
      onClick={handleFavoriteToggle}
      className="flex items-center font-medium text-gray-700 hover:bg-slate-100 p-2 rounded-lg"
    >
      {isFavourite ? (
        <FavouriteIcon height={16} className="text-blue-950" fill="#172554" />
      ) : (
        <FavouriteIcon height={16} className="text-blue-950" />
      )}
      {text && <span className="text-xs">{text}</span>}
    </button>
  );
};

export default FavoriteButton;
