import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import axios from "axios";

interface DeleteDropDownItemProps {
  id: string;
}

export const DeleteDropDownItem: React.FC<DeleteDropDownItemProps> = ({
  id,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully");
      // You may want to refresh the product list or handle the UI update accordingly
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
