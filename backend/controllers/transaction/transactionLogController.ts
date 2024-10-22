import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Log_Transaksi
export const getAllLogTransaksi = async (req: Request, res: Response) => {
  try {
    const logTransaksi = await prisma.transaction_log.findMany();
    res.status(200).json(logTransaksi);
  } catch (error: any) {
    console.error("Error fetching Log_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Log_Transaksi by ID
export const getLogTransaksiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const logTransaksi = await prisma.transaction_log.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(logTransaksi);
  } catch (error: any) {
    console.error("Error fetching Log_Transaksi by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new Log_Transaksi
export const createLogTransaksi = async (req: Request, res: Response) => {
  const { transaction_id, user_id, order_status, timestamp } = req.body;
  try {
    const newLogTransaksi = await prisma.transaction_log.create({
      data: {
        transaction_id,
        user_id,
        order_status,
        timestamp: new Date(timestamp),
      },
    });
    res.status(201).json(newLogTransaksi);
  } catch (error: any) {
    console.error("Error creating Log_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Log_Transaksi by ID
export const updateLogTransaksi = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { order_status, timestamp } = req.body;
  try {
    const updatedLogTransaksi = await prisma.transaction_log.update({
      where: { id: parseInt(id) },
      data: {
        order_status,
        timestamp: new Date(timestamp),
      },
    });
    res.status(200).json(updatedLogTransaksi);
  } catch (error: any) {
    console.error("Error updating Log_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Log_Transaksi by ID
export const deleteLogTransaksi = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.transaction_log.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Log_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
