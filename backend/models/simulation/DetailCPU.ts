import { PrismaClient, Detail_CPU } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDetailCPU = async () => {
  return await prisma.detail_CPU.findMany();
};

export const getDetailCPUById = async (id_produk: number, id_socket: number) => {
  return await prisma.detail_CPU.findUnique({
    where: { id_produk_id_socket: { id_produk, id_socket } },
    include: {
      Produk: true,
      Socket: true,
    },
  });
};

export const createDetailCPU = async (data: Detail_CPU) => {
  return await prisma.detail_CPU.create({
    data,
  });
};

export const updateDetailCPU = async (id_produk: number, id_socket: number, data: Detail_CPU) => {
  return await prisma.detail_CPU.update({
    where: { id_produk_id_socket: { id_produk, id_socket } },
    data,
  });
};

export const deleteDetailCPU = async (id_produk: number, id_socket: number) => {
  return await prisma.detail_CPU.delete({
    where: { id_produk_id_socket: { id_produk, id_socket } },
  });
};
