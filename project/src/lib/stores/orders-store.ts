'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect, useState } from 'react';
import {
  CartItem,
  DeliveryOption,
  Order,
  PaymentMethod,
  ShippingAddress,
} from '../types/cart';

interface PlaceOrderInput {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  delivery: DeliveryOption;
  payment: {
    method: PaymentMethod;
    status: 'pending' | 'paid';
    transactionId?: string;
  };
}

interface OrdersState {
  orders: Order[];
  placeOrder: (input: PlaceOrderInput) => Order;
}

function generateOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORD-${Date.now()}-${rand}`;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: (input) => {
        const subtotal = input.items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        const shippingFee = input.delivery.fee;
        const total = subtotal + shippingFee;
        const order: Order = {
          id: generateOrderId(),
          createdAt: new Date().toISOString(),
          status: 'confirmed',
          items: input.items,
          subtotal,
          shippingFee,
          total,
          shippingAddress: input.shippingAddress,
          delivery: input.delivery,
          payment: input.payment,
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
    }),
    {
      name: 'one-commerce-orders',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

export function useHydratedOrders() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    useOrdersStore.persist.rehydrate();
    setHydrated(true);
  }, []);
  return hydrated;
}
