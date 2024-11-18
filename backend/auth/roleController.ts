import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new role
export const createRole = async (req: Request, res: Response): Promise<void> => {
  const { role_name, description } = req.body;

  try {
    const newRole = await prisma.role.create({
      data: {
        role_name,
        description,
      },
    });
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating role", error: error.message });
  }
};

// Get all roles
export const getAllRoles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving roles", error: error.message });
  }
};

// Get a role by ID
export const getRoleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const role = await prisma.role.findUnique({
      where: { id: Number(id) },
    });

    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    res.status(200).json(role);
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving role", error: error.message });
  }
};

// Update a role by ID
export const updateRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role_name, description } = req.body;

  try {
    const updatedRole = await prisma.role.update({
      where: { id: Number(id) },
      data: { role_name, description },
    });

    res.status(200).json({ message: "Role updated successfully", role: updatedRole });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating role", error: error.message });
  }
};

// Delete a role by ID
export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.role.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting role", error: error.message });
  }
};
