"use client";

import Breadcrumb from "@/components/BreadCrump"; // Import Breadcrumb
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <Breadcrumb />
      {children}
    </Suspense>
  );
}
