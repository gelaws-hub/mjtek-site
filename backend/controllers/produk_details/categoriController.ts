import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Categories sorted by id
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc", // Sort by id in ascending order
      },
    });
    res
      .status(200)
      .json({
        message: "Successfully fetched all Categories",
        data: categories,
      });
  } catch (error: any) {
    console.error("Error fetching all Categories:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch Categories", error: error.message });
  }
};

// Get Category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id), // Match with the Prisma schema
      },
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res
        .status(200)
        .json({ message: "Successfully fetched Category", data: category });
    }
  } catch (error: any) {
    console.error("Error fetching Category by ID:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch Category", error: error.message });
  }
};

// Create a new Category
export const createCategory = async (req: Request, res: Response) => {
  const { category_name } = req.body; // Adjusted to match schema
  try {
    const newCategory = await prisma.category.create({
      data: {
        category_name, // Match with the Prisma schema
      },
    });
    res
      .status(201)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (error: any) {
    console.error("Error creating new Category:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create Category", error: error.message });
  }
};

// Update a Category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category_name } = req.body; // Adjusted to match schema
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id), // Match with the Prisma schema
      },
      data: {
        category_name, // Match with the Prisma schema
      },
    });
    res
      .status(200)
      .json({
        message: "Category updated successfully",
        data: updatedCategory,
      });
  } catch (error: any) {
    console.error("Error updating Category:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update Category", error: error.message });
  }
};

// Delete a Category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id), // Match with the Prisma schema
      },
    });
    res.status(204).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting Category:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete Category", error: error.message });
  }
};
