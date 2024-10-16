'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id_kategori: number;
  nama_kategori: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kategori`);
        setCategories(response.data); // Assuming the response is an array of categories
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
          key={category.id_kategori} 
          href={`/${category.nama_kategori}`} // Use search params here
          className="text-sm"
        >
          {category.nama_kategori}
        </Link>
      ))}
    </ol>
  );
}
