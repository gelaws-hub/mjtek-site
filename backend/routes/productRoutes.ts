import express from "express";
import {
  deleteProduct,
  getProductById,
  partialUpdateProduct,
  updateProduct,
} from "../controllers/productController";
import { getAllProducts } from "../controllers/productSearchController";
import { createFullDetailProduct } from "../controllers/image_uploader/createFullDetailProduct";
import { authorize, ensureAuthenticated } from "../auth/userController";

const productRoutes = express.Router();

productRoutes.get("/product", getAllProducts);
productRoutes.get("/product/:id", getProductById);

// Admin only routes
productRoutes.post("/product", ensureAuthenticated, authorize(["admin"]), createFullDetailProduct);
productRoutes.put("/product/:id", ensureAuthenticated, authorize(["admin"]), updateProduct);
productRoutes.patch("/product/:id", ensureAuthenticated, authorize(["admin"]), partialUpdateProduct);
productRoutes.delete("/product/:id", ensureAuthenticated, authorize(["admin"]), deleteProduct);
productRoutes.get("/admin-products", ensureAuthenticated, authorize(["admin", "owner"]), getAllProducts);

export default productRoutes;
