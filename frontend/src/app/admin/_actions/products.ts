"use server";

import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file: File) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file: File) => file.size > 0, "Required"),
  image: imageSchema.refine((file: File) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  // ... rest of the code
}

export async function deleteProduct(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const product = await response.json();

    if (!product) return notFound();

    await fs.unlink(product.filePath);
    await fs.unlink(`public${product.imagePath}`);

    revalidatePath("/");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAvailableForPurchase }),
    });

    if (!response.ok) {
      throw new Error("Failed to update product availability");
    }

    revalidatePath("/");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error toggling product availability:", error);
    throw error;
  }
}
