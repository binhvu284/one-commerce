'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  MoreVertical, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Briefcase,
  Share2,
  Lock,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockWorkspaces } from '@/lib/mock/business';
import { cn } from '@/lib/cn';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useBusinessRole } from '@/components/providers/RoleProvider';

type TabType = 'mine' | 'shared';

export default function WorkspacesPage() {
  const { role, isAdmin, isOwner, isStaff } = useBusinessRole();
  const [activeTab, setActiveTab] = useState<TabType>('mine');
  
  // Mock filter logic
  const myWorkspaces = mockWorkspaces.filter((_, idx) => idx % 2 === 0);
  const sharedWorkspaces = mockWorkspaces.filter((_, idx) => idx % 2 !== 0);
  
  const currentWorkspaces = activeTab === 'mine' ? myWorkspaces : sharedWorkspaces;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Units</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Workspaces</h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl font-medium">
            Manage your collaborative spaces for different teams, projects or branches of your organization.
          </p>
        </div>
        
        {!isStaff && (
          <Button variant="primary" className="h-12 px-8 rounded-2xl gap-2 shadow-xl shadow-blue-500/20 font-black text-xs uppercase tracking-widest">
            <Plus className="w-4 h-4" />
            Create Workspace
          </Button>
        )}
      </header>

      {/* Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('mine')}
              className={cn(
                "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === 'mine' 
                  ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Created by Me
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={cn(
                "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === 'shared' 
                  ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Share2 className="w-3.5 h-3.5" />
              Shared with Me
            </button>
          </div>

          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search workspaces..." 
              className="w-full h-12 pl-12 pr-4 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500/30 rounded-2xl text-xs font-bold outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentWorkspaces.map((ws, idx) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Header Info */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2">
                   <Badge variant="neutral" className="bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-black text-[8px] uppercase tracking-widest border-transparent">
                      {activeTab === 'mine' ? 'Owner' : 'Member'}
                   </Badge>
                   <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-blue-500 transition-colors">{ws.name}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8 line-clamp-2">{ws.description}</p>
              </div>

              {/* Footer Stats */}
              <div className="mt-auto space-y-6">
                <div className="flex items-center justify-between py-4 border-t border-dashed border-slate-100 dark:border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-900 overflow-hidden shadow-sm">
                             <img src={`https://i.pravatar.cc/100?u=u${ws.id}${i}`} className="w-full h-full object-cover" alt="member" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+12 members</span>
                   </div>
                   <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest">12 Tasks</span>
                   </div>
                </div>

                <Link href={`/business/workspaces/${ws.id}`} className="block">
                  <Button variant="outline" className="w-full justify-between group/btn h-12 rounded-2xl border-slate-100 dark:border-white/5 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all">
                    <span className="font-black text-xs uppercase tracking-widest">Launch Project</span>
                    <div className="w-6 h-6 rounded-lg bg-slate-50 dark:bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
              
              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all" />
            </motion.div>
          ))}

          {/* Create New Card (Only for non-staff) */}
          {!isStaff && activeTab === 'mine' && (
            <button className="border-4 border-dashed border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 group hover:border-blue-500/50 hover:bg-blue-500/[0.02] transition-all min-h-[420px]">
               <div className="w-16 h-16 rounded-3xl border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all">
                  <Plus className="w-8 h-8" />
               </div>
               <div className="text-center">
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">New Workspace</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium max-w-[180px]">Expand your organization and scale new products.</p>
               </div>
            </button>
          )}

          {activeTab === 'shared' && currentWorkspaces.length === 0 && (
            <div className="col-span-full py-20 text-center">
               <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="w-10 h-10 text-slate-300" />
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">No shared workspaces</h3>
               <p className="text-sm text-slate-500 mt-2">When someone invites you to their space, it will appear here.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
