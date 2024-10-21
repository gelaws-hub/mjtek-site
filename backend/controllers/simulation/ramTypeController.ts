import { Request, Response } from "express";
import prisma from "../../utils/database";

// Get all RamType
export const getAllRamTypes = async (req: Request, res: Response) => {
  try {
    const ramTypes = await prisma.ram_type.findMany();
    res.status(200).json(ramTypes);
  } catch (error: any) {
    console.error("Error fetching all RAM types:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get RamType by ID
export const getRamTypeById = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming your schema uses "id" for primary key
  try {
    const ramType = await prisma.ram_type.findUnique({
      where: { id: parseInt(id) },
    });
    if (!ramType) {
      res.status(404).json({ error: "RAM type not found" });
    } else {
      res.status(200).json(ramType);
    }
  } catch (error: any) {
    console.error("Error fetching RAM type by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new RamType
export const createRamType = async (req: Request, res: Response) => {
  const { name } = req.body; // Assuming 'name' is the field for RAM type name
  try {
    const newRamType = await prisma.ram_type.create({
      data: { ram_type_name: name },
    });
    res.status(201).json(newRamType);
  } catch (error: any) {
    console.error("Error creating new RAM type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a RamType
export const updateRamType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedRamType = await prisma.ram_type.update({
      where: { id: parseInt(id) },
      data: { ram_type_name: name },
    });
    res.status(200).json(updatedRamType);
  } catch (error: any) {
    console.error("Error updating RAM type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a RamType
export const deleteRamType = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.ram_type.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error("Error deleting RAM type:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
