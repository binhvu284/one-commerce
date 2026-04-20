export interface CartItem {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'vnpay' | 'cod';

export type DeliveryOptionId = 'standard' | 'express';

export interface DeliveryOption {
  id: DeliveryOptionId;
  label: string;
  description: string;
  fee: number;
  etaDays: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered';

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  delivery: DeliveryOption;
  payment: {
    method: PaymentMethod;
    status: 'pending' | 'paid';
    transactionId?: string;
  };
}
