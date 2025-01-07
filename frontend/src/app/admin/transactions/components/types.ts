export type Product = {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
    total_price: number;
    media_source: string | null;
  };

export type Transaction = {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      address: string;
      phone_number: string;
    };
    total_items: number;
    total_price: string;
    start_time: string;
    end_time: string | null;
    status: TransactionStatus;
    products: Product[];
  };
  
export interface TransactionStatus {
    id: number;
    name: string;
    description: string | null;
  }