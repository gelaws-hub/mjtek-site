import express from 'express';
import {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk
} from '../controllers/produkController';

const productRoutes = express.Router();

// GET all produk
productRoutes.get('/produk', getAllProduk);

// GET produk by ID
productRoutes.get('/produk/:id', getProdukById);

// POST create new produk
productRoutes.post('/produk', createProduk);

// PUT update a produk
productRoutes.put('/produk/:id', updateProduk);

// DELETE a produk
productRoutes.delete('/produk/:id', deleteProduk);

export default productRoutes;
