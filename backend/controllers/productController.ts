import { Request, Response } from "express";
import prisma from "../utils/database";

<<<<<<< HEAD
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
=======
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
        },
      },
    });

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
          })),
        },
      },
    });

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
          })),
        },
      },
    });

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
  }
};
