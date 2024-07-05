import express from "express";
import {
  getAllKeranjangByUserId,
  addToKeranjang,
  removeFromKeranjang,
  updateKeranjangItem,
  clearKeranjang,
} from "../controllers/transaksi/keranjangController";

import {
  getAllFavoritesByUserId,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/transaksi/favoritController";

const transaksiRoutes = express.Router();

transaksiRoutes.get("/keranjang/:id_user", getAllKeranjangByUserId);
transaksiRoutes.get("/keranjang/detail/:id", clearKeranjang);
transaksiRoutes.post("/keranjang", addToKeranjang);
transaksiRoutes.put("/keranjang/:id", updateKeranjangItem);
transaksiRoutes.delete("/keranjang/:id", removeFromKeranjang);

transaksiRoutes.get("/favorites/:id_user", getAllFavoritesByUserId);
transaksiRoutes.post("/favorites", addToFavorites);
transaksiRoutes.delete("/favorites/:id", removeFromFavorites);

export default transaksiRoutes;
