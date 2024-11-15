import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all simulation details for a specific simulation
export const getAllSimulationDetails = async (req: Request, res: Response) => {
  const { simulation_id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const simulation_details = await prisma.simulation_detail.findMany({
      where: { simulation_id: parseInt(simulation_id) },
      include: {
        product: true,
        simulation: true,
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const totalSimulationDetails = await prisma.simulation_detail.count({
      where: { simulation_id: parseInt(simulation_id) },
    });

    const totalPages = Math.ceil(totalSimulationDetails / limitNumber);

    if (simulation_details.length === 0) {
      return res.status(404).json({
        status_code: 404,
        message: "No simulation details found for this simulation",
      });
    }

    res.status(200).json({
      status_code: 200,
      message: "Successfully fetched simulation details",
      pagination: {
        current_page: pageNumber,
        per_page: limitNumber,
        total_pages: totalPages,
        total_simulation_details: totalSimulationDetails,
      },
      simulation_details,
    });
  } catch (error: any) {
    console.error("Error fetching simulation details:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
      error: error.message,
    });
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
      return res.status(404).json({
        status_code: 404,
        message: "Simulation detail not found",
      });
    }

    res.status(200).json({
      status_code: 200,
      message: "Successfully fetched simulation detail",
      simulation_detail,
    });
  } catch (error: any) {
    console.error("Error fetching simulation detail by ID:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
      error: error.message,
    });
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
      status_code: 201,
      message: "Simulation detail created successfully",
      simulation_detail: new_simulation_detail,
    });
  } catch (error: any) {
    console.error("Error creating new simulation detail:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a simulation detail
export const deleteSimulationDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.simulation_detail.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({
      status_code: 204,
      message: "Simulation detail deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting simulation detail:", error.message);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
