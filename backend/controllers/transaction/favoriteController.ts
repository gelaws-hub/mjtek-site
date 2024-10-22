import { Request, Response } from "express";
import prisma from "../../utils/database";

export const getAllFavoritesByUserId = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const [totalCount, favorites] = await prisma.$transaction([
      prisma.favorite.count({
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

export const addToFavorites = async (req: Request, res: Response) => {
  const { user_id, id_produk } = req.body;

  try {
    // Check if the product is already in favorites for the user
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        product_id: parseInt(id_produk),
        user_id,
      },
    });

    if (existingFavorite) {
      res.status(400).json({ error: "Product is already in favorites" });
    } else {
      // Create a new entry in favorites if the product isn't already added
      const newFavorite = await prisma.favorite.create({
        data: {
          product_id: parseInt(id_produk),
          user_id,
        },
      });

      res.status(201).json(newFavorite);
    }
  } catch (error: any) {
    console.error("Error adding to favorites:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeFromFavorites = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_favorit

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
