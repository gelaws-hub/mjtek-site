'use client';

import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingAuth from "../loading";

export default function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const passwordSchema = object({
    newPassword: string()
      .min(6, "Password minimal 6 karakter")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        "Password harus memiliki huruf besar, angka, dan karakter khusus"
      )
      .required("Password harus diisi"),
  });

  const handleResetPassword = async (values: any, actions: any) => {
    setError(null);
    setSuccess(null);
    actions.setSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: values.newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengatur ulang password.");
      }

      setSuccess("Password berhasil diubah. Silakan login kembali.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      setError(error.message);
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
      newPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white p-6 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Reset Password</h1>
        <p className="text-sm text-gray-600">Masukkan password baru Anda.</p>
        {success && <p className="text-sm font-medium text-green-600">{success}</p>}
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password Baru
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className={`${
                errors.newPassword && touched.newPassword ? "border-red-500" : ""
              } block w-full border-b-2 border-gray-300 p-2 text-sm focus:outline-none`}
              placeholder="••••••••"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.newPassword && touched.newPassword && (
              <p className="text-sm text-red-500">{errors.newPassword}</p>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg bg-blue-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-950"
          >
            {isSubmitting ? <LoadingAuth /> : "Atur Ulang Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
