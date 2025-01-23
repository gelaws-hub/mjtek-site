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
  user: User;
  total_items: number;
  total_price: string;
  start_time: string;
  end_time: string | null;
  payment_proof: string | null;
  status: Status;
  products: Product[];
}

export interface User {
  id: string;
  role_name: string;
  name: string;
  email: string;
  password?: string;
  address?: string;
  phone_number?: string;
  profile_pic?: string;
  is_active?: boolean;
  activation_token?: string | null;
  reset_password_token?: string | null;
  reset_password_expires?: string | null;
  created_at?: string;
}

