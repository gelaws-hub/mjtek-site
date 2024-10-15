import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Brands
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        id: "asc", // Sort by id in ascending order
      },
    });
    res.status(200).json({
      message: "Successfully fetched all brands",
      data: brands,
    });
  } catch (error: any) {
    console.error("Error fetching all Brands:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get Brand by ID
export const getBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: parseInt(id) }, // Match with the Prisma schema
    });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({
      message: "Successfully fetched brand",
      data: brand,
    });
  } catch (error: any) {
    console.error("Error fetching Brand by ID:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create a new Brand
export const createBrand = async (req: Request, res: Response) => {
  const { brandName } = req.body; // Adjusted to match schema
  try {
    const newBrand = await prisma.brand.create({
      data: { brandName }, // Match with the Prisma schema
    });
    res.status(201).json({
      message: "Brand created successfully",
      data: newBrand,
    });
  } catch (error: any) {
    console.error("Error creating new Brand:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update a Brand
export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brandName } = req.body; // Adjusted to match schema
  try {
    const updatedBrand = await prisma.brand.update({
      where: { id: parseInt(id) }, // Match with the Prisma schema
      data: { brandName }, // Match with the Prisma schema
    });
    res.status(200).json({
      message: "Brand updated successfully",
      data: updatedBrand,
    });
  } catch (error: any) {
    console.error("Error updating Brand:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a Brand
export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.brand.delete({
      where: { id: parseInt(id) }, // Match with the Prisma schema
    });
    res.status(204).json({ message: "Brand deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting Brand:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
