'use client';

import Breadcrumb from "@/components/tailadmin/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/tailadmin/Layouts/DefaultLayout";
import Link from "next/link";
import { useState } from "react";
import useUserData from "@/hooks/useUserData";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");

  const handleEditName = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/user/${userData?.id}/edit-profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        toast.success("Name updated successfully");
        setEditMode(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update name");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              {editMode ? (
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="rounded border px-2 py-1"
                    placeholder="Enter new name"
                  />
                  <button
                    onClick={handleEditName}
                    disabled={loading}
                    className="rounded bg-primary px-3 py-1 text-white hover:bg-opacity-90"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="rounded border px-3 py-1 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                    {userData?.name}
                  </h3>
                  <button
                    onClick={() => {
                      setNewName(userData?.name || "");
                      setEditMode(true);
                    }}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                  </button>
                </div>
              )}
              <p className="font-medium">{userData?.role_name}</p>
              <div className="mt-4 flex justify-center">
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
