'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from '@/lib/mock/products';
import { ProductCard } from '@/components/customer/ProductCard';
import { cn } from '@/lib/cn';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = (searchParams.get('cat') ?? 'all').toLowerCase();

  const filtered = useMemo(() => {
    if (active === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === active.toLowerCase()
    );
  }, [active]);

  const handleChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('cat');
    } else {
      params.set('cat', slug);
    }
    const qs = params.toString();
    router.replace(`/customer/collections${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const activeCat =
    CATEGORIES.find((c) => c.slug === active) ?? CATEGORIES[0];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="px-6 pt-14 pb-10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
              <LayoutGrid className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
              Collections
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            {activeCat.name === 'All' ? 'Every collection.' : `The ${activeCat.name} edit.`}
          </h1>
          <p className="max-w-xl text-slate-500 font-medium">
            {filtered.length} piece{filtered.length === 1 ? '' : 's'}. Browse the full storefront or pick
            a category below.
          </p>
        </div>
      </section>

      {/* Category hero grid */}
      {active === 'all' && (
        <section className="px-6 pb-14">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.filter((c) => c.slug !== 'all').map((cat, idx) => {
              const count = MOCK_PRODUCTS.filter(
                (p) => p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => handleChange(cat.slug)}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden text-left"
                >
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <p className="text-base font-black tracking-tight">{cat.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                      {count} item{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              );
            })}
          </div>
        </section>
      )}

      {/* Category pills */}
      <section className="px-6 sticky top-16 z-20 bg-white/90 backdrop-blur-md border-y border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleChange(cat.slug)}
              className={cn(
                'px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap',
                cat.slug === active
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-32 text-center space-y-4">
              <p className="text-6xl font-black text-slate-100">Zero.</p>
              <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
                Nothing in this collection yet
              </p>
              <Link
                href="/customer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-500 transition-colors"
              >
                Go to storefront
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {filtered.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="h-40 rounded-3xl bg-slate-100 animate-pulse" />
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
}
