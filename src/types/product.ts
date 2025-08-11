// src/types/product.ts

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  veg: boolean;
  popular: boolean;
  preparationTime: string;
}

export interface CartItem extends ProductItem {
  quantity: number;
}

export type CategoryId =
  | "all"
  | "rocking-rolls"
  | "combos"
  | "main-course"
  | "chinese"
  | "economy-meals";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}


