"use client";

import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { Button } from "@/components/ui/button";
import { AddCircleIcon } from "@/components/icons/AddCircleIcon";
import { Bounce, toast } from "react-toastify";
import { useRefreshContext } from "./refreshContext";
import { Combobox } from "./comboBox";
import { inputStyleNumber } from "./styleFormat";
import { CompatibilitySelection } from "./compatibilitySelection";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: number;
  category_name: string;
}

interface SubCategory {
  id: number;
  sub_category_name: string;
}

interface Brand {
  id: number;
  brand_name: string;
}

interface ProductInfo {
  categories: Category[];
  subCategories: SubCategory[];
  brands: Brand[];
}

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    categories: [],
    subCategories: [],
    brands: [],
  });

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    estimatedWeight: "",
    stock: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    mediaFiles: [] as File[],
    product_ram_type_ids: [],
    product_socket_ids: [],
    imageUrls: "",
  });

  const [refresh, setRefresh] = useRefreshContext();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCombobox = (field: any, selectedOption: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption,
    }));
  };

  const handleMediaFileChange = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      mediaFiles: files,
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const uploadData = new FormData();
      uploadData.append("product_name", formData.productName);
      uploadData.append("category_id", formData.categoryId);
      if (formData.subCategoryId) {
        uploadData.append("sub_category_id", formData.subCategoryId);
      }
      uploadData.append("brand_id", formData.brandId);
      uploadData.append("price", formData.price);
      uploadData.append("estimated_weight", formData.estimatedWeight);
      uploadData.append("description", formData.description);
      uploadData.append("stock", formData.stock);
      uploadData.append("isDeleted", "false");
      uploadData.append(
        "product_ram_type",
        formData.product_ram_type_ids.join(","),
      );
      uploadData.append(
        "product_socket",
        formData.product_socket_ids.join(","),
      );
      uploadData.append("imageUrls", formData.imageUrls);
      formData.mediaFiles.forEach((file) => uploadData.append("media", file));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        {
          method: "POST",
          headers: {
            application: "application/json",
          },
          body: uploadData,
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add product with media");
      }
      addToast();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Gagal menambahkan produk!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const addToast = () =>
    toast.success("Produk berhasil ditambahkan", {
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

  const handleCreateNewCategory = async (categoryName: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_name: categoryName }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const newCategory = await response.json();
      
      // Update local state with new category
      setProductInfo(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.data],
      }));

      // Select the newly created category
      handleCombobox("categoryId", newCategory.data.id.toString());
      
      toast.success("Category created successfully!", {
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
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleEditCategory = async (option: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${option.value}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_name: option.label }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const updatedCategory = await response.json();
      
      // Update local state with edited category
      setProductInfo(prev => ({
        ...prev,
        categories: prev.categories.map((cat: any) =>
          cat.id.toString() === option.value
            ? { ...cat, category_name: option.label }
            : cat
        ),
      }));

      toast.success("Category updated successfully!", {
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
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryBrand = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category-brand`,
        );
        const response = await categoryBrand.json();
        setProductInfo({
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

  const updateFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div
        className={`flex items-center justify-center transition-all md:p-4 ${isOpen ? "visible scale-y-100 opacity-100" : "invisible hidden scale-y-0 opacity-0"}`}
      >
        <section className="relative w-full rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <button
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
          <header className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h2 className="font-medium text-black dark:text-white">
              Tambah Produk
            </h2>
          </header>
          <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleAdd}>
            <div>
              <label
                htmlFor="productName"
                className="mb-3 block text-sm font-medium text-black dark:text-white"
              >
                Nama
              </label>
              <input
                type="text"
                id="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Masukkan Nama Produk..."
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-3 block text-sm font-medium text-black dark:text-white"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Masukkan Deskripsi Produk..."
                className="min-h-50 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="price"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Harga
                </label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Masukkan Harga Produk..."
                  className={`${inputStyleNumber}`}
                />
              </div>
              <div>
                <label
                  htmlFor="estimatedWeight"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Berat (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="estimatedWeight"
                  value={formData.estimatedWeight}
                  onChange={handleInputChange}
                  placeholder="Masukkan Berat Produk..."
                  className={`${inputStyleNumber}`}
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Stok
                </label>
                <input
                  type="number"
                  id="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Masukkan Stok Produk..."
                  className={`${inputStyleNumber}`}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="categoryId"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Kategori
                </label>
                <Combobox
                  label="Kategori"
                  setOption={(selectedOption: { value: any }) => {
                    handleCombobox("categoryId", selectedOption.value);
                  }}
                  options={productInfo?.categories.map((category: any) => ({
                    label: category.category_name,
                    value: category.id.toString(),
                  }))}
                  onAddNew={handleCreateNewCategory}
                  onEdit={handleEditCategory}
                />
              </div>
              <div>
                <label
                  htmlFor="subCategoryId"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Sub Kategori
                </label>
                <Combobox
                  label="Sub Kategori"
                  setOption={(selectedOption: { value: any }) => {
                    handleCombobox("subCategoryId", selectedOption.value);
                  }}
                  options={productInfo?.subCategories.map((sub_cat: any) => ({
                    label: sub_cat.sub_category_name,
                    value: sub_cat.id.toString(),
                  }))}
                />
              </div>
              <div>
                <label
                  htmlFor="brandId"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Merk
                </label>
                <Combobox
                  label="Merk"
                  setOption={(selectedOption: { value: any }) => {
                    handleCombobox("brandId", selectedOption.value);
                  }}
                  options={productInfo?.brands.map((brand: any) => ({
                    label: brand.brand_name,
                    value: brand.id.toString(),
                  }))}
                />
              </div>
            </div>
            <CompatibilitySelection
              socketDisabledState={
                !(formData.categoryId === "1" || formData.categoryId === "4")
              }
              ramTypeDisabledState={
                !(formData.categoryId === "2" || formData.categoryId === "4")
              }
              socketIds={formData.product_socket_ids}
              setSocketIds={(value: any) =>
                updateFormData("product_socket_ids", value)
              }
              ramTypeIds={formData.product_ram_type_ids}
              setRamTypeIds={(value: any) =>
                updateFormData("product_ram_type_ids", value)
              }
            />
            <div>
              <label
                htmlFor="imageUrls"
                className="mb-3 block text-sm font-medium text-black dark:text-white"
              >
                URL Gambar Produk (Beri tanda koma jika lebih dari satu)
              </label>
              <input
                type="text"
                id="imageUrls"
                value={formData.imageUrls}
                onChange={handleInputChange}
                placeholder="Masukkan Nama Produk..."
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <ImageUploader onFileSelect={handleMediaFileChange} />
            </div>
            <Button type="submit" className="h-full text-white">
              <AddCircleIcon className="text-white" width={24} height={24} />
              Tambah Produk
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
