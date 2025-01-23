'use client';

import Breadcrumb from "@/components/BreadCrump"; // Import Breadcrumb
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <div className="mx-auto mt-6 w-[90%] md:w-[80%] lg:w-[75%]">
        <Breadcrumb />
        {children}
      </div>
    </Suspense>
  );
}
