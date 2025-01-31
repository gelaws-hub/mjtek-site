export interface Product {
  id: string;
  product_name: string;
  price: number;
  stock: number;
  media_source: string;
  category_id: number;
  category_name: string;
  sub_category: null;
  brand: {
    id: number;
    brand_name: string;
  };
  ram_type: Array<{
    id: number;
    ram_type_name: string;
  }>;
  socket: Array<{
    id: number;
    socket_name: string;
    release_date: string;
    description: string;
    brand_id: number;
  }>;
}

