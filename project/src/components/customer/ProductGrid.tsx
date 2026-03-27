'use client';

import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock/products';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ListFilter, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
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
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Featured Collections</span>
             </motion.div>
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Trending Now.</h2>
             <p className="text-slate-500 font-medium">Browse our most popular items and find the perfect addition to your space.</p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-3xl bg-slate-50 border border-slate-100 scale-90 md:scale-100 origin-right overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeCategory === cat.slug 
                    ? "bg-white text-rose-500 shadow-xl shadow-rose-500/10 ring-1 ring-rose-500/20" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
           <div className="py-40 text-center space-y-4">
              <p className="text-6xl font-black text-slate-100">Zero.</p>
              <p className="text-slate-400 font-medium uppercase tracking-widest text-xs">No products found in this category</p>
           </div>
        )}

        {/* Load More Placeholder */}
        <div className="mt-32 text-center">
           <button className="px-12 py-5 rounded-3xl bg-white border border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:border-rose-200 hover:text-rose-500 transition-all hover:bg-rose-50 active:scale-95 shadow-xl shadow-slate-100/50">
              Discover All Products
           </button>
        </div>
      </div>
    </section>
  );
}
