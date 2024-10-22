// src/app/add-product.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/compat/router";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddProductPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product_name: "",
    category_id: 0,
    sub_category_id: 0,
    brand_id: 0,
    price: 0,
    estimated_weight: 0,
    description: "",
    stock: 0,
    media: [],
    product_ram_type: [],
    product_socket: [],
  });
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message: string, type: string) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        showAlert("Product added successfully", "success");
        if (router) {
          router.push("/product-management"); // Navigate back to the product management page
        }
      } else {
        showAlert("Error adding product", "error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showAlert("Error adding product", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {alert.show && (
        <Alert
          className={`mb-4 ${
            alert.type === "error" ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleAdd}>
        {/* Form fields go here */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.product_name}
              onChange={(e) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={formData.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: Number(e.target.value),
                })
              }
            />
          </div>
          {/* Add more form fields as needed */}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router && router.push("/product-management")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
