import { PrismaClient, Detail_Motherboard } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDetailMotherboard = async () => {
  return await prisma.detail_Motherboard.findMany();
};

export const getDetailMotherboardById = async (id_detail_motherboard: number) => {
  return await prisma.detail_Motherboard.findUnique({
    where: { id_detail_motherboard },
    include: {
      Produk: true,
      Socket: true,
      TipeRAM: true,
    },
  });
};

export const createDetailMotherboard = async (data: Omit<Detail_Motherboard, 'id_detail_motherboard'>) => {
  return await prisma.detail_Motherboard.create({
    data,
  });
};

export const updateDetailMotherboard = async (id_detail_motherboard: number, data: Partial<Detail_Motherboard>) => {
  return await prisma.detail_Motherboard.update({
    where: { id_detail_motherboard },
    data,
  });
};

export const deleteDetailMotherboard = async (id_detail_motherboard: number) => {
  return await prisma.detail_Motherboard.delete({
    where: { id_detail_motherboard },
  });
};
