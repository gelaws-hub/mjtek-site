import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Roles
  const adminRole = await prisma.role.create({
    data: {
      roleName: "Admin",
      description: "Administrator with full access",
    },
  });

  const userRole = await prisma.role.create({
    data: {
      roleName: "User",
      description: "Regular user with limited access",
    },
  });

  // Seed Categories
  const electronicsCategory = await prisma.category.create({
    data: {
      categoryName: "Electronics",
    },
  });

  const accessoriesCategory = await prisma.category.create({
    data: {
      categoryName: "Accessories",
    },
  });

  // Seed SubCategories
  const graphicsCardSubCategory = await prisma.subCategory.create({
    data: {
      subCategoryName: "Graphics Cards",
    },
  });

  const motherboardSubCategory = await prisma.subCategory.create({
    data: {
      subCategoryName: "Motherboards",
    },
  });

  // Seed Brands
  const asusBrand = await prisma.brand.create({
    data: {
      brandName: "Asus",
    },
  });

  const corsairBrand = await prisma.brand.create({
    data: {
      brandName: "Corsair",
    },
  });

  // Seed Sockets
  const am4Socket = await prisma.socket.create({
    data: {
      socketName: "AM4",
    },
  });

  const lga1200Socket = await prisma.socket.create({
    data: {
      socketName: "LGA1200",
    },
  });

  // Seed RAM Types
  const ddr4Ram = await prisma.ramType.create({
    data: {
      ramTypeName: "DDR4",
    },
  });

  const ddr5Ram = await prisma.ramType.create({
    data: {
      ramTypeName: "DDR5",
    },
  });

  // Seed Products
  const graphicsCard = await prisma.product.create({
    data: {
      categoryId: electronicsCategory.id,
      subCategoryId: graphicsCardSubCategory.id,
      brandId: asusBrand.id,
      productName: "Asus ROG Strix GTX 1660",
      price: 299.99,
      description: "High-performance graphics card.",
      estimatedWeight: 1.2,
      stock: 50,
    },
  });

  const motherboard = await prisma.product.create({
    data: {
      categoryId: electronicsCategory.id,
      subCategoryId: motherboardSubCategory.id,
      brandId: asusBrand.id,
      productName: "Asus ROG Strix B450-F",
      price: 139.99,
      description: "ATX Motherboard for AMD processors.",
      estimatedWeight: 1.5,
      stock: 30,
    },
  });

  const keyboard = await prisma.product.create({
    data: {
      categoryId: accessoriesCategory.id,
      brandId: corsairBrand.id,
      productName: "Corsair K95 RGB Keyboard",
      price: 199.99,
      description: "Mechanical gaming keyboard with RGB lighting.",
      estimatedWeight: 1.0,
      stock: 25,
    },
  });

  const mouse = await prisma.product.create({
    data: {
      categoryId: accessoriesCategory.id,
      brandId: corsairBrand.id,
      productName: "Corsair M65 RGB Mouse",
      price: 69.99,
      description: "High-precision gaming mouse.",
      estimatedWeight: 0.3,
      stock: 40,
    },
  });

  // Seed Users
  const adminUser = await prisma.user.create({
    data: {
      username: "adminUser",
      email: "admin@example.com",
      password: "securepassword",
      address: "123 Admin Street",
      phoneNumber: "1234567890",
      roleId: adminRole.id,
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      username: "regularUser",
      email: "user@example.com",
      password: "securepassword",
      address: "456 User Avenue",
      phoneNumber: "0987654321",
      roleId: userRole.id,
    },
  });

  // Seed Cart
  await prisma.cart.createMany({
    data: [
      {
        productId: graphicsCard.id,
        userId: regularUser.id,
        quantity: 1,
        date: new Date(),
      },
      {
        productId: motherboard.id,
        userId: regularUser.id,
        quantity: 1,
        date: new Date(),
      },
    ],
  });

  // Seed Transactions
  const transaction = await prisma.transaction.create({
    data: {
      userId: regularUser.id,
      totalItems: 2,
      totalPrice: 439.98,
      description: "Purchase of gaming components",
    },
  });

  // Seed Transaction Details
  await prisma.transactionDetail.createMany({
    data: [
      {
        productId: graphicsCard.id,
        transactionId: transaction.id,
        quantity: 1,
        totalPrice: 299.99,
      },
      {
        productId: motherboard.id,
        transactionId: transaction.id,
        quantity: 1,
        totalPrice: 139.99,
      },
    ],
  });

  // Seed Simulation
  const simulation = await prisma.simulation.create({
    data: {
      userId: regularUser.id,
      title: "Gaming PC Build",
      description: "Simulation of a gaming PC build.",
      date: new Date(),
    },
  });

  // Seed Simulation Details
  await prisma.simulationDetail.createMany({
    data: [
      {
        simulationId: simulation.id,
        productId: graphicsCard.id,
      },
      {
        simulationId: simulation.id,
        productId: motherboard.id,
      },
    ],
  });

  // Seed Favorites
  await prisma.favorite.createMany({
    data: [
      {
        productId: keyboard.id,
        userId: regularUser.id,
      },
      {
        productId: mouse.id,
        userId: regularUser.id,
      },
    ],
  });

  // Seed Media
  await prisma.media.createMany({
    data: [
      {
        productId: graphicsCard.id,
        source: "https://example.com/images/graphics_card.jpg",
        fileType: "image/jpeg",
      },
      {
        productId: motherboard.id,
        source: "https://example.com/images/motherboard.jpg",
        fileType: "image/jpeg",
      },
    ],
  });

  // Seed Transaction Logs
  await prisma.transactionLog.create({
    data: {
      transactionId: transaction.id,
      userId: regularUser.id,
      orderStatus: 1, // 1: Completed
      timestamp: new Date(),
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
