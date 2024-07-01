import { PrismaClient, Media as MediaModel } from "@prisma/client";
import prisma from "../utils/database";

const Media = {
  findAll: async (): Promise<MediaModel[]> => {
    return prisma.media.findMany();
  },
  findById: async (id: number): Promise<MediaModel | null> => {
    return prisma.media.findUnique({
      where: { id_media: id },
    });
  },
  create: async (data: Omit<MediaModel, "id_media">): Promise<MediaModel> => {
    return prisma.media.create({
      data,
    });
  },
  delete: async (id: number): Promise<MediaModel | null> => {
    return prisma.media.delete({
      where: { id_media: id },
    });
  },
};

export default Media;
