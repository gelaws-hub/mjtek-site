import express from "express";
import {
<<<<<<< HEAD
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/productDetails/categoryController";

import {
  getAllSubCategory,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/productDetails/subCategoryController";
=======
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/produk_details/categoriController";

import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from "../controllers/produk_details/subCategoryController";
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
<<<<<<< HEAD
} from "../controllers/productDetails/brandController";
=======
} from "../controllers/produk_details/brandController";
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

import {
  createMedia,
  deleteMedia,
  getAllMedia,
  getMediaById,
<<<<<<< HEAD
} from "../controllers/productDetails/productMediaController"; // Changed import path for media

const produkDetailRoutes = express.Router();

// Category routes
produkDetailRoutes.get("/categories", getAllCategories); // Updated to plural
produkDetailRoutes.get("/categories/:id", getCategoryById);
produkDetailRoutes.post("/categories", createCategory);
produkDetailRoutes.put("/categories/:id", updateCategory);
produkDetailRoutes.delete("/categories/:id", deleteCategory);

// Subcategory routes
produkDetailRoutes.get("/subcategories", getAllSubCategory); // Updated to plural
produkDetailRoutes.get("/subcategories/:id", getSubCategoryById);
produkDetailRoutes.post("/subcategories", createSubCategory);
produkDetailRoutes.put("/subcategories/:id", updateSubCategory);
produkDetailRoutes.delete("/subcategories/:id", deleteSubCategory);

// Brand routes
produkDetailRoutes.get("/brands", getAllBrands); // Updated to plural
produkDetailRoutes.get("/brands/:id", getBrandById);
produkDetailRoutes.post("/brands", createBrand);
produkDetailRoutes.put("/brands/:id", updateBrand);
produkDetailRoutes.delete("/brands/:id", deleteBrand);
=======
} from "../controllers/produk_details/productMediaController";

const produkDetailRoutes = express.Router();

// Kategori routes
produkDetailRoutes.get("/category", getAllCategories);
produkDetailRoutes.get("/category/:id", getCategoryById);
produkDetailRoutes.post("/category", createCategory);
produkDetailRoutes.put("/category/:id", updateCategory);
produkDetailRoutes.delete("/category/:id", deleteCategory);

// SubKategori routes
produkDetailRoutes.get("/sub_category", getAllSubCategories);
produkDetailRoutes.get("/sub_category/:id", getSubCategoryById);
produkDetailRoutes.post("/sub_category", createSubCategory);
produkDetailRoutes.put("/sub_category/:id", updateSubCategory);
produkDetailRoutes.delete("/sub_category/:id", deleteSubCategory);

// Brand routes
produkDetailRoutes.get("/brand", getAllBrands);
produkDetailRoutes.get("/brand/:id", getBrandById);
produkDetailRoutes.post("/brand", createBrand);
produkDetailRoutes.put("/brand/:id", updateBrand);
produkDetailRoutes.delete("/brand/:id", deleteBrand);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

// Media routes
produkDetailRoutes.get("/media", getAllMedia);
produkDetailRoutes.get("/media/:id", getMediaById);
produkDetailRoutes.post("/media", createMedia);
produkDetailRoutes.delete("/media/:id", deleteMedia);

export default produkDetailRoutes;
