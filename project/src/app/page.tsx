'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Presentation, ShoppingBag, Zap, ArrowRight, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const roles = [
  {
    id: 'admin',
    title: 'System Administrator',
    description: 'Manage the whole platform, organizations, and global settings.',
    href: '/admin/dashboard',
    icon: <ShieldAlert className="w-6 h-6" />,
    color: 'from-indigo-600 to-violet-600',
    shadow: 'shadow-indigo-500/20',
    features: ['Org Management', 'Global Analytics', 'System Security'],
  },
  {
    id: 'business',
    title: 'Business User',
    description: 'Manage your own workspace, products, orders, and branding.',
    href: '/business/dashboard',
    icon: <Presentation className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20',
    features: ['Storefront Settings', 'Business Analytics', 'Team Management'],
    subRoles: [
      { label: 'Owner', role: 'OWNER', color: 'bg-emerald-500' },
      { label: 'Admin', role: 'ADMIN', color: 'bg-blue-500' },
      { label: 'Manager', role: 'MANAGER', color: 'bg-purple-500' },
      { label: 'Staff', role: 'STAFF', color: 'bg-slate-500' },
    ]
  },
  {
    id: 'customer',
    title: 'Customer Storefront',
    description: 'The end-user experience for browsing and purchasing products.',
    href: '/customer',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'from-rose-500 to-orange-600',
    shadow: 'shadow-rose-500/20',
    features: ['Mobile Storefront', 'Fluid Checkout', 'User Profile'],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden relative selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">OneCommerce Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-rose-400 animate-gradient">Multi-Tenant</span> Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Access all modules of the OneCommerce ecosystem. Switch between administration, business operations, and customer experience seamlessly.
          </motion.p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="h-full"
            >
              <div
                className="group relative flex flex-col h-full p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] shadow-2xl overflow-hidden"
              >
                {/* Role Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ring-4 ring-black/[0.2]",
                  role.color,
                  role.shadow
                )}>
                  <div className="text-white drop-shadow-md">
                    {role.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                  {role.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-8">
                  {role.description}
                </p>

                <div className="space-y-3 mb-10">
                  {role.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-500 transition-colors" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  {role.subRoles ? (
                    <div className="space-y-3 pt-6 border-t border-white/10">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Select Access Role:</p>
                       <div className="grid grid-cols-2 gap-2">
                          {role.subRoles.map(sr => (
                            <Link 
                               key={sr.role}
                               href={`${role.href}?role=${sr.role}`}
                               className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-[10px] font-black uppercase tracking-widest text-center transition-all hover:scale-[1.02] active:scale-95 text-slate-400 hover:text-white"
                            >
                               {sr.label}
                            </Link>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <Link 
                      href={role.href}
                      className="flex items-center justify-between pt-6 border-t border-white/5 group/link"
                    >
                      <span className="text-sm font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Enter Workspace</span>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all">
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
                      </div>
                    </Link>
                  )}
                </div>

                {/* Hover Glow */}
                <div className={cn(
                  "absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity blur-3xl -z-10",
                  role.color
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-6 px-10 py-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-md">
            <div className="flex flex-col items-center">
               <span className="text-2xl font-black text-white leading-tight">10.5k</span>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">Daily Tractions</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center">
               <span className="text-2xl font-black text-white leading-tight">99.9%</span>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">System Uptime</span>
            </div>
          </div>
          <p className="mt-12 text-[10px] uppercase tracking-[0.3em] font-black text-slate-600">
            © 2026 BINH LE • Impeccable Design Standards
          </p>
        </motion.div>
      </main>

      {/* Floating Mouse Tip */}
      <div className="fixed bottom-10 right-10 flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity hidden lg:flex">
         <MousePointer2 className="w-4 h-4 text-indigo-400" />
         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Interactive Role Cards</span>
      </div>
    </div>
  );
}
