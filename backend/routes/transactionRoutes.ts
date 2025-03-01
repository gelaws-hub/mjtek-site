import express from "express";
import { addToCart, clearCart, getAllCartByUserId, partialUpdateCart, removeFromCart, toggleCartSelection } from "../controllers/transaksi/cartController";

import {
  getAllFavoritesByUserId,
  addToFavorites,
  isProductFavorite,
  removeFromFavorites,
} from "../controllers/transaksi/favoriteController";

import { cancelTransaction, createTransaction, getAllTransactionsFromUser, getTransactionById, getTransactionStatuses, updateTransactionStatus } from '../controllers/transaksi/transactionController';

import { authorize, ensureAuthenticated } from "../auth/userController";
import { getAllTransactions } from "../controllers/transaksi/searchTransactionController";
<<<<<<< HEAD
import { uploadTransactionProof, getTransactionProof } from "../controllers/transaksi/uploadPaymentProof";
=======
import { uploadTransactionProof } from "../controllers/transaksi/uploadPaymentProof";
import { getUserAddress, updateUserAddress } from "../controllers/transaksi/addressController";
>>>>>>> f0a5597 (add transaction address controller)

const transaksiRoutes = express.Router();

transaksiRoutes.get("/cart", ensureAuthenticated, authorize(["buyer"]), getAllCartByUserId);
transaksiRoutes.post("/cart", ensureAuthenticated, authorize(["buyer"]), addToCart);
transaksiRoutes.patch("/cart/:product_id", ensureAuthenticated, authorize(["buyer"]), partialUpdateCart);
transaksiRoutes.put("/cart", ensureAuthenticated, authorize(["buyer"]), toggleCartSelection);
transaksiRoutes.delete("/cart/:product_id",ensureAuthenticated, authorize(["buyer"]), removeFromCart);
transaksiRoutes.delete("/cart",ensureAuthenticated, authorize(["buyer"]), clearCart);

//ensureCorrectUser has to take :user_id as a param to make sure it's the correct user
transaksiRoutes.get("/favorite", ensureAuthenticated, authorize(["buyer"]), getAllFavoritesByUserId);
transaksiRoutes.get("/isFavorite/:product_id", ensureAuthenticated, authorize(["buyer"]), isProductFavorite);
transaksiRoutes.post("/favorite", ensureAuthenticated, authorize(["buyer"]), addToFavorites);
transaksiRoutes.delete("/favorite", ensureAuthenticated, authorize(["buyer"]), removeFromFavorites); 

// Transaksi routes
transaksiRoutes.get('/transaction', ensureAuthenticated, authorize(["buyer"]), getAllTransactionsFromUser);
transaksiRoutes.get('/transaction/:transactionId', ensureAuthenticated, authorize(["buyer"]), getTransactionById);
transaksiRoutes.post('/transaction', ensureAuthenticated, authorize(["buyer"]), createTransaction);
transaksiRoutes.patch('/transaction/:transactionId', ensureAuthenticated, authorize(["buyer"]), cancelTransaction);
transaksiRoutes.patch('/transaction-proof/:transactionId', ensureAuthenticated, authorize(["buyer"]), uploadTransactionProof);

// Address routes
transaksiRoutes.get('/user/address', ensureAuthenticated, authorize(["buyer"]), getUserAddress);
transaksiRoutes.patch('/user/address', ensureAuthenticated, authorize(["buyer"]), updateUserAddress);

// Admin Transaksi routes
transaksiRoutes.patch('/admin/transaction/:transactionId', ensureAuthenticated, authorize(["admin", "owner"]), updateTransactionStatus);
transaksiRoutes.get('/admin/transaction', ensureAuthenticated, authorize(["admin", "owner"]), getAllTransactions);
transaksiRoutes.get('/admin/transaction-status', ensureAuthenticated, authorize(["admin", "owner"]), getTransactionStatuses);

export default transaksiRoutes;
