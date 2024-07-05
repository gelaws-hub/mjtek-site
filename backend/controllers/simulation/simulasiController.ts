import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Simulasi
export const getAllSimulasi = async (req: Request, res: Response) => {
  try {
    const simulasi = await prisma.simulasi.findMany({
      include: {
        User: true,
        DetailSimulasi: {
          include: {
            Simulasi: true,
            Produk: {
              include: {
                Kategori: true,
                SubKategori: true,
                Brand: true,
                Media: true,
                Produk_Tipe_RAM: {
                  include: {
                    Tipe_RAM: true,
                  }
                },
                Produk_Socket: {
                  select: {
                    nama_socket: true,
                  }
                },
              }
            },
          },
        },
      },
    });
    res.status(200).json(simulasi);
  } catch (error: any) {
    console.error("Error fetching Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Simulasi by ID
export const getSimulasiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const simulasi = await prisma.simulasi.findUnique({
      where: { id_simulasi: parseInt(id) },
      include: {
        User: true,
        DetailSimulasi: {
          include: {
            Simulasi: true,
            Produk: {
              include: {
                Kategori: true,
                SubKategori: true,
                Brand: true,
                Media: true,
                Produk_Tipe_RAM: {
                  include: {
                    Tipe_RAM: true,
                  }
                },
                Produk_Socket: {
                  select: {
                    nama_socket: true,
                  }
                },
              }
            },
          },
        },
      },
    });
    if (!simulasi) {
      res.status(404).json({ error: "Simulasi not found" });
    } else {
      res.status(200).json(simulasi);
    }
  } catch (error: any) {
    console.error("Error fetching Simulasi by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new Simulasi
export const createSimulasi = async (req: Request, res: Response) => {
  const { id_user, judul, deskripsi } = req.body;
  try {
    const newSimulasi = await prisma.simulasi.create({
      data: {
        id_user,
        judul,
        deskripsi,
        tanggal: new Date(),
      },
    });
    res.status(201).json(newSimulasi);
  } catch (error: any) {
    console.error("Error creating new Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Simulasi
export const updateSimulasi = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { judul, deskripsi, tanggal } = req.body;
  try {
    const updatedSimulasi = await prisma.simulasi.update({
      where: { id_simulasi: parseInt(id) },
      data: {
        judul,
        deskripsi,
        tanggal: new Date(tanggal),
      },
    });
    res.status(200).json(updatedSimulasi);
  } catch (error: any) {
    console.error("Error updating Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Simulasi
export const deleteSimulasi = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.simulasi.delete({
      where: { id_simulasi: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Simulasi:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
