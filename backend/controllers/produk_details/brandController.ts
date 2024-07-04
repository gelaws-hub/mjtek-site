import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Brands
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        id_brand: 'asc', // Sort by id in ascending order
      },
    });
    res.status(200).json(brands);
  } catch (error: any) {
    console.error("Error fetching all Brands:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Brand by ID
export const getBrandById = async (req: Request, res: Response) => {
  const { id_brand } = req.params;
  try {
    const brand = await prisma.brand.findUnique({
      where: { id_brand: parseInt(id_brand) },
    });
    if (!brand) {
      res.status(404).json({ error: "Brand not found" });
    } else {
      res.status(200).json(brand);
    }
  } catch (error: any) {
    console.error("Error fetching Brand by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new Brand
export const createBrand = async (req: Request, res: Response) => {
  const { nama_brand } = req.body;
  try {
    const newBrand = await prisma.brand.create({
      data: { nama_brand },
    });
    res.status(201).json(newBrand);
  } catch (error: any) {
    console.error("Error creating new Brand:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Brand
export const updateBrand = async (req: Request, res: Response) => {
  const { id_brand } = req.params;
  const { nama_brand } = req.body;
  try {
    const updatedBrand = await prisma.brand.update({
      where: { id_brand: parseInt(id_brand) },
      data: { nama_brand },
    });
    res.status(200).json(updatedBrand);
  } catch (error: any) {
    console.error("Error updating Brand:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Brand
export const deleteBrand = async (req: Request, res: Response) => {
  const { id_brand } = req.params;
  try {
    await prisma.brand.delete({
      where: { id_brand: parseInt(id_brand) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Brand:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
