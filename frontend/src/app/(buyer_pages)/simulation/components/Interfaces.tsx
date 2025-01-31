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

export interface SimMeta {
  id?: string;
  user_id?: string;
  simulation_data?: string;
  title?: string;
  description?: string;
  modifiedAt?: string;
  user?: {
    name: string;
  };
}

export interface SimData {
  CPU: null | Product;
  Mobo: null | Product;
  Ram: null | Product;
  Vga: null | Product;
  SocketId: null | string;
  Brand: null | string;
  Storage: { key: string; product: null | Product }[] | null;
  Casing: null | Product;
  PSU: null | Product;
  Monitor1: null | Product;
  Monitor2: null | Product;
  Monitor3: null | Product;
}
