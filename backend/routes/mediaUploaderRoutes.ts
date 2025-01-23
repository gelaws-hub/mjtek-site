import express from "express";
import { productMediaUploader } from "../controllers/image_uploader/productMediaUploader";
import { productImage } from "../controllers/image_uploader/productImageController";

const mediaUploaderRoutes = express.Router();

mediaUploaderRoutes.post(
  "/upload/:productId",
  productMediaUploader.single("media"),
  productImage
);

export default mediaUploaderRoutes;
