"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";

export function ProductForm() {
  const [error, action] = useFormState(addProduct, {});
  const [priceinCents, setPriceInCents] = useState<number>();

  return (
    <form action={action} className="space-y-8">
      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter product name"
        />
        {error?.name && <div className="text-destructor">{error.name}</div>}
      </div>

      {/* Price Input */}
      <div className="space-y-2">
        <Label htmlFor="priceinCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceinCents"
          name="priceinCents"
          required
          value={priceinCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          placeholder="Enter price in cents"
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceinCents || 0) / 100)}
        </div>
        {error?.priceInCents && (
          <div className="text-destructor">{error.priceInCents}</div>
        )}
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Enter product description"
        />
        {error?.description && (
          <div className="text-destructor">{error.description}</div>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {error?.file && <div className="text-destructor">{error.file}</div>}
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required
          placeholder="Upload product image"
        />
        {error?.image && <div className="text-destructor">{error.image}</div>}
      </div>

      {/* Submit Button */}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
