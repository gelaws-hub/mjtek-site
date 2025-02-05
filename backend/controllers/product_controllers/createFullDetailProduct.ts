import { Request, Response } from "express";
import prisma from "../../utils/database";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { uploadFileToGoogleCloud } from "../../utils/googleStorage"; // Import the utility function

// Set up multer to handle file uploads in memory (for Google Cloud Storage)
const upload = multer({ storage: multer.memoryStorage() }).array("media");

// Controller function
export const createFullDetailProduct = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        product_name,
        category_id,
        sub_category_id,
        brand_id,
        price,
        estimated_weight,
        description,
        stock,
        isDeleted,
        imageUrls,
      } = req.body;

      if (
        !product_name ||
        !category_id ||
        !brand_id ||
        !price ||
        !description ||
        !estimated_weight ||
        !stock
      ) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Fetch the category name to generate the custom product ID
      const category = await prisma.category.findUnique({
        where: { id: parseInt(category_id) },
      });

      if (!category) {
        return res.status(400).json({ error: "Category not found" });
      }

      const categoryName = category.category_name;

      // Generate custom product ID
      let prefix = "";
      if (categoryName.length >= 3) {
        prefix =
          categoryName[0].toUpperCase() +
          categoryName[Math.floor(categoryName.length / 2)].toUpperCase() +
          categoryName[categoryName.length - 1].toUpperCase();
      } else {
        prefix = categoryName.toUpperCase().padEnd(3, "0");
      }

      const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();
      const productId = `${prefix}${randomSuffix}`;
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (existingProduct) {
        return res.status(409).json({
          error: "Product ID collision. Please try again.",
        });
      }

      // Create the product in the database
      const product = await prisma.product.create({
        data: {
          id: productId,
          product_name,
          category_id: parseInt(category_id),
          sub_category_id: sub_category_id ? parseInt(sub_category_id) : null,
          brand_id: parseInt(brand_id),
          price: parseFloat(price),
          estimated_weight: parseFloat(estimated_weight),
          description,
          stock: parseInt(stock),
          is_deleted: isDeleted === "true",
        },
      });

      const savedMedia = [];

      // Handle file uploads
      if (Array.isArray(req.files) && req.files.length > 0) {
        const files = req.files as Express.Multer.File[];

        for (const file of files) {
          // Generate a custom file name for Google Cloud Storage
          const fileName = `products/${categoryName ? categoryName + "/" : ""}${productId}-${Date.now()}${path.extname(file.originalname)}`;
          
          // Upload the file to Google Cloud Storage
          const fileUrl = await uploadFileToGoogleCloud(file.buffer, fileName, file.mimetype);

          // Save media to the database with the Google Cloud URL
          const media = await prisma.media.create({
            data: {
              product_id: product.id,
              source: fileUrl,
              file_type: file.mimetype.startsWith("image") ? "image" : "video",
            },
          });
          savedMedia.push(media);
        }
      }

      // Handle image URLs
      if (imageUrls) {
        const urls = imageUrls
          .split(",")
          .map((url: string) => url.trim())
          .filter((url: string) => url.length > 0);

        for (const url of urls) {
          const media = await prisma.media.create({
            data: {
              product_id: product.id,
              source: url,
              file_type: "image",
            },
          });
          savedMedia.push(media);
        }
      }

      const product_ram_type = (req.body.product_ram_type as string)
        .split(",")
        .filter((id) => id.trim() !== "")
        .map((id) => ({
          product_id: product.id,
          ram_type_id: parseInt(id),
        }));

      const product_socket = (req.body.product_socket as string)
        .split(",")
        .filter((id) => id.trim() !== "")
        .map((id) => ({
          product_id: product.id,
          socket_id: parseInt(id),
        }));

      if (product_ram_type.length > 0) {
        await prisma.product_ram_type.createMany({
          data: product_ram_type,
        });
      }

      if (product_socket.length > 0) {
        await prisma.product_socket.createMany({
          data: product_socket,
        });
      }

      res.status(201).json({
        status: 201,
        message: "Product created successfully.",
        data: {
          product,
          media: savedMedia,
          product_ram_type,
          product_socket,
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product." });
    }
  });
};
