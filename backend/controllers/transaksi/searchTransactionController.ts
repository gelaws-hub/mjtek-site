import { Request, Response } from "express";
import prisma from "../../utils/database";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

export const getAllTransactions = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const status_request = req.query.status as string | undefined;

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const statuses: { [key: string]: number[] } = {
    checking: [1, 2, 3],
    processing: [4, 5],
    shipping: [6, 7, 8, 9],
    dispute: [10, 98],
    finished: [0, 99],
  };

  // Determine the status IDs to filter by
  const statusIds = status_request ? statuses[status_request] : undefined;

  // Get query params
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchProduct = (req.query.searchProduct as string) || "";
  const searchUser = (req.query.searchUser as string) || "";
  const sortBy = (req.query.sortBy as string) || "start_time"; // Default to `start_time`
  const sortOrder = (req.query.sortOrder as string) || "desc"; // Default to descending

  try {
    // Fetch total transaction count for pagination
    const totalTransactions = await prisma.transaction.count({
      where: {
        user: {
          name: {
            contains: searchUser,
          },
        },
        ...(statusIds && { status_id: { in: statusIds } }),
        transaction_detail: {
          some: {
            product: {
              product_name: {
                contains: searchProduct,
              },
            },
          },
        },
      },
    });

    if (totalTransactions === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No transactions found.",
      });
    }

    // Fetch paginated and sorted transactions with relations
    const transactions = await prisma.transaction.findMany({
      skip,
      take: limit,
      where: {
        user: {
          name: {
            contains: searchUser,
          },
        },
        ...(statusIds && { status_id: { in: statusIds } }),
        transaction_detail: {
          some: {
            product: {
              product_name: {
                contains: searchProduct,
              },
            },
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder as "asc" | "desc", // Dynamic ordering
      },
      include: {
        user: true,
        transaction_status: true,
        transaction_detail: {
          include: {
            product: {
              include: {
                media: {
                  where: { file_type: "image" },
                },
              },
            },
          },
        },
      },
    });

    // Transform the transactions to the desired structure
    const transformed = transactions.map((transaction) => ({
      id: transaction.id,
      user: {
        id: transaction.user_id,
        name: transaction.user.name,
        email: transaction.user.email,
        address: transaction.user.address,
        phone_number: transaction.user.phone_number,
      },
      total_items: transaction.total_items,
      total_price: transaction.total_price,
      start_time: transaction.start_time,
      end_time: transaction.end_time,
      status: {
        id: transaction.status_id,
        name: transaction.transaction_status.name,
      },
      products: transaction.transaction_detail.map((detail) => ({
        product_id: detail.product_id,
        product_name: detail.product.product_name,
        quantity: detail.quantity,
        price: detail.product.price,
        total_price: detail.total_price,
        media_source: detail.product.media[0]?.source || null,
      })),
    }));

    // Return the response with pagination metadata
    return res.status(200).json({
      statusCode: 200,
      message: "Transactions fetched successfully",
      pagination: {
        total: totalTransactions,
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit),
      },
      transactions: transformed,
    });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};
