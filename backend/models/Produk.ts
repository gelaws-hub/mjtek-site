// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const produkSelect = {
//   id_produk: true,
//   nama_produk: true,
//   harga: true,
//   est_berat: true,
//   deskripsi: true,
//   stok: true,
//   Kategori: {
//     select: {
//       nama_kategori: true,
//     },
//   },
//   SubKategori: {
//     select: {
//       nama_sub_kategori: true,
//     },
//   },
//   Brand: {
//     select: {
//       nama_brand: true,
//     },
//   },
//   Produk_Socket: {
//     select: {
//       Socket: {
//         select: {
//           nama_socket: true,
//         },
//       },
//     },
//   },
//   Produk_Tipe_RAM: {
//     select: {
//       Tipe_RAM: {
//         select: {
//           tipe_ram: true,
//         },
//       },
//     },
//   },
//   isDeleted: true,
//   Media: {
//     select: {
//       sumber: true,
//       tipe_file: true,
//     },
//   },
// };


// export const getAllProduk = async () => {
//   try {
//     const produk = await prisma.produk.findMany({
//       where: {
//         isDeleted: false,
//       },
//       select: produkSelect,
//     });

//     console.log(JSON.stringify(produk, null, 2));

//     return produk.map((item) => ({
//       ...item,
//       harga: parseFloat(item.harga as unknown as string),
//       est_berat: parseFloat(item.est_berat as unknown as string),
//     }));
//   } catch (error) {
//     throw new Error("Failed to fetch produk");
//   }
// };

// export const getProdukById = async (id: number) => {
//   try {
//     const produk = await prisma.produk.findUnique({
//       where: {
//         id_produk: id,
//       },
//       select: produkSelect,
//     });

//     return produk;
//   } catch (error) {
//     console.error("Failed to fetch produk by ID:", error);
//     throw new Error("Failed to fetch produk by ID");
//   }
// };

// export const createProduk = async (data: any) => {
//   try {
//     return await prisma.produk.create({
//       data: {
//         ...data,
//       },
//       include: {
//         // DetailCPU: { include: { Socket: true } },
//         // DetailMotherboard: { include: { Socket: true, TipeRAM: true } },
//         // DetailRAM: { include: { TipeRAM: true } },
//         Media: true,
//         Kategori: true,
//         SubKategori: true,
//         Brand: true,
//       },
//     });
//   } catch (error: any) {
//     console.error("Error in createProduk model:", error.message, error);
//     throw new Error("Failed to create produk");
//   }
// };

// export const updateProduk = async (id: number, data: any) => {
//   try {
//     return await prisma.produk.update({
//       where: { id_produk: id },
//       data: {
//         ...data,
//       },
//       include: {
//         // DetailCPU: { include: { Socket: true } },
//         // DetailMotherboard: { include: { Socket: true, TipeRAM: true } },
//         // DetailRAM: { include: { TipeRAM: true } },
//         Media: true,
//         Kategori: true,
//         SubKategori: true,
//         Brand: true,
//       },
//     });
//   } catch (error) {
//     throw new Error("Failed to update produk");
//   }
// };

// export const deleteProduk = async (id: number) => {
//   try {
//     await prisma.produk.update({
//       where: {
//         id_produk: id,
//       },
//       data: {
//         isDeleted: true,
//       },
//     });
//   } catch (error) {
//     throw new Error("Failed to delete produk");
//   }
// };
