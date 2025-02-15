"use client";
import React, { useState, useMemo } from "react";
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

  // Create a memoized route-to-label mapping
  const routeLabelMap = useMemo(() => {
    const map = new Map<string, string>();

    const addRouteLabel = (items: any[]) => {
      items.forEach((item) => {
        if (item.route && item.label) {
          map.set(item.route, item.label);
        }
        if (item.children) {
          addRouteLabel(item.children);
        }
      });
    };

    menuGroups.forEach((group) => {
      addRouteLabel(group.menuItems);
    });

    return map;
  }, []); // Empty dependency array since menuGroups is static

  const getCurrentPageTitle = () => {
    return routeLabelMap.get(pathname) || "Dashboard";
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
