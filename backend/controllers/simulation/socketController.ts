import { Request, Response } from "express";
import prisma from "../../utils/database";

export const getAllSockets = async (req: Request, res: Response) => {
  try {
    const sockets = await prisma.socket.findMany();
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

export const createSocket = async (req: Request, res: Response) => {
  const { socketName } = req.body; // Update variable name for consistency
  if (!socketName) {
    return res.status(400).json({ error: "Socket name is required" });
  }
  try {
    const newSocket = await prisma.socket.create({
      data: { socketName },
    });
    res.status(201).json({ socket: newSocket });
  } catch (error: any) {
    console.error("Error creating new socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { socketName } = req.body; // Update variable name for consistency
  if (!socketName) {
    return res.status(400).json({ error: "Socket name is required" });
  }
  try {
    const updatedSocket = await prisma.socket.update({
      where: { id: parseInt(id) },
      data: { socketName },
    });
    res.status(200).json({ socket: updatedSocket });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma error code for "Record to update not found"
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
    res.status(204).send(); // No content
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma error code for "Record to delete not found"
      return res.status(404).json({ error: "Socket not found" });
    }
    console.error("Error deleting socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
