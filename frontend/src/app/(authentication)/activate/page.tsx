"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ActivatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setMessage("Token tidak valid atau sudah kadaluarsa.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/activate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMessage("Akun berhasil diaktivasi. Silakan login.");
          setTimeout(() => {
            router.push("/login");
          }, 3000); // Redirect ke halaman login setelah 3 detik
        } else {
          setMessage(data.message || "Aktivasi gagal.");
        }
      } catch (error) {
        setMessage("Terjadi kesalahan. Coba lagi nanti.");
      }

      setLoading(false);
    };

    activateAccount();
  }, [token, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Aktivasi Akun
        </h1>
        {loading ? (
          <p className="mt-4 text-center text-gray-500">Memproses aktivasi...</p>
        ) : (
          <p
            className={`mt-4 text-center ${
              message?.includes("berhasil") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
