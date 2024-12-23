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
              category: true,
            },
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

export const isProductFavorite = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { product_id } = req.body;

  try {
    // Check input validation (optional but recommended)
    if (!user_id || !product_id) {
      return res
        .status(400)
        .json({ error: "user_id and product_id are required" });
    }

    // Ensure only one response is sent
    const favoriteExists = await prisma.favorite.findFirst({
      where: {
        AND: [{ user_id: user_id }, { product_id: parseInt(product_id) }],
      },
    });

    return res.status(200).json({ isFavorite: !!favoriteExists });
  } catch (error: any) {
    console.error("Error checking favorite status:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addToFavorites = async (req: Request, res: Response) => {
  const { product_id } = req.body;
  const { user_id } = req.params;

  try {
    // Check if the product is already in favorites for the user
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        product_id: parseInt(product_id),
        user_id: user_id,
      },
    });

    if (existingFavorite) {
      res.status(400).json({ error: "Product is already in favorites" });
    } else {
      // Create a new entry in favorites if the product isn't already added
      const newFavorite = await prisma.favorite.create({
        data: {
          product_id: parseInt(product_id),
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
  const { product_id } = req.body;
  const { user_id } = req.params;

  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        user_id,
        product_id: parseInt(product_id),
      },
    });

    if (!existingFavorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    await prisma.favorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });

    return res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error: any) {
    console.error("Error removing from favorites:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
