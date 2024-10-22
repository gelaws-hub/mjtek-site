// Import necessary modules and Prisma instance
import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Keranjang by id_user
export const getAllCartByUserId = async (req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const keranjang = await prisma.cart.findMany({
      where: {
        user_id: id_user,
      },
      include: {
        product: {
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
        },
      },
    });
    res.status(200).json(keranjang);
  } catch (error: any) {
    console.error("Error fetching Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new item to Keranjang
export const addToCart = async (req: Request, res: Response) => {
  const { user_id, id_produk, quantity } = req.body;

  try {
    // Check if the product is already in Keranjang for the user
    const existingKeranjang = await prisma.cart.findFirst({
      where: {
        product_id: parseInt(id_produk),
        user_id,
      },
    });

    if (existingKeranjang) {
      // Update the existing entry to increase jumlah_produk
      const updatedKeranjang = await prisma.cart.update({
        where: {
          id: existingKeranjang.id,
        },
        data: {
          quantity: {
            increment: quantity, // Increment jumlah_produk by the amount provided
          },
        },
      });

      res.status(200).json(updatedKeranjang);
    } else {
      // Create a new entry in Keranjang if the product isn't already added
      const newKeranjang = await prisma.cart.create({
        data: {
          product_id: parseInt(id_produk),
          user_id,
          quantity,
          date: new Date(),
        },
      });

      res.status(201).json(newKeranjang);
    }
  } catch (error: any) {
    console.error("Error adding to Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove an item from Keranjang
export const removeFromCart = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_keranjang
  try {
    await prisma.cart.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error removing from Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an item in Keranjang
export const updateCartItem = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_keranjang
  const { product_id } = req.body;
  try {
    const updatedKeranjang = await prisma.cart.update({
      where: {
        id: parseInt(id),
      },
      data: {
        product_id: parseInt(product_id),
        date: new Date(),
      },
    });
    res.status(200).json(updatedKeranjang);
  } catch (error: any) {
    console.error("Error updating Keranjang item:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear all items from Keranjang for a user
export const clearCart = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    await prisma.cart.deleteMany({
      where: {
        user_id,
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error clearing Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
