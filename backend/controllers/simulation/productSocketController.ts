import { Request, Response } from "express";
import prisma from "../../utils/database";

// Create a new product-socket relationship
export const createProductSocket = async (req: Request, res: Response) => {
  const { product_id, socket_id } = req.body;

  try {
    const newProductSocket = await prisma.product_socket.create({
      data: {
        product_id,
        socket_id,
      },
    });
    res.status(201).json({
      status_code: 201,
      message: "Product-Socket relationship created successfully",
      data: newProductSocket,
    });
  } catch (error: any) {
    console.error("Error creating product-socket relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Get a product-socket relationship by ID
export const getProductSocketById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productSocket = await prisma.product_socket.findUnique({
      where: { id: parseInt(id) },
      include: { product: true, socket: true },
    });
    if (!productSocket) {
      return res.status(404).json({ status_code: 404, message: "Product-Socket relationship not found" });
    }
    res.status(200).json({
      status_code: 200,
      message: "Success fetching product-socket relationship",
      data: productSocket,
    });
  } catch (error: any) {
    console.error("Error fetching product-socket relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Update a product-socket relationship by ID
export const updateProductSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_id, socket_id } = req.body;

  try {
    const updatedProductSocket = await prisma.product_socket.update({
      where: { id: parseInt(id) },
      data: { product_id, socket_id },
    });
    res.status(200).json({
      status_code: 200,
      message: "Product-Socket relationship updated successfully",
      data: updatedProductSocket,
    });
  } catch (error: any) {
    console.error("Error updating product-socket relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Delete a product-socket relationship by ID
export const deleteProductSocket = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product_socket.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status_code: 200,
      message: "Product-Socket relationship deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting product-socket relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};
