// Import necessary modules and Prisma instance
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

export const getAllCartByUserId = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const keranjang = await prisma.cart.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        product: {
          include: {
            category: true,
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
              where: {
                file_type: "image", // Filter media to only include images
              },
              take: 1, // Only take the first image
              select: {
                source: true, // Select only the source of the image
              },
            },
          },
        },
      },
    });

    // Format the result
    const formattedCart = keranjang.map((cartItem) => ({
      id: cartItem.product.id,
      product_name: cartItem.product.product_name,
      price: parseFloat(cartItem.product.price.toString()), // Assuming price is stored as a string in the DB
      stock: cartItem.product.stock,
      quantity: cartItem.quantity,
      media_source:
        cartItem.product.media.length > 0
          ? cartItem.product.media[0].source
          : null,
      category_name: cartItem.product.category.category_name,
      brand: cartItem.product.brand?.brand_name || "", // Assuming brand has a `brand_name` field
      estimated_weight: cartItem.product.estimated_weight || null, // Assuming estimated_weight is stored in product
      is_selected: cartItem.is_selected,
    }));

    res.status(200).json({ status: "success fetching carts", carts: formattedCart });
  } catch (error: any) {
    console.error("Error fetching Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new item to Keranjang
export const addToCart = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { id_produk, quantity } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if the product is already in Keranjang for the user
    const existingKeranjang = await prisma.cart.findFirst({
      where: {
        product_id: parseInt(id_produk),
        user_id: user.id,
      },
    });

    const incrementQuantity = quantity ? quantity : 1; // Default to 1 if no quantity is provided

    if (existingKeranjang) {
      // Update the existing entry to increase quantity
      const updatedKeranjang = await prisma.cart.update({
        where: {
          id: existingKeranjang.id,
        },
        data: {
          quantity: existingKeranjang.quantity + incrementQuantity, // Increment current quantity
        },
      });

      res.status(200).json(updatedKeranjang);
    } else {
      // Create a new entry in Keranjang if the product isn't already added
      const newKeranjang = await prisma.cart.create({
        data: {
          product_id: parseInt(id_produk),
          user_id: user.id,
          quantity: incrementQuantity, // Set quantity to the increment value
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
