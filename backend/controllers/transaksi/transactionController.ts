import { Request, Response } from "express";
import prisma from "../../utils/database";
import { v7 as uuidv7 } from "uuid";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role_name: string;
    name: string;
    email: string;
  };
}

export const createTransaction = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 1. Fetch all selected carts for the user
    const selectedCarts = await prisma.cart.findMany({
      where: {
        user_id: user.id,
        is_selected: true,
      },
      include: {
        product: true,
      },
    });

    if (selectedCarts.length === 0) {
      return res
        .status(400)
        .json({ message: "No selected items in the cart.", user: user.name });
    }

    // 2. Calculate the total items and total price
    const totalItems = selectedCarts.reduce((total, cartItem) => {
      return total + cartItem.quantity; // Sum of quantities
    }, 0);

    const totalPrice = selectedCarts.reduce((total, cartItem) => {
      return total + cartItem.product.price.toNumber() * cartItem.quantity; // Price * quantity for total price
    }, 0);

    // 3. Generate a UUIDv7 for the transaction ID
    const transactionUuid = uuidv7();

    // 4. Create the transaction record
    const transaction = await prisma.transaction.create({
      data: {
        id: transactionUuid, // Use the UUIDv7 as the transaction ID
        user_id: user.id,
        total_items: totalItems,
        total_price: totalPrice,
      },
    });

    // 5. Create the transaction details
    const transactionDetails = selectedCarts.map((cartItem) => ({
      product_id: cartItem.product_id,
      transaction_id: transaction.id,
      quantity: cartItem.quantity,
      total_price: cartItem.product.price.toNumber() * cartItem.quantity,
    }));

    await prisma.transaction_detail.createMany({
      data: transactionDetails,
    });

    // 6. Remove the processed carts
    await prisma.cart.deleteMany({
      where: {
        id: {
          in: selectedCarts.map((cart) => cart.id),
        },
      },
    });

    res.status(201).json({
      message: "Transaction created successfully.",
      transactionId: transaction.id,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create transaction." });
  }
};

export const getAllTransactionsFromUser = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  try {
    // Raw SQL query to fetch transactions
    const transactions: Array<any> = await prisma.$queryRaw`
      SELECT 
        t.id AS transaction_id,
        t.user_id,
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
      WHERE t.user_id = ${user.id}
    `;

    // Transform the raw data into the desired format
    const transformed = Object.values(
      transactions.reduce((acc: any, row: any) => {
        if (!acc[row.transaction_id]) {
          acc[row.transaction_id] = {
            id: row.transaction_id,
            user_id: row.user_id,
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

    // Return the transformed transactions in the response
    return res.status(200).json({
      statusCode: 200,
      message: "Transactions fetched successfully",
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

export const getTransactionById = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const transactionId = parseInt(req.params.id); // Get the transaction id from URL params

  if (isNaN(transactionId)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid transaction ID format",
    });
  }

  try {
    // Raw SQL query to fetch the specific transaction
    const transaction: Array<any> = await prisma.$queryRaw`
      SELECT 
        t.id AS transaction_id,
        t.user_id,
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
      WHERE t.id = ${transactionId} AND t.user_id = ${user.id}
    `;

    if (transaction.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Transaction not found for this user.",
      });
    }

    // Transform the raw data into the desired format
    const transformed = {
      id: transaction[0].transaction_id,
      user_id: transaction[0].user_id,
      total_items: transaction[0].total_items,
      total_price: transaction[0].total_price,
      start_time: transaction[0].start_time,
      end_time: transaction[0].end_time,
      status: transaction[0].status_name,
      products: transaction.map((row: any) => ({
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        price: Number(row.product_price),
        total_price: Number(row.product_total_price),
      })),
    };

    // Return the transformed transaction in the response
    return res.status(200).json({
      statusCode: 200,
      message: "Transaction fetched successfully",
      transaction: transformed,
    });
  } catch (error: any) {
    console.error("Error fetching transaction:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to fetch transaction",
      error: error.message,
    });
  }
};

export const cancelTransaction = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  const { transactionId } = req.params; // Assuming the transaction ID is passed as a URL parameter

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Fetch the transaction to check its current status
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Ensure the transaction belongs to the user
    if (transaction.user_id !== user.id) {
      return res
        .status(403)
        .json({
          message: "Forbidden: Transaction does not belong to the user.",
        });
    }

    // Check if the status allows cancellation
    const cancellableStatuses = [1, 2, 3]; // Allowed statuses for cancellation
    if (!cancellableStatuses.includes(transaction.status_id)) {
      return res.status(400).json({
        message: "Transaction cannot be cancelled in its current status.",
        currentStatus: transaction.status_id,
      });
    }

    // Update the transaction status to 0 (cancelled)
    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status_id: 0, // Set status to 0 (cancelled)
      },
    });

    return res.status(200).json({
      message: "Transaction cancelled successfully.",
      transactionId,
    });
  } catch (error) {
    console.error("Error cancelling transaction:", error);
    return res.status(500).json({ error: "Failed to cancel the transaction." });
  }
};

export const updateTransactionStatus = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { transactionId } = req.params;
  const { status_id } = req.body;

  if (!transactionId || !status_id) {
    return res
      .status(400)
      .json({ message: "Transaction ID and Status ID are required." });
  }

  try {
    // Check if the transaction exists and belongs to the current user
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        transaction_status: true,
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Update the status of the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status_id: status_id,
      },
    });

    return res.status(200).json({
      message: "Transaction status updated successfully.",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return res
      .status(500)
      .json({ message: "Failed to update transaction status." });
  }
};
