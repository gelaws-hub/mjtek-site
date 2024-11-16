import { Request, Response } from "express";
import prisma from "../../utils/database";

// Create a new product-RAM type relationship
export const createProductRamType = async (req: Request, res: Response) => {
  const { product_id, ram_type_id } = req.body;

  try {
    const newProductRamType = await prisma.product_ram_type.create({
      data: {
        product_id,
        ram_type_id,
      },
    });
    res.status(201).json({
      status_code: 201,
      message: "Product-RAM Type relationship created successfully",
      data: newProductRamType,
    });
  } catch (error: any) {
    console.error("Error creating product-RAM type relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Get a product-RAM type relationship by ID
export const getProductRamTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productRamType = await prisma.product_ram_type.findUnique({
      where: { id: parseInt(id) },
      include: { product: true, ram_type: true },
    });
    if (!productRamType) {
      return res.status(404).json({ status_code: 404, message: "Product-RAM Type relationship not found" });
    }
    res.status(200).json({
      status_code: 200,
      message: "Success fetching product-RAM type relationship",
      data: productRamType,
    });
  } catch (error: any) {
    console.error("Error fetching product-RAM type relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Update a product-RAM type relationship by ID
export const updateProductRamType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_id, ram_type_id } = req.body;

  try {
    const updatedProductRamType = await prisma.product_ram_type.update({
      where: { id: parseInt(id) },
      data: { product_id, ram_type_id },
    });
    res.status(200).json({
      status_code: 200,
      message: "Product-RAM Type relationship updated successfully",
      data: updatedProductRamType,
    });
  } catch (error: any) {
    console.error("Error updating product-RAM type relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};

// Delete a product-RAM type relationship by ID
export const deleteProductRamType = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product_ram_type.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status_code: 200,
      message: "Product-RAM Type relationship deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting product-RAM type relationship:", error.message);
    res.status(500).json({ status_code: 500, message: "Internal server error" });
  }
};
