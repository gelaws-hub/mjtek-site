"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Category {
  id: number;
  category_name: string;
}

const tempNavItems = [
  { id: 0, category_name: "Unknown" },
  { id: 1, category_name: "CPU" },
  { id: 2, category_name: "RAM" },
  { id: 3, category_name: "VGA" },
  { id: 4, category_name: "Motherboard" },
  { id: 5, category_name: "Monitor" },
  { id: 6, category_name: "SSD" },
  { id: 7, category_name: "HDD" },
  { id: 8, category_name: "Casing" },
  { id: 9, category_name: "PSU" },
  { id: 10, category_name: "PC Ready" },
  { id: 11, category_name: "Peripheral" },
  { id: 12, category_name: "Komputer Rakitan" },
  { id: 13, category_name: "Laptop" },
  { id: 14, category_name: "Mini PC" },
];

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>(tempNavItems);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category`,
        );
        setCategories(response.data.data); // Assuming the response is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const formatCategoryName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-"); // Convert to lowercase and replace spaces with hyphens
  };

  return (
    <ol className="flex flex-row items-center justify-start gap-2">
      {categories &&
        categories.slice(1, 14).map((category) => {
          const categoryUrl = `/${formatCategoryName(category.category_name)}`;
          const isActive = pathname === categoryUrl;

          return (
            <Link
              scroll={false}
              key={category.id}
              href={categoryUrl}
              className={`whitespace-nowrap hover:rounded-t-md px-2 py-1 text-xs hover:bg-gray-200 ${
                isActive
                  ? "border-b-[0.5px] border-b-blue-900"
                  : "text-gray-700"
              }`}
            >
              {category.category_name}
            </Link>
          );
        })}
    </ol>
  );
}
