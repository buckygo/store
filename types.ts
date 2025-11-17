
export interface Specification {
  name: string;
  price: number;
}

export interface Dish {
  id: string;
  name:string;
  subtitle?: string;
  description: string;
  price: number; // Base price or starting price
  originalPrice?: number;
  image: string;
  category: string;
  specifications?: Specification[];
}

export interface CartItem {
  id: string; // Unique identifier for the cart item instance
  dish: Dish;
  quantity: number;
  selectedSpecification?: Specification;
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string; // The order number
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: string; // ISO string
  tableNumber: string;
}

export interface RestaurantTable {
  id: string;
  name: string;
}