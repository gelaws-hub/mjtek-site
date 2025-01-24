import { Request, Response } from "express";
import prisma from "../../utils/database";
import {
  startOfDay,
  endOfDay,
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

const statuses: { [key: string]: number[] } = {
  checking: [1, 2, 3],
  processing: [4, 5],
  shipping: [6, 7, 8, 9],
  dispute: [10, 98],
  finished: [0, 99],
};

export const getSalesDashboard = async (req: Request, res: Response) => {
  // query params : range, type, status_id, start_date, end_date
  const range = parseInt(req.query.range as string) || 6;
  const type = (req.query.type as string) || "month";
  const statusId = parseInt(req.query.status_id as string) || 99;
  const startDate = req.query.start_date
    ? new Date(req.query.start_date as string)
    : null;
  const endDate = req.query.end_date
    ? new Date(req.query.end_date as string)
    : null;

  const currentDate = new Date();

  try {
    const sales = [];
    const orders = [];
    const ordersByStatus = [];

    for (let i = range - 1; i >= 0; i--) {
      let start, end, label;

      if (type === "day") {
        const day = subDays(currentDate, i);
        start = startOfDay(day);
        end = endOfDay(day);
        label = format(day, "dd MMM yyyy");
      } else if (type === "week") {
        const weekStart = subWeeks(currentDate, i);
        start = startOfWeek(weekStart, { weekStartsOn: 1 });
        end = endOfWeek(weekStart, { weekStartsOn: 1 });
        label = `${format(start, "dd MMM")} - ${format(end, "dd MMM yyyy")}`;
      } else {
        const month = subMonths(currentDate, i);
        start = startOfMonth(month);
        end = endOfMonth(month);
        label = format(month, "MMMM yyyy");
      }

      if (startDate && endDate) {
        start = startDate;
        end = endDate;
        label = `${format(start, "dd MMM yyyy")} - ${format(
          end,
          "dd MMM yyyy"
        )}`;
      }

      // Calculate sales data
      const totalIncome = await prisma.transaction.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          start_time: {
            gte: start,
            lte: end,
          },
          status_id: 99,
        },
      });

      sales.push({
        time: label,
        total_income: `${totalIncome._sum.total_price || 0}`,
      });

      // Calculate total orders
      const totalOrders = await prisma.transaction.count({
        where: {
          status_id: statusId,
          start_time: {
            gte: start,
            lte: end,
          },
        },
      });

      orders.push({
        time: label,
        total_orders: totalOrders,
      });
    }

    // Calculate orders by status for the current period
    let periodStart, periodEnd;
    if (type === "day") {
      periodStart = startOfDay(currentDate);
      periodEnd = endOfDay(currentDate);
    } else if (type === "week") {
      periodStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      periodEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    } else {
      periodStart = startOfMonth(currentDate);
      periodEnd = endOfMonth(currentDate);
    }

    if (startDate && endDate) {
      periodStart = startDate;
      periodEnd = endDate;
    }

    for (const status in statuses) {
      const statusArray = statuses[status];
      const totalOrders = await prisma.transaction.count({
        where: {
          status_id: {
            in: statusArray,
          },
          start_time: {
            gte: periodStart,
            lte: periodEnd,
          },
        },
      });

      ordersByStatus.push({
        status,
        total_orders: totalOrders,
      });
    }

    return res.status(200).json({
      sales,
      orders,
      ordersByStatus,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

export const getTopUsers = async (req: Request, res: Response) => {
  const range = parseInt(req.query.range as string) || 6; // Number of periods to return
  const type = (req.query.type as string) || "month"; // 'day', 'week', or 'month'
  const limit = parseInt(req.query.limit as string) || 5; // Number of top users to return
  const currentDate = new Date();

  try {
    let start, end;

    // Calculate date ranges based on the type
    if (type === "day") {
      start = startOfDay(subDays(currentDate, range - 1));
      end = endOfDay(currentDate);
    } else if (type === "week") {
      start = startOfWeek(subWeeks(currentDate, range - 1), { weekStartsOn: 1 });
      end = endOfWeek(currentDate, { weekStartsOn: 1 });
    } else {
      start = startOfMonth(subMonths(currentDate, range - 1));
      end = endOfMonth(currentDate);
    }

    // Get the total income for the entire range
    const totalIncomeData = await prisma.transaction.aggregate({
      where: {
        start_time: {
          gte: start,
          lte: end,
        },
        status_id: 99, // Only include completed transactions
      },
      _sum: {
        total_price: true,
      },
    });

    const totalIncome = totalIncomeData._sum.total_price || 0;

    // Query the top users sorted by total income in the specified range
    const topUsers = await prisma.transaction.groupBy({
      by: ["user_id"],
      where: {
        start_time: {
          gte: start,
          lte: end,
        },
        status_id: 99, // Only include completed transactions
      },
      _sum: {
        total_price: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          total_price: "desc",
        },
      },
      take: limit, // Limit to the top N users
    });

    // Fetch user details for the top users
    const userIds = topUsers.map((user) => user.user_id);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    // Combine user details with transaction data and calculate percentage
    const result = topUsers.map((user) => {
      const userDetails = users.find((u) => u.id === user.user_id);
      const userIncome = user._sum.total_price || 0;
      const percentage = Number(totalIncome) > 0 ? (Number(userIncome) / Number(totalIncome) * 100).toFixed(2) : "0.00";

      return {
        nama: userDetails?.name || "Unknown User",
        total_pembelian: user._count.id,
        total_pendapatan: userIncome,
        persentase_pendapatan: `${percentage}%`,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch top users" });
  }
};
