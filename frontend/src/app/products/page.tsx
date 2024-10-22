"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface Product {
  id: number;
  product_name: string;
  price: number;
  stock: number;
  category: {
    category_name: string;
  };
  media: {
    source: string;
    file_type: string;
  }[];
  is_deleted: boolean;
}

interface ProductFormData {
  product_name: string;
  category_id: number;
  sub_category_id: number;
  brand_id: number;
  price: number;
  estimated_weight: number;
  description: string;
  stock: number;
  media: { sumber: string; tipe_file: string }[];
  product_ram_type: number[];
  product_socket: number[];
}

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const initialFormData: ProductFormData = {
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
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product`
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        showAlert("Error fetching products", "error");
      }
    };
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      showAlert("Error fetching products", "error");
    }
  };

  const handleAdd = async () => {
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
        setIsAddModalOpen(false);
        setFormData(initialFormData);
        fetchProducts();
      } else {
        showAlert("Error adding product", "error");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showAlert("Error adding product", "error");
    }
  };

  const handleEdit = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        showAlert("Product updated successfully", "success");
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        setFormData(initialFormData);
        fetchProducts();
      } else {
        showAlert("Error updating product", "error");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showAlert("Error updating product", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        showAlert("Product deleted successfully", "success");
        fetchProducts();
      } else {
        showAlert("Error deleting product", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("Error deleting product", "error");
    }
  };

  const showAlert = (message: string, type: string) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus />
          Add Product
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          Filter
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Alert */}
      {alert.show && (
        <Alert
          className={`mb-4 ${
            alert.type === "error" ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {product.media && product.media[0] && (
                      <Image
                        src={product.media[0].source}
                        alt={product.product_name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <span className="font-medium">{product.product_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category?.category_name}</td>
                <td className="px-6 py-4">
                  Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                </td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {isAddModalOpen ? "Add Product" : "Edit Product"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isAddModalOpen ? handleAdd() : handleEdit();
              }}
            >
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
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Stock
                  </label>
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
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                    setFormData(initialFormData);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isAddModalOpen ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagementPage;
