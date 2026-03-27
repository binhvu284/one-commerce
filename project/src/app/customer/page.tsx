'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Zap, ArrowLeft } from 'lucide-react';

export default function CustomerPlaceholder() {
  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6 selection:bg-rose-200">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-rose-500 shadow-2xl shadow-rose-500/40 flex items-center justify-center mx-auto mb-10 ring-8 ring-white"
        >
          <ShoppingBag className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-black text-rose-950 mb-4 tracking-tight"
        >
          Storefront Under Construction
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-rose-900/60 font-medium leading-relaxed mb-10"
        >
          Your high-end storefront is being modularly assembled. Soon you&apos;ll be able to browse collections and experience the fluid purchase flow.
        </motion.p>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="space-y-4"
        >
           <Link 
              href="/"
              className="group flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-white border border-rose-200 text-rose-950 font-black uppercase tracking-widest text-xs hover:bg-rose-100 transition-all shadow-xl shadow-rose-200/50"
           >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Portal Landing
           </Link>
           
           <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-rose-300">
              <div className="w-1 h-1 rounded-full bg-rose-300" />
              Powered by OneCommerce
              <div className="w-1 h-1 rounded-full bg-rose-300" />
           </div>
        </motion.div>
      </div>

      <div className="fixed bottom-10 left-10 flex items-center gap-2">
         <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-white fill-white" />
         </div>
         <span className="text-xs font-black uppercase tracking-widest text-rose-950">Module: Storefront</span>
      </div>
    </div>
  );
}
