import { Request, response, Response } from "express";
import prisma from "../../utils/database";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

export const getUserAddress = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const addresses = await prisma.user.findUnique({
      select: { name: true, address: true, email: true, phone_number: true },
      where: {
        id: user.id,
      },
    });

    return res.json(addresses);
  } catch (error) {
    console.error("Error fetching user address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserAddress = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { address, email, phone_number } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const updatedUser = await prisma.user.update({
      select: { name: true, address: true, email: true, phone_number: true },
      where: {
        id: user.id,
      },
      data: {
        address,
        email,
        phone_number,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};