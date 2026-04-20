'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  selectCartSubtotal,
  useCartStore,
  useHydratedCart,
} from '@/lib/stores/cart-store';

export default function CartPage() {
  const hydrated = useHydratedCart();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!hydrated) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="h-40 rounded-3xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-slate-400" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tighter">
            Your cart is empty
          </h1>
          <p className="text-slate-500">
            Discover curated products and add them to your bag.
          </p>
        </div>
        <Link
          href="/customer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-500 transition-colors"
        >
          Continue shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-[1fr,380px] gap-10 items-start">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.variantId}`}
              className="flex gap-4 p-4 rounded-3xl bg-white ring-1 ring-slate-100 shadow-sm"
            >
              <Link
                href={`/customer/products/${item.slug}`}
                className="relative w-24 h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-100"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/customer/products/${item.slug}`}
                      className="text-base font-black text-slate-900 hover:text-rose-500 transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">
                      {item.variantName}
                    </p>
                  </div>
                  <span className="text-base font-black tabular-nums whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="inline-flex items-center border-2 border-slate-200 rounded-xl">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.variantId,
                          item.quantity - 1
                        )
                      }
                      className="p-2 hover:bg-slate-50"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-black tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.variantId,
                          item.quantity + 1
                        )
                      }
                      className="p-2 hover:bg-slate-50"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="sticky top-28 p-6 rounded-3xl bg-slate-50 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
            Order summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-black tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
              <span className="text-base font-black">Estimated total</span>
              <span className="text-xl font-black tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={() => router.push('/customer/checkout')}
            className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-rose-500 transition-colors shadow-lg shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
          >
            Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="/customer"
            className="block text-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
