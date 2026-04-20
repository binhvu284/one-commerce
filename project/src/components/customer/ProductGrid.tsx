'use client';

import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock/products';
import { Product } from '@/lib/types/product';
import { ProductCard } from './ProductCard';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/cn';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

function getEffectivePrice(p: Product): number {
  return p.salePrice ?? p.basePrice;
}

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');

  const products = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
    if (activeCategory !== 'all') {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        break;
      case 'price-desc':
        list.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => {
          const aT = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bT = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bT - aT;
        });
        break;
      default:
        break;
    }
    return list;
  }, [activeCategory, query, sort]);

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-14">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5 mb-6"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-orange-600 fill-orange-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
                Featured Collections
              </span>
            </motion.div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">
              Trending Now.
            </h2>
            <p className="text-slate-500 font-medium">
              Browse our most popular items and find the perfect addition to your space.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 rounded-2xl bg-slate-50 border border-slate-100 pl-11 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-200 transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-12 rounded-2xl bg-slate-50 border border-slate-100 px-4 text-xs font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-200"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 p-1.5 mb-12 rounded-3xl bg-slate-50 border border-slate-100 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={cn(
                'px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap',
                activeCategory === cat.slug
                  ? 'bg-white text-rose-500 shadow-xl shadow-rose-500/10 ring-1 ring-rose-500/20'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-32 text-center space-y-4">
            <p className="text-6xl font-black text-slate-100">Zero.</p>
            <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">
              No products match your filters
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('all');
                setSort('featured');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-500 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
