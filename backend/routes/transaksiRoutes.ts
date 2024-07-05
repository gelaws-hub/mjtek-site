import express from 'express';
import {
    getAllKeranjangByUserId,
    addToKeranjang,
    removeFromKeranjang,
    updateKeranjangItem,
    clearKeranjang
} from '../controllers/transaksi/keranjangController';

const transaksiRoutes = express.Router();

transaksiRoutes.get('/keranjang/:id_user', getAllKeranjangByUserId);
transaksiRoutes.get('/keranjang/detail/:id', clearKeranjang);
transaksiRoutes.post('/keranjang', addToKeranjang);
transaksiRoutes.put('/keranjang/:id', updateKeranjangItem);
transaksiRoutes.delete('/keranjang/:id', removeFromKeranjang);

export default transaksiRoutes;
