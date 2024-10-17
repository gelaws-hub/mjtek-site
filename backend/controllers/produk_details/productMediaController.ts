import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Media
export const getAllMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const media = await prisma.media.findMany();
    return res.status(200).json(media);
  } catch (error: any) {
    console.error("Error fetching all Media:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get Media by ID
export const getMediaById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    return res.status(200).json(media);
  } catch (error: any) {
    console.error("Error fetching Media by ID:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create Media
export const createMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { product_id, source, file_type } = req.body;
  try {
    const newMedia = await prisma.media.create({
      data: {
        product_id,
        source,
        file_type,
      },
    });
    return res.status(201).json(newMedia);
  } catch (error: any) {
    console.error("Error creating Media:", error.message);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Media already exists" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update Media by ID
export const updateMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { product_id, source, file_type } = req.body;
  try {
    const updatedMedia = await prisma.media.update({
      where: { id: parseInt(id) },
      data: {
        product_id,
        source,
        file_type,
      },
    });
    return res.status(200).json(updatedMedia);
  } catch (error: any) {
    console.error("Error updating Media:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Media not found" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Media by ID
export const deleteMedia = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    await prisma.media.delete({
      where: { id: parseInt(id) },
    });
    return res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Media:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Media not found" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
