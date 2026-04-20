'use client';

import { useMemo, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock/products';
import { useCartStore } from '@/lib/stores/cart-store';
import { cn } from '@/lib/cn';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.slug === slug),
    [slug]
  );
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [variantId, setVariantId] = useState(product?.variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const selected =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const handleAdd = () => {
    if (!selected) return;
    addItem(product, selected, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selected) return;
    addItem(product, selected, quantity);
    router.push('/customer/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link
        href="/customer"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors mb-10"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 ring-1 ring-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                {product.rating} · {product.reviewCount} reviews
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
              {product.name}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={cn(
                'text-4xl font-black tracking-tighter',
                product.salePrice ? 'text-rose-600' : 'text-slate-900'
              )}
            >
              ${selected?.price ?? product.basePrice}
            </span>
            {product.salePrice && (
              <span className="text-lg font-bold text-slate-400 line-through">
                ${product.basePrice}
              </span>
            )}
          </div>

          {product.variants.length > 1 && (
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                Variant
              </p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      'px-5 py-3 rounded-2xl border-2 text-sm font-bold transition-all',
                      v.id === variantId
                        ? 'border-rose-500 bg-rose-50 text-rose-600'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    )}
                  >
                    {v.name}
                    <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      · {v.stock} in stock
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Quantity
            </p>
            <div className="inline-flex items-center border-2 border-slate-200 rounded-2xl">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-slate-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-black tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 hover:bg-slate-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAdd}
              className={cn(
                'flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95',
                justAdded
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-slate-900 text-white hover:bg-rose-500 shadow-slate-900/10'
              )}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to cart
                </>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
            >
              <Sparkles className="w-4 h-4" /> Buy now
            </button>
          </div>

          <AnimatePresence>
            {justAdded && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-xs font-bold text-emerald-600"
              >
                Item added.{' '}
                <Link href="/customer/cart" className="underline">
                  View cart
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
