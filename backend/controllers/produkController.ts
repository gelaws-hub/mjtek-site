import { Request, Response } from "express";
import prisma from "../utils/database";

// Get all produk
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

export const getAllProduk = async (req: Request, res: Response) => {
  try {
    const produk = await prismaClient.produk.findMany({
      select: {
        id_produk: true,
        nama_produk: true,
        harga: true,
        est_berat: true,
        deskripsi: true,
        stok: true,
        Kategori: {
          select: {
            nama_kategori: true,
          },
        },
        DetailCPU: {
          select: {
            Socket: {
              select: {
                nama_socket: true,
              },
            },
          },
        },
        DetailMotherboard: {
          select: {
            Socket: {
              select: {
                nama_socket: true,
              },
            },
          },
        },
        DetailRAM: {
          select: {
            TipeRAM: {
              select: {
                tipe_ram: true,
              },
            },
          },
        },
      },
    });
    const formattedProduk = produk.map((item) => ({
      ...item,
      harga: parseFloat(item.harga as unknown as string),
      est_berat: parseFloat(item.est_berat as unknown as string),
    }));

    res.status(200).json(formattedProduk);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllProduk = async (req: Request, res: Response) => {
//   try {
//     const allProduk = await prisma.produk.findMany();
//     res.status(200).json(allProduk);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// Get produk by ID
export const getProdukById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const produk = await prisma.produk.findUnique({
      where: {
        id_produk: parseInt(id),
      },
    });
    if (!produk) {
      res.status(404).json({ error: "Produk not found" });
    } else {
      res.status(200).json(produk);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new produk
export const createProduk = async (req: Request, res: Response) => {
  const {
    id_kategori,
    id_sub_kategori,
    id_brand,
    nama_produk,
    harga,
    deskripsi,
    est_berat,
    stok,
  } = req.body;
  try {
    const newProduk = await prisma.produk.create({
      data: {
        id_kategori,
        id_sub_kategori,
        id_brand,
        nama_produk,
        harga,
        deskripsi,
        est_berat,
        stok,
      },
    });
    res.status(201).json(newProduk);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a produk
export const updateProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    id_kategori,
    id_sub_kategori,
    id_brand,
    nama_produk,
    harga,
    deskripsi,
    est_berat,
    stok,
  } = req.body;
  try {
    const updatedProduk = await prisma.produk.update({
      where: {
        id_produk: parseInt(id),
      },
      data: {
        id_kategori,
        id_sub_kategori,
        id_brand,
        nama_produk,
        harga,
        deskripsi,
        est_berat,
        stok,
      },
    });
    res.status(200).json(updatedProduk);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a produk
export const deleteProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.produk.delete({
      where: {
        id_produk: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
