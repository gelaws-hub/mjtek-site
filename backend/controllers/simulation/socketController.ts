import { Request, Response } from "express";
import prisma from "../../utils/database";

export const getAllSockets = async (req: Request, res: Response) => {
  try {
    const brandId = req.query.brand_id
      ? parseInt(req.query.brand_id as string)
      : undefined;
    const brandName = req.query.brand_name
      ? (req.query.brand_name as string)
      : undefined;

    const sockets = await prisma.socket.findMany({
      where: {
        ...(brandId && { brand_id: brandId }),

        ...(brandName && {
          brand: { brand_name: { contains: brandName } },
        }),
      },
      include: {
        brand: {
          select: {
            brand_name: true,
          },
        },
      },
    });

    res.status(200).json({ sockets });
  } catch (error: any) {
    console.error("Error fetching sockets:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSocketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const socket = await prisma.socket.findUnique({
      where: { id: parseInt(id) },
    });
    if (!socket) {
      return res.status(404).json({ error: "Socket not found" });
    }
    res.status(200).json({ socket });
  } catch (error: any) {
    console.error("Error fetching socket by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createMultipleSockets = async (req: Request, res: Response) => {
  const socketsData = req.body;

  try {
    const newSockets = await prisma.socket.createMany({
      data: socketsData,
      skipDuplicates: true,
    });

    res.status(201).json({
      message: "Sockets created successfully",
      count: newSockets.count,
    });
  } catch (error) {
    console.error("Error creating sockets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { socket_name } = req.body;
  if (!socket_name) {
    return res.status(400).json({ error: "Socket name is required" });
  }
  try {
    const updated_socket = await prisma.socket.update({
      where: { id: parseInt(id) },
      data: { socket_name },
    });
    res.status(200).json({ socket: updated_socket });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Socket not found" });
    }
    console.error("Error updating socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.socket.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Socket not found" });
    }
    console.error("Error deleting socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
