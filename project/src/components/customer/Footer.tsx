'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const footerLinks = [
  {
    title: 'Customer Service',
    links: ['Help Center', 'Track My Order', 'Returns & Refunds', 'Shipping Policy']
  },
  {
    title: 'Company',
    links: ['About Us', 'Contact', 'Sustainability', 'Terms of Service']
  },
  {
    title: 'Resources',
    links: ['Newsletter', 'Blog', 'Affiliate Program', 'Gift Cards']
  }
];

export function CustomerFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-8">
          <Link href="/customer" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-500">
               <span className="text-white font-black text-xl">O</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              OneCommerce<span className="text-rose-500">.</span>
            </span>
          </Link>
          <p className="max-w-xs leading-relaxed font-medium">
            Building the future of e-commerce with premium, modular solutions for modern brands. Experience the fluid storefront.
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Twitter, Facebook].map((Icon, idx) => (
               <Link 
                key={idx} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all group"
               >
                <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
               </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">{section.title}</h4>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-rose-500 transition-colors font-medium text-sm">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-10">
           <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">support@onecommerce.io</span>
           </div>
           <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Silicon Valley, CA</span>
           </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">
          © 2026 OneCommerce Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
