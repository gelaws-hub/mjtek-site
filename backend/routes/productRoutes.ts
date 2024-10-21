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
