import { Request, Response } from 'express';
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
      where: { id_socket: parseInt(id) },
    });
    if (!socket) {
      res.status(404).json({ error: "Socket not found" });
    } else {
      res.status(200).json({ socket });
    }
  } catch (error: any) {
    console.error("Error fetching socket by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSocket = async (req: Request, res: Response) => {
  const { nama_socket } = req.body;
  try {
    const newSocket = await prisma.socket.create({
      data: { nama_socket },
    });
    res.status(201).json({ socket: newSocket });
  } catch (error: any) {
    console.error("Error creating new socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama_socket } = req.body;
  try {
    const updatedSocket = await prisma.socket.update({
      where: { id_socket: parseInt(id) },
      data: { nama_socket },
    });
    res.status(200).json({ socket: updatedSocket });
  } catch (error: any) {
    console.error("Error updating socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.socket.delete({
      where: { id_socket: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
