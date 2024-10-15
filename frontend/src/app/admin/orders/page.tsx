"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import { PageHeader } from "../_components/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./_components/OrderActions";

// Define interfaces based on the JSON response
interface Transaction {
  id: number;
  userId: string;
  totalItems: number;
  totalPrice: string; // Assuming this is a string
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

interface ApiResponse {
  statusCode: number;
  status: string;
  data: Order[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/transaction-logs"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data: ApiResponse = await response.json();
      setOrders(data.data); // Set the fetched data
    } catch (error) {
      setError((error as Error).message); // Set error message
    }
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <PageHeader>Sales</PageHeader>
      {error && <p>{error}</p>}
      <OrdersTable orders={orders} />
    </>
  );
}

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  if (orders.length === 0) return <p>No sales found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Description</TableHead>
          <TableHead>Customer Email</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.Transaction.description}</TableCell>
            <TableCell>{order.User.email}</TableCell>
            <TableCell>
              {formatCurrency(parseFloat(order.Transaction.totalPrice))}
            </TableCell>
            <TableCell>
              {order.orderStatus === 1 ? "Completed" : "Pending"}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={order.id.toString()} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
