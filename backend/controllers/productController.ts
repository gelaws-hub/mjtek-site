import { Request, Response } from "express";
import prisma from "../utils/database";

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produk = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        sub_category: true,
        brand: true,
        product_ram_type: {
          include: {
            ram_type: true,
          },
        },
        product_socket: {
          include: {
            socket: true,
          },
        },
        media: {
          select: {
            id: true,
            source: true,
            file_type: true,
          },
        },
      },
    });

    if (!produk) {
      return res
        .status(404)
        .json({ status_code: 404, message: "Produk not found" });
    }

    const formattedProduk = {
      id: produk.id,
      product_name: produk.product_name,
      price: parseFloat(produk.price.toString()),
      estimated_weight: produk.estimated_weight,
      description: produk.description,
      stock: produk.stock,
      category: produk.category || null,
      sub_category: produk.sub_category || null,
      brand: produk.brand || null,
      product_ram_type: produk.product_ram_type,
      product_socket: produk.product_socket,
      media:
        produk.media.length > 0
          ? produk.media.map((media: any) => media)
          : null,
      is_deleted: produk.is_deleted,
    };

    res.status(200).json({
      status_code: 200,
      message: "success fetching product",
      data: formattedProduk,
    });
  } catch (error: any) {
    console.error("Error fetching Produk by ID:", error.message);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    product_name,
    category_id,
    sub_category_id = null,
    brand_id,
    price,
    estimated_weight,
    description,
    stock,
    media = [],
    product_ram_type = [], // Default to an empty array if not provided
    product_socket = [], // Default to an empty array if not provided
  } = req.body;

  try {
    const newProduk = await prisma.product.create({
      data: {
        product_name,
        category_id,
        sub_category_id,
        brand_id,
        price,
        estimated_weight,
        description,
        stock,
        media: {
          create: media.map((m: any) => ({
            source: m.source,
            file_type: m.file_type,
          })),
        },
        product_ram_type: product_ram_type.length
          ? {
              create: product_ram_type.map((id: number) => ({ id })),
            }
          : undefined,
        product_socket: product_socket.length
          ? {
              create: product_socket.map((id: number) => ({ id })),
            }
          : undefined,
      },
    });

    res.status(201).json({
      status_code: 201,
      message: "success adding product",
      data: newProduk,
    });
  } catch (error: any) {
    console.error("Error adding product:", error.message);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    product_name,
    category_id,
    sub_category_id,
    brand_id,
    price,
    estimated_weight,
    description,
    stock,
    media,
    product_ram_type,
    product_socket,
  } = req.body;
  try {
    const updatedProduk = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        product_name,
        category_id,
        sub_category_id,
        brand_id,
        price,
        estimated_weight,
        description,
        stock,
        media: {
          deleteMany: {},
          create: media.map((m: any) => ({
            sumber: m.sumber,
            tipe_file: m.tipe_file,
          })),
        },
        product_ram_type: {
          deleteMany: {},
          create: product_ram_type.map((id_tipe_ram: number) => ({
            id_tipe_ram,
          })),
        },
        product_socket: {
          deleteMany: {},
          create: product_socket.map((id_socket: number) => ({
            id_socket,
          })),
        },
      },
    });

    res.json({
      status_code: 200,
      message: "success updating product",
      data: updatedProduk,
    });
  } catch (error: any) {
    console.error("Error updating product:", error.message);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

export const partialUpdateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    product_name,
    category_id,
    sub_category_id,
    brand_id,
    price,
    estimated_weight,
    description,
    stock,
    media,
    product_ram_type,
    product_socket,
  } = req.body;

  try {
    const updateData: any = {};

    if (product_name !== undefined) updateData.product_name = product_name;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (sub_category_id !== undefined)
      updateData.sub_category_id = sub_category_id;
    if (brand_id !== undefined) updateData.brand_id = brand_id;
    if (price !== undefined) updateData.price = price;
    if (estimated_weight !== undefined)
      updateData.estimated_weight = estimated_weight;
    if (description !== undefined) updateData.description = description;
    if (stock !== undefined) updateData.stock = stock;

    if (media !== undefined) {
      updateData.media = {
        deleteMany: {}, // Remove existing media
        create: media.map((m: any) => ({
          sumber: m.sumber,
          tipe_file: m.tipe_file,
        })),
      };
    }

    // Updating product_ram_type relationship
    if (product_ram_type !== undefined) {
      updateData.product_ram_type = {
        deleteMany: {}, // Remove existing RAM type associations
        create: product_ram_type.map((ramTypeId: number) => ({
          ram_type: { connect: { id: ramTypeId } }, // Connect to the specified ram_type ID
        })),
      };
    }

    // Updating product_socket relationship
    if (product_socket !== undefined) {
      updateData.product_socket = {
        deleteMany: {}, // Remove existing socket associations
        create: product_socket.map((socketId: number) => ({
          socket: { connect: { id: socketId } }, // Connect to the specified socket ID
        })),
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        product_ram_type: { include: { ram_type: true } },
        product_socket: { include: { socket: true } },
        media: true,
      },
    });

    res.json({
      status_code: 200,
      message: "Successfully partially updated product",
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error partially updating product:", error.message);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.update({
      where: { id: Number(id) },
      data: { is_deleted: true },
    });

    res.status(200).json({
      status_code: 200,
      message: "success deleting product",
    });
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};
