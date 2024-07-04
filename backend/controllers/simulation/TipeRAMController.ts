import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Tipe_RAM
export const getAllTipeRAM = async (req: Request, res: Response) => {
  try {
    const tipeRAMs = await prisma.tipe_RAM.findMany();
    res.status(200).json(tipeRAMs);
  } catch (error: any) {
    console.error("Error fetching all Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Tipe_RAM by ID
export const getTipeRAMById = async (req: Request, res: Response) => {
  const { id_tipe_ram } = req.params;
  try {
    const tipeRAM = await prisma.tipe_RAM.findUnique({
      where: { id_tipe_ram: parseInt(id_tipe_ram) },
    });
    if (!tipeRAM) {
      res.status(404).json({ error: "Tipe RAM not found" });
    } else {
      res.status(200).json(tipeRAM);
    }
  } catch (error: any) {
    console.error("Error fetching Tipe RAM by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new Tipe_RAM
export const createTipeRAM = async (req: Request, res: Response) => {
  const { tipe_ram } = req.body;
  try {
    const newTipeRAM = await prisma.tipe_RAM.create({
      data: { tipe_ram },
    });
    res.status(201).json(newTipeRAM);
  } catch (error: any) {
    console.error("Error creating new Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Tipe_RAM
export const updateTipeRAM = async (req: Request, res: Response) => {
  const { id_tipe_ram } = req.params;
  const { tipe_ram } = req.body;
  try {
    const updatedTipeRAM = await prisma.tipe_RAM.update({
      where: { id_tipe_ram: parseInt(id_tipe_ram) },
      data: { tipe_ram },
    });
    res.status(200).json(updatedTipeRAM);
  } catch (error: any) {
    console.error("Error updating Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Tipe_RAM
export const deleteTipeRAM = async (req: Request, res: Response) => {
  const { id_tipe_ram } = req.params;
  try {
    await prisma.tipe_RAM.delete({
      where: { id_tipe_ram: parseInt(id_tipe_ram) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
