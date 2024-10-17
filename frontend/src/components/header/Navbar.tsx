'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  category_name: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
        setCategories(response.data.data); // Assuming the response is an array of categories
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ol className="flex flex-row gap-4 justify-start items-center">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/${category.category_name}`} // Use search params here
          className="text-sm"
        >
          {category.category_name}
        </Link>
      ))}
    </ol>
  );
}
