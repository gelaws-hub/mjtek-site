import { Request, Response } from "express";
import prisma from "../../utils/database";
import crypto from "crypto";

export interface Product {
  no: number;
  product_name: string;
  description: string;
  price: number;
  estimated_weight: number;
  stock: number;
  category: string;
  brand_name: string;
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
        description,
        price,
        estimated_weight,
        stock,
        category: categoryName,
        brand_name: brandName,
        media: mediaUrls,
      } = product;

      if (
        !product_name ||
        !price ||
        !stock ||
        !categoryName ||
        !brandName ||
        !estimated_weight ||
        !description
      ) {
        throw new Error("Missing required fields for product creation.");
      }

      let category = await prisma.category.findUnique({
        where: { category_name: categoryName },
      });
      if (!category) {
        category = await prisma.category.create({
          data: { category_name: categoryName },
        });
      }

      const categoryNameForId = category.category_name;

      let prefix = "";
      if (categoryNameForId.length >= 3) {
        prefix =
          categoryNameForId[0].toUpperCase() +
          categoryNameForId[Math.floor(categoryName.length / 2)].toUpperCase() +
          categoryNameForId[categoryName.length - 1].toUpperCase();
      } else {
        prefix = categoryName.toUpperCase().padEnd(3, "0");
      }

      const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();
      const productId = `${prefix}${randomSuffix}`;

      let brand = await prisma.brand.findUnique({
        where: { brand_name: brandName },
      });
      if (!brand) {
        brand = await prisma.brand.create({
          data: { brand_name: brandName },
        });
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
