import { Request, Response } from 'express';
import * as DetailRAMModel from '../../models/simulation/DetailRAM';

export const getAllDetailRAM = async (req: Request, res: Response) => {
  try {
    const detailRAMs = await DetailRAMModel.getAllDetailRAM();
    res.status(200).json(detailRAMs);
  } catch (error: any) {
    console.error("Error fetching detail RAMs:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDetailRAMById = async (req: Request, res: Response) => {
  const { id_produk, id_tipe_ram } = req.params;
  try {
    const detailRAM = await DetailRAMModel.getDetailRAMById(parseInt(id_produk), parseInt(id_tipe_ram));
    if (!detailRAM) {
      res.status(404).json({ error: "Detail RAM not found" });
    } else {
      res.status(200).json(detailRAM);
    }
  } catch (error: any) {
    console.error("Error fetching detail RAM by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDetailRAM = async (req: Request, res: Response) => {
  const { id_produk, id_tipe_ram } = req.body;
  try {
    const newDetailRAM = await DetailRAMModel.createDetailRAM({ id_produk, id_tipe_ram });
    res.status(201).json(newDetailRAM);
  } catch (error: any) {
    console.error("Error creating new detail RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDetailRAM = async (req: Request, res: Response) => {
  const { id_produk, id_tipe_ram } = req.params;
  const { data } = req.body;
  try {
    const updatedDetailRAM = await DetailRAMModel.updateDetailRAM(parseInt(id_produk), parseInt(id_tipe_ram), data);
    res.status(200).json(updatedDetailRAM);
  } catch (error: any) {
    console.error("Error updating detail RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDetailRAM = async (req: Request, res: Response) => {
  const { id_produk, id_tipe_ram } = req.params;
  try {
    await DetailRAMModel.deleteDetailRAM(parseInt(id_produk), parseInt(id_tipe_ram));
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting detail RAM:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
