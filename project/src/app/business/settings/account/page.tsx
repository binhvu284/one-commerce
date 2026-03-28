'use client';

import { useState } from 'react';
import { User, Mail, Shield, ShieldCheck, MapPin, Globe, CreditCard, Bell, LogOut, ChevronRight, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<'info' | 'auth'>('info');

  return (
    <div className="space-y-12">
      {/* Account Profile Summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 pb-12 border-b border-slate-100 dark:border-white/5">
        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-black shadow-2xl">
          LE
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-black tracking-tight">Le Binh</h2>
          <p className="text-slate-500 font-medium">Head of Operations • binh.le@onecommerce.vn</p>
          <div className="flex items-center gap-3 pt-2">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                Verified Identity
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-blue-500/30">
                Premium Plan
             </div>
          </div>
        </div>
        <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-[10px]">
           Change Picture
        </Button>
      </div>

      {/* Basic Information */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Basic Information</h3>
           <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:underline">Edit Info</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
              { label: 'Full Name', value: 'Le Binh', icon: User },
              { label: 'Primary Email', value: 'binh.le@onecommerce.vn', icon: Mail },
              { label: 'Organization', value: 'OneCommerce Global', icon: Globe },
              { label: 'Location', value: 'Vietnam', icon: MapPin },
           ].map((item) => (
             <div key={item.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500 transition-all">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 text-slate-400 group-hover:text-blue-500 transition-colors shadow-sm">
                      <item.icon className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-tight text-slate-400 opacity-60">{item.label}</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.value}</p>
                   </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
             </div>
           ))}
        </div>
      </section>

      {/* Security & Access Management */}
      <section className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Security & Access Management</h3>
        <div className="space-y-3">
           <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500">
                    <ShieldAlert className="w-6 h-6" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-sm font-black text-amber-600 dark:text-amber-500">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 dark:text-amber-200/50 font-medium leading-relaxed">Boost your account security with an extra verification step.</p>
                 </div>
              </div>
              <Button className="rounded-xl h-11 px-6 bg-amber-600 hover:bg-amber-700 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20">
                 Enable 2FA
              </Button>
           </div>
           
           <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between group hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors shadow-sm">
                    <LogOut className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-sm font-bold">Active Sessions</p>
                    <p className="text-[10px] text-slate-500 font-medium">1 active login in Ho Chi Minh City</p>
                 </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Log Out All</button>
           </div>
        </div>
      </section>
    </div>
  );
}
