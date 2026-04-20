'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect, useState } from 'react';
import { CartItem } from '../types/cart';
import { Product, ProductVariant } from '../types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, variant, quantity = 1) =>
        set((state) => {
          const idx = state.items.findIndex(
            (i) => i.productId === product.id && i.variantId === variant.id
          );
          if (idx >= 0) {
            const next = [...state.items];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
            return { items: next };
          }
          const item: CartItem = {
            productId: product.id,
            variantId: variant.id,
            slug: product.slug,
            name: product.name,
            variantName: variant.name,
            price: variant.price,
            image: product.images[0],
            quantity,
          };
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })),
      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.variantId === variantId
                ? { ...i, quantity: Math.max(1, quantity) }
                : i
            ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'one-commerce-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

export function selectCartCount(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.quantity, 0);
}

export function selectCartSubtotal(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function useHydratedCart() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);
  return hydrated;
}
