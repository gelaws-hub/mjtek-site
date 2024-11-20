import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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

// Middleware to ensure the user is a buyer
export const ensureCorrectUser: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const { user_id } = req.params;

  if (!authHeader) {
    return res.status(401).json({ message: "Access token not found" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;

    // Verify user ID in the database
    if (decoded.id !== user_id) {
      return res.status(404).json({ message: "You're not the correct user" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ message: "You're not the correct user" });
    }

    (req as unknown as CustomRequest).user = {
      id: user.id,
      role_name: user.role_name,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Access token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Access token invalid" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
};
