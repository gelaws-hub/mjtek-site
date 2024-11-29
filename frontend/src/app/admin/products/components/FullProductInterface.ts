type Category = {
  id: number;
  category_name: string;
};

type SubCategory = {
  id: number;
  sub_category_name: string;
} | null; // Allow null if sub_category is not provided

type Brand = {
  id: number;
  brand_name: string;
};

type ProductSocket = {
  id: number;
  socket_name: string;
  release_date: string; // ISO date string
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
  file_type: string; // e.g., "image"
};

export type Product = {
  id: number;
  product_name: string;
  price: number;
  estimated_weight: string; // Keep as string to match the provided data
  description: string;
  stock: number;
  category: Category;
  sub_category: SubCategory; // Allow null
  brand: Brand;
  product_ram_type: RamType[]; // Changed to an array of RamType
  product_socket: ProductSocket[];
  media: Media[];
  is_deleted: boolean;
};
