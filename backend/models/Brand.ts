import { PrismaClient, Brand as BrandModel } from "@prisma/client";
import prisma from "../utils/database";

const Brand = {
  findAll: async (): Promise<BrandModel[]> => {
    return prisma.brand.findMany({
      orderBy: {
        id_brand: "asc",
      },
    });
  },
  findById: async (id: number): Promise<BrandModel | null> => {
    return prisma.brand.findUnique({
      where: { id_brand: id },
    });
  },
  create: async (data: Omit<BrandModel, "id_brand">): Promise<BrandModel> => {
    return prisma.brand.create({
      data,
    });
  },
  update: async (
    id: number,
    data: Partial<BrandModel>
  ): Promise<BrandModel | null> => {
    return prisma.brand.update({
      where: { id_brand: id },
      data,
    });
  },
  delete: async (id: number): Promise<BrandModel | null> => {
    return prisma.brand.delete({
      where: { id_brand: id },
    });
  },
};

export default Brand;
