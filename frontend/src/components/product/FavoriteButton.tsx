"use client";

import { useEffect, useState } from "react";
import { FavouriteIcon } from "@/components/icons/FavouriteIcon";
import useCheckSession from "@/app/(authentication)/auth/useCheckSession";
import { useRouter } from "next/navigation";
import { useGoToLogin } from "@/lib/goToLogin";

interface FavoriteButtonProps {
  productId: string;
  text?: string;
}

const FavoriteButton = ({ productId, text }: FavoriteButtonProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { loading, error, isAuthenticated } = useCheckSession();
  const router = useRouter();
  const { goToLogin } = useGoToLogin();

  const checkFavoriteStatus = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/isfavorite/${productId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavourite(data.isFavorite);
        return;
      }
    } catch (error) {
      console.error("Failed to check favorite status:", error);
    }

    setIsFavourite(false);
  };

  useEffect(() => {
    checkFavoriteStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteToggle = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      goToLogin();
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/favorite`;
    const method = isFavourite ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method,
        body: JSON.stringify({ product_id: productId }),
        credentials: "include",
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

  return (
    <button
      onClick={handleFavoriteToggle}
      className="flex items-center rounded-lg p-2 font-medium text-gray-700 hover:bg-slate-100"
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
