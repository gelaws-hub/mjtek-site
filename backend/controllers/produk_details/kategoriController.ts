import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Kategori sorted by id
export const getAllKategori = async (req: Request, res: Response) => {
  try {
    const kategori = await prisma.kategori.findMany({
      orderBy: {
        id_kategori: 'asc', // Sort by id_kategori in ascending order
      },
    });
    res.status(200).json(kategori);
  } catch (error: any) {
    console.error("Error fetching all Kategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Kategori by ID
export const getKategoriById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const kategori = await prisma.kategori.findUnique({
      where: {
        id_kategori: parseInt(id),
      },
    });
    if (!kategori) {
      res.status(404).json({ error: "Kategori not found" });
    } else {
      res.status(200).json(kategori);
    }
  } catch (error: any) {
    console.error("Error fetching Kategori by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new Kategori
export const createKategori = async (req: Request, res: Response) => {
  const { nama_kategori } = req.body;
  try {
    const newKategori = await prisma.kategori.create({
      data: {
        nama_kategori,
      },
    });
    res.status(201).json(newKategori);
  } catch (error: any) {
    console.error("Error creating new Kategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Kategori
export const updateKategori = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama_kategori } = req.body;
  try {
    const updatedKategori = await prisma.kategori.update({
      where: {
        id_kategori: parseInt(id),
      },
      data: {
        nama_kategori,
      },
    });
    res.status(200).json(updatedKategori);
  } catch (error: any) {
    console.error("Error updating Kategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Kategori
export const deleteKategori = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.kategori.delete({
      where: {
        id_kategori: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Kategori:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
