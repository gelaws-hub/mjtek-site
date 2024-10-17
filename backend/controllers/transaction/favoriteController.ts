import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all favorites by user ID with pagination
export const getAllFavoritesByUserId = async (req: Request, res: Response) => {
<<<<<<< HEAD:backend/controllers/transaction/favoriteController.ts
  const { userId } = req.params;
=======
  const { user_id } = req.params;
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/favoriteController.ts
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const [totalCount, favorites] = await prisma.$transaction([
      prisma.favorite.count({
<<<<<<< HEAD:backend/controllers/transaction/favoriteController.ts
        where: { userId },
      }),
      prisma.favorite.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          Product: {
            include: {
              Media: true,
            },
=======
        where: { user_id },
      }),
      prisma.favorite.findMany({
        where: { user_id },
        skip,
        take: limit,
        include: {
          product: {
            include: {
              media: true,
            }
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/favoriteController.ts
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      favorites,
    });
  } catch (error: any) {
    console.error("Error fetching favorites:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a product to the user's favorites
export const addToFavorites = async (req: Request, res: Response) => {
<<<<<<< HEAD:backend/controllers/transaction/favoriteController.ts
  const { userId, productId } = req.body;
=======
  const { user_id, id_produk } = req.body;
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/favoriteController.ts

  try {
    // Check if the product is already in favorites for the user
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
<<<<<<< HEAD:backend/controllers/transaction/favoriteController.ts
        productId: parseInt(productId),
        userId,
=======
        product_id: parseInt(id_produk),
        user_id,
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/favoriteController.ts
      },
    });

    if (existingFavorite) {
      res.status(400).json({ error: "Product is already in favorites" });
    } else {
      // Create a new entry in favorites if the product isn't already added
      const newFavorite = await prisma.favorite.create({
        data: {
<<<<<<< HEAD:backend/controllers/transaction/favoriteController.ts
          productId: parseInt(productId),
          userId,
=======
          product_id: parseInt(id_produk),
          user_id,
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/favoriteController.ts
        },
      });

      res.status(201).json(newFavorite);
    }
  } catch (error: any) {
    console.error("Error adding to favorites:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove a product from favorites
export const removeFromFavorites = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id of the favorite

  try {
    await prisma.favorite.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).end();
  } catch (error: any) {
    console.error("Error removing from favorites:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
