import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { bannerLogin } from "../register/page";

export default function Login() {
  return (
    <div className="min-h-[100vh] grid xl:grid-cols-[50%_50%] grid-cols-1 justify-center p-20 rounded-xl">
      <div className="bg-white rounded-l-2xl drop-shadow-lg shadow-background flex flex-col p-[20%]">
        <section className="">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Silahkan Login
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
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
                  required
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
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-900 text-white hover:bg-blue-950 focus:ring-blue-950"
              >
                Masuk
              </Button>
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
