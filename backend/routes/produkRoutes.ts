import express from 'express';
import {
  getAllProduks,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk
} from '../controllers/produkController';

const productRoutes = express.Router();

productRoutes.get('/produk', getAllProduks);
productRoutes.get('/produk/:id', getProdukById);
productRoutes.post('/produk', createProduk);
productRoutes.put('/produk/:id', updateProduk);
productRoutes.delete('/produk/:id', deleteProduk);

export default productRoutes;
