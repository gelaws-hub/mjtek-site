import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "./FullProductInterface";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  // Handle input change
  const handleInputChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        }
      );

      if (response.ok) {
        alert("Product updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update the product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Product" : "Product Details"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-4 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Image
                src={product.media[0].source}
                alt={product.product_name}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              {/* Editable Fields */}
              <div>
                <label className="font-semibold">Name</label>
                {isEditing ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editedProduct.product_name}
                    onChange={(e) =>
                      handleInputChange("product_name", e.target.value)
                    }
                  />
                ) : (
                  <p>{product.product_name}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Price</label>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        handleInputChange("price", Number(e.target.value))
                      }
                    />
                  ) : (
                    <p>
                      {Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Stock</label>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        handleInputChange("stock", Number(e.target.value))
                      }
                    />
                  ) : (
                    <p>{product.stock}</p>
                  )}
                </div>
                <div>
                  <label className="font-semibold">Category</label>
                  <p>{product.category.category_name}</p>
                </div>
                {product.sub_category && (
                  <div>
                    <label className="font-semibold">Sub Category</label>
                    <p>{product.sub_category.sub_category_name}</p>
                  </div>
                )}
                <div>
                  <label className="font-semibold">Brand</label>
                  <p>{product.brand.brand_name}</p>
                </div>
                <div>
                  <label className="font-semibold">Estimated Weight</label>
                  {isEditing ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editedProduct.estimated_weight}
                      onChange={(e) =>
                        handleInputChange("estimated_weight", e.target.value)
                      }
                    />
                  ) : (
                    <p>{product.estimated_weight}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="font-semibold">Description</label>
                {isEditing ? (
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    rows={5}
                    value={editedProduct.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-4 p-4 border-t">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
