import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Detail_Transaksi
export const getAllDetailTransaksi = async (req: Request, res: Response) => {
  try {
    const detailTransaksi = await prisma.transaction_detail.findMany();
    res.status(200).json(detailTransaksi);
  } catch (error: any) {
    console.error("Error fetching Detail_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Detail_Transaksi by ID
export const getDetailTransaksiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detailTransaksi = await prisma.transaction_detail.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(detailTransaksi);
  } catch (error: any) {
    console.error("Error fetching Detail_Transaksi by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new Detail_Transaksi
export const createDetailTransaksi = async (req: Request, res: Response) => {
  const { product_id, transaction_id, quantity, total_price } = req.body;
  try {
    const newDetailTransaksi = await prisma.transaction_detail.create({
      data: {
        product_id,
        transaction_id,
        quantity,
        total_price,
      },
    });
    res.status(201).json(newDetailTransaksi);
  } catch (error: any) {
    console.error("Error creating Detail_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Detail_Transaksi by ID
export const updateDetailTransaksi = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity, total_price } = req.body;
  try {
    const updatedDetailTransaksi = await prisma.transaction_detail.update({
      where: { id: parseInt(id) },
      data: {
        quantity,
        total_price,
      },
    });
    res.status(200).json(updatedDetailTransaksi);
  } catch (error: any) {
    console.error("Error updating Detail_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Detail_Transaksi by ID
export const deleteDetailTransaksi = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.transaction_detail.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Detail_Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
