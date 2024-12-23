import { Request, Response } from "express";
import prisma from "../../utils/database";

export const getAllSocketRamType = async (req: Request, res: Response) => {
  try {
    const socketType = await prisma.socket.findMany({
      include: { brand: true },
    });
    const ramType = await prisma.ram_type.findMany();
    res.status(200).json({
      message: "Success fetching socket and ram type",
      status_code: 200,
      data: { socket: socketType, ram_type: ramType },
    });
  } catch (error: any) {
    console.log("Error feteching socket and ram type", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
