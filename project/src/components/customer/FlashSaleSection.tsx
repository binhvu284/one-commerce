'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Timer } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock/products';
import { cn } from '@/lib/cn';

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map((n) => n.toString().padStart(2, '0')).join(':');
}

function Countdown({ endTime }: { endTime: string }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = new Date(endTime).getTime() - now;
  return (
    <span className="font-mono tabular-nums font-black text-white">
      {formatCountdown(remaining)}
    </span>
  );
}

export function FlashSaleSection() {
  const flashProducts = MOCK_PRODUCTS.filter((p) => p.flashSale);
  if (flashProducts.length === 0) return null;

  // Soonest-ending flash sale drives the headline countdown.
  const earliest = [...flashProducts].sort(
    (a, b) =>
      new Date(a.flashSale!.endTime).getTime() -
      new Date(b.flashSale!.endTime).getTime()
  )[0];

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-rose-600 via-rose-500 to-orange-500">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="space-y-3 text-white">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Flash Deal
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              Ends in <Countdown endTime={earliest.flashSale!.endTime} />
            </h2>
            <p className="text-white/80 font-medium max-w-md">
              Limited quantities, one shot. When the timer stops, prices revert.
            </p>
          </div>
          <Link
            href="/customer/offers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-rose-600 text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
          >
            See all deals
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flashProducts.slice(0, 2).map((product, idx) => {
            const fs = product.flashSale!;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={`/customer/products/${product.slug}`}
                  className="group flex items-center gap-5 p-5 rounded-3xl bg-white/95 backdrop-blur-md hover:bg-white transition-all"
                >
                  <div className="relative w-28 h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-3 h-3 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">
                        Flash
                      </span>
                    </div>
                    <p className="text-base font-black text-slate-900 truncate">
                      {product.name}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-rose-600 tabular-nums">
                        ${fs.salePrice}
                      </span>
                      <span className="text-sm font-bold text-slate-400 line-through">
                        ${product.basePrice}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500'
                          )}
                          style={{ width: `${fs.soldProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">
                        {fs.soldProgress}% claimed · ends soon
                      </p>
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
