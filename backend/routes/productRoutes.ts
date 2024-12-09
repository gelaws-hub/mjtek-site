import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  partialUpdateProduct,
  updateProduct,
} from "../controllers/productController";
import { getAllProducts } from "../controllers/productSearchController";
import { createFullDetailProduct } from "../controllers/image_uploader/createFullDetailProduct";

const productRoutes = express.Router();

productRoutes.get("/product", getAllProducts);
productRoutes.get("/product/:id", getProductById);
// productRoutes.post("/product", createProduct);
productRoutes.post("/product", createFullDetailProduct);
productRoutes.put("/product/:id", updateProduct);
productRoutes.patch("/product/:id", partialUpdateProduct);
productRoutes.delete("/product/:id", deleteProduct);

export default productRoutes;
