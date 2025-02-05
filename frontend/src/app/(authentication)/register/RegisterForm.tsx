"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const userSchema = object({
    name: string()
      .min(3, "Minimal 3 karakter")
      .max(30, "Maximal 30 karakter")
      .required("Nama harus diisi"),
    email: string()
      .email("Tolong masukkan email yang valid")
      .required("Email harus diisi"),
    password: string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "Password harus memiliki minimal 6 karakter, terdapat huruf besar, angka, dan karakter khusus",
      )
      .required("Password harus diisi"),
    confPassword: string()
      .oneOf([ref("password"), undefined], "Password harus sama")
      .required("Harus diisi"),
    address: string().required("Alamat harus diisi"),
    phone_number: string()
      .matches(/^\d+$/, "Nomor telepon harus berupa angka")
      .min(9, "Nomor telepon minimal 9 angka")
      .max(15, "Nomor telepon maksimal 15 angka")
      .required("Nomor telepon harus diisi"),
  });

  const handleRegister = async (values: any, actions: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error(error);
    }
    actions.resetForm();
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
      name: "",
      email: "",
      password: "",
      confPassword: "",
      address: "",
      phone_number: "",
    },
    onSubmit: handleRegister,
    validationSchema: userSchema,
  });

  return (
    <>
      <form
        className="space-y-4 md:space-y-6 "
        action="#"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${errors.name && touched.name ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none`}
            placeholder="Masukan nama anda"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name && touched.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>
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
            className={`${errors.email && touched.email ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none`}
            placeholder="name@company.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
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
            className={`${errors.password && touched.password ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none`}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.password && touched.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confPassword"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Konfirmasi password
          </label>
          <input
            type="password"
            name="confPassword"
            id="confpassword"
            placeholder="••••••••"
            className={`${errors.confPassword && touched.confPassword ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none`}
            value={values.confPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.confPassword && touched.confPassword && (
            <p className="text-sm text-red-500">{errors.confPassword}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Alamat
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className={`${errors.address && touched.address ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none`}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete="street-address"
          />
          {errors.address && touched.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone_number"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            No Handphone
          </label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            className={`${errors.phone_number && touched.phone_number ? "border-red-500" : ""} block w-full border-b-[2px] border-gray-300 p-2.5 text-sm text-gray-900 [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            placeholder="Masukan no handphone anda"
            value={values.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.phone_number && touched.phone_number && (
            <p className="text-sm text-red-500">{errors.phone_number}</p>
          )}
        </div>
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-light text-gray-500">
              I accept the{" "}
              <a
                className="text-primary-600 font-medium hover:underline"
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg bg-blue-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring-4"
        >
          Buat akun
        </button>
        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link scroll={false}
            href="/login"
            className="text-primary-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
}
