"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import LoadingAuth from "../loading";
import { object, string } from "yup";
import { useFormik } from "formik";

export default function Login() {
  const bannerLogin =
    "https://images.tokopedia.net/img/cache/1200/BgtCLw/2021/9/20/a4a3e98f-d9e4-40ae-84b6-8df6903ba113.jpg.webp?ect=4g";
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = decodeURIComponent(
    searchParams.get("callbackUrl") || "/",
  );

  const userSchema = object({
    email: string()
      .email("Tolong masukkan email yang valid")
      .required("Email harus diisi"),
    password: string()
      .min(6)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "Password harus memiliki minimal 6 karakter, terdapat huruf besar, angka, dan karakter khusus",
      )
      .required("Password harus diisi"),
  });

  const handleLogin = async (values: any, actions: any) => {
    actions.setSubmitting(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        return response.json();
      })
      .then((data) => {
        Cookies.set("accessToken", data.accessToken, { expires: 1 });
        actions.setSubmitting(false);

        // After successful login, redirect the user to the callback URL (or home page if not set)
        if (data.role_name === "admin" || data.role_name === "owner") {
          router.push("/admin");
        } else {
          // Redirect to the callbackUrl if it exists, else fallback to the default page
          router.push(callbackUrl || "/");
        }
      })
      .catch((error) => {
        actions.setSubmitting(false);
        setError(error.message);
        console.error(error);
      });
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex md:max-h-[50%] w-[90%] max-w-[900px] flex-col overflow-y-auto rounded-lg bg-white drop-shadow-lg md:flex-row">
        <div className="md:h-full w-full md:flex-1 md:p-0 md:block p-4 rounded-none">
          <img
            src={bannerLogin}
            alt="login"
            width={2000}
            height={2000}
            className="h-full w-full object-cover"
          />
        </div>
        <section className="flex md:h-full w-full md:flex-1 flex-col px-6">
          {isSubmitting ? (
            <LoadingAuth className="absolute left-1/2 top-1/2" />
          ) : null}
          <div className="relative w-full p-4">
            <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Silahkan Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`${errors.email && touched.email ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 bg-inherit p-2.5 text-sm text-gray-900 focus:outline-none`}
                  placeholder="emailmu@gmail.com"
                  value={values.email}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${errors.password && touched.password ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 bg-inherit p-2.5 text-sm text-gray-900 focus:outline-none`}
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg bg-blue-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-950"
              >
                {isSubmitting ? "Loading..." : "Masuk"}
              </Button>
              {error && (
                <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
              )}
              <p className="m-0 text-sm font-light text-gray-500">
                Belum punya akun?{" "}
                <Link
                  scroll={false}
                  href="/register"
                  className="text-primary-600 font-medium hover:underline"
                >
                  Buat akun
                </Link>
              </p>
              <p style={{ marginTop: 4 }} className="mt-0 text-sm font-light text-gray-500">
                Lupa Password?{" "}
                <Link
                  scroll={false}
                  href="/forgetPassword"
                  className="text-primary-600 font-medium hover:underline mt-0"
                >
                  Ubah Password
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>

      <div className="fixed -z-10 h-screen w-screen">
        <img
          src="/auth-bg.jpg"
          alt="bg"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
