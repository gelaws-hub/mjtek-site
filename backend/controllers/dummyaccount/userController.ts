import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { role_id, username, email, password, address, phone_number } =
    req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        role_id,
        username,
        email,
        password, // Ensure to hash the password before saving
        address,
        phone_number,
      },
    });
    res.status(201).json({
      status_code: 201,
      message: "success creating user",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true, // This will include the role relation
      },
    });

    if (user) {
      res.status(200).json({
        status_code: 200,
        message: "success fetching user",
        user: {
          ...user, // Spread user data to keep the existing properties
          role: {
            id: user.role.id,
            role_name: user.role.role_name, // Including the role_name in the response
          },
        },
      });
    } else {
      res.status(404).json({
        status_code: 404,
        message: "user not found",
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role_id, username, email, address, phone_number } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role_id,
        username,
        email,
        address,
        phone_number,
      },
    });
    res.status(200).json({
      status_code: 200,
      message: "success updating user",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({
      status_code: 200,
      message: "success deleting user",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ status_code: 500, message: "Internal server error" });
  }
};

// Get all users with pagination
export const getAllUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const users = await prisma.user.findMany({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      include: {
        role: true, // This will include the role relation
      },
    });

    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / limitNumber);

    // Mapping the users to include the role details in the response
    const formattedUsers = users.map(user => ({
      ...user, // Spread the user data
      role: {
        id: user.role.id,
        role_name: user.role.role_name, // Include role_name and role_id
      },
    }));

    res.status(200).json({
      status_code: 200,
      message: "success fetching users",
      pagination: {
        current_page: pageNumber,
        per_page: limitNumber,
        total_pages: totalPages,
        total_users: totalUsers,
      },
      users: formattedUsers, // Use the formatted users with role data
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};
