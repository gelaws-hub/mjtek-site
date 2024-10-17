import express from "express";
<<<<<<< HEAD
import {
  getAllCartByUserId,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/transaction/cartController";
=======
import { addToCart, clearCart, getAllCartByUserId, removeFromCart, updateCartItem } from "../controllers/transaksi/cartController";
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc

import {
  getAllFavoritesByUserId,
  addToFavorites,
  removeFromFavorites,
<<<<<<< HEAD
} from "../controllers/transaction/favoriteController";

const transactionRoutes = express.Router();

// Cart routes
transactionRoutes.get("/cart/:userId", getAllCartByUserId);
transactionRoutes.post("/cart", addToCart);
transactionRoutes.put("/cart/:id", updateCartItem);
transactionRoutes.delete("/cart/:id", removeFromCart);
transactionRoutes.delete("/cart/clear/:userId", clearCart); // Assuming this clears the entire cart for the user

// Favorites routes
transactionRoutes.get("/favorites/:userId", getAllFavoritesByUserId);
transactionRoutes.post("/favorites", addToFavorites);
transactionRoutes.delete("/favorites/:id", removeFromFavorites);

export default transactionRoutes;
=======
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

transaksiRoutes.get("/keranjang/:id_user", getAllCartByUserId);
transaksiRoutes.get("/keranjang/detail/:id", clearCart);
transaksiRoutes.post("/keranjang", addToCart);
transaksiRoutes.put("/keranjang/:id", updateCartItem);
transaksiRoutes.delete("/keranjang/:id", removeFromCart);

transaksiRoutes.get("/favorites/:id_user", getAllFavoritesByUserId);
transaksiRoutes.post("/favorites", addToFavorites);
transaksiRoutes.delete("/favorites/:id", removeFromFavorites);

// Transaksi routes
transaksiRoutes.get('/transaksi', getAllTransaction);
transaksiRoutes.get('/transaksi/:id', getTransactionById);
transaksiRoutes.post('/transaksi', createTransaction);
transaksiRoutes.put('/transaksi/:id', updateTransaction);
transaksiRoutes.delete('/transaksi/:id', deleteTransaction);

// Detail_Transaksi routes
transaksiRoutes.get('/detail-transaksi', getAllDetailTransaksi);
transaksiRoutes.get('/detail-transaksi/:id', getDetailTransaksiById);
transaksiRoutes.post('/detail-transaksi', createDetailTransaksi);
transaksiRoutes.put('/detail-transaksi/:id', updateDetailTransaksi);
transaksiRoutes.delete('/detail-transaksi/:id', deleteDetailTransaksi);

// Log_Transaksi routes
transaksiRoutes.get('/log-transaksi', getAllLogTransaksi);
transaksiRoutes.get('/log-transaksi/:id', getLogTransaksiById);
transaksiRoutes.post('/log-transaksi', createLogTransaksi);
transaksiRoutes.put('/log-transaksi/:id', updateLogTransaksi);
transaksiRoutes.delete('/log-transaksi/:id', deleteLogTransaksi);

export default transaksiRoutes;
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
