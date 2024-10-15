import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all Simulations
export const getAllSimulations = async (req: Request, res: Response) => {
  try {
    const simulations = await prisma.simulation.findMany({
      include: {
        User: true,
        SimulationDetail: {
          include: {
            Product: {
              include: {
                Category: true,
                SubCategory: true,
                Brand: true,
                Media: true,
                ProductRamType: {
                  include: {
                    RamType: true,
                  },
                },
                ProductSocket: {
                  include: {
                    Socket: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json(simulations);
  } catch (error: any) {
    console.error("Error fetching Simulations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Simulation by ID
export const getSimulationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const simulation = await prisma.simulation.findUnique({
      where: { id: parseInt(id) },
      include: {
        User: true,
        SimulationDetail: {
          include: {
            Product: {
              include: {
                Category: true,
                SubCategory: true,
                Brand: true,
                Media: true,
                ProductRamType: {
                  include: {
                    RamType: true,
                  },
                },
                ProductSocket: {
                  include: {
                    Socket: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!simulation) {
      return res.status(404).json({ error: "Simulation not found" });
    }
    res.status(200).json(simulation);
  } catch (error: any) {
    console.error("Error fetching Simulation by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new Simulation
export const createSimulation = async (req: Request, res: Response) => {
  const { userId, title, description } = req.body;
  try {
    const newSimulation = await prisma.simulation.create({
      data: {
        userId,
        title,
        description,
        date: new Date(),
      },
    });
    res.status(201).json(newSimulation);
  } catch (error: any) {
    console.error("Error creating new Simulation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Simulation
export const updateSimulation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  try {
    const updatedSimulation = await prisma.simulation.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        date: new Date(date),
      },
    });
    res.status(200).json(updatedSimulation);
  } catch (error: any) {
    console.error("Error updating Simulation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Simulation
export const deleteSimulation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.simulation.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting Simulation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
