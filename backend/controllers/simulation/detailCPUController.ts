import { Request, Response } from 'express';
import * as DetailCPUModel from '../../models/simulation/DetailCPU';

export const getAllDetailCPU = async (req: Request, res: Response) => {
  try {
    const detailCPUs = await DetailCPUModel.getAllDetailCPU();
    res.status(200).json(detailCPUs);
  } catch (error: any) {
    console.error("Error fetching detail CPUs:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDetailCPUById = async (req: Request, res: Response) => {
  const { id_detail_cpu } = req.params;
  try {
    const detailCPU = await DetailCPUModel.getDetailCPUById(parseInt(id_detail_cpu));
    if (!detailCPU) {
      res.status(404).json({ error: "Detail CPU not found" });
    } else {
      res.status(200).json(detailCPU);
    }
  } catch (error: any) {
    console.error("Error fetching detail CPU by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createDetailCPU = async (req: Request, res: Response) => {
  const { id_produk, id_socket } = req.body;
  try {
    const newDetailCPU = await DetailCPUModel.createDetailCPU({ id_produk, id_socket });
    res.status(201).json(newDetailCPU);
  } catch (error: any) {
    console.error("Error creating new detail CPU:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateDetailCPU = async (req: Request, res: Response) => {
  const { id_detail_cpu } = req.params;
  const data = req.body;
  try {
    const updatedDetailCPU = await DetailCPUModel.updateDetailCPU(parseInt(id_detail_cpu), data);
    res.status(200).json(updatedDetailCPU);
  } catch (error: any) {
    console.error("Error updating detail CPU:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteDetailCPU = async (req: Request, res: Response) => {
  const { id_detail_cpu } = req.params;
  try {
    await DetailCPUModel.deleteDetailCPU(parseInt(id_detail_cpu));
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting detail CPU:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
