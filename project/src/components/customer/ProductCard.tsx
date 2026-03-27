'use client';

import { Product } from '@/lib/types/product';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, Sparkles, Award, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const badgeColors: Record<string, string> = {
    mall: 'bg-indigo-500 text-white',
    hot: 'bg-rose-500 text-white',
    sale: 'bg-emerald-500 text-white',
    new: 'bg-orange-500 text-white',
    custom: 'bg-slate-900 text-white',
  };

  const badgeIcons: Record<string, any> = {
    mall: Award,
    hot: TrendingUp,
    sale: Zap,
    new: Sparkles,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <Link href={`/customer/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 ring-1 ring-slate-100 transition-all duration-700 group-hover:scale-[0.98] group-hover:shadow-2xl group-hover:shadow-rose-500/10">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {product.badges.map((badge, idx) => {
              const Icon = badgeIcons[badge.type] || Sparkles;
              return (
                <div 
                  key={idx}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md",
                    badgeColors[badge.type] || 'bg-slate-900 text-white'
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {badge.label}
                </div>
              );
            })}
          </div>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 px-8">
             <button className="w-full h-14 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-rose-500 hover:text-white group/btn">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                Quick Add
             </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 space-y-3 px-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
              <span className="text-[10px] font-black text-slate-400">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-rose-500 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-3">
            <span className={cn(
               "text-2xl font-black tracking-tighter",
               product.salePrice ? "text-rose-600" : "text-slate-900"
            )}>
              ${product.salePrice || product.basePrice}
            </span>
            {product.salePrice && (
              <span className="text-sm font-bold text-slate-400 line-through decoration-slate-300">
                ${product.basePrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
