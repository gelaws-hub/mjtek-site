"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductDetail } from "./product-detail";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Product } from "./FullProductInterface";
import Link from "next/link";

export function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Number(searchParams.get("page")) || 1;

  const limit = 10;

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product?page=${currentPage}&limit=${limit}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama produk</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{limit * (currentPage - 1) + (index + 1)}</TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                Rp. {Intl.NumberFormat("id-ID").format(product.price)}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category.category_name}</TableCell>
              <TableCell className="flex gap-1">
                <Button onClick={() => setSelectedProduct(product)}>
                  Edit
                </Button>
                <Button>
                  <Link
                    href={`/${encodeURIComponent(
                      product.category.category_name.toLowerCase(),
                    )}/${product.product_name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${product.id}`}
                  >
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <div className="mt-4 flex items-center justify-center gap-4">
        <Button
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
          }
        >
          Prev
        </Button>
        <span>{currentPage}</span>
        <Button
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : currentPage,
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
