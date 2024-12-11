import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "./FullProductInterface";
import ThumbnailImageSection from "@/components/product/ThumbnailImageSection";
import PriceInput from "./PriceInput";
import React from "react";
import { Bounce, toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import { useRefreshContext } from "./refreshContext";
import { Combobox } from "./comboBox";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

interface categoryBrand {
  categories: {
    id: number;
    category_name: string;
    editState: false;
  }[];
  subCategories: {
    id: number;
    sub_category_name: string;
    editState: false;
  }[];
  brands: {
    id: number;
    brand_name: string;
    editState: false;
  }[];
}

export function EditProductModal({ product, onClose }: ProductDetailProps) {
  const [editedProduct, setEditedProduct] = useState(product);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categoryBrand, setCategoryBrand] = useState<categoryBrand>();
  const [refresh, setRefresh] = useRefreshContext();

  const handleInputChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const successToast = () =>
    toast.success("Berhasil memperbarui produk", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  // Compute changes
  const getChangedFields = (): Partial<Product> => {
    const changes: Partial<Product> = {};
  
    for (const key in product) {
      if (product[key as keyof Product] !== editedProduct[key as keyof Product]) {
        // Handle category, sub_category, and brand differently
        if (key === "category" && editedProduct.category) {
          // @ts-ignore
          changes.category_id = editedProduct.category.id;
        } else if (key === "sub_category" && editedProduct.sub_category) {
          // @ts-ignore
          changes.sub_category_id = editedProduct.sub_category.id;
        } else if (key === "brand" && editedProduct.brand) {
          // @ts-ignore
          changes.brand_id = editedProduct.brand.id;
        } else {
          // @ts-ignore
          changes[key as keyof Product] = editedProduct[key as keyof Product];
        }
      }
    }
  
    return changes;
  };
  
  const handleSubmit = async () => {
    const changes = getChangedFields();
  
    // If there are no changes, do nothing
    if (Object.keys(changes).length === 0) {
      alert("No changes detected.");
      return;
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changes),
        }
      );
  
      if (response.ok) {
        setRefresh(!refresh);
        console.log("Product updated:", changes);
        successToast();
        onClose();
      } else {
        alert("Failed to update the product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryBrandResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category-brand`,
        );
        const response = await categoryBrandResponse.json();
        setCategoryBrand({
          categories: response.data.categories || [],
          subCategories: response.data.sub_categories || [],
          brands: response.data.brands || [],
        });
      } catch (error) {
        console.error("Error fetching product information:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 p-4 dark:bg-boxdark dark:bg-opacity-60">
      <div className="w-full max-w-3xl rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="flex h-full flex-col gap-6 overflow-auto p-4 md:flex-row">
            <div className="w-full md:w-1/3">
              {product.media && (
                <ThumbnailImageSection
                  media={product.media}
                  // @ts-ignore
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              )}
            </div>
            <div className="w-full space-y-4 md:w-2/3">
              {/* Editable Fields */}
              <div>
                <label className="font-semibold">Name</label>
                <input
                  className="w-full rounded bg-inherit outline-none focus:ring-1"
                  value={editedProduct.product_name}
                  onChange={(e) =>
                    handleInputChange("product_name", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Price</label>
                  <PriceInput
                    value={editedProduct.price}
                    onChange={(e) => handleInputChange("price", e)}
                  />
                </div>
                <div>
                  <label className="font-semibold">Stock</label>
                  <input
                    className="w-full rounded bg-inherit outline-none [appearance:textfield] focus:ring-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) =>
                      handleInputChange("stock", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="font-semibold">Category</label>
                  <Combobox
                    defaultOption={{
                      value: editedProduct.category.id.toString(),
                      label: editedProduct.category.category_name,
                    }}
                    setOption={(selectedOption: any) =>
                      handleInputChange("category", {
                        id: Number(selectedOption.value),
                        category_name: selectedOption.label,
                      })
                    }
                    options={categoryBrand?.categories.map((category) => ({
                      label: category.category_name,
                      value: category.id.toString(),
                    }))}
                  />
                </div>
                {product.sub_category && (
                  <div>
                    <label className="font-semibold">Sub Category</label>
                    <Combobox
                    defaultOption={{
                      value: editedProduct.sub_category?.id.toString(),
                      label: editedProduct.sub_category?.sub_category_name,
                    }}
                    setOption={(selectedOption: any) =>
                      handleInputChange("sub_category", {
                        id: Number(selectedOption.value),
                        sub_category_name: selectedOption.label,
                      })
                    }
                    options={categoryBrand?.subCategories?.map((sub_category) => ({
                      label: sub_category.sub_category_name,
                      value: sub_category.id.toString(),
                    }))}
                  />
                  </div>
                )}
                <div>
                  <label className="font-semibold">Brand</label>
                  <Combobox
                    defaultOption={{
                      value: editedProduct.brand.id.toString(),
                      label: editedProduct.brand.brand_name,
                    }}
                    setOption={(selectedOption: any) =>
                      handleInputChange("brand", {
                        id: Number(selectedOption.value),
                        brand_name: selectedOption.label,
                      })
                    }
                    options={categoryBrand?.brands.map((brand) => ({
                      label: brand.brand_name,
                      value: brand.id.toString(),
                    }))}
                  />
                </div>
                <div>
                  <label className="font-semibold">Estimated Weight</label>
                  <input
                    className="w-full rounded bg-inherit outline-none focus:ring-1"
                    value={editedProduct.estimated_weight}
                    onChange={(e) =>
                      handleInputChange("estimated_weight", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold">Description</label>
                <TextareaAutosize
                  className="h-[50vh] w-full max-w-full resize-none rounded bg-inherit outline-none scrollbar-none focus:ring-0"
                  value={editedProduct.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-4 p-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
