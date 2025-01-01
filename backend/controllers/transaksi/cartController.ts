// Import necessary modules and Prisma instance
import { Request, response, Response } from "express";
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
      product_id: cartItem.product.id,
      product_name: cartItem.product.product_name,
      price: parseFloat(cartItem.product.price.toString()), // Assuming price is stored as a string in the DB
      stock: cartItem.product.stock,
      quantity: cartItem.quantity,
      media_source:
        cartItem.product.media.length > 0
          ? cartItem.product.media[0].source
          : null,
      category_id: cartItem.product.category.id,
      category_name: cartItem.product.category.category_name,
      brand: cartItem.product.brand?.brand_name || "", // Assuming brand has a `brand_name` field
      estimated_weight: cartItem.product.estimated_weight || null, // Assuming estimated_weight is stored in product
      is_selected: cartItem.is_selected,
    }));

    res
      .status(200)
      .json({ status: "success fetching carts", carts: formattedCart });
  } catch (error: any) {
    console.error("Error fetching Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new item to Keranjang
export const addToCart = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { product_id, quantity } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const requestedQuantity = quantity ? parseInt(quantity) : 1;

    // Fetch the product to check its stock
    const product = await prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the requested quantity exceeds the stock
    if (product.stock < requestedQuantity) {
      return res.status(400).json({
        message: `Not enough stock available. Only ${product.stock} items left.`,
        product_name: product.product_name,
      });
    }

    // Check if the product is already in the cart for the user
    const existingKeranjang = await prisma.cart.findFirst({
      where: {
        product_id: product_id,
        user_id: user.id,
      },
    });

    let response;
    if (existingKeranjang) {
      const newQuantity = existingKeranjang.quantity + requestedQuantity;

      // Ensure the updated quantity does not exceed stock
      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: `Not enough stock available. Only ${
            product.stock - existingKeranjang.quantity
          } more items can be added.`,
          product_name: product.product_name,
        });
      }

      // Update the existing cart entry to increase quantity
      const updatedKeranjang = await prisma.cart.update({
        where: {
          id: existingKeranjang.id,
        },
        data: {
          quantity: newQuantity,
        },
      });

      response = updatedKeranjang;
    } else {
      // Ensure the requested quantity does not exceed stock for a new cart entry
      const newKeranjang = await prisma.cart.create({
        data: {
          product_id: product_id,
          user_id: user.id,
          quantity: requestedQuantity,
          date: new Date(),
        },
      });

      response = newKeranjang;
    }

    // Include product_name in the response
    res.status(200).json({
      ...response,
      product_name: product.product_name,
    });
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Delete all cart items for the user
    const deleteResult = await prisma.cart.deleteMany({
      where: {
        user_id: user.id,
      },
    });

    if (deleteResult.count === 0) {
      return res
        .status(404)
        .json({ message: "No cart items found to delete." });
    }

    res.status(200).json({ message: "Successfully cleared all cart items." });
  } catch (error: any) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove an item from Keranjang
export const removeFromCart = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { product_id } = req.params; // Corrected parameter name
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Use deleteMany since we're matching on multiple fields
    const deleteResult = await prisma.cart.deleteMany({
      where: {
        product_id: product_id, // Ensure product_id is an integer
        user_id: user.id,
      },
    });

    if (deleteResult.count === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Successfully deleted cart item." });
  } catch (error: any) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an item in Keranjang
// export const updateCartItem = async (req: Request, res: Response) => {
//   const { id } = req.params; // id refers to id_keranjang
//   const { product_id } = req.body;
//   try {
//     const updatedKeranjang = await prisma.cart.update({
//       where: {
//         id: parseInt(id),
//       },
//       data: {
//         product_id: parseInt(product_id),
//         date: new Date(),
//       },
//     });
//     res.status(200).json(updatedKeranjang);
//   } catch (error: any) {
//     console.error("Error updating Keranjang item:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const partialUpdateCart = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { product_id } = req.params;
  const { quantity, is_selected } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Fetch the cart item based on user_id and product_id
    const cartItem = await prisma.cart.findFirst({
      where: {
        user_id: user.id,
        product_id: product_id,
      },
      include: {
        product: true, // Include the related product details
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const updates: any = {};

    // Check and update quantity if provided
    if (quantity !== undefined) {
      const requestedQuantity = parseInt(quantity);

      // Check stock availability
      if (cartItem.product.stock < requestedQuantity) {
        return res.status(400).json({
          message: `Not enough stock available. Only ${cartItem.product.stock} items left.`,
          product_name: cartItem.product.product_name,
        });
      }

      updates.quantity = requestedQuantity;
    }

    // Update is_selected if provided
    if (is_selected !== undefined) {
      updates.is_selected = is_selected;
    }

    // Update the cart entry
    const updatedCartItem = await prisma.cart.update({
      where: {
        id: cartItem.id,
      },
      data: updates,
    });

    res.status(200).json({
      message: "Cart updated successfully",
      updatedCartItem,
      product_name: cartItem.product.product_name,
    });
  } catch (error: any) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleCartSelection = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { is_selected } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (typeof is_selected !== "boolean") {
    return res.status(400).json({ message: "`is_selected` must be a boolean value" });
  }

  try {
    // Update all cart items for the user
    const updatedCartItems = await prisma.cart.updateMany({
      where: {
        user_id: user.id,
      },
      data: {
        is_selected,
      },
    });

    // Fetch updated cart items for response
    const cartItems = await prisma.cart.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        product: true,
      },
    });

    res.status(200).json({
      message: `All cart items have been marked as ${is_selected ? "selected" : "unselected"}`,
      updatedCount: updatedCartItems.count,
      cartItems,
    });
  } catch (error: any) {
    console.error("Error toggling cart selection:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
