'use client';

import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";
import LoadingAuth from "../loading";

export default function ForgetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const userSchema = object({
    email: string()
      .email("Tolong masukkan email yang valid")
      .required("Email harus diisi"),
  });

  const handleRequestReset = async (values: any, actions: any) => {
    setError(null);
    setSuccess(null);
    actions.setSubmitting(true);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/request-reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat mengirim email.");
      }
  
      setSuccess(data.message);
      actions.resetForm();
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan.");
    } finally {
      actions.setSubmitting(false);
    }
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
    },
    validationSchema: userSchema,
    onSubmit: handleRequestReset,
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-gray-800">Lupa Password?</h1>
        <p className="text-sm text-gray-600">Masukkan email Anda untuk menerima link reset password.</p>
        {success && <p className="text-sm font-medium text-green-600">{success}</p>}
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${
                errors.email && touched.email ? "border-red-500" : ""
              } block w-full border-b-2 border-gray-300 p-2 text-sm focus:outline-none`}
              placeholder="emailmu@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg bg-blue-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-950"
          >
            {isSubmitting ? <LoadingAuth /> : "Kirim Link Reset"}
          </Button>
        </form>
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
