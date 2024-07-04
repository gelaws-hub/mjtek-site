'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

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

const Home: React.FC = () => {
  const [products, setProducts] = useState<Produk[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produk`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id_produk} className="bg-white shadow-md rounded-lg overflow-hidden">
            {product.media && product.media.length > 0 && (
              <div className="flex overflow-x-scroll">
                {product.media.map((media, index) => (
                  console.log(media.sumber),
                  <Image
                    key={index}
                    src={media.sumber}
                    alt={product.nama_produk}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                ))}
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.nama_produk}</h2>
              <p className="text-gray-700 mb-4">Harga: {product.harga}</p>
              {/* <p className="text-gray-500">{product.deskripsi}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
