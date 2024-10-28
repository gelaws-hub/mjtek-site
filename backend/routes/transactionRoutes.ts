import express from "express";
import { addToCart, clearCart, getAllCartByUserId, removeFromCart, updateCartItem } from "../controllers/transaksi/cartController";

import {
  getAllFavoritesByUserId,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/transaksi/favoriteController";

import { createTransaction, deleteTransaction, getAllTransaction, getTransactionById, updateTransaction } from '../controllers/transaksi/transactionController';

import {
  getAllDetailTransaksi,
  getDetailTransaksiById,
  createDetailTransaksi,
  updateDetailTransaksi,
  deleteDetailTransaksi,
} from '../controllers/transaksi/transactionDetailController';

import {
  getAllLogTransaksi,
  getLogTransaksiById,
  createLogTransaksi,
  updateLogTransaksi,
  deleteLogTransaksi,
} from '../controllers/transaksi/logTransaksiController';

const transaksiRoutes = express.Router();

transaksiRoutes.get("/cart/:id_user", getAllCartByUserId);
transaksiRoutes.get("/cart/detail/:id", clearCart);
transaksiRoutes.post("/cart", addToCart);
transaksiRoutes.put("/cart/:id", updateCartItem);
transaksiRoutes.delete("/cart/:id", removeFromCart);

transaksiRoutes.get("/favorite/:id_user", getAllFavoritesByUserId);
transaksiRoutes.post("/favorite", addToFavorites);
transaksiRoutes.delete("/favorite/:id", removeFromFavorites);

// Transaksi routes
transaksiRoutes.get('/transaction', getAllTransaction);
transaksiRoutes.get('/transaction/:id', getTransactionById);
transaksiRoutes.post('/transaction', createTransaction);
transaksiRoutes.put('/transaction/:id', updateTransaction);
transaksiRoutes.delete('/transaction/:id', deleteTransaction);

// Detail_Transaksi routes
transaksiRoutes.get('/transaction-detail', getAllDetailTransaksi);
transaksiRoutes.get('/transaction-detail/:id', getDetailTransaksiById);
transaksiRoutes.post('/transaction-detail', createDetailTransaksi);
transaksiRoutes.put('/transaction-detail/:id', updateDetailTransaksi);
transaksiRoutes.delete('/transaction-detail/:id', deleteDetailTransaksi);

// Log_Transaksi routes
transaksiRoutes.get('/transaction-log', getAllLogTransaksi);
transaksiRoutes.get('/transaction-log/:id', getLogTransaksiById);
transaksiRoutes.post('/transaction-log', createLogTransaksi);
transaksiRoutes.put('/transaction-log/:id', updateLogTransaksi);
transaksiRoutes.delete('/transaction-log/:id', deleteLogTransaksi);

export default transaksiRoutes;
