"use client";

import { AddCircleIcon } from "@/components/icons/AddCircleIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddProductModal from "./addProductModal";

export default function ProductOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <Button
          className="h-full text-white"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AddCircleIcon className="text-white" width={24} height={24} />
          Tambah Produk
        </Button>
        <AddProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            
        />
      </div>
      <div className="mb-4"></div>
    </>
  );
}
