export interface Media {
  source: string;
  file_type: string;
}

export interface Product {
  id: string;
  product_name: string;
  price: number;
  stock: number;
  media: Media[];
  category: {
    id: number;
    category_name: string;
  };
}

export interface ProductCardItemProps {
  id: string; 
  product_name: string;
  price: number; 
  stock: number;
  media_source: string | null; 
  category_id: number;
  category_name: string;
}
