import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all SimulationDetails for a specific Simulation
export const getAllSimulationDetails = async (req: Request, res: Response) => {
  const { simulationId } = req.params; // Changed to camelCase
  try {
    const simulationDetails = await prisma.simulationDetail.findMany({
      where: { simulationId: parseInt(simulationId) }, // Updated to camelCase
      include: {
        Product: true,
        Simulation: true,
      },
    });
    if (simulationDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No simulation details found for this simulation" }); // Updated message
    }
    res.status(200).json(simulationDetails);
  } catch (error: any) {
    console.error("Error fetching simulation details:", error.message); // Updated log message
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get SimulationDetail by ID
export const getSimulationDetailById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const simulationDetail = await prisma.simulationDetail.findUnique({
      where: { id: parseInt(id) },
      include: {
        Product: true,
        Simulation: true,
      },
    });
    if (!simulationDetail) {
      return res.status(404).json({ message: "Simulation detail not found" }); // Updated message
    }
    res.status(200).json(simulationDetail);
  } catch (error: any) {
    console.error("Error fetching simulation detail by ID:", error.message); // Updated log message
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create a new SimulationDetail
export const createSimulationDetail = async (req: Request, res: Response) => {
  const { simulationId, productId } = req.body; // Changed to camelCase
  try {
    const newSimulationDetail = await prisma.simulationDetail.create({
      data: {
        simulationId,
        productId,
      },
    });
    res.status(201).json({
      message: "Simulation detail created successfully",
      simulationDetail: newSimulationDetail, // Updated to camelCase
    });
  } catch (error: any) {
    console.error("Error creating new simulation detail:", error.message); // Updated log message
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a SimulationDetail
export const deleteSimulationDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.simulationDetail.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json({ message: "Simulation detail deleted successfully" }); // Updated message
  } catch (error: any) {
    console.error("Error deleting simulation detail:", error.message); // Updated log message
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
