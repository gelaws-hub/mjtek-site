export interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total_price: number;
  media_source: string;
}

export interface Status {
  status_id: number;
  status_name: string;
  status_description: string | null;
}

export interface Transaction {
  id: string;
  user_id: string;
  total_items: number;
  total_price: string;
  start_time: string;
  end_time: string | null;
  payment_proof: string | null;
  status: Status;
  products: Product[];
}
