import { DeliveryOption, DeliveryOptionId } from '../types/cart';

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'standard',
    label: 'Standard Shipping',
    description: 'Reliable delivery to your door',
    fee: 5,
    etaDays: '5 – 7 business days',
  },
  {
    id: 'express',
    label: 'Express Shipping',
    description: 'Priority handling & courier delivery',
    fee: 15,
    etaDays: '1 – 2 business days',
  },
];

export function getDeliveryOption(id: DeliveryOptionId): DeliveryOption {
  return DELIVERY_OPTIONS.find((opt) => opt.id === id) ?? DELIVERY_OPTIONS[0];
}
