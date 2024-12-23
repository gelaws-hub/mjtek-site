import { Request, Response } from "express";
import prisma from "../../utils/database";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // Parse and validate the `category_id` from the request body
      const category_id = parseInt(req.body.category_id);
      if (isNaN(category_id)) {
        return cb(new Error("Invalid or missing category_id"), "");
      }

      // Fetch the category name from the database
      const category = await prisma.category.findUnique({
        where: { id: category_id },
      });

      if (!category) {
        return cb(new Error("Category not found"), "");
      }

      const categoryName = category.category_name
        .toLowerCase()
        .replace(/\s+/g, "-");

      // Construct the upload directory path based on the category name
      const uploadsDir = path.join(
        process.cwd(),
        "uploads",
        "products",
        categoryName
      );

      // Check if the directory exists; if not, create it
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log(`Directory created: ${uploadsDir}`);
      }

      cb(null, uploadsDir); // Specify the directory for multer
    } catch (error: any) {
      cb(error, "");
    }
  },
  filename: (req, file, cb) => {
    try {
      const productNameSlug = req.body.product_name
        ?.replace(/[\/\s]+/g, "-")
        .toLowerCase();
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      const fileName = `${productNameSlug}-${timestamp}${extension}`;
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

const upload = multer({ storage, fileFilter }).array("media");

export const createFullDetailProduct = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err.message });
    }

    try {
      // Parse the product data from the request body
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

      // Create the product in the database
      const product = await prisma.product.create({
        data: {
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

      if (Array.isArray(req.files) && req.files.length > 0) {
        const files = req.files as Express.Multer.File[];

        // Fetch the category_name based on category_id
        const category = await prisma.category.findUnique({
          where: { id: parseInt(req.body.category_id) },
        });

        if (!category) {
          return res.status(400).json({ error: "Category not found" });
        }

        const categoryName = category.category_name
          .toLowerCase()
          .replace(/\s+/g, "-");

        for (const file of files) {
          const fileUrl = `/uploads/products/${categoryName}/${file.filename}`;
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
