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
  Hash
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
  const commonClasses = "w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white shadow-lg overflow-hidden shrink-0 transition-transform hover:scale-105 duration-300";
  
  switch (type) {
    case 'notion':
      return (
        <div className={cn(commonClasses, "bg-slate-900 border border-white/20")}>
          <span className="text-xl">N</span>
        </div>
      );
    case 'slack':
      return (
        <div className={cn(commonClasses, "bg-[#4A154B]")}>
          <Hash className="w-5 h-5" />
        </div>
      );
    case 'elevenlabs':
      return (
        <div className={cn(commonClasses, "bg-slate-900 border border-white/10 relative")}>
          <div className="absolute inset-0 bg-blue-500/20 blur-xl scale-75" />
          <div className="w-6 h-6 bg-indigo-500 rounded-full blur-[2px] opacity-70" />
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-inner" />
        </div>
      );
    default:
      return (
        <div className={cn(commonClasses, "bg-blue-600")}>
          <Cpu className="w-5 h-5" />
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
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">External Connections</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">MCP Servers</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-medium">
            Manage your external Model Context Protocol (MCP) servers and third-party app connections in one secure hub.
          </p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Add MCP Server
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server, idx) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] p-7 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col shadow-token-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <AppLogo type={server.type} />
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => checkStatus(server.id)}
                  className={cn(
                    "p-2.5 hover:bg-[var(--bg-muted)] rounded-xl text-[var(--text-muted)] hover:text-blue-500 transition-all",
                    checkingId === server.id && "animate-spin text-blue-500"
                  )}
                >
                  <RefreshCcw className="w-4.5 h-4.5" />
                </button>
                <button className="p-2.5 hover:bg-[var(--bg-muted)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
                  <MoreVertical className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight mb-1 group-hover:text-blue-600 transition-colors">{server.name}</h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">{server.baseUrl}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-[var(--border)] flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full ring-4 ring-offset-2 ring-transparent transition-all",
                    server.status === 'online' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" : 
                    server.status === 'checking' ? "bg-blue-500 animate-pulse" : "bg-red-500"
                  )} />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.15em]",
                    server.status === 'online' ? "text-emerald-500" : 
                    server.status === 'checking' ? "text-blue-500" : "text-red-500"
                  )}>
                    {server.status}
                  </span>
               </div>
               <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Sync: {server.lastSync}</span>
            </div>

            {/* Hover overlay functionality */}
            <div className="absolute top-7 right-16">
               <Badge variant={server.status === 'online' ? 'success' : 'neutral'} className="bg-transparent border-[var(--border)] text-[8px] font-black uppercase ring-0 shadow-sm">PRO</Badge>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <button className="border-2 border-dashed border-[var(--border)] rounded-[2.5rem] p-7 flex flex-col items-center justify-center gap-4 group hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all text-center min-h-[220px] bg-white/5 shadow-sm hover:shadow-lg duration-500">
           <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:rotate-90 transition-all duration-500">
              <Plus className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest group-hover:text-blue-600 transition-colors">Connect Server</p>
              <p className="text-[10px] text-[var(--text-secondary)] font-medium">Add Notion, Slack & AI Hubs</p>
           </div>
        </button>
      </div>

      {/* Connection Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 text-white space-y-5 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
           <Zap className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
           <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Zap className="w-6 h-6 text-white" />
           </div>
           <div className="space-y-4 relative z-10">
              <h3 className="text-2xl font-black tracking-tight leading-tight">Lightning-fast Connector</h3>
              <p className="text-sm text-blue-100/80 font-medium leading-relaxed max-w-md">
                Our MCP implementation ensures sub-50ms latency between OneCommerce core and your external AI servers. All keys are encrypted at rest using AES-256 GCM.
              </p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all pt-2 text-white/90 hover:text-white">
                Read Protocol Specs <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--border)] space-y-8 shadow-token-sm">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                 <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                 <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight leading-none">Global Governance</h3>
                 <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">Audit & Metrics</p>
              </div>
           </div>
           
           <div className="space-y-5">
              {[
                { label: 'Key Encryption', status: 'Active', icon: SignalHigh, color: 'text-emerald-500' },
                { label: 'Network Isolation', status: 'Active', icon: SignalHigh, color: 'text-emerald-500' },
                { label: 'Audit Logging', status: 'Ready', icon: SignalLow, color: 'text-blue-500' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-[var(--border)] last:border-0 grow">
                   <div className="flex items-center gap-2.5">
                      <stat.icon className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-sm font-bold text-[var(--text-secondary)]">{stat.label}</span>
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
