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
    // Build the filters
    const categoryFilter = categories
      ? {
          category_id: {
            in: categories.split(",").map((id) => parseInt(id)),
          },
        }
      : {};

    const searchFilter = searchTerm
      ? {
          OR: [
            {
              product_name: {
                contains: searchTerm,
              },
            },
            {
              description: {
                contains: searchTerm,
              },
            },
          ],
        }
      : {};

    // Fetch products with necessary fields
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
      where: {
        is_deleted: false,
        ...categoryFilter,
        ...searchFilter,
      },
      select: {
        id: true,
        product_name: true,
        price: true,
        media: {
          select: {
            source: true,
          },
          where: {
            file_type: "image", // Only fetch image media
          },
          take: 1, // Only get the first image
        },
        category: {
          select: {
            id: true,
            category_name: true,
          },
        },
      },
    });

    // Count total products for pagination
    const totalCount = await prisma.product.count({
      where: {
        is_deleted: false,
        ...categoryFilter,
        ...searchFilter,
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    // Extract unique categories from the fetched products
    const categoryIds = Array.from(
      new Set(products.map((product) => product.category?.id).filter(Boolean))
    );

    const availableCategories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: {
        id: true,
        category_name: true,
      },
    });

    // Format the products to match `ProductCardItemProps`
    const formattedProducts = products.map((product) => ({
      id: product.id,
      product_name: product.product_name,
      price: parseFloat(product.price.toString()),
      media_source: product.media[0]?.source || null, // Get the first media source or null
      category_name: product.category?.category_name || "Unknown",
    }));

    res.status(200).json({
      status_code: 200,
      message: "Success fetching products",
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      products: formattedProducts,
      categories: availableCategories, // Return available categories
    });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};
