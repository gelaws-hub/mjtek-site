import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductActions";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = [
    {
      id: 1,
      name: "Gaming Mouse",
      priceInCents: 4999,
      description:
        "A high-precision wireless gaming mouse with customizable DPI.",
      file: "gaming_mouse_manual.pdf",
      image: "https://via.assets.so/shoe.png?id=1&q=95&w=360&h=360&fit=fill",
      isAvailableForPurchase: true,
      _count: { orders: 25 },
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      priceInCents: 9999,
      description:
        "A durable mechanical keyboard with customizable RGB lighting.",
      file: "mechanical_keyboard_manual.pdf",
      image: "mechanical_keyboard.jpg",
      isAvailableForPurchase: false,
      _count: { orders: 18 },
    },
    {
      id: 3,
      name: "4K Monitor",
      priceInCents: 29999,
      description:
        "A 27-inch 4K monitor with ultra-thin bezels and HDR support.",
      file: "4k_monitor_manual.pdf",
      image: "4k_monitor.jpg",
      isAvailableForPurchase: true,
      _count: { orders: 7 },
    },
    {
      id: 4,
      name: "Gaming Chair",
      priceInCents: 19999,
      description:
        "An ergonomic gaming chair with lumbar support and adjustable armrests.",
      file: "gaming_chair_manual.pdf",
      image: "gaming_chair.jpg",
      isAvailableForPurchase: true,
      _count: { orders: 12 },
    },
    {
      id: 5,
      name: "Graphics Card",
      priceInCents: 49999,
      description:
        "A high-performance graphics card for gaming and video editing.",
      file: "graphics_card_manual.pdf",
      image: "graphics_card.jpg",
      isAvailableForPurchase: false,
      _count: { orders: 34 },
    },
  ];

  if (products.length === 0) return <p>No products found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Picture</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a
                      download
                      href={`/admin/products/${product.id.toString()}/download`}
                    >
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={product.id.toString()}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={product.id.toString()}
                    disabled={product._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
