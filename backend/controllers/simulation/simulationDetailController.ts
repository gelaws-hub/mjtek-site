import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

<<<<<<< HEAD
// Create a new SimulationDetail
export const createSimulationDetail = async (req: Request, res: Response) => {
  const { simulationId, productId } = req.body; // Changed to camelCase
  try {
    const newSimulationDetail = await prisma.simulationDetail.create({
      data: {
        simulationId,
        productId,
=======
// Create a new simulation detail
export const createSimulationDetail = async (req: Request, res: Response) => {
  const { simulation_id, product_id } = req.body;
  try {
    const new_simulation_detail = await prisma.simulation_detail.create({
      data: {
        simulation_id,
        product_id,
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
      },
    });
    res.status(201).json({
      message: "Simulation detail created successfully",
<<<<<<< HEAD
      simulationDetail: newSimulationDetail, // Updated to camelCase
    });
  } catch (error: any) {
    console.error("Error creating new simulation detail:", error.message); // Updated log message
=======
      simulation_detail: new_simulation_detail,
    });
  } catch (error: any) {
    console.error("Error creating new simulation detail:", error.message);
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

<<<<<<< HEAD
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
=======
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
>>>>>>> 3192a890fb93685c491c89f7737b2befeb0ac8bc
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
