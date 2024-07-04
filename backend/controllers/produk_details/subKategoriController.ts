import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all SubKategori sorted by id_sub_kategori
export const getAllSubKategori = async (req: Request, res: Response) => {
  try {
    const subKategori = await prisma.subKategori.findMany({
      orderBy: {
        id_sub_kategori: 'asc', // Sort by id_sub_kategori in ascending order
      },
    });
    res.status(200).json(subKategori);
  } catch (error: any) {
    console.error("Error fetching all SubKategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get SubKategori by ID
export const getSubKategoriById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subKategori = await prisma.subKategori.findUnique({
      where: {
        id_sub_kategori: parseInt(id),
      },
    });
    if (!subKategori) {
      res.status(404).json({ error: "SubKategori not found" });
    } else {
      res.status(200).json(subKategori);
    }
  } catch (error: any) {
    console.error("Error fetching SubKategori by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new SubKategori
export const createSubKategori = async (req: Request, res: Response) => {
  const { nama_sub_kategori } = req.body;
  try {
    const newSubKategori = await prisma.subKategori.create({
      data: {
        nama_sub_kategori,
      },
    });
    res.status(201).json(newSubKategori);
  } catch (error: any) {
    console.error("Error creating new SubKategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a SubKategori
export const updateSubKategori = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama_sub_kategori } = req.body;
  try {
    const updatedSubKategori = await prisma.subKategori.update({
      where: {
        id_sub_kategori: parseInt(id),
      },
      data: {
        nama_sub_kategori,
      },
    });
    res.status(200).json(updatedSubKategori);
  } catch (error: any) {
    console.error("Error updating SubKategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a SubKategori
export const deleteSubKategori = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.subKategori.delete({
      where: {
        id_sub_kategori: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting SubKategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
