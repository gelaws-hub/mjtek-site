import { Request, Response } from 'express';
import * as SocketModel from '../../models/sim_compatibility/Socket';

export const getAllSockets = async (req: Request, res: Response) => {
  try {
    const sockets = await SocketModel.getAllSockets();
    res.status(200).json({ sockets });
  } catch (error: any) {
    console.error("Error fetching sockets:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSocketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const socket = await SocketModel.getSocketById(parseInt(id));
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
    const newSocket = await SocketModel.createSocket({ nama_socket });
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
    const updatedSocket = await SocketModel.updateSocket(parseInt(id), { nama_socket });
    res.status(200).json({ socket: updatedSocket });
  } catch (error: any) {
    console.error("Error updating socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSocket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await SocketModel.deleteSocket(parseInt(id));
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting socket:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

