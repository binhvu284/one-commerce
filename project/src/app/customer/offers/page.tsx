'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  Copy,
  Flame,
  Gift,
  Percent,
  Tag,
  Truck,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock/products';
import { ProductCard } from '@/components/customer/ProductCard';
import { cn } from '@/lib/cn';

const COUPONS = [
  {
    code: 'WELCOME10',
    title: '10% off your first order',
    description: 'New customers only. Minimum spend $80. Expires Jun 30, 2026.',
    tone: 'rose' as const,
  },
  {
    code: 'SHIPFREE',
    title: 'Free worldwide shipping',
    description: 'On orders over $150. Auto-applied at checkout. Standard delivery only.',
    tone: 'indigo' as const,
  },
  {
    code: 'SPRING20',
    title: 'Spring Collection — 20% off',
    description: 'Ends when the drop sells through. Single use per customer.',
    tone: 'emerald' as const,
  },
];

const BANNERS = [
  {
    icon: Flame,
    eyebrow: 'Flash',
    title: 'Up to 40% off select deals',
    subtitle: 'Rotating timers every 12 hours.',
    href: '#flash',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    icon: Gift,
    eyebrow: 'Bundle',
    title: 'Buy 3 tees, save 20%',
    subtitle: 'Mix and match any essentials tee.',
    href: '/customer/collections?cat=clothing',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Truck,
    eyebrow: 'Shipping',
    title: 'Free shipping over $150',
    subtitle: 'Automatically applied. Worldwide.',
    href: '/customer',
    gradient: 'from-slate-900 to-slate-700',
  },
];

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
  return (
    <span className="font-mono tabular-nums">
      {formatCountdown(new Date(endTime).getTime() - now)}
    </span>
  );
}

function CouponCard({ coupon }: { coupon: (typeof COUPONS)[number] }) {
  const [copied, setCopied] = useState(false);
  const toneClasses = {
    rose: 'from-rose-500 to-orange-500',
    indigo: 'from-indigo-500 to-purple-500',
    emerald: 'from-emerald-500 to-teal-500',
  } as const;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore.
    }
  };
  return (
    <div className="relative overflow-hidden rounded-[2rem] p-8 bg-slate-50 ring-1 ring-slate-100">
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r',
          toneClasses[coupon.tone]
        )}
      />
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Tag className="w-3.5 h-3.5" />
            Coupon code
          </div>
          <h3 className="text-xl font-black tracking-tight">{coupon.title}</h3>
          <p className="text-sm text-slate-600">{coupon.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-4 py-3 rounded-2xl border-2 border-dashed border-slate-300 text-slate-900 font-mono text-sm font-black tracking-widest">
            {coupon.code}
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              'px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2',
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-900 text-white hover:bg-rose-500'
            )}
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OffersPage() {
  const saleProducts = MOCK_PRODUCTS.filter((p) => p.salePrice !== undefined);
  const flashProducts = MOCK_PRODUCTS.filter((p) => p.flashSale);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative px-6 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-orange-500/10" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-rose-500/20 mb-6"
          >
            <Percent className="w-3.5 h-3.5" />
            Current Offers
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6"
          >
            Save on things <br />
            <span className="italic text-rose-500">worth keeping.</span>
          </motion.h1>
          <p className="max-w-2xl text-slate-600 text-lg font-medium leading-relaxed">
            Live deals, coupon codes and flash markdowns. Everything here is real stock — no
            limited bait products, no &ldquo;while quantities last&rdquo; mystery terms.
          </p>
        </div>
      </section>

      {/* Banners */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          {BANNERS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={b.href}
                  className={cn(
                    'group block p-8 rounded-[2rem] text-white bg-gradient-to-br relative overflow-hidden',
                    b.gradient
                  )}
                >
                  <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
                  <Icon className="w-6 h-6 mb-6" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                    {b.eyebrow}
                  </p>
                  <h3 className="text-2xl font-black tracking-tighter mt-1 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-white/80">{b.subtitle}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    Explore
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Coupons */}
      <section className="px-6 py-16 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="space-y-3 max-w-md">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
                Coupons
              </span>
              <h2 className="text-4xl font-black tracking-tighter">
                Codes you can actually use.
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-xs">
              Apply at checkout. Stackable offers are clearly marked; everything else is
              single-use per customer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {COUPONS.map((c) => (
              <CouponCard key={c.code} coupon={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash deals */}
      {flashProducts.length > 0 && (
        <section id="flash" className="px-6 py-16">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
                  <Flame className="w-3.5 h-3.5" />
                  Flash Deals
                </div>
                <h2 className="text-4xl font-black tracking-tighter">
                  Prices that revert when the clock stops.
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {flashProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/customer/products/${p.slug}`}
                  className="group flex items-stretch gap-5 p-5 rounded-3xl bg-white ring-1 ring-slate-100 hover:ring-rose-200 hover:shadow-xl transition-all"
                >
                  <div className="w-28 h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">
                      <Clock className="w-3 h-3" />
                      <Countdown endTime={p.flashSale!.endTime} />
                    </div>
                    <p className="text-base font-black truncate">{p.name}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-black text-rose-600 tabular-nums">
                        ${p.flashSale!.salePrice}
                      </span>
                      <span className="text-sm font-bold text-slate-400 line-through">
                        ${p.basePrice}
                      </span>
                    </div>
                    <div className="mt-auto pt-3">
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
                          style={{ width: `${p.flashSale!.soldProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1.5">
                        {p.flashSale!.soldProgress}% claimed
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All sale products */}
      <section className="px-6 py-16 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
              On sale now
            </span>
            <h2 className="text-4xl font-black tracking-tighter">
              {saleProducts.length} pieces marked down.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {saleProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
