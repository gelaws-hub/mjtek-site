<<<<<<< HEAD
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
=======
import express from 'express';
import { createProduct, deleteProduct, getProductById, updateProduct } from '../controllers/productController';
import { getAllProducts } from '../controllers/productSearchController';

const productRoutes = express.Router();

productRoutes.get('/product', getAllProducts);
productRoutes.get('/product/:id', getProductById);
productRoutes.post('/product', createProduct);
productRoutes.put('/product/:id', updateProduct);
productRoutes.delete('/product/:id', deleteProduct);

export default productRoutes;
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
