"use client";
import React, { useState } from "react";
import Sidebar from "@/components/tailadmin/Sidebar";
import Header from "@/components/tailadmin/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex dark:bg-boxdark-2 dark:text-bodydark min-h-screen w-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col lg:pl-72.5 w-full">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="w-full h-full">
            <div className="mx-auto p-2 md:p-3 2xl:p-4 w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
