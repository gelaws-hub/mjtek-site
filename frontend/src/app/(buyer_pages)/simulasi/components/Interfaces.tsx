export interface Product {
  id: number;
  product_name: string;
  price: number;
  estimated_weight: string;
  description: string;
  stock: number;
  category: {
    id: number;
    category_name: string;
  };
  sub_category: {
    id: number;
    sub_category_name: string;
  } | null;
  brand: {
    id: number;
    brand_name: string;
  };
  product_ram_type: {
    id: number;
    ram_type_name: string;
  }[];
  product_socket: {
    id: number;
    socket_name: string;
    release_date: string;
    description: string;
    brand_id: number;
  }[];
  media: {
    id: number;
    source: string;
    file_type: string;
  }[];
  is_deleted: boolean;
}
