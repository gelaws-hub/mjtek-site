"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Category {
  id: number;
  category_name: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category`
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
    <ol className="flex flex-row gap-4 justify-start items-center">
      {categories && categories.slice(0, 5).map((category) => {
        const categoryUrl = `/${formatCategoryName(category.category_name)}`;
        const isActive = pathname === categoryUrl;

        return (
          <Link
            key={category.id}
            href={categoryUrl}
            className={`text-xs px-[0.5] py-1 ${
              isActive ? "border-b-[0.5px] border-b-blue-900" : "text-gray-700"
            }`}
          >
            {category.category_name}
          </Link>
        );
      })}
    </ol>
  );
}
