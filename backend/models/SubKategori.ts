import { PrismaClient, SubKategori as SubKategoriModel } from "@prisma/client";
import prisma from "../utils/database";

const SubKategori = {
  findAll: async (): Promise<SubKategoriModel[]> => {
    return prisma.subKategori.findMany({
      orderBy: {
        id_sub_kategori: "asc",
      },
    });
  },
  findById: async (id: number): Promise<SubKategoriModel | null> => {
    return prisma.subKategori.findUnique({
      where: { id_sub_kategori: id },
    });
  },
  create: async (
    data: Omit<SubKategoriModel, "id_sub_kategori">
  ): Promise<SubKategoriModel> => {
    return prisma.subKategori.create({
      data,
    });
  },
  update: async (
    id: number,
    data: Partial<SubKategoriModel>
  ): Promise<SubKategoriModel | null> => {
    return prisma.subKategori.update({
      where: { id_sub_kategori: id },
      data,
    });
  },
  delete: async (id: number): Promise<SubKategoriModel | null> => {
    return prisma.subKategori.delete({
      where: { id_sub_kategori: id },
    });
  },
};

export default SubKategori;
