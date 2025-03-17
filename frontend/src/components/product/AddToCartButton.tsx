import { useState } from "react";
import { errorToast, successToast } from "../toast/reactToastify";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LogInIcon } from "lucide-react";

export default function AddToCartButton({
  product_id,
  children = "Add to cart",
  afterAddToCart,
  className = "",
}: {
  product_id: string;
  children?: React.ReactNode;
  afterAddToCart?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toCart = async (product_id: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          quantity: quantity,
        }),
        credentials: "include",
      });

      const path = window.location.pathname;
      if (response.status === 401) {
        errorToast(
          <div>
            <p>Anda harus login terlebih dahulu</p>
            <button
              onClick={() => router.push(`/login?callbackUrl=${path}`)}
              className="btn mt-2 flex w-full justify-between items-center border border-white text-white rounded-md px-2 py-1 hover:text-red hover:bg-white"
            >
              Login <LogInIcon className="w-4 h-4 ml-2" />
            </button>
          </div>,
          "top-left",
        );
        setIsLoading(false);
        return;
      }

      if (response.status >= 400 && response.status < 500) {
        errorToast("Produk tidak memiliki stok yang cukup", "top-left");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      successToast(
        `${data.product_name} berhasil ditambahkan ke keranjang`,
        "top-left",
      );
      if (afterAddToCart) {
        afterAddToCart((prev) => !prev);
      }
    } catch (error) {
      errorToast("Error saat memperbarui keranjang", "top-left");
      setIsLoading(false);
    }
  };

  // Handler for the button click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent click event from bubbling up to parent
    toCart(product_id);
  };

  return (
    <Button
      onClick={handleClick}
      className={`btn btn-primary ${className}`}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
}
