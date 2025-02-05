import { Request, Response } from "express";
import prisma from "../../utils/database"; // Prisma instance

export const getClientProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const rawSearchTerm = (req.query.q as string) || "";
  const searchTerm = decodeURIComponent(rawSearchTerm);
  const categories = req.query.categories as string | undefined;

  try {
    // Build the category filter (apply only if categories are provided)
    const categoryFilter = categories
      ? {
          category_id: {
            in: categories.split(",").map((id) => parseInt(id)),
          },
        }
      : {};

    // Build the search filter
    const searchFilter = searchTerm
      ? {
          OR: [
            { product_name: { contains: searchTerm } },
            { description: { contains: searchTerm } },
          ],
        }
      : {};

    // Fetch all products to get all categories (no pagination here)
    const allProducts = await prisma.product.findMany({
      where: {
        is_deleted: false,
        ...categoryFilter,
        ...searchFilter,
      },
      select: {
        id: true,
        product_name: true,
        price: true,
        stock: true,
        media: {
          select: { source: true },
          where: { file_type: "image" },
          take: 1,
        },
        category: { select: { id: true, category_name: true } },
      },
    });

    // Extract category IDs from all products
    const allCategoryIds = Array.from(
      new Set(allProducts.map((product) => product.category?.id).filter(Boolean))
    );

    // Fetch the available categories from the extracted category IDs
    const availableCategories = await prisma.category.findMany({
      where: { id: { in: allCategoryIds } },
      select: { id: true, category_name: true },
    });

    // Now fetch the paginated products
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: [
        { stock: "desc" },
        { createdTime: "desc" },
      ],
      where: {
        is_deleted: false,
        ...categoryFilter,
        ...searchFilter,
      },
      select: {
        id: true,
        product_name: true,
        price: true,
        stock: true,
        media: {
          select: { source: true },
          where: { file_type: "image" },
          take: 1,
        },
        category: { select: { id: true, category_name: true } },
      },
    });

    // Count the total number of products matching the filters (search and category)
    const totalCount = await prisma.product.count({
      where: {
        is_deleted: false,
        ...categoryFilter,
        ...searchFilter,
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    // Format the products
    const formattedProducts = products.map((product) => ({
      id: product.id,
      product_name: product.product_name,
      price: parseFloat(product.price.toString()),
      stock: product.stock,
      media_source:
        product.media[0]?.source?.startsWith("/")
          ? `${process.env.BASE_URL}${product.media[0]?.source}`
          : product.media[0]?.source || null,
      category_id: product.category?.id || null,
      category_name: product.category?.category_name || "Unknown",
    }));

    // Send the response
    res.status(200).json({
      status_code: 200,
      message: "Success fetching products",
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      products: formattedProducts,
      categories: availableCategories, // Return all available categories
    });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};


