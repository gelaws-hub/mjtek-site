"use client";

import { useState } from "react";
import Link from "next/link";
import LoadingAuth from "../loading";
import { useRouter } from "next/navigation";

interface RegisterInputs {
  name: string;
  username: string;
  email: string;
  password: string;
  confPassword: string;
  address: string;
  phone_number: string;
}

export default function RegisterForm() {
  const [registerInputs, setRegisterInputs] = useState<RegisterInputs>({
    name: "",
    username: "",
    email: "",
    password: "",
    confPassword: "",
    address: "",
    phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerInputs),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error(errorData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRegisterInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {isLoading ? <LoadingAuth /> : null}
      <form
        className="space-y-4 md:space-y-6"
        action="#"
        onSubmit={handleRegister}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nama
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
              placeholder="Masukan nama anda"
              value={registerInputs.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
              placeholder="Buat username unik"
              value={registerInputs.username}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
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
            className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
            placeholder="name@company.com"
            value={registerInputs.email}
            onChange={handleInputChange}
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
            className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
            value={registerInputs.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="confPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Konfirmasi password
          </label>
          <input
            type="password"
            name="confPassword"
            id="confpassword"
            placeholder="••••••••"
            className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
            value={registerInputs.confPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Alamat
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
            placeholder="Masukan alamat rumah anda"
            value={registerInputs.address}
            onChange={handleInputChange}
            required
            autoComplete="street-address"
          />
        </div>
        <div>
          <label
            htmlFor="phone_number"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            No Handphone
          </label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            className="text-gray-900 text-sm block w-full p-2.5 border-b-[2px] border-gray-300 focus:outline-none"
            placeholder="Masukan no handphone anda"
            value={registerInputs.phone_number}
            onChange={handleInputChange}
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
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-900 hover:bg-blue-950"
        >
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
}
