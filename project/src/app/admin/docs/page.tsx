'use client';

import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Code, 
  Shield, 
  Cpu, 
  Database,
  Terminal,
  ExternalLink,
  Info,
  Layers,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const techSections = [
  { id: 'api', title: 'API Reference', icon: Code, desc: 'REST API endpoints, Token authentication & Scopes.' },
  { id: 'mcp', title: 'MCP Protocol', icon: Cpu, desc: 'Configuring Model Context Protocol servers & connectors.' },
  { id: 'database', title: 'DB Architecture', icon: Database, desc: 'Supabase schema, RLS policies & Backup procedures.' },
  { id: 'infrastructure', title: 'Infrastructure', icon: Layers, desc: 'Next.js deployment, Vercel edge & Environment variables.' },
];

export default function AdminDocsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4 sm:px-0">
      {/* Header */}
      <header className="space-y-6 pt-10 border-b border-[var(--border)] pb-12">
        <div className="flex items-center gap-3 text-indigo-500">
           <Terminal className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">Engineering Documentation</span>
        </div>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-black text-[var(--text-primary)] tracking-tight">System Core Guides</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed italic">
            "Design is not just what it looks like and feels like. Design is how it works." — Essential technical resources for OneCommerce high-level management.
          </p>
        </div>

        <div className="relative max-w-xl group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search tech specs..." 
            className="w-full pl-13 pr-6 py-5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[1.5rem] text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-mono placeholder:text-[var(--text-muted)] shadow-sm"
          />
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {techSections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[3rem] hover:bg-[var(--bg-muted)]/50 transition-all group flex gap-8 items-start shadow-token-sm hover:shadow-xl hover:shadow-indigo-500/5 duration-500"
          >
            <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-indigo-500/10">
              <section.icon className="w-8 h-8" />
            </div>
            <div className="flex-1 space-y-3">
               <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight group-hover:text-indigo-600 transition-colors uppercase text-[15px]">{section.title}</h3>
               <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{section.desc}</p>
               <button className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-600 tracking-widest pt-2 group-hover:gap-3 transition-all">
                  Access Specs <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-12 rounded-[3.5rem] bg-indigo-600 text-white space-y-8 shadow-2xl shadow-indigo-500/20 group overflow-hidden relative border border-white/10 dark:border-none">
           <Zap className="absolute -bottom-10 -right-10 w-72 h-72 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
           <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
              <Info className="w-7 h-7" />
           </div>
           <div className="space-y-5 max-w-xl relative z-10">
              <h2 className="text-4xl font-black tracking-tight leading-tight">Security First Architecture</h2>
              <p className="text-base text-indigo-50/80 font-medium leading-relaxed">
                OneCommerce enforces a strict Row-Level Security (RLS) model on Supabase. Every API Access Token uses asymmetric JWT signing to ensure data integrity across multiple tenants.
              </p>
              <div className="flex gap-4 pt-4">
                 <button className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Auth Docs</button>
                 <button className="px-8 py-4 bg-indigo-700 text-white border border-white/20 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-800 transition-all">Security Specs</button>
              </div>
           </div>
        </div>

        <div className="p-10 rounded-[3.5rem] bg-[var(--bg-surface)] border border-[var(--border)] space-y-10 shadow-token-sm">
           <h3 className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mb-4">Core Resources</h3>
           <div className="space-y-5">
              {[
                { label: 'Supabase Dashboard', icon: ExternalLink, color: 'text-emerald-500' },
                { id: 'schema', label: 'Database Schema Map', icon: Database, color: 'text-blue-500' },
                { id: 'tokens', label: 'Token Policy v2.1', icon: Shield, color: 'text-indigo-500' },
              ].map((res, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-muted)] rounded-[1.5rem] transition-all group border border-transparent hover:border-[var(--border)] shadow-sm hover:shadow-md">
                   <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-xl bg-[var(--bg-muted)] flex items-center justify-center shadow-inner group-hover:bg-white transition-colors")}>
                        <res.icon className={cn("w-5 h-5", res.color)} />
                      </div>
                      <span className="text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{res.label}</span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all" />
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
