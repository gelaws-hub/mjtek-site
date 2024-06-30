import express from 'express';
import {
  getAllKategori,
  getKategoriById,
  createKategori,
  updateKategori,
  deleteKategori
} from '../controllers/produk_details/kategoriController';
import {
  getAllSubKategori,
  getSubKategoriById,
  createSubKategori,
  updateSubKategori,
  deleteSubKategori
} from '../controllers/produk_details/subKategoriController';
import {
  getAllBrand,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/produk_details/brandController';

const produkDetailRoutes = express.Router();

// Kategori routes
produkDetailRoutes.get('/kategori', getAllKategori);
produkDetailRoutes.get('/kategori/:id', getKategoriById);
produkDetailRoutes.post('/kategori', createKategori);
produkDetailRoutes.put('/kategori/:id', updateKategori);
produkDetailRoutes.delete('/kategori/:id', deleteKategori);

// SubKategori routes
produkDetailRoutes.get('/subkategori', getAllSubKategori);
produkDetailRoutes.get('/subkategori/:id', getSubKategoriById);
produkDetailRoutes.post('/subkategori', createSubKategori);
produkDetailRoutes.put('/subkategori/:id', updateSubKategori);
produkDetailRoutes.delete('/subkategori/:id', deleteSubKategori);

// Brand routes
produkDetailRoutes.get('/brand', getAllBrand);
produkDetailRoutes.get('/brand/:id', getBrandById);
produkDetailRoutes.post('/brand', createBrand);
produkDetailRoutes.put('/brand/:id', updateBrand);
produkDetailRoutes.delete('/brand/:id', deleteBrand);

export default produkDetailRoutes;