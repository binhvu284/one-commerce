'use client';

import { motion } from 'framer-motion';

const BRANDS = ['Atelier Nord', 'Kōra', 'Verano', 'Lumen & Co', 'Soma Labs', 'Fielder'];

export function BrandStrip() {
  return (
    <section className="py-14 px-6 border-y border-slate-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
        {BRANDS.map((b, idx) => (
          <motion.span
            key={b}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
            className="text-xl md:text-2xl font-black italic tracking-tighter text-slate-300 hover:text-slate-700 transition-colors"
          >
            {b}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
