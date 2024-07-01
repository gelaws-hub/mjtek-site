import { PrismaClient, Detail_Motherboard } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDetailMotherboard = async () => {
  return await prisma.detail_Motherboard.findMany();
};

export const getDetailMotherboardById = async (id_produk: number, id_socket: number, id_tipe_ram: number) => {
  return await prisma.detail_Motherboard.findUnique({
    where: { id_produk_id_socket_id_tipe_ram: { id_produk, id_socket, id_tipe_ram } },
    include: {
      Produk: true,
      Socket: true,
      TipeRAM: true,
    },
  });
};

export const createDetailMotherboard = async (data: Detail_Motherboard) => {
  return await prisma.detail_Motherboard.create({
    data,
  });
};

export const updateDetailMotherboard = async (id_produk: number, id_socket: number, id_tipe_ram: number, data: Detail_Motherboard) => {
  return await prisma.detail_Motherboard.update({
    where: { id_produk_id_socket_id_tipe_ram: { id_produk, id_socket, id_tipe_ram } },
    data,
  });
};

export const deleteDetailMotherboard = async (id_produk: number, id_socket: number, id_tipe_ram: number) => {
  return await prisma.detail_Motherboard.delete({
    where: { id_produk_id_socket_id_tipe_ram: { id_produk, id_socket, id_tipe_ram } },
  });
};
