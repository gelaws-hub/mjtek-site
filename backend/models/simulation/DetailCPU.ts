import { PrismaClient, Detail_CPU } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDetailCPU = async () => {
  return await prisma.detail_CPU.findMany();
};

export const getDetailCPUById = async (id_detail_cpu: number) => {
  return await prisma.detail_CPU.findUnique({
    where: { id_detail_cpu },
    include: {
      Produk: true,
      Socket: true,
    },
  });
};

export const createDetailCPU = async (data: Omit<Detail_CPU, 'id_detail_cpu'>) => {
  return await prisma.detail_CPU.create({
    data,
  });
};

export const updateDetailCPU = async (id_detail_cpu: number, data: Partial<Detail_CPU>) => {
  return await prisma.detail_CPU.update({
    where: { id_detail_cpu },
    data,
  });
};

export const deleteDetailCPU = async (id_detail_cpu: number) => {
  return await prisma.detail_CPU.delete({
    where: { id_detail_cpu },
  });
};
