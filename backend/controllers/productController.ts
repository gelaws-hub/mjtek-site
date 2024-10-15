import { Request, Response } from "express";
import prisma from "../utils/database";

// Controller to get all products with pagination
export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const [totalCount, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
        include: {
          Category: true,
          SubCategory: true,
          Brand: true,
          ProductRamType: {
            include: { RamType: true },
          },
          ProductSocket: {
            include: { Socket: true },
          },
          Media: {
            select: { id: true, source: true, fileType: true },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const formattedProducts = products.map((product) => ({
      id: product.id,
      productName: product.productName,
      price: parseFloat(product.price.toString()),
      estimatedWeight: product.estimatedWeight,
      description: product.description,
      stock: product.stock,
      category: product.Category || null,
      subCategory: product.SubCategory || null,
      brand: product.Brand || null,
      productRamTypes:
        product.ProductRamType.length > 0
          ? product.ProductRamType.map((ramType) => ramType.RamType)
          : null,
      productSockets:
        product.ProductSocket.length > 0
          ? product.ProductSocket.map((socket) => socket.Socket)
          : null,
      media: product.Media.length > 0 ? product.Media : null,
      isDeleted: product.isDeleted,
    }));

    res.status(200).json({
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      products: formattedProducts,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        Category: true,
        SubCategory: true,
        Brand: true,
        ProductRamType: {
          include: { RamType: true },
        },
        ProductSocket: {
          include: { Socket: true },
        },
        Media: {
          select: { id: true, source: true, fileType: true },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const formattedProduct = {
      id: product.id,
      productName: product.productName,
      price: parseFloat(product.price.toString()),
      estimatedWeight: product.estimatedWeight,
      description: product.description,
      stock: product.stock,
      category: product.Category || null,
      subCategory: product.SubCategory || null,
      brand: product.Brand || null,
      productRamTypes:
        product.ProductRamType.length > 0
          ? product.ProductRamType.map((ramType) => ramType.RamType)
          : null,
      productSockets:
        product.ProductSocket.length > 0
          ? product.ProductSocket.map((socket) => socket.Socket)
          : null,
      media: product.Media.length > 0 ? product.Media : null,
      isDeleted: product.isDeleted,
    };

    res.status(200).json(formattedProduct);
  } catch (error: any) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to create a product
export const createProduct = async (req: Request, res: Response) => {
  const {
    productName,
    categoryId,
    subCategoryId,
    brandId,
    price,
    estimatedWeight,
    description,
    stock,
    media,
    productRamTypes,
    productSockets,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        productName,
        categoryId,
        subCategoryId,
        brandId,
        price,
        estimatedWeight,
        description,
        stock,
        Media: {
          create: media.map((m: any) => ({
            source: m.source,
            fileType: m.fileType,
          })),
        },
        ProductRamType: {
          create: productRamTypes.map((ramTypeId: number) => ({
            ramTypeId,
          })),
        },
        ProductSocket: {
          create: productSockets.map((socketId: number) => ({
            socketId,
          })),
        },
      },
    });

    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    productName,
    categoryId,
    subCategoryId,
    brandId,
    price,
    estimatedWeight,
    description,
    stock,
    media,
    productRamTypes,
    productSockets,
  } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        productName,
        categoryId,
        subCategoryId,
        brandId,
        price,
        estimatedWeight,
        description,
        stock,
        Media: {
          deleteMany: {},
          create: media.map((m: any) => ({
            source: m.source,
            fileType: m.fileType,
          })),
        },
        ProductRamType: {
          deleteMany: {},
          create: productRamTypes.map((ramTypeId: number) => ({
            ramTypeId,
          })),
        },
        ProductSocket: {
          deleteMany: {},
          create: productSockets.map((socketId: number) => ({
            socketId,
          })),
        },
      },
    });

    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a product (soft delete)
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });

    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};
