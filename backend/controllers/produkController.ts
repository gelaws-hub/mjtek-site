import { Request, Response } from "express";
import * as ProdukModel from "../models/Produk";

const formatProduk = (produk: any) => {
  const formattedProduk = produk.map((item: any) => {
    // Flatten DetailCPU, DetailMotherboard, and DetailRAM
    const cpuSockets = item.DetailCPU.map((cpu: any) => cpu.Socket.nama_socket).join(', ');
    const motherboardSockets = item.DetailMotherboard.map((mb: any) => mb.Socket.nama_socket).join(', ');
    const ramTypes = item.DetailRAM.map((ram: any) => ram.TipeRAM.tipe_ram).join(', ');

    return {
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      harga: parseFloat(item.harga),
      est_berat: parseFloat(item.est_berat),
      deskripsi: item.deskripsi,
      stok: item.stok,
      nama_kategori: item.Kategori?.nama_kategori || null,
      nama_socket: cpuSockets || motherboardSockets || null,
      tipe_ram: ramTypes || null,
    };
  });

  return formattedProduk;
};

export const getAllProduk = async (req: Request, res: Response) => {
  try {
    const produk = await ProdukModel.getAllProduk();
    const formattedProduk = formatProduk(produk);
    res.status(200).json(formattedProduk);
  } catch (error: any) {
    console.error('Error fetching produk:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProdukById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const produk = await ProdukModel.getProdukById(parseInt(id));
    if (!produk) {
      res.status(404).json({ error: 'Produk not found' });
    } else {
      const formattedProduk = formatProduk([produk]);
      res.status(200).json(formattedProduk[0]);
    }
  } catch (error: any) {
    console.error('Error fetching produk by ID:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
    isDeleted = false,
  } = req.body;
  try {
    const newProduk = await ProdukModel.createProduk({
      id_kategori,
      id_sub_kategori,
      id_brand,
      nama_produk,
      harga,
      deskripsi,
      est_berat,
      stok,
      isDeleted,
    });
    res.status(201).json(newProduk);
  } catch (error: any) {
    console.error("Error creating new produk:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
    const updatedProduk = await ProdukModel.updateProduk(parseInt(id), {
      id_kategori,
      id_sub_kategori,
      id_brand,
      nama_produk,
      harga,
      deskripsi,
      est_berat,
      stok,
    });
    res.status(200).json(updatedProduk);
  } catch (error: any) {
    console.error("Error updating produk:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ProdukModel.deleteProduk(parseInt(id));
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting produk:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
