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

export const getAllTransactions = async (
  req: Request,
  res: Response
) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  // Get query params
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchProduct = (req.query.searchProduct as string) || "";
  const searchUser = (req.query.searchUser as string) || "";

  try {
    // Raw SQL query to fetch transactions with pagination and search by product_name
    const transactions: Array<any> = await prisma.$queryRaw`
        SELECT 
          t.id AS transaction_id,
          t.user_id,
          u.name,
          u.email,
          u.address,
          u.phone_number,
          t.total_items,
          t.total_price,
          t.start_time,
          t.end_time,
          ts.name AS status_name,
          td.product_id,
          p.product_name,
          td.quantity,
          p.price AS product_price,
          td.total_price AS product_total_price
        FROM transaction t
        JOIN transaction_status ts ON t.status_id = ts.id
        JOIN transaction_detail td ON t.id = td.transaction_id
        JOIN product p ON td.product_id = p.id
        JOIN user u ON t.user_id = u.id
        WHERE 
        p.product_name LIKE ${`%${searchProduct}%`} AND u.name LIKE ${`%${searchUser}%`}
        LIMIT ${limit} OFFSET ${skip}
      `;

    if (transactions.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No transactions found.",
      });
    }

    // Raw SQL query to count the total number of unique transactions
    const totalTransactionsResult: Array<{ count: BigInt }> = await prisma.$queryRaw`
        SELECT COUNT(DISTINCT t.id) as count
        FROM transaction t
        JOIN transaction_status ts ON t.status_id = ts.id
        JOIN transaction_detail td ON t.id = td.transaction_id
        JOIN product p ON td.product_id = p.id
        JOIN user u ON t.user_id = u.id
        WHERE 
        p.product_name LIKE ${`%${searchProduct}%`} AND u.name LIKE ${`%${searchUser}%`}
      `;

    // Convert BigInt to number
    const totalTransactions = Number(totalTransactionsResult[0]?.count || 0);

    const transformed = Object.values(
      transactions.reduce((acc: any, row: any) => {
        if (!acc[row.transaction_id]) {
          acc[row.transaction_id] = {
            id: row.transaction_id,
            user: {
              id: row.user_id,
              name: row.name,
              email: row.email,
              address: row.address,
              phone_number: row.phone_number,
            },
            total_items: row.total_items,
            total_price: row.total_price,
            start_time: row.start_time,
            end_time: row.end_time,
            status: row.status_name,
            products: [],
          };
        }

        acc[row.transaction_id].products.push({
          product_id: row.product_id,
          product_name: row.product_name,
          quantity: row.quantity,
          price: Number(row.product_price),
          total_price: Number(row.product_total_price),
        });

        return acc;
      }, {})
    );

    // Return the transformed transactions along with pagination data
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
