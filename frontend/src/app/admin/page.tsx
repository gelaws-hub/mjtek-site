// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { formatCurrency, formatNumber } from "@/lib/formatters";

// async function getSalesData() {
//   const response = await fetch("http://localhost:3000/api/sales");
//   const data = await response.json();

//   return {
//     amount: (data._sum.pricePaidInCents || 0) / 100,
//     numberOfSales: data._count,
//   };
// }

// async function getUserData() {
//   const [userResponse, orderResponse] = await Promise.all([
//     fetch("http://localhost:3000/api/users/count"),
//     fetch("http://localhost:3000/api/orders/aggregate"),
//   ]);

//   const userCount = await userResponse.json();
//   const orderData = await orderResponse.json();

//   return {
//     userCount,
//     averageValuePerUser:
//       userCount === 0
//         ? 0
//         : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
//   };
// }

// async function getProductData() {
//   const [activeResponse, inactiveResponse] = await Promise.all([
//     fetch("http://localhost:3000/api/products/active/count"),
//     fetch("http://localhost:3000/api/products/inactive/count"),
//   ]);

//   const activeCount = await activeResponse.json();
//   const inactiveCount = await inactiveResponse.json();

//   return { activeCount, inactiveCount };
// }

// export default async function AdminDashboard() {
//   const [salesData, userData, productData] = await Promise.all([
//     getSalesData(),
//     getUserData(),
//     getProductData(),
//   ]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       <DashboardCard
//         title="Sales"
//         subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
//         body={formatCurrency(salesData.amount)}
//       />
//       <DashboardCard
//         title="Customers"
//         subtitle={`${formatCurrency(
//           userData.averageValuePerUser
//         )} Average Value`}
//         body={formatNumber(userData.userCount)}
//       />
//       <DashboardCard
//         title="Products"
//         subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
//         body={formatNumber(productData.activeCount)}
//       />
//     </div>
//   );
// }

// type DashboardCardProps = {
//   title: string;
//   subtitle: string;
//   body: string;
// };

// function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//         <CardDescription>{subtitle}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <p>{body}</p>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { useState, useEffect } from "react";

interface ApiResponse {
  statusCode: number;
  status: string;
  data: Order[];
}

interface Transaction {
  id: number;
  userId: string;
  totalItems: number;
  totalPrice: string;
  description: string;
}

interface User {
  id: string;
  roleId: number;
  username: string;
  email: string;
  password: string; // Consider removing this from the UI
  address: string;
  phoneNumber: string;
}

interface Order {
  id: number;
  transactionId: number;
  userId: string;
  orderStatus: number;
  timestamp: string;
  Transaction: Transaction;
  User: User;
}

async function fetchSalesData() {
  const response = await fetch("http://localhost:5000/api/transaction-logs");
  if (!response.ok) {
    throw new Error("Failed to fetch sales data");
  }
  const data: ApiResponse = await response.json();
  const totalSalesAmount = data.data.reduce((sum, order) => {
    return sum + parseFloat(order.Transaction.totalPrice);
  }, 0);

  return {
    amount: totalSalesAmount,
    numberOfSales: data.data.length,
  };
}

async function fetchUserData() {
  const userCount = 0;
  const orderData = {
    _sum: { pricePaidInCents: 2000000 },
  };
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function fetchProductData() {
  const activeCount = 80;
  const inactiveCount = 20;
  return { activeCount, inactiveCount };
}

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState({ amount: 0, numberOfSales: 0 });
  const [userData, setUserData] = useState({
    userCount: 0,
    averageValuePerUser: 0,
  });
  const [productData, setProductData] = useState({
    activeCount: 0,
    inactiveCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sales, users, products] = await Promise.all([
          fetchSalesData(),
          fetchUserData(),
          fetchProductData(),
        ]);
        setSalesData(sales);
        setUserData(users);
        setProductData(products);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
