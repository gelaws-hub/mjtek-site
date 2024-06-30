import { PrismaClient, Socket } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSockets = async () => {
  return await prisma.socket.findMany();
};

export const getSocketById = async (id: number) => {
  return await prisma.socket.findUnique({
    where: { id_socket: id },
  });
};

export const createSocket = async (data: Omit<Socket, 'id_socket'>) => {
  return await prisma.socket.create({
    data,
  });
};

export const updateSocket = async (id: number, data: Omit<Socket, 'id_socket'>) => {
  return await prisma.socket.update({
    where: { id_socket: id },
    data,
  });
};

export const deleteSocket = async (id: number) => {
  return await prisma.socket.delete({
    where: { id_socket: id },
  });
};
