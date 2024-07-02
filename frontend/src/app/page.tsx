"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type Product = {
  id_produk: string;
  nama_produk: string;
  harga: number;
  media?: string;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produk");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id_produk}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {product.media && (
              <Image
                src={product.media}
                alt={product.nama_produk}
                className="w-full h-48 object-cover"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // optional
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {product.nama_produk}
              </h2>
              <p className="text-gray-700 mb-4">Harga: {product.harga}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
