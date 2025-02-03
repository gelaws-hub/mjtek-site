'use client';

import { useState } from 'react';
import { Product } from '@/types/transaction';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const displayProducts = expanded ? products : products.slice(0, 1);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Products</h3>
      {displayProducts.map((product, index) => (
        <div key={product.product_id} className="mb-2 p-2 bg-gray-50 rounded">
          <p className="font-medium">{product.product_name}</p>
          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
          <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
          <p className="text-sm font-semibold">Total: ${product.total_price.toFixed(2)}</p>
        </div>
      ))}
      {products.length > 1 && (
        <button
          onClick={toggleExpand}
          className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Hide products
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show all products ({products.length})
            </>
          )}
        </button>
      )}
    </div>
  );
}

