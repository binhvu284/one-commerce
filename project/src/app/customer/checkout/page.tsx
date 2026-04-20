'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  selectCartSubtotal,
  useCartStore,
  useHydratedCart,
} from '@/lib/stores/cart-store';
import { useOrdersStore } from '@/lib/stores/orders-store';
import { DELIVERY_OPTIONS, getDeliveryOption } from '@/lib/constants/delivery';
import {
  DeliveryOptionId,
  PaymentMethod,
  ShippingAddress,
} from '@/lib/types/cart';
import { ShippingStep } from '@/components/customer/checkout/ShippingStep';
import { DeliveryStep } from '@/components/customer/checkout/DeliveryStep';
import { PaymentStep } from '@/components/customer/checkout/PaymentStep';
import { payWithVnpayMock, VnpayError } from '@/lib/services/vnpay-mock';

type Step = 'shipping' | 'delivery' | 'payment';

const STEP_ORDER: Step[] = ['shipping', 'delivery', 'payment'];

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: '',
  phone: '',
  email: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Vietnam',
};

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useHydratedCart();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const clearCart = useCartStore((s) => s.clear);
  const placeOrder = useOrdersStore((s) => s.placeOrder);

  const [step, setStep] = useState<Step>('shipping');
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [deliveryId, setDeliveryId] = useState<DeliveryOptionId>('standard');
  const [payment, setPayment] = useState<PaymentMethod>('vnpay');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const delivery = useMemo(() => getDeliveryOption(deliveryId), [deliveryId]);
  const total = subtotal + delivery.fee;

  useEffect(() => {
    if (hydrated && items.length === 0 && !submitting) {
      router.replace('/customer/cart');
    }
  }, [hydrated, items.length, router, submitting]);

  if (!hydrated) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="h-40 rounded-3xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  const handlePlaceOrder = async () => {
    setError(null);
    setSubmitting(true);
    try {
      let paymentResult: {
        method: PaymentMethod;
        status: 'pending' | 'paid';
        transactionId?: string;
      };
      if (payment === 'vnpay') {
        const res = await payWithVnpayMock(total);
        paymentResult = {
          method: 'vnpay',
          status: 'paid',
          transactionId: res.transactionId,
        };
      } else {
        paymentResult = { method: 'cod', status: 'pending' };
      }
      const order = placeOrder({
        items,
        shippingAddress: address,
        delivery,
        payment: paymentResult,
      });
      clearCart();
      router.replace(`/customer/orders/${order.id}?new=1`);
    } catch (err) {
      const message =
        err instanceof VnpayError
          ? err.message
          : 'Something went wrong. Please try again.';
      setError(message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/customer/cart"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to cart
      </Link>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
        Checkout
      </h1>

      <StepIndicator step={step} />

      <div className="grid lg:grid-cols-[1fr,400px] gap-10 items-start mt-10">
        <div className="p-6 md:p-8 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm">
          {step === 'shipping' && (
            <ShippingStep
              value={address}
              onChange={setAddress}
              onNext={() => setStep('delivery')}
            />
          )}
          {step === 'delivery' && (
            <DeliveryStep
              value={deliveryId}
              onChange={setDeliveryId}
              onNext={() => setStep('payment')}
              onBack={() => setStep('shipping')}
            />
          )}
          {step === 'payment' && (
            <PaymentStep
              value={payment}
              onChange={setPayment}
              onBack={() => setStep('delivery')}
              onPlaceOrder={handlePlaceOrder}
              submitting={submitting}
              error={error}
            />
          )}
        </div>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          deliveryFee={delivery.fee}
          total={total}
          deliveryLabel={delivery.label}
        />
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const labels: Record<Step, string> = {
    shipping: 'Shipping',
    delivery: 'Delivery',
    payment: 'Payment',
  };
  const currentIdx = STEP_ORDER.indexOf(step);
  return (
    <div className="flex items-center gap-4">
      {STEP_ORDER.map((s, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={s} className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black',
                  done
                    ? 'bg-emerald-500 text-white'
                    : active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-400'
                )}
              >
                {done ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span
                className={cn(
                  'text-xs font-black uppercase tracking-widest',
                  active ? 'text-slate-900' : 'text-slate-400'
                )}
              >
                {labels[s]}
              </span>
            </div>
            {idx < STEP_ORDER.length - 1 && (
              <div
                className={cn(
                  'h-px w-8 md:w-16',
                  done ? 'bg-emerald-500' : 'bg-slate-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface OrderSummaryProps {
  items: ReturnType<typeof useCartStore.getState>['items'];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryLabel: string;
}

function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  total,
  deliveryLabel,
}: OrderSummaryProps) {
  return (
    <aside className="sticky top-28 p-6 rounded-3xl bg-slate-50 space-y-6">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
        Order summary
      </h2>
      <ul className="space-y-3 max-h-72 overflow-auto pr-1">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.variantId}`}
            className="flex gap-3 items-center"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-slate-900 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black truncate">{item.name}</p>
              <p className="text-[10px] text-slate-500 truncate">
                {item.variantName}
              </p>
            </div>
            <span className="text-xs font-black tabular-nums">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-black tabular-nums">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">{deliveryLabel}</span>
          <span className="font-black tabular-nums">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <span className="text-base font-black">Total</span>
          <span className="text-xl font-black tabular-nums">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </aside>
  );
}
