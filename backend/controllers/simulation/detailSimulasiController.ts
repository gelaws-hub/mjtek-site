import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all DetailSimulasi for a specific Simulasi
export const getAllDetailSimulasi = async (req: Request, res: Response) => {
  const { id_simulasi } = req.params;
  try {
    const detailSimulasi = await prisma.detail_Simulasi.findMany({
      where: { id_simulasi: parseInt(id_simulasi) },
      include: {
        Produk: true,
        Simulasi: true
      }
    });
    res.status(200).json(detailSimulasi);
  } catch (error: any) {
    console.error("Error fetching Detail Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get DetailSimulasi by ID
export const getDetailSimulasiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detailSimulasi = await prisma.detail_Simulasi.findUnique({
      where: { id_detail_simulasi: parseInt(id) },
      include: {
        Produk: true,
        Simulasi: true
      }
    });
    if (!detailSimulasi) {
      res.status(404).json({ error: "Detail Simulasi not found" });
    } else {
      res.status(200).json(detailSimulasi);
    }
  } catch (error: any) {
    console.error("Error fetching Detail Simulasi by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new DetailSimulasi
export const createDetailSimulasi = async (req: Request, res: Response) => {
  const { id_simulasi, id_produk } = req.body;
  try {
    const newDetailSimulasi = await prisma.detail_Simulasi.create({
      data: {
        id_simulasi,
        id_produk
      }
    });
    res.status(201).json(newDetailSimulasi);
  } catch (error: any) {
    console.error("Error creating new Detail Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a DetailSimulasi
export const deleteDetailSimulasi = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.detail_Simulasi.delete({
      where: { id_detail_simulasi: parseInt(id) }
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Detail Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
