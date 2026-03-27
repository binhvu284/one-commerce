'use client';

import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  MoreVertical, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockWorkspaces } from '@/lib/mock/business';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WorkspacesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 mb-1">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Units</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Workspaces</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Create and manage collaborative spaces for different teams, projects or branches of your organization.
          </p>
        </div>
        
        <Button variant="primary" className="gap-2 shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" />
          Create Workspace
        </Button>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search workspaces..." 
            className="w-full pl-10 pr-4 py-2 bg-[var(--bg-muted)]/50 border border-[var(--border)] rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 bg-[var(--bg-muted)]/50 rounded-lg text-indigo-500 border border-indigo-500/20"><LayoutGrid className="w-4 h-4" /></button>
           <button className="p-2 hover:bg-[var(--bg-muted)] rounded-lg text-[var(--text-secondary)]"><List className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWorkspaces.map((ws, idx) => (
          <motion.div
            key={ws.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-6 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <button className="p-2 hover:bg-[var(--bg-muted)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 tracking-tight">{ws.name}</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2">{ws.description}</p>

            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between py-3 border-t border-dashed border-[var(--border)]">
                 <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5 pt-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-[var(--bg-surface)]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">+8 Members</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-emerald-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">12 Tasks</span>
                 </div>
              </div>

              <Link href={`/business/workspaces/${ws.id}`} className="block">
                <Button variant="outline" className="w-full justify-between group/btn py-5 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all">
                  <span className="font-black text-xs uppercase tracking-widest">Open Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="absolute top-6 right-16">
               <Badge variant="purple" size="sm" className="font-black text-[8px] uppercase ring-0">Active</Badge>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <button className="border-2 border-dashed border-[var(--border)] rounded-3xl p-6 flex flex-col items-center justify-center gap-4 group hover:border-indigo-500/50 hover:bg-indigo-50/10 transition-all min-h-[300px]">
           <div className="w-12 h-12 rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Plus className="w-6 h-6" />
           </div>
           <div className="text-center">
              <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">New Workspace</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1">Scale your organization further</p>
           </div>
        </button>
      </div>
    </div>
  );
}
