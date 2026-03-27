'use client';

import { useState } from 'react';
import { 
  Database, 
  Plus, 
  ArrowRight, 
  Download, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

interface DbProject {
  id: string;
  name: string;
  url: string;
  projectId: string;
  isDefault?: boolean;
  status: 'connected' | 'error';
}

const mockProjects: DbProject[] = [
  { id: '1', name: 'Production Main', url: 'https://oc-prod.supabase.co', projectId: 'oc-prod-12345', isDefault: true, status: 'connected' },
  { id: '2', name: 'Staging Environment', url: 'https://oc-staging.supabase.co', projectId: 'oc-staging-67890', status: 'connected' },
];

export default function DatabasePage() {
  const [projects, setProjects] = useState<DbProject[]>(mockProjects);
  const [showKeys, setShowKeys] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = (projectName: string) => {
    setIsBackingUp(true);
    
    // Simulate backup delay
    setTimeout(() => {
      setIsBackingUp(false);
      // Simulate file download
      const content = `-- OneCommerce Database Backup\n-- Project: ${projectName}\n-- Date: ${new Date().toISOString()}\n\n-- Schema Structure\n-- Tables, Roles, RLS Policies...`;
      const blob = new Blob([content], { type: 'text/sql' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${projectName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.sql`;
      a.click();
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Database className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">External Storage & Data</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight leading-none">Database Manager</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Switch between multiple Supabase projects securely. Manage backups and monitor your infrastructure connections.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="outline" onClick={() => setShowKeys(!showKeys)} className="gap-2 bg-slate-800/40 border-white/5 text-slate-400 hover:text-white">
             {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
             {showKeys ? 'Hide Keys' : 'View Connections'}
           </Button>
           <Button className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20">
             <Plus className="w-4 h-4" />
             Connect New Project
           </Button>
        </div>
      </header>

      {/* Main Connection Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative p-8 rounded-[2.5rem] border transition-all duration-300 overflow-hidden",
                  project.isDefault 
                    ? "bg-slate-900 border-blue-500/30 shadow-2xl shadow-blue-500/5 group" 
                    : "bg-slate-900/40 border-white/5 hover:border-white/10"
                )}
              >
                {project.isDefault && (
                  <div className="absolute top-0 right-0 p-8 pt-6">
                    <Badge className="bg-blue-500/10 text-blue-500 border-none font-black text-[8px] uppercase ring-0">Default (from .env)</Badge>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform",
                     project.isDefault ? "bg-blue-600/10 text-blue-500" : "bg-slate-800 text-slate-500"
                   )}>
                      <Database className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-white tracking-tight">{project.name}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">{project.projectId}</p>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Project Rest API</p>
                      <div className="p-3 bg-black/40 border border-white/5 rounded-xl font-mono text-[11px] text-slate-400 group-hover:text-blue-400/80 transition-colors">
                         {project.url}
                      </div>
                   </div>
                   
                   <AnimatePresence>
                     {showKeys && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-1 overflow-hidden"
                        >
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Service Role Key</p>
                           <div className="p-3 bg-black/40 border border-white/5 rounded-xl font-mono text-[11px] text-blue-500 truncate relative">
                              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50" />
                           </div>
                        </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                <div className="flex items-center gap-3">
                   <Button 
                    variant="primary" 
                    size="sm" 
                    disabled={isBackingUp}
                    onClick={() => handleBackup(project.name)}
                    className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-500 text-xs font-black uppercase tracking-widest gap-2 py-5"
                   >
                      {isBackingUp ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          Backing up...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Backup Now
                        </>
                      )}
                   </Button>
                   <Button variant="outline" size="sm" className="px-5 py-5 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 text-white">
                      <Settings className="w-4 h-4" />
                   </Button>
                </div>
              </motion.div>
            ))}
            
            {/* Add New Project Card */}
            <button className="border-2 border-dashed border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all min-h-[300px]">
               <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Plus className="w-8 h-8" />
               </div>
               <div className="text-center">
                  <p className="text-base font-black text-white uppercase tracking-widest">Connect New</p>
                  <p className="text-xs text-slate-500 font-medium">Add another Supabase Project</p>
               </div>
            </button>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                 </div>
                 <h3 className="text-xl font-black text-white tracking-tight">System Health</h3>
              </div>
              
              <div className="space-y-5">
                 {[
                   { label: 'DB Connectivity', status: 'Operational', color: 'text-emerald-500' },
                   { label: 'Realtime Latency', status: '12ms', color: 'text-white' },
                   { label: 'Storage Usage', status: '4.2GB / 10GB', color: 'text-white' },
                   { label: 'Edge Functions', status: 'Healthy', color: 'text-emerald-500' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 tracking-tight">{stat.label}</span>
                      <span className={cn("text-xs font-black", stat.color)}>{stat.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/20 space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                 <AlertTriangle className="w-5 h-5" />
                 <h3 className="text-sm font-black uppercase tracking-widest">Backup Policy</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Manual backups are stored locally for 24 hours. Consider connecting an external S3 bucket for automated production backups.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

function Settings(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
