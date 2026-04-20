'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Compass } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from '@/lib/mock/products';

export function CategoryShowcase() {
  const visible = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <section className="py-24 px-6 bg-slate-50/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Compass className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                Shop by category
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              Find your <span className="italic">thing.</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Hand-picked pieces across six disciplines — from everyday carry to the corner of your room.
            </p>
          </div>
          <Link
            href="/customer/collections"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-700 hover:text-rose-500 hover:border-rose-200 transition-all"
          >
            Browse all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {visible.map((cat, idx) => {
            const count = MOCK_PRODUCTS.filter(
              (p) => p.category.toLowerCase() === cat.name.toLowerCase()
            ).length;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={`/customer/collections?cat=${cat.slug}`}
                  className="group block relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-200 ring-1 ring-slate-100"
                >
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-black tracking-tight text-lg leading-none">
                        {cat.name}
                      </p>
                      <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mt-1">
                        {count} item{count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
