import { PrismaClient, Detail_RAM } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDetailRAM = async () => {
  return await prisma.detail_RAM.findMany();
};

export const getDetailRAMById = async (id_detail_ram: number) => {
  return await prisma.detail_RAM.findUnique({
    where: { id_detail_ram },
    include: {
      Produk: true,
      TipeRAM: true,
    },
  });
};

export const createDetailRAM = async (data: Omit<Detail_RAM, 'id_detail_ram'>) => {
  return await prisma.detail_RAM.create({
    data,
  });
};

export const updateDetailRAM = async (id_detail_ram: number, data: Detail_RAM) => {
  return await prisma.detail_RAM.update({
    where: { id_detail_ram },
    data,
  });
};

export const deleteDetailRAM = async (id_detail_ram: number) => {
  return await prisma.detail_RAM.delete({
    where: { id_detail_ram },
  });
};
