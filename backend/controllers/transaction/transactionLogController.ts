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
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      error: "Invalid filter option",
    });
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

    res.json({
      statusCode: 200,
      status: "success",
      data: transactionLogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      error: "Internal server error",
    });
  }
};

export const getUniqueTransactionCount = async (
  req: Request,
  res: Response
) => {
  try {
    const transactionLogSummary = await prisma.transactionLog.aggregate({
      _count: {
        transactionId: true, // Count distinct transactionIds
      },
    });

    const uniqueTransactionCount =
      transactionLogSummary._count?.transactionId || 0; // Fallback to 0 if undefined

    return res.status(200).json({
      success: true,
      data: {
        uniqueTransactionCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the unique transaction count.",
    });
  }
};

export const getTransactionSummary = async (req: Request, res: Response) => {
  try {
    // Step 1: Get the count of unique transactions
    const transactionLogSummary = await prisma.transactionLog.aggregate({
      _count: {
        transactionId: true, // Count distinct transactionIds
      },
    });

    const uniqueTransactionCount =
      transactionLogSummary._count?.transactionId || 0; // Fallback to 0 if undefined

    // Step 2: Get the sum of all transaction amounts from the Transaction model
    const transactionAmountSummary = await prisma.transaction.aggregate({
      _sum: {
        totalPrice: true, // Assuming 'amount' field exists in the Transaction model
      },
    });

    const totalTransactionAmount =
      transactionAmountSummary._sum?.totalPrice || 0; // Fallback to 0 if undefined

    // Return both unique transaction count and total transaction amount
    return res.status(200).json({
      success: true,
      data: {
        uniqueTransactionCount,
        totalTransactionAmount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the transaction summary.",
    });
  }
};

// Export the middleware
export { authenticateAdmin };
