"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbDynamic = () => {
  const pathname = usePathname(); // Get the current path
  const segments = pathname.split("/").filter(Boolean); // Split and filter out empty segments

  // Define paths to exclude breadcrumb
  const excludedPaths = ["/", "/login", "/register"]; // Add paths you want to exclude

  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs text-gray-500 md:text-sm">
        <BreadcrumbItem className="hover:text-gray-900 truncate">
          <BreadcrumbLink href="/" className="truncate">
            home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="hover:text-gray-900">
                {isLast ? (
                  <BreadcrumbPage className="w-40 truncate">
                    {decodeURIComponent(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="truncate">
                    {decodeURIComponent(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDynamic;
