export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  created_at: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  image_url: string;
}