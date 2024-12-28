export interface Media {
  source: string;
  file_type: string;
}

export interface Product {
  id: number;
  product_name: string;
  price: number;
  media: Media[];
  category: {
    id: number;
    category_name: string;
  };
}

export interface ProductCardItemProps {
  id: number; 
  product_name: string;
  price: number; 
  media_source: string | null; 
  category_name: string;
}
