import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const productRoutes = express.Router();

productRoutes.get("/products", getAllProducts); // Updated to plural
productRoutes.get("/products/:id", getProductById);
productRoutes.post("/products", createProduct);
productRoutes.put("/products/:id", updateProduct);
productRoutes.delete("/products/:id", deleteProduct);

export default productRoutes;
