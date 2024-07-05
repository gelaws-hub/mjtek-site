import { Request, Response } from "express";
import prisma from "../utils/database";

export const getAllProduks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const [totalCount, produks] = await prisma.$transaction([
      prisma.produk.count(),
      prisma.produk.findMany({
        skip,
        take: limit,
        orderBy: {
          id_produk: "asc",
        },
        include: {
          Kategori: true,
          SubKategori: true,
          Brand: true,
          Produk_Tipe_RAM: {
            include: {
              Tipe_RAM: true,
            },
          },
          Produk_Socket: {
            include: {
              nama_socket: true,
            },
          },
          Media: {
            select: {
              id_media: true,
              sumber: true,
              tipe_file: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const formattedProduks = produks.map((produk) => ({
      id_produk: produk.id_produk,
      nama_produk: produk.nama_produk,
      harga: parseFloat(produk.harga.toString()),
      est_berat: produk.est_berat,
      deskripsi: produk.deskripsi,
      stok: produk.stok,
      kategori: produk.Kategori || null,
      subkategori: produk.SubKategori || null,
      brand: produk.Brand || null,
      produk_tipe_ram:
        produk.Produk_Tipe_RAM.length > 0
          ? produk.Produk_Tipe_RAM.map((tipeRam: any) => tipeRam.Tipe_RAM)
          : null,
      produk_socket:
        produk.Produk_Socket.length > 0
          ? produk.Produk_Socket.map((socket: any) => socket.nama_socket)
          : null,
      media:
        produk.Media.length > 0
          ? produk.Media.map((media: any) => media)
          : null,
      isDeleted: produk.isDeleted,
    }));

    res.status(200).json({
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: limit,
      produks: formattedProduks,
    });
  } catch (error: any) {
    console.error("Error fetching Produk with pagination:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a single produk by ID
export const getProdukById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produk = await prisma.produk.findUnique({
      where: { id_produk: parseInt(id) },
      include: {
        Kategori: true,
        SubKategori: true,
        Brand: true,
        Produk_Tipe_RAM: {
          include: {
            Tipe_RAM: true,
          },
        },
        Produk_Socket: {
          include: {
            nama_socket: true,
          },
        },
        Media: {
          select: {
            id_media: true,
            sumber: true,
            tipe_file: true,
          },
        },
      },
    });

    if (!produk) {
      return res.status(404).json({ error: "Produk not found" });
    }

    const formattedProduk = {
      id_produk: produk.id_produk,
      nama_produk: produk.nama_produk,
      harga: parseFloat(produk.harga.toString()),
      est_berat: produk.est_berat,
      deskripsi: produk.deskripsi,
      stok: produk.stok,
      kategori: produk.Kategori || null,
      subkategori: produk.SubKategori || null,
      brand: produk.Brand || null,
      produk_tipe_ram:
        produk.Produk_Tipe_RAM.length > 0
          ? produk.Produk_Tipe_RAM.map((tipeRam: any) => tipeRam.Tipe_RAM)
          : null,
      produk_socket:
        produk.Produk_Socket.length > 0
          ? produk.Produk_Socket.map((socket: any) => socket.nama_socket)
          : null,
      media:
        produk.Media.length > 0
          ? produk.Media.map((media: any) => media)
          : null,
      isDeleted: produk.isDeleted,
    };

    res.status(200).json(formattedProduk);
  } catch (error: any) {
    console.error("Error fetching Produk by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduk = async (req: Request, res: Response) => {
  const {
    nama_produk,
    id_kategori,
    id_sub_kategori,
    id_brand,
    harga,
    est_berat,
    deskripsi,
    stok,
    media,
    produk_tipe_ram,
    produk_socket,
  } = req.body;
  try {
    const newProduk = await prisma.produk.create({
      data: {
        nama_produk,
        id_kategori,
        id_sub_kategori,
        id_brand,
        harga,
        est_berat,
        deskripsi,
        stok,
        Media: {
          create: media.map((m: any) => ({
            sumber: m.sumber,
            tipe_file: m.tipe_file,
          })),
        },
        Produk_Tipe_RAM: {
          create: produk_tipe_ram.map((id_tipe_ram: number) => ({
            id_tipe_ram,
          })),
        },
        Produk_Socket: {
          create: produk_socket.map((id_socket: number) => ({
            id_socket,
          })),
        },
      },
    });

    res.status(201).json(newProduk);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nama_produk,
    id_kategori,
    id_sub_kategori,
    id_brand,
    harga,
    est_berat,
    deskripsi,
    stok,
    media,
    produk_tipe_ram,
    produk_socket,
  } = req.body;
  try {
    const updatedProduk = await prisma.produk.update({
      where: { id_produk: Number(id) },
      data: {
        nama_produk,
        id_kategori,
        id_sub_kategori,
        id_brand,
        harga,
        est_berat,
        deskripsi,
        stok,
        Media: {
          deleteMany: {},
          create: media.map((m: any) => ({
            sumber: m.sumber,
            tipe_file: m.tipe_file,
          })),
        },
        Produk_Tipe_RAM: {
          deleteMany: {},
          create: produk_tipe_ram.map((id_tipe_ram: number) => ({
            id_tipe_ram,
          })),
        },
        Produk_Socket: {
          deleteMany: {},
          create: produk_socket.map((id_socket: number) => ({
            id_socket,
          })),
        },
      },
    });

    res.json(updatedProduk);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.produk.update({
      where: { id_produk: Number(id) },
      data: { isDeleted: true },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
