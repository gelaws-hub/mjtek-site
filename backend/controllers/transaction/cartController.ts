// Import necessary modules and Prisma instance
import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Cart items by userId
export const getAllCartByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        Product: {
          include: {
            Category: true,
            SubCategory: true,
            Brand: true,
            ProductRamType: {
              include: {
                RamType: true,
              },
            },
            ProductSocket: {
              include: {
                Socket: true,
              },
            },
            Media: {
              select: {
                id: true,
                source: true,
                fileType: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(cartItems);
  } catch (error: any) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new item to Cart
export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the product is already in the user's cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        productId: parseInt(productId),
        userId,
      },
    });

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      const updatedCartItem = await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
      res.status(200).json(updatedCartItem);
    } else {
      // Add a new item to the cart
      const newCartItem = await prisma.cart.create({
        data: {
          productId: parseInt(productId),
          userId,
          quantity,
          date: new Date(),
        },
      });
      res.status(201).json(newCartItem);
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove an item from Cart
export const removeFromCart = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to cart item id
  try {
    await prisma.cart.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an item in Cart
export const updateCartItem = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to cart item id
  const { productId, quantity } = req.body;
  try {
    const updatedCartItem = await prisma.cart.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productId: parseInt(productId),
        quantity: quantity,
        date: new Date(),
      },
    });
    res.status(200).json(updatedCartItem);
  } catch (error: any) {
    console.error("Error updating cart item:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear all items from Cart for a user
export const clearCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await prisma.cart.deleteMany({
      where: {
        userId,
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
