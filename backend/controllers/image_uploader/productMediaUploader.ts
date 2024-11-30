import { Request } from "express";
import multer from "multer";
import path from "path";
import prisma from "../../utils/database";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const { productId } = req.params;

      // Fetch product and its category
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: {
          category: true, // Include category relation
        },
      });

      if (!product) {
        return cb(new Error("Product not found"), "");
      }

      // Construct category-based directory path
      const categoryName = product.category.category_name.toLowerCase().replace(/\s+/g, "-");
      const uploadsDir = path.join(process.cwd(), "uploads", "products", categoryName);

      // Check if the category folder exists, if not, create it
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log(`Directory created: ${uploadsDir}`);
      }

      // Log the directory path being used
      console.log("Saving file to:", uploadsDir);

      cb(null, uploadsDir); // Use the directory for file upload
    } catch (error: Error | any) {
      cb(error, "");
    }
  },

  filename: async (req, file, cb) => {
    try {
      const { productId } = req.params;

      // Fetch product to get the product name and ensure the file name is unique
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        return cb(new Error("Product not found"), "");
      }

      // Count existing files for the product to append the correct iteration
      const existingFiles = await prisma.media.count({
        where: { product_id: parseInt(productId) },
      });

      const extension = path.extname(file.originalname);
      const productNameSlug = product.product_name
        .replace(/\s+/g, "-")
        .toLowerCase();
      const fileName = `${productNameSlug}-${existingFiles + 1}${extension}`;

      cb(null, fileName);
    } catch (error: any) {
      cb(error, "");
    }
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Only images and videos are allowed."));
  }
};

export const productMediaUploader = multer({ storage, fileFilter });
