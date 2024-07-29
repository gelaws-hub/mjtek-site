import { prismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new prismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new prismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
