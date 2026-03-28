'use client';

import { UserList } from '@/components/admin/UserList';
import { Button } from '@/components/ui/Button';
import { User, Shield, Key } from 'lucide-react';

export default function AdminProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Admin Cover Header */}
      <div className="relative">
         <div className="h-48 rounded-[2.5rem] bg-indigo-950 shadow-xl overflow-hidden border border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-blue-500/10" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
         </div>
         
         <div className="px-8 -mt-12 flex flex-col md:flex-row md:items-end gap-6 relative z-10">
            <div className="w-32 h-32 rounded-[2.5rem] bg-[#0f172a] p-2 shadow-2xl ring-4 ring-indigo-500/30">
               <div className="w-full h-full rounded-[2.2rem] bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-inner">
                  AD
               </div>
            </div>
            
            <div className="flex-1 pb-2">
               <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-white tracking-tight">System Administrator</h1>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-500/20">
                     Super Admin
                  </span>
               </div>
               <p className="text-slate-400 font-medium">Root Access • Global Operations</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
         <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">System Logs & Activity</h3>
            <div className="space-y-3">
               {[
                  { label: 'Last Login', value: '2 minutes ago', status: 'Ho Chi Minh' },
                  { label: 'Privileges', value: 'Full Server Access', status: 'Level 10' },
               ].map((item) => (
                  <div key={item.label} className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-500">
                           <Shield className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-tight text-slate-500">{item.label}</p>
                           <p className="text-sm font-bold text-slate-200">{item.value}</p>
                        </div>
                     </div>
                     <span className="text-[8px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">{item.status}</span>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Security Actions</h3>
            <div className="p-6 rounded-[2.5rem] bg-indigo-600 space-y-4 shadow-xl shadow-indigo-500/10">
               <div className="p-3 bg-white/10 rounded-2xl w-fit">
                  <Key className="w-6 h-6 text-white" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-lg font-black text-white leading-tight">Master Database Key</h4>
                  <p className="text-xs text-indigo-100/60 font-medium leading-relaxed">Rotation required every 30 days for compliance.</p>
               </div>
               <Button className="w-full rounded-2xl h-12 bg-white text-indigo-600 font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                  Rotate Security Keys
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
