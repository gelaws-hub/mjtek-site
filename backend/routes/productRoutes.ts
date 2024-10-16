import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController';

const productRoutes = express.Router();

productRoutes.get('/product', getAllProducts);
productRoutes.get('/product/:id', getProductById);
productRoutes.post('/product', createProduct);
productRoutes.put('/product/:id', updateProduct);
productRoutes.delete('/product/:id', deleteProduct);

export default productRoutes;
