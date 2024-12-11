import express from "express";
import { addToCart, clearCart, getAllCartByUserId, removeFromCart, updateCartItem } from "../controllers/transaksi/cartController";

import {
  getAllFavoritesByUserId,
  addToFavorites,
  isProductFavorite,
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

import { ensureCorrectUser } from "../auth/middleware/buyer/buyerMiddleware";

const transaksiRoutes = express.Router();

transaksiRoutes.get("/cart/:id_user", getAllCartByUserId);
transaksiRoutes.get("/cart/detail/:id", clearCart);
transaksiRoutes.post("/cart", addToCart);
transaksiRoutes.put("/cart/:id", updateCartItem);
transaksiRoutes.delete("/cart/:id", removeFromCart);

//ensureCorrectUser has to take :user_id as a param to make sure it's the correct user
transaksiRoutes.get("/favorite/:user_id", ensureCorrectUser, getAllFavoritesByUserId);
transaksiRoutes.post("/favorite/:user_id", ensureCorrectUser, addToFavorites);
transaksiRoutes.post("/isFavorite/:user_id", ensureCorrectUser, isProductFavorite);
transaksiRoutes.delete("/favorite/:user_id", ensureCorrectUser, removeFromFavorites); 

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

export default transaksiRoutes;
