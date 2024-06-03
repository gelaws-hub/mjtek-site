// models/Produk.ts
import { PrismaClient, Produk as ProdukModel } from '@prisma/client';
import prisma from '../utils/database';

const Produk = {
  findAll: async (): Promise<ProdukModel[]> => {
    return prisma.produk.findMany();
  },
  findById: async (id: number): Promise<ProdukModel | null> => {
    return prisma.produk.findUnique({
      where: { id_produk: id },
    });
  },
  create: async (data: Omit<ProdukModel, 'id_produk'>): Promise<ProdukModel> => {
    return prisma.produk.create({
      data,
    });
  },
  update: async (id: number, data: Partial<ProdukModel>): Promise<ProdukModel | null> => {
    return prisma.produk.update({
      where: { id_produk: id },
      data,
    });
  },
  delete: async (id: number): Promise<ProdukModel | null> => {
    return prisma.produk.delete({
      where: { id_produk: id },
    });
  },
};

export default Produk;
