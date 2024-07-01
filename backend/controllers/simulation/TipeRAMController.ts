import { Request, Response } from 'express';
import * as TipeRAMModel from '../../models/simulation/TipeRAM';

// Get all Tipe_RAM
export const getAllTipeRAM = async (req: Request, res: Response) => {
  try {
    const tipeRAMs = await TipeRAMModel.getAllTipeRAM();
    res.status(200).json(tipeRAMs);
  } catch (error: any) {
    console.error("Error fetching all Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Tipe_RAM by ID
export const getTipeRAMById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tipeRAM = await TipeRAMModel.getTipeRAMById(parseInt(id));
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
    const newTipeRAM = await TipeRAMModel.createTipeRAM({ tipe_ram });
    res.status(201).json(newTipeRAM);
  } catch (error: any) {
    console.error("Error creating new Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Tipe_RAM
export const updateTipeRAM = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const updatedTipeRAM = await TipeRAMModel.updateTipeRAM(parseInt(id), data);
    res.status(200).json(updatedTipeRAM);
  } catch (error: any) {
    console.error("Error updating Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Tipe_RAM
export const deleteTipeRAM = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await TipeRAMModel.deleteTipeRAM(parseInt(id));
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Tipe RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
