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
