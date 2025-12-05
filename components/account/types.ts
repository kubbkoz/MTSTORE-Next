export interface OrderItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Vybavuje sa' | 'Odoslané' | 'Doručené' | 'Zrušené';
  paymentMethod: string;
  items: OrderItem[];
  trackingStep?: number; // 1: Prijaté, 2: Spracováva sa, 3: Odoslané, 4: Doručené
}

export interface Address {
  id: string;
  type: 'billing' | 'delivery';
  name: string;
  street: string;
  city: string;
  zip: string;
  isDefault: boolean;
}