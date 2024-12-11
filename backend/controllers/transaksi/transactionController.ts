import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Transaksi
export const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const transaksi = await prisma.transaction.findMany({
      include: {
        transaction_detail: true,
      },
    });
    res.status(200).json(transaksi);
  } catch (error: any) {
    console.error("Error fetching Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Transaksi by ID
export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaksi = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: {
        transaction_detail: true,
      },
    });
    res.status(200).json(transaksi);
  } catch (error: any) {
    console.error("Error fetching Transaksi by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new Transaksi
export const createTransaction = async (req: Request, res: Response) => {
  const { user_id, total_items, total_price, status, transaction_detail } = req.body;
  try {
    const newTransaksi = await prisma.transaction.create({
      data: {
        user_id,
        total_items,
        total_price,
        status,
        transaction_detail: {
          create: transaction_detail,
        },
      },
      include: {
        transaction_detail: true,
      },
    });
    res.status(201).json(newTransaksi);
  } catch (error: any) {
    console.error("Error creating Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Transaksi by ID
export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { total_items, total_price } = req.body;
  try {
    const updatedTransaksi = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        total_items,
        total_price,
      },
    });
    res.status(200).json(updatedTransaksi);
  } catch (error: any) {
    console.error("Error updating Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Transaksi by ID
export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Transaksi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
