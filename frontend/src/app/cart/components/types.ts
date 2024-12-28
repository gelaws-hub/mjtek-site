export interface CartItem {
  id: number;
  product_name: string;
  price: number;
  stock: number;
  quantity: number;
  media_source: string;
  category_name: string;
  brand: string;
  estimated_weight: string;
  is_selected: boolean;
}
