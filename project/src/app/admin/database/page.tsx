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
  EyeOff,
  ChevronRight,
  Settings
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
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">Database Manager</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-medium">
            Switch between multiple Supabase projects securely. Manage backups and monitor your infrastructure connections.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button variant="outline" onClick={() => setShowKeys(!showKeys)} className="gap-2 bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-sm">
             {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
             {showKeys ? 'Hide Keys' : 'View Connections'}
           </Button>
           <Button className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20">
             <Plus className="w-4 h-4" />
             Connect Project
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
                  "relative p-8 rounded-[2.5rem] border transition-all duration-300 overflow-hidden shadow-token-sm",
                  project.isDefault 
                    ? "bg-[var(--bg-surface)] border-blue-500/30 ring-1 ring-blue-500/10 group" 
                    : "bg-[var(--bg-surface)] border-[var(--border)] hover:border-blue-500/20"
                )}
              >
                {project.isDefault && (
                  <div className="absolute top-0 right-0 p-8 pt-7">
                    <Badge variant="info" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-black text-[8px] uppercase ring-0 shadow-sm">DEFAULT ENV</Badge>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-7">
                   <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm border",
                     project.isDefault ? "bg-blue-600/10 text-blue-600 border-blue-500/20" : "bg-[var(--bg-muted)] text-[var(--text-muted)] border-[var(--border)]"
                   )}>
                      <Database className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{project.name}</h3>
                      <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest leading-none mt-1">{project.projectId}</p>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="space-y-1.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Project Rest API</p>
                      <div className="p-4 bg-[var(--bg-muted)]/50 border border-[var(--border)] rounded-2xl font-mono text-[11px] text-[var(--text-secondary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shadow-inner overflow-hidden truncate">
                         {project.url}
                      </div>
                   </div>
                   
                   <AnimatePresence>
                     {showKeys && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-1.5 overflow-hidden"
                        >
                           <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Service Role Key</p>
                           <div className="p-4 bg-[var(--bg-muted)] border border-[var(--border)] rounded-2xl font-mono text-[11px] text-blue-600 dark:text-blue-400 truncate relative shadow-inner">
                              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50 text-[var(--text-muted)]" />
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
                    className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white xs font-black uppercase tracking-widest gap-2 py-6 shadow-lg shadow-blue-500/20"
                   >
                      {isBackingUp ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin text-white" />
                          Backing up...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-white" />
                          Backup Now
                        </>
                      )}
                   </Button>
                   <Button variant="outline" size="sm" className="px-5 py-6 rounded-2xl border-[var(--border)] bg-[var(--bg-muted)] hover:bg-[var(--border)] text-[var(--text-primary)]">
                      <Settings className="w-4.5 h-4.5" />
                   </Button>
                </div>
              </motion.div>
            ))}
            
            {/* Add New Project Card */}
            <button className="border-2 border-dashed border-[var(--border)] rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all min-h-[300px] shadow-sm hover:shadow-lg duration-500">
               <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                  <Plus className="w-8 h-8" />
               </div>
               <div className="text-center">
                  <p className="text-base font-black text-[var(--text-primary)] uppercase tracking-widest group-hover:text-blue-600 transition-colors">Connect New</p>
                  <p className="text-xs text-[var(--text-muted)] font-medium">Add another Supabase Project</p>
               </div>
            </button>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
           <div className="p-8 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--border)] space-y-7 shadow-token-sm">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight leading-none">Platform Health</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-1">Live Services</p>
                 </div>
              </div>
              
              <div className="space-y-5 px-1">
                 {[
                   { label: 'DB Connectivity', status: 'Operational', color: 'text-emerald-500' },
                   { label: 'Realtime Latency', status: '12ms', color: 'text-indigo-500' },
                   { label: 'Storage Usage', status: '4.2GB / 10GB', color: 'text-[var(--text-secondary)]' },
                   { label: 'Edge Functions', status: 'Healthy', color: 'text-emerald-500' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-1.5 border-b border-[var(--border)] last:border-0 grow">
                      <span className="text-[13px] font-bold text-[var(--text-secondary)] tracking-tight">{stat.label}</span>
                      <span className={cn("text-xs font-black uppercase tracking-widest", stat.color)}>{stat.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-amber-500/5 dark:bg-red-500/5 border border-amber-500/20 dark:border-red-500/20 space-y-4">
              <div className="flex items-center gap-3 text-amber-600 dark:text-red-500">
                 <AlertTriangle className="w-5 h-5" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Backup Policy</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                Manual backups are stored locally for 24 hours. Consider connecting an external S3 bucket for automated production backups.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
