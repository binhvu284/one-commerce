'use client';

import { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  History,
  CreditCard,
  Building2,
  ChevronRight,
  Plus,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { useBusinessRole } from '@/components/providers/RoleProvider';

const MOCK_LOGS = [
  { id: '1', type: 'commission', amount: 15.00, from: 'F1: Nguyen Van A', date: '2024-03-28 14:30', status: 'success' },
  { id: '2', type: 'commission', amount: 7.50, from: 'F2: Tran Thi B', date: '2024-03-27 10:15', status: 'success' },
  { id: '3', type: 'withdrawal', amount: -50.00, to: 'TPBank - 0123xxx', date: '2024-03-26 09:00', status: 'pending' },
  { id: '4', type: 'commission', amount: 25.00, from: 'F1: Le Van C', date: '2024-03-25 18:45', status: 'success' },
];

export default function WalletPage() {
  const { role, isStaff } = useBusinessRole();
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'withdrawal'>('all');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-[0.2em] text-[10px]">
            <Wallet className="w-3.5 h-3.5" />
            Financial Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Wallet</h1>
          <p className="text-slate-500 font-medium">Manage your credits, commissions, and withdrawals.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl border-slate-200 dark:border-white/10 h-12 px-6 font-bold group">
            <History className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform" />
            Full History
          </Button>
          <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 h-12 px-8 font-black shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4 mr-2" />
            Withdraw Now
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance */}
        <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-indigo-600 dark:bg-indigo-500 relative overflow-hidden shadow-2xl shadow-indigo-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-indigo-100 font-bold uppercase tracking-widest text-xs">Available Balance</span>
              <div className="p-2 bg-white/20 rounded-xl">
                 <Zap className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-black text-white">$1,248.50</h2>
              <div className="flex items-center gap-2 text-indigo-100/80 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex-1">
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Total Earned</p>
                <p className="text-white font-black text-lg">$4,820.00</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex-1">
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Total Withdrawn</p>
                <p className="text-white font-black text-lg">$3,571.50</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-black text-xl tracking-tight">Withdrawal Hub</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Fast and secure payments to your local bank account.</p>
          </div>
          
          <div className="space-y-3">
             <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/50 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Building2 className="w-5 h-5" />
                   </div>
                   <div className="text-left">
                      <p className="text-[11px] font-black uppercase tracking-tight">Linked Bank</p>
                      <p className="text-xs font-bold text-slate-500 group-hover:text-blue-500 transition-colors">TPBank •••• 0123</p>
                   </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
             </div>
             
             <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-blue-500/50 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <CreditCard className="w-5 h-5" />
                   </div>
                   <div className="text-left">
                      <p className="text-[11px] font-black uppercase tracking-tight">Withdrawal Fee</p>
                      <p className="text-xs font-bold text-slate-500 group-hover:text-purple-500 transition-colors">Fixed $1.50 per trans</p>
                   </div>
                </div>
             </div>
          </div>

          <Button className="w-full rounded-2xl h-14 bg-slate-900 dark:bg-white dark:text-black font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-95 transition-all">
            Settings
          </Button>
        </div>
      </div>

      {/* Transaction Records */}
      <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-6">
              {(['all', 'income', 'withdrawal'] as const).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative py-1 text-sm font-black uppercase tracking-[0.1em] transition-colors",
                    activeTab === tab ? "text-blue-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  )}
                >
                   {tab}
                   {activeTab === tab && (
                     <motion.div layoutId="tab-underline" className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full" />
                   )}
                </button>
              ))}
           </div>
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all cursor-pointer">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500">Last 30 Days</span>
           </div>
        </div>

        <div className="space-y-2">
            {MOCK_LOGS.filter(log => activeTab === 'all' || (activeTab === 'income' && log.type === 'commission') || (activeTab === 'withdrawal' && log.type === 'withdrawal')).map((log) => (
               <div key={log.id} className="group p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.02] flex items-center justify-between transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                  <div className="flex items-center gap-4">
                     <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        log.type === 'commission' ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                     )}>
                        {log.type === 'commission' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                     </div>
                     <div>
                        <p className="font-extrabold text-slate-800 dark:text-slate-200">{log.type === 'commission' ? log.from : 'Withdrawal Request'}</p>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{log.date}</p>
                     </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                     <div className="hidden sm:block">
                        {log.status === 'success' ? (
                           <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-tighter">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Success
                           </div>
                        ) : (
                           <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-tighter">
                              <Clock className="w-3.5 h-3.5" />
                              Pending
                           </div>
                        )}
                     </div>
                     <p className={cn(
                        "text-lg font-black tracking-tight",
                        log.amount < 0 ? "text-slate-900 dark:text-white" : "text-emerald-500"
                     )}>
                        {log.amount < 0 ? `- $${Math.abs(log.amount)}` : `+ $${log.amount}`}
                     </p>
                  </div>
               </div>
            ))}
        </div>
        
        {MOCK_LOGS.length === 0 && (
           <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
                 <History className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-bold">No transactions found in this period.</p>
           </div>
        )}
      </div>
    </div>
  );
}
