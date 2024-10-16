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
  const { socket_name } = req.body; // Updated to underscore case
  if (!socket_name) {
    return res.status(400).json({ error: "Socket name is required" });
  }
  try {
    const new_socket = await prisma.socket.create({
      data: { socket_name },
    });
    res.status(201).json({ socket: new_socket });
  } catch (error: any) {
    console.error("Error creating new socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { socket_name } = req.body; // Updated to underscore case
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
    res.status(204).send(); // No content
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Socket not found" });
    }
    console.error("Error deleting socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
