"use client";
import React, { useState } from "react";
import Sidebar from "@/components/tailadmin/Sidebar";
import Header from "@/components/tailadmin/Header";
import { menuGroups } from "../Sidebar/SidebarMenu";
import { usePathname } from "next/navigation";

export default function DefaultLayout({
  children,
  pageTitle = "", // Add pageTitle prop with default value
}: {
  children: React.ReactNode;
  pageTitle?: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getCurrentPageTitle = () => {
    for (const group of menuGroups) {
      for (const item of group.menuItems) {
        if (item.route === pathname) {
          return item.label;
        }
      }
    }
    return "Dashboard"; // Default title
  };

  return (
    <>
      <div className="flex min-h-screen w-full dark:bg-boxdark-2 dark:text-bodydark">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex w-full flex-col lg:pl-72.5">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            pageTitle={getCurrentPageTitle()}
          />

          {/* Add page title header */}
          <div className="px-4 py-4 md:px-6 2xl:px-11">
            <h1 className="text-2xl font-semibold text-black dark:text-white"></h1>
          </div>

          <main className="h-full w-full">
            <div className="mx-auto w-full p-2 md:p-3 2xl:p-4">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
