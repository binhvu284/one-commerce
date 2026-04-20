'use client';

import Link from 'next/link';
import { ArrowRight, Package, ShoppingBag } from 'lucide-react';
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function OrdersPage() {
  const hydrated = useHydratedOrders();
  const orders = useOrdersStore((s) => s.orders);

  if (!hydrated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="h-40 rounded-3xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <Package className="w-8 h-8 text-slate-400" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tighter">
            No orders yet
          </h1>
          <p className="text-slate-500">
            When you place an order, it&apos;ll show up here.
          </p>
        </div>
        <Link
          href="/customer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-500 transition-colors"
        >
          Start shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
        My Orders
      </h1>
      <p className="text-slate-500 mb-10">{orders.length} order{orders.length > 1 ? 's' : ''} on file</p>

      <ul className="space-y-4">
        {orders.map((order) => {
          const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
          return (
            <li key={order.id}>
              <Link
                href={`/customer/orders/${order.id}`}
                className="block p-6 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm hover:ring-rose-200 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                        {order.id}
                      </span>
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest',
                          STATUS_STYLES[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {formatDate(order.createdAt)} · {itemCount} item
                      {itemCount > 1 ? 's' : ''} · {order.delivery.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black tabular-nums">
                      ${order.total.toFixed(2)}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
