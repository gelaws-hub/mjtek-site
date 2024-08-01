"use server";

import { notFound } from "next/navigation";

// Static data for users
const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export async function deleteUser(id: string) {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) return notFound();

  const [deletedUser] = users.splice(userIndex, 1);

  return deletedUser;
}
