import { PrismaClient, Detail_RAM } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDetailRAM = async () => {
  return await prisma.detail_RAM.findMany();
};

export const getDetailRAMById = async (id_produk: number, id_tipe_ram: number) => {
  return await prisma.detail_RAM.findUnique({
    where: { id_produk_id_tipe_ram: { id_produk, id_tipe_ram } },
    include: {
      Produk: true,
      TipeRAM: true,
    },
  });
};

export const createDetailRAM = async (data: Detail_RAM) => {
  return await prisma.detail_RAM.create({
    data,
  });
};

export const updateDetailRAM = async (id_produk: number, id_tipe_ram: number, data: Detail_RAM) => {
  return await prisma.detail_RAM.update({
    where: { id_produk_id_tipe_ram: { id_produk, id_tipe_ram } },
    data,
  });
};

export const deleteDetailRAM = async (id_produk: number, id_tipe_ram: number) => {
  return await prisma.detail_RAM.delete({
    where: { id_produk_id_tipe_ram: { id_produk, id_tipe_ram } },
  });
};
