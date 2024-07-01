import { PrismaClient, Tipe_RAM } from '@prisma/client';

const prisma = new PrismaClient();

// Get all Tipe_RAM
export const getAllTipeRAM = async () => {
  return await prisma.tipe_RAM.findMany();
};

// Get Tipe_RAM by ID
export const getTipeRAMById = async (id: number) => {
  return await prisma.tipe_RAM.findUnique({
    where: { id_tipe_ram: id },
  });
};

// Create a new Tipe_RAM
export const createTipeRAM = async (data: Omit<Tipe_RAM, 'id_tipe_ram'>) => {
  return await prisma.tipe_RAM.create({
    data,
  });
};

// Update a Tipe_RAM
export const updateTipeRAM = async (id: number, data: Partial<Tipe_RAM>) => {
  return await prisma.tipe_RAM.update({
    where: { id_tipe_ram: id },
    data,
  });
};

// Delete a Tipe_RAM
export const deleteTipeRAM = async (id: number) => {
  return await prisma.tipe_RAM.delete({
    where: { id_tipe_ram: id },
  });
};
