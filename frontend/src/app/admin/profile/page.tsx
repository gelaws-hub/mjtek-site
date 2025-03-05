'use client';

import Breadcrumb from "@/components/tailadmin/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import { useState } from "react";
import useUserData from "@/hooks/useUserData";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Password reset email has been sent!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send password reset email");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <img
                  src={"/image.png"}
                  width={160}
                  height={160}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  {userData?.name}
                </h3>
                <p className="font-medium text-black dark:text-white">{userData?.role_name}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {loading ? "Processing..." : "Change Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
