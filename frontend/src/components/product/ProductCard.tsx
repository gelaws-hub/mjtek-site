"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardItem from "./ProductCardItem"; // Adjust the import path as needed

interface Produk {
  id_produk: number;
  nama_produk: string;
  harga: number;
  est_berat: number;
  deskripsi: string;
  stok: number;
  kategori: string | null;
  subkategori: string | null;
  brand: string | null;
  nama_socket: string[] | null;
  tipe_ram: string[] | null;
  media: Media[];
  isDeleted: boolean;
}

interface Media {
  sumber: string;
  tipe_file: string;
}

export default function ProductCard() {
  const [products, setProducts] = useState<Produk[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/produk`
        );
        setProducts(response.data.produks);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {products.map((product) => (
        <ProductCardItem key={product.id_produk} product={product} />
      ))}
    </div>
  );
}
