import { Request, Response } from "express";
import prisma from "../utils/database";

export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = (req.query.q as string) || ""; // Get the search term from query params
  const categories = req.query.categories as string | undefined; // Get the categories from query params

  try {
    const whereConditions: any = {
      AND: [
        {
          OR: [
            { product_name: { contains: searchTerm.toLowerCase() } },
            { description: { contains: searchTerm.toLowerCase() } },
          ],
        },
      ],
    };

    // Check if categories are provided
    if (categories) {
      const categoryIds = categories.split(",").map((id) => parseInt(id));
      whereConditions.AND.push({
        Kategori: { id_kategori: { in: categoryIds } }, // Use `in` to match any of the selected categories
      });
    }

    const [totalCount, products] = await prisma.$transaction([
      prisma.product.count({
        where: whereConditions,
      }),
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: {
          id: "asc",
        },
        where: whereConditions,
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
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const formattedproducts = products.map((produk) => ({
      id: produk.id,
      product_name: produk.product_name,
      price: parseFloat(produk.price.toString()),
      estimated_weight: produk.estimated_weight,
      description: produk.description,
      stock: produk.stock,
      category: produk.category || null,
      sub_category: produk.sub_category || null,
      brand: produk.brand || null,
      product_ram_type:
        produk.product_ram_type.length > 0
          ? produk.product_ram_type.map((tipeRam: any) => tipeRam.Tipe_RAM)
          : null,
      product_socket:
        produk.product_socket.length > 0
          ? produk.product_socket.map((socket: any) => socket.nama_socket)
          : null,
      media:
        produk.media.length > 0
          ? produk.media.map((media: any) => media)
          : null,
      is_deleted: produk.is_deleted,
    }));

    res.status(200).json({
      status_code: 200,
      message: "success fetching products",
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      products: formattedproducts,
    });
  } catch (error: any) {
    console.error(
      "Error fetching Produk with pagination and search:",
      error.message
    );
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Controller to get a single produk by ID
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
      return res.status(404).json({ status_code: 404, message: "Produk not found" });
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
      product_ram_type:
        produk.product_ram_type.length > 0
          ? produk.product_ram_type.map((tipeRam: any) => tipeRam.Tipe_RAM)
          : null,
      product_socket:
        produk.product_socket.length > 0
          ? produk.product_socket.map((socket: any) => socket.nama_socket)
          : null,
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
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
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
            sumber: m.sumber,
            tipe_file: m.tipe_file,
          })),
        },
        product_ram_type: {
          create: product_ram_type.map((id_tipe_ram: number) => ({
            id_tipe_ram,
          })),
        },
        product_socket: {
          create: product_socket.map((id_socket: number) => ({
            id_socket,
          })),
        },
      },
    });

    res.status(201).json({
      status_code: 201,
      message: "success adding product",
      data: newProduk,
    });
  } catch (error: any) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
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
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.update({
      where: { id: Number(id) },
      data: { is_deleted: true },
    });

    res.status(204).json({
      status_code: 204,
      message: "success deleting product",
    });
  } catch (error: any) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};
