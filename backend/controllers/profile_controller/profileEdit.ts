import { Request, Response } from "express";
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

export const editProfile = async (req: any, res: Response) => {
  const { name, address, phone_number } = req.body;

  try {
    // Validasi input
    if (name && name.length > 100) {
      return res.status(400).json({ message: "Name is too long (max 100 characters)." });
    }

    if (phone_number) {
      const existingUserWithPhone = await prisma.user.findUnique({
        where: { id: req.user.id, phone_number },
      });
      if (existingUserWithPhone && existingUserWithPhone.id !== req.user.id) {
        return res.status(400).json({ message: "Phone number is already in use." });
      }
    }

    // Periksa apakah pengguna ada
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Bangun data pembaruan secara dinamis
    const updateData: any = {};
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phone_number) updateData.phone_number = phone_number;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    // Berikan respons
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role_name: updatedUser.role_name,
        address: updatedUser.address,
        phone_number: updatedUser.phone_number,
      },
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
