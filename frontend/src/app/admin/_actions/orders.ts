"use server";

import { notFound } from "next/navigation";

// Static data for orders
const orders = [
  { id: "1", item: "Laptop", price: 1000 },
  { id: "2", item: "Phone", price: 500 },
  { id: "3", item: "Tablet", price: 300 },
];

export async function deleteOrder(id: string) {
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) return notFound();

  const [deletedOrder] = orders.splice(orderIndex, 1);

  return deletedOrder;
}
