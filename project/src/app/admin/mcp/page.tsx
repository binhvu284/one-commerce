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
  { id: '3', name: 'Voice Generation UI', type: 'elevenlabs', status: 'offline', baseUrl: 'https://api.elevenlabs.io', lastSync: '昨天' },
];

const AppLogo = ({ type }: { type: McpServer['type'] }) => {
  const commonClasses = "w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg overflow-hidden shrink-0";
  
  switch (type) {
    case 'notion':
      return (
        <div className={cn(commonClasses, "bg-black text-white")}>
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
        <div className={cn(commonClasses, "bg-slate-900 border border-white/10")}>
          <div className="w-6 h-6 bg-indigo-500 rounded-full blur-[2px] opacity-50" />
          <div className="absolute w-4 h-4 bg-blue-400 rounded-full" />
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
          <h1 className="text-3xl font-black text-white tracking-tight leading-none">MCP Servers</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
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
            className="group relative bg-slate-900 border border-white/5 rounded-3xl p-6 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <AppLogo type={server.type} />
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => checkStatus(server.id)}
                  className={cn(
                    "p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-blue-400 transition-all",
                    checkingId === server.id && "animate-spin text-blue-500"
                  )}
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-blue-400 transition-colors">{server.name}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{server.baseUrl}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    server.status === 'online' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : 
                    server.status === 'checking' ? "bg-blue-500 animate-pulse" : "bg-red-500"
                  )} />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    server.status === 'online' ? "text-emerald-500" : 
                    server.status === 'checking' ? "text-blue-500" : "text-red-500"
                  )}>
                    {server.status}
                  </span>
               </div>
               <span className="text-[9px] font-bold text-slate-500 uppercase">Last Sync: {server.lastSync}</span>
            </div>

            {/* Hover overlay functionality */}
            <div className="absolute top-6 right-16">
               <Badge variant={server.status === 'online' ? 'success' : 'neutral'} className="bg-transparent border-white/10 text-[8px] font-black uppercase ring-0">PRO</Badge>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <button className="border-2 border-dashed border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-center min-h-[220px]">
           <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Plus className="w-6 h-6" />
           </div>
           <div>
              <p className="text-sm font-black text-white uppercase tracking-widest">Connect App</p>
              <p className="text-[10px] text-slate-500 font-medium">AWS, Notion, Slack & more</p>
           </div>
        </button>
      </div>

      {/* Connection Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-4 shadow-xl shadow-blue-500/10">
           <Zap className="w-10 h-10 opacity-40" />
           <h3 className="text-2xl font-black tracking-tight leading-tight">Lightning-fast Connector</h3>
           <p className="text-sm text-blue-100/70 font-medium leading-relaxed">
             Our MCP implementation ensures sub-50ms latency between OneCommerce core and your external AI servers. All keys are encrypted at rest using AES-256.
           </p>
           <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all pt-2">
             Read Protocol Specs <ChevronRight className="w-4 h-4" />
           </button>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 space-y-6">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">Security & Governance</h3>
           </div>
           
           <div className="space-y-4">
              {[
                { label: 'Key Encryption', status: 'Active', icon: SignalHigh },
                { label: 'Network Isolation', status: 'Active', icon: SignalHigh },
                { label: 'Audit Logging', status: 'Idle', icon: SignalLow },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                   <div className="flex items-center gap-2">
                      <stat.icon className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[11px] font-bold text-slate-300">{stat.label}</span>
                   </div>
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{stat.status}</span>
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
