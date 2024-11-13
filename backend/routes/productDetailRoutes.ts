import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/produk_details/categoriController";

import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/produk_details/subCategoryController";

import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/produk_details/brandController";

import {
  createMedia,
  deleteMedia,
  getAllMedia,
  getMediaById,
} from "../controllers/produk_details/productMediaController";

const produkDetailRoutes = express.Router();

// Kategori routes
produkDetailRoutes.get("/category", getAllCategories);
produkDetailRoutes.get("/category/:id", getCategoryById);
produkDetailRoutes.post("/category", createCategory);
produkDetailRoutes.put("/category/:id", updateCategory);
produkDetailRoutes.delete("/category/:id", deleteCategory);

// SubKategori routes
produkDetailRoutes.get("/sub-category", getAllSubCategories);
produkDetailRoutes.get("/sub-category/:id", getSubCategoryById);
produkDetailRoutes.post("/sub-category", createSubCategory);
produkDetailRoutes.put("/sub-category/:id", updateSubCategory);
produkDetailRoutes.delete("/sub-category/:id", deleteSubCategory);

// Brand routes
produkDetailRoutes.get("/brand", getAllBrands);
produkDetailRoutes.get("/brand/:id", getBrandById);
produkDetailRoutes.post("/brand", createBrand);
produkDetailRoutes.put("/brand/:id", updateBrand);
produkDetailRoutes.delete("/brand/:id", deleteBrand);

// Media routes
produkDetailRoutes.get("/media", getAllMedia);
produkDetailRoutes.get("/media/:id", getMediaById);
produkDetailRoutes.post("/media", createMedia);
produkDetailRoutes.delete("/media/:id", deleteMedia);

export default produkDetailRoutes;
