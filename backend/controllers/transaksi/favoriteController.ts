import { Request, Response } from "express";
import prisma from "../../utils/database";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

export const getAllFavoritesByUserId = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const user = (req as CustomRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const [totalCount, favorites] = await prisma.$transaction([
      prisma.favorite.count({
        where: { user_id: user.id },
      }),
      prisma.favorite.findMany({
        where: { user_id: user.id },
        skip,
        take: limit,
        include: {
          product: {
            include: {
              media: {
                select: {
                  source: true,
                },
                where: {
                  file_type: "image",
                },
                take: 1,
              },
              category: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const formattedFavorites = favorites.map((favorite) => {
      const product = favorite.product;

      return {
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        media_source: product.media[0]?.source || "",
        category_id: product.category.id,
        category_name: product.category.category_name,
      };
    });

    res.status(200).json({
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      favorites: formattedFavorites,
    });
  } catch (error: any) {
    console.error("Error fetching favorites:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isProductFavorite = async (req: Request, res: Response) => {
  const { product_id } = req.params;

  const user = (req as CustomRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (!user.id || !product_id) {
      return res
        .status(400)
        .json({ error: "user token and product_id are required" });
    }

    const favoriteExists = await prisma.favorite.findFirst({
      where: {
        AND: [{ user_id: user.id }, { product_id: product_id }],
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
  const user = (req as CustomRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        product_id: product_id,
        user_id: user.id,
      },
    });
    console.log(product_id, user.id);

    if (existingFavorite) {
      res.status(400).json({ error: "Product is already in favorites" });
    } else {
      const newFavorite = await prisma.favorite.create({
        data: {
          product_id: product_id,
          user_id: user.id,
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
  const user = (req as CustomRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        user_id: user.id,
        product_id: product_id,
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
