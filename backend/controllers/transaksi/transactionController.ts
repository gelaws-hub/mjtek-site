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

    // 2 Check the quantity of the selected products
    const outOfStocks = selectedCarts.filter(
      (cartItem) => cartItem.product.stock < cartItem.quantity
    );
    if (outOfStocks.length > 0) {
      return res.status(400).json({
        message: "Not enough stock for the following products: ",
        outOfStocks: outOfStocks.map(
          (item) =>
            `${item.product.product_name} - only ${item.product.stock} left.`
        ),
      });
    }

    // 3 Reduce stock of products based on the cart quantities
    await Promise.all(
      selectedCarts.map(async (cartItem) => {
        await prisma.product.update({
          where: {
            id: cartItem.product_id,
          },
          data: {
            stock: {
              decrement: cartItem.quantity,
            },
          },
        });
      })
    );

    // 4. Calculate the total items and total price
    const totalItems = selectedCarts.reduce((total, cartItem) => {
      return total + cartItem.quantity; // Sum of quantities
    }, 0);

    const totalPrice = selectedCarts.reduce((total, cartItem) => {
      return total + cartItem.product.price.toNumber() * cartItem.quantity; // Price * quantity for total price
    }, 0);

    // 5. Generate a UUIDv7 for the transaction ID
    const transactionUuid = uuidv7();

    // 6. Create the transaction record
    const transaction = await prisma.transaction.create({
      data: {
        id: transactionUuid, // Use the UUIDv7 as the transaction ID
        user_id: user.id,
        total_items: totalItems,
        total_price: totalPrice,
      },
    });

    // 7. Create the transaction details
    const transactionDetails = selectedCarts.map((cartItem) => ({
      product_id: cartItem.product_id,
      transaction_id: transaction.id,
      quantity: cartItem.quantity,
      total_price: cartItem.product.price.toNumber() * cartItem.quantity,
    }));

    await prisma.transaction_detail.createMany({
      data: transactionDetails,
    });

    // 8. Remove the processed carts
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

export const getAllTransactionsFromUser = async (
  req: Request,
  res: Response
) => {
  const user = (req as CustomRequest).user;
  const status_request = req.query.status as string | undefined;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

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
    dispute: [10, 99],
    finished: [0, 11],
  };

  // Determine the status IDs to filter by
  const statusIds = status_request ? statuses[status_request] : undefined;

  try {
    // Fetch transactions with Prisma
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: user.id,
        ...(statusIds && { status_id: { in: statusIds } }),
      },
      orderBy: {
        start_time: "desc",
      },
      include: {
        user: true,
        transaction_status: true,
        transaction_detail: {
          include: {
            product: {
              include: {
                media: {
                  where: {
                    file_type: "image",
                  },
                  select: {
                    source: true,
                  },
                },
              },
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Count the total transactions for pagination
    const totalTransactions = await prisma.transaction.count({
      where: {
        user_id: user.id,
        ...(statusIds && { status_id: { in: statusIds } }),
      },
    });

    // Transform the data into the desired format
    const transformed = transactions.map((transaction) => ({
      id: transaction.id,
      user_id: transaction.user_id,
      user: transaction.user,
      total_items: transaction.total_items,
      total_price: transaction.total_price,
      start_time: transaction.start_time,
      end_time: transaction.end_time,
      payment_proof: transaction.payment_proof
        ? `${process.env.BASE_URL}${transaction.payment_proof}`
        : null,
      status: {
        status_id: transaction.transaction_status.id,
        status_name: transaction.transaction_status.name,
        status_description: transaction.transaction_status.description,
      },
      products: transaction.transaction_detail.map((detail) => ({
        product_id: detail.product.id,
        product_name: detail.product.product_name,
        quantity: detail.quantity,
        price: detail.product.price.toNumber(),
        total_price: detail.total_price.toNumber(),
        media_source: detail.product.media[0]?.source || null,
      })),
    }));

    // Return the transformed transactions in the response
    return res.status(200).json({
      statusCode: 200,
      message: "Transactions fetched successfully",
      transactions: transformed,
      pagination: {
        total: totalTransactions,
        page,
        limit,
        totalPages: Math.ceil(totalTransactions / limit),
      },
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

  const { transactionId } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        user: true,
        transaction_status: true,
        transaction_detail: {
          include: {
            product: {
              include: {
                media: {
                  where: { file_type: "image" },
                  select: { source: true },
                },
              },
            },
          },
        },
      },
    });

    if (!transaction || transaction.user_id !== user.id) {
      return res.status(404).json({
        statusCode: 404,
        message: "Transaction not found for this user.",
      });
    }

    const transformed = {
      id: transaction.id,
      user_id: transaction.user_id,
      user: transaction.user,
      total_items: transaction.total_items,
      total_price: transaction.total_price.toNumber(),
      start_time: transaction.start_time,
      end_time: transaction.end_time,
      payment_proof: transaction.payment_proof
        ? `${process.env.BASE_URL}${transaction.payment_proof}`
        : null,
      status: {
        status_id: transaction.transaction_status.id,
        status_name: transaction.transaction_status.name,
        status_description: transaction.transaction_status.description,
      },
      products: transaction.transaction_detail.map((detail) => ({
        product_id: detail.product.id,
        product_name: detail.product.product_name,
        quantity: detail.quantity,
        price: detail.product.price.toNumber(),
        total_price: detail.total_price.toNumber(),
        media_source: detail.product.media[0]?.source || null,
      })),
    };

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
      return res.status(403).json({
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
        end_time: new Date().toISOString(),
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

    // Check if the transaction is already completed
    if (transaction.transaction_status.id === 99) {
      return res
        .status(400)
        .json({ message: "Transaction is finished, cannot be updated." });
    }

    // Check if the transaction status is updatable
    const nonUpdatableStatuses = [0];
    if (nonUpdatableStatuses.includes(transaction.transaction_status.id)) {
      return res.status(400).json({
        message: `Transaction with status ${transaction.transaction_status.name} cannot be updated.`,
      });
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

export const getTransactionStatuses = async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const transactionStatuses = await prisma.transaction_status.findMany();
    return res.status(200).json({
      statusCode: 200,
      message: "Transaction statuses fetched successfully.",
      transactionStatuses,
    });
  } catch (error) {
    console.error("Error fetching transaction statuses:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch transaction statuses." });
  }
};

