export interface Product {
  id: string;
  productName: string;
  price: number;
  estimatedWeight: number;
  description: string;
  stock: number;
  category: any; // Adjust based on your category shape
  subCategory: any; // Adjust based on your subCategory shape
  brand: any; // Adjust based on your brand shape
  productRamTypes: any[]; // Adjust based on your ram type shape
  productSockets: any[]; // Adjust based on your socket shape
  media: any[]; // Adjust based on your media shape
  isDeleted: boolean;
}
