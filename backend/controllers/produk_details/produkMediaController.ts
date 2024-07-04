import { Request, Response } from 'express';
import prisma from "../../utils/database";

// Get all Media
export const getAllMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const media = await prisma.media.findMany();
    res.status(200).json(media);
  } catch (error: any) {
    console.error("Error fetching all Media:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Media by ID
export const getMediaById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const media = await prisma.media.findUnique({
      where: { id_media: parseInt(id) },
    });
    if (!media) {
      res.status(404).json({ error: "Media not found" });
    } else {
      res.status(200).json(media);
    }
  } catch (error: any) {
    console.error("Error fetching Media by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create Media
export const createMedia = async (req: Request, res: Response): Promise<void> => {
  const { id_produk, sumber, tipe_file } = req.body;
  try {
    const newMedia = await prisma.media.create({
      data: { id_produk, sumber, tipe_file },
    });
    res.status(201).json(newMedia);
  } catch (error: any) {
    console.error("Error creating Media:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Media by ID
export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.media.delete({
      where: { id_media: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Media:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
