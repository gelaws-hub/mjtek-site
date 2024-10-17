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
          category: { id: { in: categoryIds } }, 
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
  
      // Extract unique category IDs from the retrieved products
      const categoryIds = Array.from(new Set(products.map((produk) => produk.category?.id).filter(Boolean)));
  
      // Fetch the details of the unique categories
      const categoriesDetails = await prisma.category.findMany({
        where: {
          id: { in: categoryIds },
        },
        select: {
          id: true,
          category_name: true,
        },
      });
  
      const formattedProducts = products.map((produk) => ({
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
            ? produk.product_ram_type.map((tipeRam: any) => tipeRam.ram_type) // Use the correct field name
            : null,
        product_socket:
          produk.product_socket.length > 0
            ? produk.product_socket.map((socket: any) => socket.socket) // Use the correct field name
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
        categories: categoriesDetails, // Include the unique categories in the response
        products: formattedProducts,
      });
    } catch (error: any) {
      console.error(
        "Error fetching products with pagination and search:",
        error.message
      );
      res.status(500).json({ status_code: 500, message: "Internal server error" });
    }
  };