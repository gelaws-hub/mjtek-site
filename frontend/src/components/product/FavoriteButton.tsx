"use client";

import { useEffect, useState } from "react";
import { FavouriteIcon } from "@/components/icons/FavouriteIcon";
import useCheckSession from "@/app/(authentication)/auth/useCheckSession";
import { useRouter } from "next/navigation";
import { useGoToLogin } from "@/lib/goToLogin";
import { errorToast, successToast } from "../toast/reactToastify";
import { Button } from "../ui/button";

interface FavoriteButtonProps {
  productId: string;
  text?: string;
  height?: string;
}

const FavoriteButton = ({ productId, text, height="" }: FavoriteButtonProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { isAuthenticated } = useCheckSession();

  const checkFavoriteStatus = async () => {
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
  };

  useEffect(() => {
    checkFavoriteStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteToggle = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      errorToast("Silakan login terlebih dahulu", "top-left");
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
        successToast(
          isFavourite
            ? "Berhasil dihapus dari favorit"
            : "Berhasil ditambahkan ke favorit",
          "top-left",
        );
      } else {
        console.error("Failed to update favorite status.");
        errorToast("Gagal memperbarui status favorit", "top-left");
      }
    } catch (error) {
      console.error("An error occurred while toggling favorite:", error);
      errorToast("Gagal memperbarui status favorit", "top-left");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleFavoriteToggle}
      className={`flex items-center rounded-lg p-3 font-medium text-gray-700 h-${height} w-${height}`}
    >
      {isFavourite ? (
        <FavouriteIcon height={16} className="text-blue-950" fill="#172554" />
      ) : (
        <FavouriteIcon height={16} className="text-blue-950" />
      )}
      {text && <span className="text-xs">{text}</span>}
    </Button>
  );
};

export default FavoriteButton;
