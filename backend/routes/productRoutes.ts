import express from "express";
import {
  deleteProduct,
  getProductById,
  partialUpdateProduct,
  updateProduct,
} from "../controllers/product_controllers/productController";
import { getAllProducts } from "../controllers/product_controllers/productSearchController";
import { createFullDetailProduct } from "../controllers/product_controllers/createFullDetailProduct";
import { authorize, ensureAuthenticated } from "../auth/userController";
import { getClientProducts } from "../controllers/product_controllers/getClientProducts";
import { bulkCreateProducts } from "../controllers/product_controllers/createMultipleProducts";
import { searchSimProducts } from "../controllers/product_controllers/simProductSearchController";

const productRoutes = express.Router();

productRoutes.get("/product", getClientProducts);
productRoutes.get("/sim-product", searchSimProducts);
productRoutes.get("/product/:id", getProductById);

// Admin only routes
productRoutes.post("/product", ensureAuthenticated, authorize(["admin", "owner"]), createFullDetailProduct);
productRoutes.put("/product/:id", ensureAuthenticated, authorize(["admin", "owner"]), updateProduct);
productRoutes.patch("/product/:id", ensureAuthenticated, authorize(["admin", "owner"]), partialUpdateProduct);
productRoutes.delete("/product/:id", ensureAuthenticated, authorize(["admin", "owner"]), deleteProduct);
productRoutes.get("/admin-products", ensureAuthenticated, authorize(["admin", "owner"]), getAllProducts);
productRoutes.post("/admin-products", ensureAuthenticated, authorize(["admin", "owner"]), bulkCreateProducts);

export default productRoutes;
