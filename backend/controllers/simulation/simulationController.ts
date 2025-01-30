import { Request, Response } from "express";
import prisma from "../../utils/database";
import ShortUniqueId = require("short-unique-id");

interface CustomRequest extends Request {
  user?: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

const uid = new ShortUniqueId({ length: 8 });

export const saveSimulation = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const data = req.body;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const newSimulation = await prisma.simulation.create({
      data: {
        id: uid.rnd(),
        user_id: user.id,
        modifiedAt: new Date(),
        ...data,
      },
    });
    return res.status(201).json(newSimulation);
  } catch (error) {
    console.error(`Error saving simulation for user ${user.name}:`, error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSimulations = async(req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const simulations = await prisma.simulation.findMany({
      where: {
        user_id: user.id,
      },
    });
    return res.status(200).json(simulations);
  } catch (error) {
    console.error(`Error getting simulations for user ${user.name}:`, error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getSimulationById = async(req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { id } = req.params;
  try {
    const simulation = await prisma.simulation.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json(simulation);
  } catch (error) {
    console.error(`Error getting simulation for user ${user?.name}:`, error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const updateSimulation = async(req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { id } = req.params;
  const data = req.body;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const updatedSimulation = await prisma.simulation.update({
      where: {
        id: id,
      },
      data: {
        modifiedAt: new Date(),
        user_id: user.id,
        ...data,
      },
    });
    return res.status(200).json(updatedSimulation);
  } catch (error) {
    console.error(`Error updating simulation for user ${user.name}:`, error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const deleteSimulation = async(req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { id } = req.params;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const deletedSimulation = await prisma.simulation.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Simulation deleted successfully", simulation: deletedSimulation });
  } catch (error) {
    console.error(`Error deleting simulation for user ${user.name}:`, error);
    return res.status(500).json({ message: "Server error" });
  }
}