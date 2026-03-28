'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, CreditCard, Shield, Bell, Building, Globe, Key, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

const settingsNav = [
  { id: 'general', label: 'General Settings', href: '/business/settings/general', icon: <Globe className="w-4 h-4" />, inDev: true },
  { id: 'account', label: 'Account Identity', href: '/business/settings/account', icon: <User className="w-4 h-4" /> },
  { id: 'billing', label: 'Plan & Billing', href: '/business/settings/billing', icon: <CreditCard className="w-4 h-4" />, inDev: true },
  { id: 'security', label: 'Security & Auth', href: '/business/settings/security', icon: <Shield className="w-4 h-4" />, inDev: true },
  { id: 'notifications', label: 'Notification Hub', href: '/business/settings/notifications', icon: <Bell className="w-4 h-4" />, inDev: true },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1 px-4">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium">Configure your account, workspace, and security preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-4 px-4 lg:px-0">
          <nav className="space-y-1">
            {settingsNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.inDev ? '#' : item.href}
                  onClick={item.inDev ? (e) => e.preventDefault() : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative",
                    active 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5",
                    item.inDev && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className={cn(
                    "transition-transform group-hover:scale-110",
                    active ? "text-white" : "text-slate-400 group-hover:text-blue-500"
                  )}>
                    {item.icon}
                  </span>
                  {item.label}
                  {item.inDev && (
                    <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded">Dev</span>
                  )}
                  {active && (
                    <motion.div layoutId="active-setting" className="absolute left-0 w-1 h-6 bg-white rounded-full translate-x-1" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-6 rounded-[2rem] bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 space-y-4">
             <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-5 h-5" />
             </div>
             <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-tight">Need Help?</p>
                <p className="text-[10px] text-slate-500 dark:text-indigo-300 font-medium leading-relaxed">Visit our resources for advanced configurations.</p>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:underline">Documentation →</button>
          </div>
        </aside>

        {/* Setting Content Content */}
        <div className="flex-1 min-w-0">
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 shadow-xl overflow-hidden min-h-[500px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
