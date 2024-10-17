// Import necessary modules and Prisma instance
import { Request, Response } from "express";
import prisma from "../../utils/database";

<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
              },
            },
          },
        },
      },
    });
<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
    res.status(200).json(cartItems);
  } catch (error: any) {
    console.error("Error fetching cart:", error.message);
=======
    res.status(200).json(keranjang);
  } catch (error: any) {
    console.error("Error fetching Keranjang:", error.message);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
    res.status(500).json({ error: "Internal server error" });
  }
};

<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
          quantity,
          date: new Date(),
        },
      });
<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
      res.status(201).json(newCartItem);
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);
=======

      res.status(201).json(newKeranjang);
    }
  } catch (error: any) {
    console.error("Error adding to Keranjang:", error.message);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
    res.status(500).json({ error: "Internal server error" });
  }
};

<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
// Remove an item from Cart
export const removeFromCart = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to cart item id
=======
// Remove an item from Keranjang
export const removeFromCart = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_keranjang
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
  try {
    await prisma.cart.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error: any) {
<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
    console.error("Error removing from cart:", error.message);
=======
    console.error("Error removing from Keranjang:", error.message);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
    res.status(500).json({ error: "Internal server error" });
  }
};

<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
// Update an item in Cart
export const updateCartItem = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to cart item id
  const { productId, quantity } = req.body;
  try {
    const updatedCartItem = await prisma.cart.update({
=======
// Update an item in Keranjang
export const updateCartItem = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_keranjang
  const { product_id } = req.body;
  try {
    const updatedKeranjang = await prisma.cart.update({
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
      where: {
        id: parseInt(id),
      },
      data: {
<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
        productId: parseInt(productId),
        quantity: quantity,
        date: new Date(),
      },
    });
    res.status(200).json(updatedCartItem);
  } catch (error: any) {
    console.error("Error updating cart item:", error.message);
=======
        product_id: parseInt(product_id),
        date: new Date(),
      },
    });
    res.status(200).json(updatedKeranjang);
  } catch (error: any) {
    console.error("Error updating Keranjang item:", error.message);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
    res.status(500).json({ error: "Internal server error" });
  }
};

<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
// Clear all items from Cart for a user
export const clearCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await prisma.cart.deleteMany({
      where: {
        userId,
=======
// Clear all items from Keranjang for a user
export const clearCart = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    await prisma.cart.deleteMany({
      where: {
        user_id,
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
      },
    });
    res.status(204).end();
  } catch (error: any) {
<<<<<<< HEAD:backend/controllers/transaction/cartController.ts
    console.error("Error clearing cart:", error.message);
=======
    console.error("Error clearing Keranjang:", error.message);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc:backend/controllers/transaksi/cartController.ts
    res.status(500).json({ error: "Internal server error" });
  }
};
