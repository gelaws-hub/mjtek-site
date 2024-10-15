import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all SubCategory sorted by id
export const getAllSubCategory = async (req: Request, res: Response) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      orderBy: {
        id: "asc", // Sort by id in ascending order
      },
    });
    res.status(200).json(subCategories);
  } catch (error: any) {
    console.error("Error fetching all SubCategories:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get SubCategory by ID
export const getSubCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error: any) {
    console.error("Error fetching SubCategory by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new SubCategory
export const createSubCategory = async (req: Request, res: Response) => {
  const { subCategoryName } = req.body;
  try {
    const newSubCategory = await prisma.subCategory.create({
      data: {
        subCategoryName, // Ensure the field matches your schema
      },
    });
    res.status(201).json(newSubCategory);
  } catch (error: any) {
    console.error("Error creating new SubCategory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a SubCategory
export const updateSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { subCategoryName } = req.body;
  try {
    const updatedSubCategory = await prisma.subCategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        subCategoryName, // Ensure the field matches your schema
      },
    });
    res.status(200).json(updatedSubCategory);
  } catch (error: any) {
    console.error("Error updating SubCategory:", error.message);
    if (error.code === "P2025") {
      // Prisma error for "record not found"
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a SubCategory
export const deleteSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.subCategory.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).end(); // No content
  } catch (error: any) {
    console.error("Error deleting SubCategory:", error.message);
    if (error.code === "P2025") {
      // Prisma error for "record not found"
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
