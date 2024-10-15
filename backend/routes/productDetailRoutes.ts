import express from "express";
import {
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

import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/productDetails/brandController";

import {
  createMedia,
  deleteMedia,
  getAllMedia,
  getMediaById,
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

// Media routes
produkDetailRoutes.get("/media", getAllMedia);
produkDetailRoutes.get("/media/:id", getMediaById);
produkDetailRoutes.post("/media", createMedia);
produkDetailRoutes.delete("/media/:id", deleteMedia);

export default produkDetailRoutes;
