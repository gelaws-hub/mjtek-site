import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts); // GET all products
router.get("/:id", getProductById); // GET a product by ID
router.post("/", createProduct); // Create a new product
router.put("/:id", updateProduct); // Update a product
router.delete("/:id", deleteProduct); // Soft delete a product

export default router;
