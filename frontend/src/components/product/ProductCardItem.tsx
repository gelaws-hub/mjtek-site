import Image from "next/image";
import Link from "next/link";
import { FavouriteIcon } from "../icons/FavouriteIcon";

interface Media {
  sumber: string;
  tipe_file: string;
}

interface Produk {
  id_produk: number;
  nama_produk: string;
  harga: number;
  media: Media[];
}

interface ProductCardItemProps {
  product: Produk;
}

export default function ProductCardItem({ product }: ProductCardItemProps) {
  return (
    <Link
      href={`/product/${product.id_produk}`}
      className="bg-white overflow-hidden w-full p-2"
    >
      {product.media && product.media.length > 0 && (
        // Todo Slowly Load Image
        <div className="relative flex aspect-[1/1]">
          <Image
            src={product.media[0].sumber}
            alt={product.nama_produk}
            width={300}
            height={300}
            className="w-full h-full object-cover overflow-hidden"
          />
          {/* Todo : Add Favourite */}
          <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md z-10">
            <FavouriteIcon width={20} height={20} />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-semibold truncate mt-2">
          {product.nama_produk}
        </h2>
        <p className="text-blue-900 font-semibold mb-4">
          Rp.{" "}
          {new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(product.harga)}
        </p>
      </div>
    </Link>
  );
}
