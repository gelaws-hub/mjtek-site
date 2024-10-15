import express from "express";
import {
  getAllCartByUserId,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../controllers/transaction/cartController";

import {
  getAllFavoritesByUserId,
  addToFavorites,
  removeFromFavorites,
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
