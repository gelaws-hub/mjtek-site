"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import LoadingAuth from "../loading";

export default function Login() {
  const bannerLogin =
    "https://images.tokopedia.net/img/cache/1200/BgtCLw/2021/9/20/a4a3e98f-d9e4-40ae-84b6-8df6903ba113.jpg.webp?ect=4g";
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  // const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
  //   setIsLoading(true);
  //   event.preventDefault();
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
  //       email: userEmail,
  //       password: userPassword,
  //     })
  //     .then((response) => {
  //       Cookies.set("accessToken", response.data.accessToken, {
  //         expires: 7, //days
  //       });
  //         router.push("/");
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       setError(error.response.data.message);
  //       console.error(error);
  //     });
  // };

  return (
    <div className="min-h-[100vh] grid xl:grid-cols-[50%_50%] grid-cols-1 justify-center p-20 rounded-xl">
      <div className="bg-white rounded-l-2xl drop-shadow-lg shadow-background flex flex-col p-[20%]">
        <section className="">
          {isLoading ? (
            <LoadingAuth className="absolute top-1/2 left-1/2" />
          ) : null}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Silahkan Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
                  placeholder="name@company.com"
                  value={userEmail}
                  required
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
                  required
                  value={userPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-900 text-white hover:bg-blue-950 focus:ring-blue-950"
              >
                {isLoading ? "Loading..." : "Masuk"}
              </Button>
              {error && (
                <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
              )}
              <p className="text-sm font-light text-gray-500">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Buat akun
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
      <div className="bg-blue-500 rounded-r-2xl shadow-xl shadow-slate-400 xl:block hidden">
        <Image
          src={bannerLogin}
          alt="login"
          width={2000}
          height={2000}
          className="object-cover w-full h-full rounded-r-2xl"
        />
      </div>
    </div>
  );
}
