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

const techSections = [
  { id: 'api', title: 'API Reference', icon: Code, desc: 'REST API endpoints, Token authentication & Scopes.' },
  { id: 'mcp', title: 'MCP Protocol', icon: Cpu, desc: 'Configuring Model Context Protocol servers & connectors.' },
  { id: 'database', title: 'DB Architecture', icon: Database, desc: 'Supabase schema, RLS policies & Backup procedures.' },
  { id: 'infrastructure', title: 'Infrastructure', icon: Layers, desc: 'Next.js deployment, Vercel edge & Environment variables.' },
];

export default function AdminDocsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <header className="space-y-6 pt-10 border-b border-white/5 pb-12">
        <div className="flex items-center gap-3 text-indigo-400">
           <Terminal className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">Engineering Documentation</span>
        </div>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tight">System Core Guides</h1>
          <p className="text-base text-slate-500 font-medium leading-relaxed italic">
            "Design is not just what it looks like and feels like. Design is how it works." — Essential technical resources for OneCommerce high-level management.
          </p>
        </div>

        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
          <input 
            type="text" 
            placeholder="Search tech specs..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
          />
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techSections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] hover:bg-slate-800/50 transition-all group flex gap-6 items-start"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <section.icon className="w-7 h-7" />
            </div>
            <div className="flex-1 space-y-2">
               <h3 className="text-xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{section.title}</h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">{section.desc}</p>
               <button className="flex items-center gap-2 text-[10px] font-black uppercase text-indigo-500 tracking-widest pt-2 group-hover:gap-3 transition-all">
                  Read Guides <ChevronRight className="w-3.5 h-3.5" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-indigo-500 text-white space-y-6 shadow-2xl shadow-indigo-500/10 group overflow-hidden relative">
           <Zap className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
           <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Info className="w-6 h-6" />
           </div>
           <div className="space-y-4 max-w-lg relative z-10">
              <h2 className="text-3xl font-black tracking-tight leading-none">Security First Architecture</h2>
              <p className="text-sm text-indigo-100 font-medium leading-relaxed">
                OneCommerce enforces a strict Row-Level Security (RLS) model on Supabase. Every API Access Token uses asymmetric JWT signing to ensure data integrity across multiple tenants.
              </p>
              <div className="flex gap-4 pt-2">
                 <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Auth Docs</button>
                 <button className="px-6 py-3 bg-indigo-600 text-white border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest">Security Specs</button>
              </div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 space-y-8">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Resources</h3>
           <div className="space-y-4">
              {[
                { label: 'Supabase Dashboard', icon: ExternalLink },
                { id: 'schema', label: 'Database Schema Map', icon: Database },
                { id: 'tokens', label: 'Token Policy v2.1', icon: Shield },
              ].map((res, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-all group">
                   <div className="flex items-center gap-3">
                      <res.icon className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-bold text-slate-300">{res.label}</span>
                   </div>
                   <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-white transition-all" />
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
