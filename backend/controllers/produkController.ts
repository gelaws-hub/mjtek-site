import { Request, Response } from "express";
import * as ProdukModel from "../models/Produk";
import prisma from "../utils/database";

const formatProduk = (produk: Array<any>) => {
  const formattedProduk = produk.map((item: any) => {
    // const cpuSockets = item.DetailCPU.map((cpu: any) => cpu.Socket.nama_socket);
    // const motherboardSockets = item.DetailMotherboard.map(
    //   (mb: any) => mb.Socket.nama_socket
    // );
    // const motherboardRAM = item.DetailMotherboard.map(
    //   (mb: any) => mb.TipeRAM.tipe_ram
    // );
    // const ramTypes = item.DetailRAM.map((ram: any) => ram.TipeRAM.tipe_ram);
    const mediaProduk = item.Media.map((med: any) => med.sumber);

    return {
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      harga: parseFloat(item.harga),
      est_berat: parseFloat(item.est_berat),
      deskripsi: item.deskripsi,
      stok: item.stok,
      kategori: item.Kategori?.nama_kategori || null,
      subkategori: item.SubKategori?.nama_sub_kategori || null,
      brand: item.Brand?.nama_brand || null,
      // nama_socket:
      //   cpuSockets.length > 0
      //     ? cpuSockets
      //     : motherboardSockets.length > 0
      //     ? motherboardSockets
      //     : null,
      // tipe_ram:
      //   ramTypes.length > 0
      //     ? ramTypes
      //     : motherboardRAM.length > 0
      //     ? motherboardRAM
      //     : null,
      media: mediaProduk.length > 0 ? mediaProduk : null,
      isDeleted: item.isDeleted,
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
    console.error("Error fetching produk:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProdukById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const produk = await ProdukModel.getProdukById(parseInt(id));
    if (!produk) {
      res.status(404).json({ error: "Produk not found" });
    } else {
      const formattedProduk = formatProduk([produk]);
      res.status(200).json(formattedProduk[0]);
    }
  } catch (error: any) {
    console.error("Error fetching produk by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
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
    media,
  } = req.body;

  try {
    const data: any = {
      id_kategori,
      id_sub_kategori,
      id_brand,
      nama_produk,
      harga,
      deskripsi,
      est_berat,
      stok,
      isDeleted,
    };

    if (media && media.length > 0) {
      data.Media = {
        create: media.map((med: any) => ({
          sumber: med.sumber,
          tipe_file: med.tipe_file,
        })),
      };
    }

    const newProduk = await ProdukModel.createProduk(data);
    const formattedProduk = formatProduk([newProduk]);
    res.status(201).json(formattedProduk[0]);
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
    isDeleted = false,
    media,
  } = req.body;

  try {
    const data: any = {
      id_kategori,
      id_sub_kategori,
      id_brand,
      nama_produk,
      harga,
      deskripsi,
      est_berat,
      stok,
      isDeleted,
    };

    // Update media only if provided
    if (media && media.length > 0) {
      const existingMedia = await prisma.media.findMany({
        where: { id_produk: parseInt(id) }
      });

      const mediaToDelete = existingMedia.filter(
        (existing: any) => !media.some((m: any) => m.sumber === existing.sumber)
      );
      const mediaToCreate = media.filter(
        (m: any) => !existingMedia.some((existing) => existing.sumber === m.sumber)
      );

      if (mediaToDelete.length > 0) {
        data.Media = {
          deleteMany: {
            id_media: { in: mediaToDelete.map((m) => m.id_media) }
          }
        };
      }

      if (mediaToCreate.length > 0) {
        data.Media.create = mediaToCreate.map((med: any) => ({
          sumber: med.sumber,
          tipe_file: med.tipe_file
        }));
      }
    }

    const updatedProduk = await ProdukModel.updateProduk(parseInt(id), data);
    const formattedProduk = formatProduk([updatedProduk]);
    res.status(200).json(formattedProduk[0]);
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
