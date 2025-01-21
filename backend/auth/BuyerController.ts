import { Request, Response, NextFunction, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

interface CustomRequest extends Request {
  user: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

interface ValidationRequest extends Request {
  user?: CustomRequest["user"];
}

export const getUsers = async (req: ValidationRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const searchQuery = Array.isArray(search)
      ? search.join(" ")
      : String(search);

    // Ensure `page` and `limit` are numbers
    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));

    // Calculate offset for pagination
    const offset = (pageNumber - 1) * limitNumber;

    // Query the database
    const result = await prisma.user.findMany({
      where: {
        role_name: "buyer",
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery } },
        ],
        is_active: true,
      },
      skip: offset,
      take: limitNumber,
    });

    // Get total count for pagination
    const total = await prisma.user.count({
      where: {
        role_name: "buyer",
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery } },
        ],
        is_active: true,
      },
    });

    // Send response
    res.json({
      user: result,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
      message: "User list",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};
