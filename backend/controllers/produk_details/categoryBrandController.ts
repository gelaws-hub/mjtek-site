import { Request, Response } from "express";
import prisma from "../../utils/database";

export const getCategoryBrand = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    const sub_categories = await prisma.sub_category.findMany({
      orderBy: { id: "asc" },
    });
    const brands = await prisma.brand.findMany({ orderBy: { id: "asc" } });
    const categoryBrandData = {
      categories,
      sub_categories,
      brands,
    };
    res.status(200).json({
      message: "Successfully fetched category and brand data",
      data: categoryBrandData,
    });
  } catch (error: any) {
    console.log("Error fetching category and brand data : ", error);
    res.status(500).json({
      message: "Failed to fetch category and brand data",
      error: error.message,
    });
  }
};
