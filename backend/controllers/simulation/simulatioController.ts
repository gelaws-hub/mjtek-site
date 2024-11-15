import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all simulations
export const getAllSimulations = async (req: Request, res: Response) => {
  try {
    const simulations = await prisma.simulation.findMany({
      include: {
        user: true,
        simulation_detail: {
          include: {
            product: {
              include: {
                category: true,
                sub_category: true,
                brand: true,
                media: true,
                product_ram_type: {
                  include: {
                    ram_type: true,
                  },
                },
                product_socket: {
                  include: {
                    socket: true,
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
    console.error("Error fetching simulations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get simulation by ID
export const getSimulationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const simulation = await prisma.simulation.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        simulation_detail: {
          include: {
            product: {
              include: {
                category: true,
                sub_category: true,
                brand: true,
                media: true,
                product_ram_type: {
                  include: {
                    ram_type: true,
                  },
                },
                product_socket: {
                  include: {
                    socket: true,
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
    console.error("Error fetching simulation by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new simulation
export const createSimulation = async (req: Request, res: Response) => {
  const { user_id = 'dummy_simulation', title, description } = req.body; 
  try {
    const new_simulation = await prisma.simulation.create({
      data: {
        user_id,
        title,
        description,
        date: new Date(),
      },
    });
    res.status(201).json({
      status_code: 201,
      message: "Simulation created successfully",
      simulation: new_simulation,
    });
  } catch (error: any) {
    console.error("Error creating new simulation:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};


// Update a simulation
export const updateSimulation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  try {
    const updated_simulation = await prisma.simulation.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        date: new Date(date),
      },
    });
    res.status(200).json(updated_simulation);
  } catch (error: any) {
    console.error("Error updating simulation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a simulation
export const deleteSimulation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.simulation.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting simulation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
