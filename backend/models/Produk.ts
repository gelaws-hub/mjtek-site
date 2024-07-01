import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const produkSelect = {
  id_produk: true,
  nama_produk: true,
  harga: true,
  est_berat: true,
  deskripsi: true,
  stok: true,
  Kategori: {
    select: {
      nama_kategori: true,
    },
  },
  SubKategori: {
    select: {
      nama_sub_kategori: true,
    },
  },
  Brand: {
    select: {
      nama_brand: true,
    },
  },
  DetailCPU: {
    select: {
      Socket: {
        select: {
          nama_socket: true,
        },
      },
    },
  },
  DetailMotherboard: {
    select: {
      Socket: {
        select: {
          nama_socket: true,
        },
      },
      TipeRAM: {
        select: {
          tipe_ram: true,
        },
      },
    },
  },
  DetailRAM: {
    select: {
      TipeRAM: {
        select: {
          tipe_ram: true,
        },
      },
    },
  },
  isDeleted: true,
  Media: {
    select: {
      sumber: true,
    }
  }, 
};

export const getAllProduk = async () => {
  try {
    const produk = await prisma.produk.findMany({
      where: {
        isDeleted: false,
      },
      select: produkSelect,
    });

    console.log(JSON.stringify(produk, null, 2));

    return produk.map((item) => ({
      ...item,
      harga: parseFloat(item.harga as unknown as string),
      est_berat: parseFloat(item.est_berat as unknown as string),
    }));
  } catch (error) {
    throw new Error("Failed to fetch produk");
  }
};

export const getProdukById = async (id: number) => {
  try {
    const produk = await prisma.produk.findUnique({
      where: {
        id_produk: id,
      },
      select: produkSelect,
    });

    return produk; 
  } catch (error) {
    console.error('Failed to fetch produk by ID:', error);
    throw new Error('Failed to fetch produk by ID');
  }
};

export const createProduk = async (data: any) => {
  try {
    return await prisma.produk.create({
      data: {
        ...data,
      },
    });
  } catch (error) {
    throw new Error("Failed to create produk");
  }
};

export const updateProduk = async (id: number, data: any) => {
  try {
    return await prisma.produk.update({
      where: {
        id_produk: id,
      },
      data: {
        ...data,
      },
    });
  } catch (error) {
    throw new Error("Failed to update produk");
  }
};

export const deleteProduk = async (id: number) => {
  try {
    await prisma.produk.update({
      where: {
        id_produk: id,
      },
      data: {
        isDeleted: true,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete produk");
  }
};
