'use client';

import { CustomerHero } from '@/components/customer/Hero';
import { ProductGrid } from '@/components/customer/ProductGrid';
import { CategoryShowcase } from '@/components/customer/CategoryShowcase';
import { FlashSaleSection } from '@/components/customer/FlashSaleSection';
import { Testimonials } from '@/components/customer/Testimonials';
import { BrandStrip } from '@/components/customer/BrandStrip';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function CustomerPage() {
  return (
    <div className="bg-white">
      <CustomerHero />

      {/* Trust Bar */}
      <section className="py-12 px-6 border-y border-slate-50 overflow-hidden bg-slate-50/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-12 opacity-40 grayscale">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-400 fill-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Express Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-slate-400 fill-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Premium Curation</span>
          </div>
        </div>
      </section>

      <CategoryShowcase />

      <FlashSaleSection />

      <ProductGrid />

      <BrandStrip />

      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-32 px-6 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Stay ahead of <br /> the <span className="text-rose-500">Curve.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Join 10,000+ fashion-forward individuals and get exclusive early access to our limited collection drops.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-stretch gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-16 rounded-3xl bg-white/5 border border-white/10 px-8 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-medium"
            />
            <button className="h-16 px-10 rounded-3xl bg-white text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-rose-500 hover:text-white transition-all shadow-2xl active:scale-95">
              Subscribe
            </button>
          </motion.div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            No spam. Just pure excellence, delivered weekly.
          </p>
        </div>
      </section>
    </div>
  );
}
