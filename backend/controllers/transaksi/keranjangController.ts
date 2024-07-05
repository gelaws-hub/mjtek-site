// Import necessary modules and Prisma instance
import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Keranjang by id_user
export const getAllKeranjangByUserId = async (req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const keranjang = await prisma.keranjang.findMany({
      where: {
        id_user: id_user,
      },
      include: {
        Produk: {
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
        },
      },
    });
    res.status(200).json(keranjang);
  } catch (error: any) {
    console.error("Error fetching Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new item to Keranjang
export const addToKeranjang = async (req: Request, res: Response) => {
  const { id_user, id_produk, jumlah_produk } = req.body;

  try {
    // Check if the product is already in Keranjang for the user
    const existingKeranjang = await prisma.keranjang.findFirst({
      where: {
        id_produk: parseInt(id_produk),
        id_user,
      },
    });

    if (existingKeranjang) {
      // Update the existing entry to increase jumlah_produk
      const updatedKeranjang = await prisma.keranjang.update({
        where: {
          id_keranjang: existingKeranjang.id_keranjang,
        },
        data: {
          jumlah_produk: {
            increment: jumlah_produk, // Increment jumlah_produk by the amount provided
          },
        },
      });

      res.status(200).json(updatedKeranjang);
    } else {
      // Create a new entry in Keranjang if the product isn't already added
      const newKeranjang = await prisma.keranjang.create({
        data: {
          id_produk: parseInt(id_produk),
          id_user,
          jumlah_produk,
          tanggal: new Date(),
        },
      });

      res.status(201).json(newKeranjang);
    }
  } catch (error: any) {
    console.error("Error adding to Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove an item from Keranjang
export const removeFromKeranjang = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_keranjang
  try {
    await prisma.keranjang.delete({
      where: {
        id_keranjang: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error removing from Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an item in Keranjang
export const updateKeranjangItem = async (req: Request, res: Response) => {
  const { id } = req.params; // id refers to id_keranjang
  const { id_produk } = req.body;
  try {
    const updatedKeranjang = await prisma.keranjang.update({
      where: {
        id_keranjang: parseInt(id),
      },
      data: {
        id_produk: parseInt(id_produk),
        tanggal: new Date(),
      },
    });
    res.status(200).json(updatedKeranjang);
  } catch (error: any) {
    console.error("Error updating Keranjang item:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear all items from Keranjang for a user
export const clearKeranjang = async (req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    await prisma.keranjang.deleteMany({
      where: {
        id_user,
      },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error clearing Keranjang:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
