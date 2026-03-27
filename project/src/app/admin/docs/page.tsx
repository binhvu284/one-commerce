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
  { id: 'api', title: 'API Gateway', icon: Code, desc: 'REST endpoints, JWT authentication & Scopes.' },
  { id: 'mcp', title: 'MCP Hub', icon: Cpu, desc: 'Connect to external AI servers & Notion/Slack.' },
  { id: 'database', title: 'Data Stack', icon: Database, desc: 'Supabase schema, RLS policies & SQL procedures.' },
  { id: 'nodes', title: 'Cloud Nodes', icon: Layers, desc: 'Next.js edge, Vercel infrastructure & Secrets.' },
];

export default function AdminDocsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 px-4 sm:px-0">
      {/* Header */}
      <header className="space-y-8 pt-12 border-b border-[var(--border)] pb-16">
        <div className="flex items-center gap-3 text-indigo-500">
           <Terminal className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-[0.25em] leading-none">Engineering Repository</span>
        </div>
        <div className="max-w-3xl space-y-5 text-left">
          <h1 className="text-5xl sm:text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9]">System <br className="sm:hidden" /><span className="text-indigo-600 dark:text-indigo-400">Core</span> Guides</h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium leading-relaxed italic max-w-2xl opacity-80">
            Technical specifications for OneCommerce high-level management.
          </p>
        </div>

        <div className="relative max-w-xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search specs (Auth, RLS, MCP...)" 
            className="w-full pl-15 pr-6 py-6 bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-[2rem] text-sm outline-none focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all font-mono placeholder:text-[var(--text-muted)] shadow-sm group-hover:border-indigo-500/20"
          />
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techSections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[3.5rem] hover:bg-[var(--bg-muted)]/50 transition-all group flex flex-col sm:flex-row gap-8 items-center sm:items-start shadow-token-sm hover:shadow-2xl hover:shadow-indigo-500/5 duration-500 active:scale-[0.98]"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl shadow-indigo-500/10 border border-indigo-500/10">
              <section.icon className="w-9 h-9" />
            </div>
            <div className="flex-1 space-y-4 text-center sm:text-left">
               <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight group-hover:text-indigo-600 transition-colors uppercase text-[16px] leading-tight">{section.title}</h3>
               <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed max-w-xs mx-auto sm:mx-0">{section.desc}</p>
               <button className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-black uppercase text-indigo-600 tracking-[0.2em] pt-2 group-hover:gap-4 transition-all w-full sm:w-auto">
                  Execute Docs <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 p-12 sm:p-16 rounded-[4rem] bg-indigo-600 text-white space-y-10 shadow-2xl shadow-indigo-500/30 group overflow-hidden relative border border-white/10 active:scale-[0.99] transition-transform">
           <Zap className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-[2000ms]" />
           <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl">
              <Info className="w-8 h-8" />
           </div>
           <div className="space-y-6 max-w-xl relative z-10 text-left">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[0.95]">Security first <br />Architecture</h2>
              <p className="text-base sm:text-lg text-indigo-50/80 font-medium leading-relaxed">
                Asymmetric JWT clusters for multi-tenant data integrity. Row-Level Security (RLS) policies enforced at the edge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                 <button className="px-10 py-5 bg-white text-indigo-700 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">Auth Specs</button>
                 <button className="px-10 py-5 bg-indigo-700 text-white border-2 border-white/20 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-800 transition-all w-full sm:w-auto">System Map</button>
              </div>
           </div>
        </div>

        <div className="p-12 rounded-[4rem] bg-[var(--bg-surface)] border border-[var(--border)] space-y-12 shadow-token-sm">
           <h3 className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-[0.4em] mb-4 text-left">Resources</h3>
           <div className="space-y-6">
              {[
                { label: 'Cloud Console', icon: ExternalLink, color: 'text-emerald-500' },
                { id: 'schema', label: 'Schema Map', icon: Database, color: 'text-blue-500' },
                { id: 'policy', label: 'Policy v2.1', icon: Shield, color: 'text-indigo-500' },
              ].map((res, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-[var(--bg-muted)] rounded-[2rem] transition-all group border border-transparent hover:border-[var(--border)] shadow-sm hover:shadow-lg active:scale-95">
                   <div className="flex items-center gap-5">
                      <div className={cn("w-12 h-12 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center shadow-inner group-hover:bg-white transition-colors border border-transparent group-hover:border-[var(--border)]")}>
                        <res.icon className={cn("w-6 h-6", res.color)} />
                      </div>
                      <span className="text-base font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors tracking-tight">{res.label}</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all" />
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
