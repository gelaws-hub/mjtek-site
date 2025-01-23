import { Request, Response } from "express";
import prisma from "../../utils/database";
import crypto from "crypto";

export interface Product {
  no: number;
  product_name: string;
  description: string;
  price: number;
  estimated_weight: number;
  stock?: number;
  category_name?: string; // Updated to optional
  brand_name?: string;
  brand?: number;
  media?: string;
  product_ram_type?: string;
  product_ram_type_name?: string;
  product_socket_name?: string;
}

interface UserRequest extends Request {
  user?: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

export const bulkCreateProducts = async (req: Request, res: Response) => {
  const user = (req as UserRequest).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const products = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Request body must contain an array of products." });
  }

  try {
    const createdProducts: any[] = [];

    for (const product of products) {
      const {
        product_name,
        description = "No description at the moment",
        price = 0,
        estimated_weight = 10,
        stock = 0,
        category_name,
        brand_name,
        media: mediaUrls,
      } = product;

      if (!product_name) {
        throw new Error("Missing required fields for product creation.");
      }

      let category;
      if (!category_name) {
        // Handle empty category_name
        category = await prisma.category.findUnique({
          where: { category_name: "Unknown" },
        });
        if (!category) {
          category = await prisma.category.create({
            data: {
              id: 0,
              category_name: "Unknown",
            },
          });
        }
      } else {
        category = await prisma.category.findUnique({
          where: { category_name: category_name },
        });
        if (!category) {
          category = await prisma.category.create({
            data: { category_name: category_name },
          });
        }
      }

      const categoryNameForId = category.category_name;

      let prefix = "";
      if (categoryNameForId.length >= 3) {
        prefix =
          categoryNameForId[0].toUpperCase() +
          categoryNameForId[
            Math.floor(categoryNameForId.length / 2)
          ].toUpperCase() +
          categoryNameForId[categoryNameForId.length - 1].toUpperCase();
      } else {
        prefix = categoryNameForId.toUpperCase().padEnd(3, "0");
      }

      let productId = "";
      let isUniqueId = false;
      let retryCount = 0;

      while (!isUniqueId && retryCount < 10) {
        // Retry up to 10 times
        const randomSuffix = crypto
          .randomBytes(2)
          .toString("hex")
          .toUpperCase();
        productId = `${prefix}${randomSuffix}`;

        const existingProduct = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!existingProduct) {
          isUniqueId = true;
        } else {
          retryCount++;
          console.warn(
            `Collision detected for Product ID: ${productId}. Retrying... (${retryCount})`
          );
        }
      }

      if (!isUniqueId) {
        return res.status(500).json({
          error:
            "Failed to generate a unique Product ID after multiple attempts.",
        });
      }

      let brand;
      if (!brand_name) {
        // Handle empty brand_name
        brand = await prisma.brand.findUnique({
          where: { brand_name: "Unknown" },
        });
        if (!brand) {
          brand = await prisma.brand.create({
            data: {
              id: 0,
              brand_name: "Unknown",
            },
          });
        }
      } else {
        brand = await prisma.brand.findUnique({
          where: { brand_name: brand_name },
        });
        if (!brand) {
          brand = await prisma.brand.create({
            data: { brand_name: brand_name },
          });
        }
      }

      const newProduct = await prisma.product.create({
        data: {
          id: productId,
          product_name,
          description,
          price: parseFloat(price),
          estimated_weight: parseFloat(estimated_weight),
          stock: parseInt(stock, 10),
          category_id: category.id,
          brand_id: brand.id,
          createdTime: new Date(Date.now()),
          is_deleted: false,
          user_id: user.id,
        },
      });

      if (product.product_ram_type) {
        const product_ram_type = (product.product_ram_type as string)
          .split(",")
          .filter((id) => id.trim() !== "")
          .map((id) => ({
            product_id: newProduct.id,
            ram_type_id: parseInt(id),
          }));
        if (product_ram_type.length > 0) {
          await prisma.product_ram_type.createMany({
            data: product_ram_type,
          });
        }
      }

      if (product.product_socket) {
        const product_socket = (product.product_socket as string)
          .split(",")
          .filter((id) => id.trim() !== "")
          .map((id) => ({
            product_id: newProduct.id,
            socket_id: parseInt(id),
          }));
        if (product_socket.length > 0) {
          await prisma.product_socket.createMany({
            data: product_socket,
          });
        }
      }

      const mediaSources =
        mediaUrls?.split(",").map((url: string) => url.trim()) || [];
      for (const source of mediaSources) {
        await prisma.media.create({
          data: {
            product_id: newProduct.id,
            source,
            file_type: "image",
          },
        });
      }

      createdProducts.push(newProduct);
    }

    res.status(201).json({
      message: `${createdProducts.length} Products created successfully.`,
      data: createdProducts.map((product) => product.product_name),
    });
  } catch (error: any) {
    console.error("Error creating products:", error);
    res
      .status(500)
      .json({ error: "Failed to create products.", details: error.message });
  }
};
