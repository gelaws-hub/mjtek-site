import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { PageHeader } from "../_components/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./_components/UserActions";

// Static data for users
const usersData = [
  {
    id: "1",
    email: "alice@example.com",
    orders: [{ pricePaidInCents: 1000 }, { pricePaidInCents: 2000 }],
  },
  {
    id: "2",
    email: "bob@example.com",
    orders: [{ pricePaidInCents: 1500 }],
  },
  {
    id: "3",
    email: "charlie@example.com",
    orders: [{ pricePaidInCents: 3000 }, { pricePaidInCents: 4000 }],
  },
];

function getUsers() {
  return usersData;
}

export default function UsersPage() {
  return (
    <>
      <PageHeader>Customers</PageHeader>
      <UsersTable />
    </>
  );
}

async function UsersTable() {
  const users = getUsers();

  if (users.length === 0) return <p>No customers found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatNumber(user.orders.length)}</TableCell>
            <TableCell>
              {formatCurrency(
                user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) /
                  100
              )}
            </TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownItem id={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
