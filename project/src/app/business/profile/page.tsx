'use client';

import { User, Mail, Shield, Building, Globe, MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useBusinessRole } from '@/components/providers/RoleProvider';

export default function ProfilePage() {
  const { role } = useBusinessRole();
  const isAdmin = true; // For business profile

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Cover/Avatar Header */}
      <div className="relative">
         <div className="h-48 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
         </div>
         
         <div className="px-8 -mt-12 flex flex-col md:flex-row md:items-end gap-6 relative z-10">
            <div className="relative group">
               <div className="w-32 h-32 rounded-[2.5rem] bg-[var(--bg-surface)] p-2 shadow-2xl ring-4 ring-[#0f172a]">
                  <div className="w-full h-full rounded-[2rem] bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-black">
                     LE
                  </div>
               </div>
               <button className="absolute bottom-2 right-2 p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-lg border border-slate-200 dark:border-white/10 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100">
                  <Camera className="w-4 h-4" />
               </button>
            </div>
            
            <div className="flex-1 pb-2">
               <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black tracking-tight">Le Binh</h1>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full ring-1 ring-blue-500/30">
                     {role}
                  </span>
               </div>
               <p className="text-slate-500 font-medium">Head of E-commerce operations • OneCommerce Org</p>
            </div>
            
            <div className="pb-2">
               <Button className="rounded-2xl h-12 px-6 bg-slate-900 dark:bg-white dark:text-black font-black uppercase tracking-widest text-[11px] shadow-xl hover:-translate-y-1 transition-all">
                  Edit Profile
               </Button>
            </div>
         </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
         <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Personal Information</h3>
            <div className="space-y-4">
               {[
                  { icon: Mail, label: 'Email', value: 'binh.le@onecommerce.vn' },
                  { icon: Globe, label: 'Timezone', value: '(GMT+07:00) Bangkok, Hanoi, Jakarta' },
                  { icon: MapPin, label: 'Location', value: 'Ho Chi Minh City, Vietnam' },
               ].map((item) => (
                  <div key={item.label} className="p-5 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                        <item.icon className="w-4.5 h-4.5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-tight text-slate-400">{item.label}</p>
                        <p className="text-sm font-bold">{item.value}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Organization & Security</h3>
            <div className="space-y-4">
               {[
                  { icon: Building, label: 'Organization', value: 'OneCommerce Global' },
                  { icon: Shield, label: 'Access Level', value: 'Full Control (Administrator)' },
               ].map((item) => (
                  <div key={item.label} className="p-5 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                        <item.icon className="w-4.5 h-4.5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-tight text-slate-400">{item.label}</p>
                        <p className="text-sm font-bold">{item.value}</p>
                     </div>
                  </div>
               ))}
               <div className="p-5 rounded-3xl bg-slate-900 text-white flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                        <User className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-tight opacity-60">Identity Status</p>
                        <p className="text-sm font-bold">Verified Professional</p>
                     </div>
                  </div>
                  <Shield className="w-5 h-5 text-blue-400" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
