'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { use } from 'react';
import { CheckCircle2, ChevronLeft, Clock, Package } from 'lucide-react';
import {
  useHydratedOrders,
  useOrdersStore,
} from '@/lib/stores/orders-store';
import { OrderStatus } from '@/lib/types/cart';
import { cn } from '@/lib/cn';

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-slate-900 text-white',
};

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const hydrated = useHydratedOrders();
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === id));
  const searchParams = useSearchParams();
  const justCreated = searchParams.get('new') === '1';

  if (!hydrated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="h-60 rounded-3xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/customer/orders"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        All orders
      </Link>

      {justCreated && (
        <div className="mb-6 p-5 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-base font-black text-emerald-700">
              Order placed successfully
            </p>
            <p className="text-xs text-emerald-700/80 mt-1">
              A confirmation will be sent to {order.shippingAddress.email}. Your
              order reference is {order.id}.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Order {order.id}
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter mt-1">
            Placed {formatDateTime(order.createdAt)}
          </h1>
        </div>
        <span
          className={cn(
            'px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest',
            STATUS_STYLES[order.status]
          )}
        >
          {order.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr,320px] gap-8 items-start">
        <div className="space-y-6">
          <section className="p-6 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              Items ({order.items.length})
            </h2>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-4 items-center"
                >
                  <div className="relative w-16 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">{item.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {item.variantName} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-black tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-6 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              Shipping address
            </h2>
            <div className="text-sm space-y-1 text-slate-700">
              <p className="font-black text-slate-900">
                {order.shippingAddress.fullName}
              </p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-2 text-slate-500">
                {order.shippingAddress.email} · {order.shippingAddress.phone}
              </p>
            </div>
          </section>

          <section className="p-6 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              Delivery
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <Package className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-black text-slate-900">{order.delivery.label}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {order.delivery.etaDays}
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
              Payment
            </h2>
            <div className="text-sm space-y-1">
              <p className="font-black text-slate-900 uppercase">
                {order.payment.method}
              </p>
              <p className="text-slate-500 text-xs">
                Status:{' '}
                <span
                  className={cn(
                    'font-black uppercase tracking-widest',
                    order.payment.status === 'paid'
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  )}
                >
                  {order.payment.status}
                </span>
              </p>
              {order.payment.transactionId && (
                <p className="text-xs text-slate-500">
                  Transaction: {order.payment.transactionId}
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="sticky top-28 p-6 rounded-3xl bg-slate-50 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
            Totals
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-black tabular-nums">
                ${order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Shipping</span>
              <span className="font-black tabular-nums">
                ${order.shippingFee.toFixed(2)}
              </span>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-base font-black">Total</span>
              <span className="text-xl font-black tabular-nums">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
