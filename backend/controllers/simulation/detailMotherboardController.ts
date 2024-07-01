import { Request, Response } from 'express';
import * as DetailMotherboardModel from '../../models/simulation/DetailMotherboard';

export const getAllDetailMotherboard = async (req: Request, res: Response) => {
  try {
    const detailMotherboards = await DetailMotherboardModel.getAllDetailMotherboard();
    res.status(200).json(detailMotherboards);
  } catch (error: any) {
    console.error("Error fetching detail motherboards:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDetailMotherboardById = async (req: Request, res: Response) => {
  const { id_detail_motherboard } = req.params;
  try {
    const detailMotherboard = await DetailMotherboardModel.getDetailMotherboardById(parseInt(id_detail_motherboard));
    if (!detailMotherboard) {
      res.status(404).json({ error: "Detail motherboard not found" });
    } else {
      res.status(200).json(detailMotherboard);
    }
  } catch (error: any) {
    console.error("Error fetching detail motherboard by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDetailMotherboard = async (req: Request, res: Response) => {
  const { id_produk, id_socket, id_tipe_ram } = req.body;
  try {
    const newDetailMotherboard = await DetailMotherboardModel.createDetailMotherboard({ id_produk, id_socket, id_tipe_ram });
    res.status(201).json(newDetailMotherboard);
  } catch (error: any) {
    console.error("Error creating new detail motherboard:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDetailMotherboard = async (req: Request, res: Response) => {
  const { id_detail_motherboard } = req.params;
  const data = req.body;
  try {
    const updatedDetailMotherboard = await DetailMotherboardModel.updateDetailMotherboard(parseInt(id_detail_motherboard), data);
    res.status(200).json(updatedDetailMotherboard);
  } catch (error: any) {
    console.error("Error updating detail motherboard:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDetailMotherboard = async (req: Request, res: Response) => {
  const { id_detail_motherboard } = req.params;
  try {
    await DetailMotherboardModel.deleteDetailMotherboard(parseInt(id_detail_motherboard));
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting detail motherboard:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
