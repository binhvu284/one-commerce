'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock/products';
import { ProductCard } from '@/components/customer/ProductCard';
import { cn } from '@/lib/cn';

const DAY = 24 * 60 * 60 * 1000;

function daysAgo(iso?: string): number {
  if (!iso) return Infinity;
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / DAY));
}

export default function NewArrivalsPage() {
  const sorted = [...MOCK_PRODUCTS].sort((a, b) => {
    const aT = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bT = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bT - aT;
  });

  const featured = sorted[0];
  const thisWeek = sorted.filter(
    (p) => p.createdAt && daysAgo(p.createdAt) <= 7
  );
  const thisMonth = sorted.filter(
    (p) =>
      p.createdAt && daysAgo(p.createdAt) > 7 && daysAgo(p.createdAt) <= 30
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative px-6 pt-14 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr,1fr] gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
                Just dropped
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              New this <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                season.
              </span>
            </h1>
            <p className="max-w-lg text-slate-500 font-medium text-lg leading-relaxed">
              {sorted.length} arrivals across six categories. Every piece is made-to-order
              or limited in quantity — once they&apos;re gone, they&apos;re gone.
            </p>
            {featured && (
              <Link
                href={`/customer/products/${featured.slug}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-500 transition-colors"
              >
                See the spotlight
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          {featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative"
            >
              <Link
                href={`/customer/products/${featured.slug}`}
                className="block relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 ring-8 ring-white shadow-2xl shadow-rose-500/10"
              >
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-6 bottom-6 p-5 rounded-3xl bg-white/90 backdrop-blur-md flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">
                      Spotlight
                    </p>
                    <p className="text-lg font-black truncate">{featured.name}</p>
                  </div>
                  <span className="text-xl font-black tabular-nums">
                    ${featured.salePrice ?? featured.basePrice}
                  </span>
                </div>
              </Link>
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-rose-100 rounded-[3rem] rotate-3" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Timeline of drops */}
      <section className="px-6 py-16 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <Stat
            label="This week"
            value={thisWeek.length}
            tone="rose"
            copy="Fresh off the bench."
          />
          <Stat
            label="This month"
            value={thisMonth.length}
            tone="orange"
            copy="Still new, still limited."
          />
          <Stat
            label="Drop schedule"
            value={'Thursdays'}
            tone="indigo"
            copy="Next drop goes live 8am ICT."
          />
        </div>
      </section>

      {/* Latest arrivals grid */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Latest arrivals
            </h2>
            <Link
              href="/customer/collections"
              className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors inline-flex items-center gap-2"
            >
              Browse everything
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {sorted.map((p, idx) => (
              <div key={p.id} className="relative">
                {p.createdAt && daysAgo(p.createdAt) <= 7 && (
                  <span className="absolute -top-2 left-2 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-500 text-white shadow-lg backdrop-blur">
                    <Sparkles className="w-3 h-3" />
                    {daysAgo(p.createdAt) === 0
                      ? 'Today'
                      : `${daysAgo(p.createdAt)}d ago`}
                  </span>
                )}
                <ProductCard product={p} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  copy,
  tone,
}: {
  label: string;
  value: number | string;
  copy: string;
  tone: 'rose' | 'orange' | 'indigo';
}) {
  const toneClasses = {
    rose: 'bg-rose-500 text-white',
    orange: 'bg-orange-500 text-white',
    indigo: 'bg-indigo-500 text-white',
  } as const;
  return (
    <div className="p-8 rounded-3xl bg-white ring-1 ring-slate-100 space-y-3">
      <span
        className={cn(
          'inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]',
          toneClasses[tone]
        )}
      >
        {label}
      </span>
      <p className="text-4xl font-black tracking-tighter">{value}</p>
      <p className="text-sm text-slate-500">{copy}</p>
    </div>
  );
}
