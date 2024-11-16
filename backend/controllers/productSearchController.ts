import { Request, Response } from "express";
import prisma from "../utils/database";

export const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) - 1 || 10;
  const skip = (page - 1) * limit;
  const rawSearchTerm = (req.query.q as string) || "";
  const searchTerm = decodeURIComponent(rawSearchTerm);
  const categories = req.query.categories as string | undefined;
  const socketId = req.query.socket_id
    ? parseInt(req.query.socket_id as string)
    : undefined;
  const ramTypeIds = req.query.ram_type_id
    ? (req.query.ram_type_id as string).split(",").map((id) => parseInt(id))
    : undefined;
  const brandId = req.query.brand_id
    ? parseInt(req.query.brand_id as string)
    : undefined;

  try {
    const searchWords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    const categoryFilter = categories
      ? {
          category: {
            id: {
              in: categories.split(",").map((id) => parseInt(id)),
            },
          },
        }
      : {};

    const compatibilityFilters = {
      ...(socketId && {
        product_socket: {
          some: { socket_id: socketId },
        },
      }),
      ...(ramTypeIds && {
        product_ram_type: {
          some: { ram_type_id: { in: ramTypeIds } },
        },
      }),
      ...(brandId && {
        brand_id: brandId,
      }),
    };

    let products;
    let totalCount;

    if (searchTerm) {
      const titleConditions = {
        AND: searchWords.map((word) => ({
          product_name: { contains: word },
        })),
      };
      const descriptionConditions = {
        AND: searchWords.map((word) => ({
          description: { contains: word },
        })),
      };

      const [titleMatches, descriptionMatches] = await Promise.all([
        prisma.product.findMany({
          where: {
            AND: [titleConditions, categoryFilter, compatibilityFilters],
          },
          skip,
          take: limit,
          orderBy: { id: "asc" },
          include: {
            category: true,
            sub_category: true,
            brand: true,
            product_ram_type: { include: { ram_type: true } },
            product_socket: { include: { socket: true } },
            media: { select: { id: true, source: true, file_type: true } },
          },
        }),
        prisma.product.findMany({
          where: {
            AND: [
              { ...descriptionConditions },
              { NOT: titleConditions },
              categoryFilter,
              compatibilityFilters,
            ],
          },
          skip,
          take: limit,
          orderBy: { id: "asc" },
          include: {
            category: true,
            sub_category: true,
            brand: true,
            product_ram_type: { include: { ram_type: true } },
            product_socket: { include: { socket: true } },
            media: { select: { id: true, source: true, file_type: true } },
          },
        }),
      ]);

      products = [...titleMatches, ...descriptionMatches];
      totalCount = titleMatches.length + descriptionMatches.length;
    } else {
      products = await prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
        where: { ...categoryFilter, ...compatibilityFilters },
        include: {
          category: true,
          sub_category: true,
          brand: true,
          product_ram_type: { include: { ram_type: true } },
          product_socket: { include: { socket: true } },
          media: { select: { id: true, source: true, file_type: true } },
        },
      });

      totalCount = await prisma.product.count({
        where: { ...categoryFilter, ...compatibilityFilters },
      });
    }

    const totalPages = Math.ceil(totalCount / limit);

    const categoryIds = Array.from(
      new Set(products.map((product) => product.category?.id).filter(Boolean))
    );

    const categoriesDetails = await prisma.category.findMany({
      where: {
        id: { in: categoryIds },
      },
      select: {
        id: true,
        category_name: true,
      },
    });

    const formattedProducts = products.map((product) => ({
      id: product.id,
      product_name: product.product_name,
      price: parseFloat(product.price.toString()),
      estimated_weight: product.estimated_weight,
      description: product.description,
      stock: product.stock,
      category: product.category || null,
      sub_category: product.sub_category || null,
      brand: product.brand || null,
      product_ram_type:
        product.product_ram_type.length > 0
          ? product.product_ram_type.map((type) => type.ram_type)
          : null,
      product_socket:
        product.product_socket.length > 0
          ? product.product_socket.map((socket) => socket.socket)
          : null,
      media:
        product.media.length > 0 ? product.media.map((media) => media) : null,
      is_deleted: product.is_deleted,
    }));

    res.status(200).json({
      status_code: 200,
      message: "success fetching products",
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      categories: categoriesDetails,
      products: formattedProducts,
    });
  } catch (error: any) {
    console.error(
      "Error fetching products with prioritized search:",
      error.message
    );
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};
