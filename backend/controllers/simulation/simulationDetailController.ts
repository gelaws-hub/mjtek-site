import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all simulation details for a specific simulation
export const getAllSimulationDetails = async (req: Request, res: Response) => {
  const { simulation_id } = req.params;
  try {
    const simulation_details = await prisma.simulation_detail.findMany({
      where: { simulation_id: parseInt(simulation_id) },
      include: {
        product: true,
        simulation: true,
      },
    });
    if (simulation_details.length === 0) {
      return res
        .status(404)
        .json({ message: "No simulation details found for this simulation" });
    }
    res.status(200).json(simulation_details);
  } catch (error: any) {
    console.error("Error fetching simulation details:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get simulation detail by ID
export const getSimulationDetailById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const simulation_detail = await prisma.simulation_detail.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true,
        simulation: true,
      },
    });
    if (!simulation_detail) {
      return res.status(404).json({ message: "Simulation detail not found" });
    }
    res.status(200).json(simulation_detail);
  } catch (error: any) {
    console.error("Error fetching simulation detail by ID:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create a new simulation detail
export const createSimulationDetail = async (req: Request, res: Response) => {
  const { simulation_id, product_id } = req.body;
  try {
    const new_simulation_detail = await prisma.simulation_detail.create({
      data: {
        simulation_id,
        product_id,
      },
    });
    res.status(201).json({
      message: "Simulation detail created successfully",
      simulation_detail: new_simulation_detail,
    });
  } catch (error: any) {
    console.error("Error creating new simulation detail:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a simulation detail
export const deleteSimulationDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.simulation_detail.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json({ message: "Simulation detail deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting simulation detail:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
