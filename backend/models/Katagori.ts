import { PrismaClient, Kategori as KategoriModel } from '@prisma/client';
import prisma from '../utils/database';

const Kategori = {
    findAll: async (): Promise<KategoriModel[]> => {
        return prisma.kategori.findMany({
          orderBy: {
            id_kategori: 'asc',
          },
        });
      },
  findById: async (id: number): Promise<KategoriModel | null> => {
    return prisma.kategori.findUnique({
      where: { id_kategori: id },
    });
  },
  create: async (data: Omit<KategoriModel, 'id_kategori'>): Promise<KategoriModel> => {
    return prisma.kategori.create({
      data,
    });
  },
  update: async (id: number, data: Partial<KategoriModel>): Promise<KategoriModel | null> => {
    return prisma.kategori.update({
      where: { id_kategori: id },
      data,
    });
  },
  delete: async (id: number): Promise<KategoriModel | null> => {
    return prisma.kategori.delete({
      where: { id_kategori: id },
    });
  },
};

export default Kategori;
