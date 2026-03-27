'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CustomerHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white px-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 mb-8 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-600">Spring Collection 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]"
          >
            Redefine your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 animate-gradient">Lifestyle.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-lg mb-12 font-medium leading-relaxed"
          >
            Curated collections from the world&apos;s most innovative brands. Experience seamless shopping with OneCommerce&apos;s modular storefront technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              href="#"
              className="group flex items-center gap-3 px-8 py-5 h-16 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm hover:bg-rose-600 transition-all shadow-2xl shadow-slate-900/20 active:scale-95"
            >
              Shop Collection
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="#"
              className="group flex items-center gap-3 px-8 py-5 h-16 rounded-3xl bg-white border-2 border-slate-100 text-slate-900 font-black uppercase tracking-widest text-sm hover:border-rose-200 hover:bg-rose-50 transition-all shadow-xl shadow-slate-200/50 active:scale-95"
            >
              Explore Stories
            </Link>
          </motion.div>
          
          <div className="mt-16 flex items-center gap-8">
             <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden ring-2 ring-slate-100 shadow-sm">
                    <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-rose-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg ring-2 ring-rose-300">
                   10k+
                </div>
             </div>
             <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Join the <span className="text-slate-900 underline decoration-rose-500 decoration-2 underline-offset-4">community</span>
             </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative lg:block hidden group"
        >
          <div className="relative w-full aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl shadow-rose-500/10 ring-8 ring-white">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-orange-500/10" />
            <Image 
              src="/images/products/watch.png"
              alt="Hero Product"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            {/* Dynamic Card Overlay */}
            <motion.div 
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.5 }}
               className="absolute top-10 right-10 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 flex items-center gap-4"
            >
               <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
               </div>
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Price Drop</p>
                  <p className="text-xl font-black text-slate-900">$899.00</p>
               </div>
            </motion.div>
          </div>
          
          {/* Background Decorative Rings */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full border-2 border-rose-100 rounded-[4rem] rotate-6" />
          <div className="absolute -z-10 -top-10 -left-10 w-full h-full border-2 border-orange-100 rounded-[4rem] -rotate-3" />
        </motion.div>
      </div>
    </section>
  );
}
