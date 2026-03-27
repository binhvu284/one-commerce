'use client';

import { useState } from 'react';
import { 
  Plus, 
  Cpu, 
  Settings, 
  RefreshCcw, 
  ExternalLink, 
  ShieldCheck, 
  Zap,
  MoreVertical,
  Signal,
  SignalHigh,
  SignalLow,
  Hash,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

interface McpServer {
  id: string;
  name: string;
  type: 'notion' | 'slack' | 'elevenlabs' | 'other';
  status: 'online' | 'offline' | 'checking';
  baseUrl: string;
  lastSync: string;
}

const mockServers: McpServer[] = [
  { id: '1', name: 'Notion Database Connector', type: 'notion', status: 'online', baseUrl: 'https://api.notion.com/v1', lastSync: '10 min ago' },
  { id: '2', name: 'Slack Notification Bridge', type: 'slack', status: 'online', baseUrl: 'https://slack.com/api', lastSync: '2 hours ago' },
  { id: '3', name: 'Voice Generation UI', type: 'elevenlabs', status: 'offline', baseUrl: 'https://api.elevenlabs.io', lastSync: 'Yesterday' },
];

const AppLogo = ({ type }: { type: McpServer['type'] }) => {
  const commonClasses = "w-12 h-12 rounded-[1.25rem] flex items-center justify-center font-black text-white shadow-lg overflow-hidden shrink-0 transition-transform active:scale-95 duration-300 border border-white/10";
  
  switch (type) {
    case 'notion':
      return (
        <div className={cn(commonClasses, "bg-black")}>
          <span className="text-xl">N</span>
        </div>
      );
    case 'slack':
      return (
        <div className={cn(commonClasses, "bg-[#4A154B]")}>
          <Hash className="w-5 h-5 px-0.5" />
        </div>
      );
    case 'elevenlabs':
      return (
        <div className={cn(commonClasses, "bg-slate-900 overflow-hidden relative")}>
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-blue-500 blur-xl opacity-30" />
          <div className="w-6 h-6 bg-indigo-500 rounded-full blur-[3px] opacity-70" />
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-inner" />
        </div>
      );
    default:
      return (
        <div className={cn(commonClasses, "bg-blue-600")}>
          <Cpu className="w-6 h-6" />
        </div>
      );
  }
};

export default function McpPage() {
  const [servers, setServers] = useState<McpServer[]>(mockServers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkingId, setCheckingId] = useState<string | null>(null);

  const checkStatus = (id: string) => {
    setCheckingId(id);
    setServers(prev => prev.map(s => s.id === id ? { ...s, status: 'checking' } : s));
    
    // Simulate API call
    setTimeout(() => {
      setServers(prev => prev.map(s => s.id === id ? { ...s, status: Math.random() > 0.2 ? 'online' : 'offline', lastSync: 'Just now' } : s));
      setCheckingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Infrastructure Hub</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">MCP Servers</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-medium leading-relaxed">
            Manage your AI Model Context Protocol servers and third-party API connections securely.
          </p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-xl shadow-blue-500/20 py-6 sm:py-5 rounded-2xl sm:rounded-xl">
          <Plus className="w-4 h-4" />
          Connect Server
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {servers.map((server, idx) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col shadow-token-sm active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-8">
              <AppLogo type={server.type} />
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => checkStatus(server.id)}
                  className={cn(
                    "p-3 hover:bg-[var(--bg-muted)] rounded-2xl text-[var(--text-muted)] hover:text-blue-500 transition-all border border-transparent hover:border-[var(--border)]",
                    checkingId === server.id && "animate-spin text-blue-600 border-blue-500/20"
                  )}
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
                <button className="p-3 hover:bg-[var(--bg-muted)] rounded-2xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all border border-transparent hover:border-[var(--border)]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[22px] font-black text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-blue-600 transition-colors leading-tight">{server.name}</h3>
              <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.15em] break-all">{server.baseUrl}</p>
            </div>

            <div className="mt-auto pt-7 border-t border-[var(--border)] flex items-center justify-between">
               <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "w-3 h-3 rounded-full shadow-inner",
                    server.status === 'online' ? "bg-emerald-500 ring-4 ring-emerald-500/10" : 
                    server.status === 'checking' ? "bg-blue-500 animate-pulse ring-4 ring-blue-500/10" : "bg-red-500 ring-4 ring-red-500/10"
                  )} />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] leading-none",
                    server.status === 'online' ? "text-emerald-500" : 
                    server.status === 'checking' ? "text-blue-500" : "text-red-500"
                  )}>
                    {server.status}
                  </span>
               </div>
               <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest bg-[var(--bg-muted)] px-3 py-1 rounded-full">Sync: {server.lastSync}</span>
            </div>

            {/* Hover overlay functionality */}
            <div className="absolute top-8 right-20">
               <Badge variant={server.status === 'online' ? 'success' : 'neutral'} className="bg-transparent border-[var(--border)] text-[8px] font-black uppercase ring-0 shadow-sm opacity-50">PRO</Badge>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <button className="border-2 border-dashed border-[var(--border)] rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-5 group hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all text-center min-h-[260px] bg-white/5 shadow-sm hover:shadow-xl duration-500 active:scale-[0.98]">
           <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:rotate-90 transition-all duration-700 shadow-sm">
              <Plus className="w-8 h-8" />
           </div>
           <div>
              <p className="text-base font-black text-[var(--text-primary)] uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors leading-none">Connect Server</p>
              <p className="text-xs text-[var(--text-muted)] font-bold mt-2">Provision Hubs & Services</p>
           </div>
        </button>
      </div>

      {/* Connection Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 text-white space-y-6 shadow-2xl shadow-blue-500/30 relative overflow-hidden group border border-white/10 active:scale-[0.99] transition-transform">
           <Zap className="absolute -right-16 -bottom-16 w-64 h-64 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
           <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
              <Zap className="w-7 h-7 text-white" />
           </div>
           <div className="space-y-4 relative z-10">
              <h3 className="text-3xl font-black tracking-tight leading-tight">Lightning Connector</h3>
              <p className="text-sm text-blue-100/80 font-medium leading-relaxed max-w-lg">
                High-performance protocol ensuring sub-50ms latency between core and AI clusters. Enterprise-grade encryption at rest.
              </p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] hover:gap-4 transition-all pt-4 text-white hover:text-blue-200">
                Protocol Specs <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div className="p-10 rounded-[3.5rem] bg-[var(--bg-surface)] border border-[var(--border)] space-y-10 shadow-token-sm">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center shadow-inner border border-emerald-500/10">
                 <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight leading-none text-left">Global Shield</h3>
                 <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.25em] mt-1 text-left">Security & Metrics</p>
              </div>
           </div>
           
           <div className="space-y-6">
              {[
                { label: 'Key Encryption', status: 'Active', icon: SignalHigh, color: 'text-emerald-500' },
                { label: 'Network Isolation', status: 'Active', icon: SignalHigh, color: 'text-emerald-500' },
                { label: 'Audit Logging', status: 'Ready', icon: SignalLow, color: 'text-blue-500' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-[var(--border)] last:border-0">
                   <div className="flex items-center gap-3">
                      <stat.icon className="w-5 h-5 text-[var(--text-muted)]" />
                      <span className="text-base font-bold text-[var(--text-secondary)]">{stat.label}</span>
                   </div>
                   <span className={cn("text-[10px] font-black uppercase tracking-widest", stat.color)}>{stat.status}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
