type Category = {
  id: number;
  category_name: string;
};

type SubCategory = {
  id: number;
  sub_category_name: string;
} | null;

type Brand = {
  id: number;
  brand_name: string;
};

type ProductSocket = {
  id: number;
  socket_name: string;
  release_date: string;
  description: string;
  brand_id: number;
};

type RamType = {
  id: number;
  ram_type_name: string;
};

type Media = {
  id: number;
  source: string;
  file_type: string;
};

export type Product = {
  id: number;
  product_name: string;
  price: number;
  estimated_weight: string;
  description: string;
  stock: number;
  category: Category;
  sub_category: SubCategory;
  brand: Brand;
  product_ram_type: RamType[];
  product_socket: ProductSocket[];
  media: Media[];
  is_deleted: boolean;
};

export interface UpdateProductRequest {
  product_name?: string;
  category_id?: number;
  sub_category_id?: number;
  brand_id?: number;
  price?: number;
  estimated_weight?: number;
  description?: string;
  stock?: number;
  media?: {
    sumber: string;
    tipe_file: string;
  }[];
  product_ram_type?: number[];
  product_socket?: number[];
}
