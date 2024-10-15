// src/controllers/transactionLogController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type FilterOptions = "alltime" | "month" | "week" | "day" | "income";

interface TransactionLogQuery extends Request {
  query: {
    filter?: FilterOptions;
  };
}

// Middleware for admin authentication
const authenticateAdmin = (req: Request, res: Response, next: () => void) => {
  // Add your admin authentication logic here
  next();
};

export const getTransactionLogs = async (
  req: TransactionLogQuery,
  res: Response
) => {
  const { filter } = req.query;

  // Validate the filter
  if (
    filter &&
    !["alltime", "month", "week", "day", "income"].includes(filter)
  ) {
    return res.status(400).json({ error: "Invalid filter option" });
  }

  try {
    const filters = {
      alltime: {},
      month: {
        timestamp: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
      week: {
        timestamp: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      day: {
        timestamp: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
      income: {
        orderStatus: 1, // Assuming 1 indicates a completed transaction
      },
    };

    const transactionLogs = await prisma.transactionLog.findMany({
      where: filters[filter || "alltime"],
      include: {
        Transaction: true,
        User: true,
      },
    });

    res.json(transactionLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the middleware
export { authenticateAdmin };
