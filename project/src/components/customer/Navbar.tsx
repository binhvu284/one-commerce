'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import {
  selectCartCount,
  useCartStore,
  useHydratedCart,
} from '@/lib/stores/cart-store';

export function CustomerNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hydrated = useHydratedCart();
  const count = useCartStore(selectCartCount);
  const displayCount = hydrated ? count : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-xl shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/customer" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-500">
            <span className="text-white font-black text-xl">O</span>
          </div>
          <span className={cn(
            "text-xl font-black tracking-tighter transition-colors",
            isScrolled ? "text-slate-900" : "text-slate-900"
          )}>
            OneCommerce<span className="text-rose-500">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Collections', href: '/customer/collections' },
            { label: 'New Arrivals', href: '/customer/new-arrivals' },
            { label: 'Offers', href: '/customer/offers' },
            { label: 'About', href: '/customer/about' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/customer/orders"
            className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="My orders"
          >
            <Package className="w-5 h-5" />
          </Link>
          <Link
            href="/customer/cart"
            className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-600 relative group"
            aria-label={`Shopping cart (${displayCount} items)`}
          >
            <ShoppingCart className="w-5 h-5" />
            {displayCount > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {displayCount}
              </span>
            )}
          </Link>
          <Link 
            href="/login" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>
          
          <button 
            className="md:hidden p-2.5 rounded-full bg-slate-100 text-slate-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-12">
               <span className="text-xl font-black italic">Menu</span>
               <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-slate-100"
               >
                <X className="w-6 h-6" />
               </button>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Collections', href: '/customer/collections' },
                { label: 'New Arrivals', href: '/customer/new-arrivals' },
                { label: 'Offers', href: '/customer/offers' },
                { label: 'About', href: '/customer/about' },
                { label: 'My Orders', href: '/customer/orders' },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black text-slate-900 hover:text-rose-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute bottom-10 left-6 right-6">
              <Link 
                href="/login"
                className="flex items-center justify-center gap-3 w-full py-5 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl"
              >
                <User className="w-5 h-5" />
                Sign In to Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
