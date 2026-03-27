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
    <div className="space-y-8 pb-32 px-1 sm:px-0">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Database className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Data Warehouse</span>
          </div>
          <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight">Database Manager</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-medium leading-relaxed">
            Provision and manage multi-tenant Supabase projects with technical precision.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
           <Button variant="outline" onClick={() => setShowKeys(!showKeys)} className="gap-2 bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-sm py-6 sm:py-5 rounded-2xl sm:rounded-xl">
             {showKeys ? <EyeOff className="w-5 h-5 sm:w-4 sm:h-4 text-red-500" /> : <Eye className="w-5 h-5 sm:w-4 sm:h-4" />}
             <span className="text-xs uppercase font-black tracking-widest">{showKeys ? 'Hide Connections' : 'View Credentials'}</span>
           </Button>
           <Button className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-xl shadow-blue-500/20 py-6 sm:py-5 rounded-2xl sm:rounded-xl">
             <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
             <span className="text-xs uppercase font-black tracking-widest">Connect New</span>
           </Button>
        </div>
      </header>

      {/* Main Connection Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative p-8 rounded-[3rem] border transition-all duration-300 overflow-hidden shadow-token-sm active:scale-[0.98]",
                  project.isDefault 
                    ? "bg-[var(--bg-surface)] border-blue-500/30 ring-4 ring-blue-500/5 group" 
                    : "bg-[var(--bg-surface)] border-[var(--border)] hover:border-blue-500/20"
                )}
              >
                {project.isDefault && (
                  <div className="absolute top-0 right-0 p-8 pt-8">
                    <Badge variant="info" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-black text-[9px] uppercase ring-0 shadow-sm px-3 py-1">DEFAULT HUB</Badge>
                  </div>
                )}

                <div className="flex items-center gap-5 mb-8">
                   <div className={cn(
                     "w-14 h-14 rounded-[1.5rem] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm border",
                     project.isDefault ? "bg-blue-600 text-white border-blue-500/20 shadow-blue-500/10" : "bg-[var(--bg-muted)] text-[var(--text-muted)] border-[var(--border)]"
                   )}>
                      <Database className="w-7 h-7" />
                   </div>
                   <div>
                      <h3 className="text-[22px] font-black text-[var(--text-primary)] tracking-tight leading-none mb-1">{project.name}</h3>
                      <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] leading-none mt-1">{project.projectId}</p>
                   </div>
                </div>

                <div className="space-y-5 mb-10">
                   <div className="space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Rest API Gateway</p>
                      <div className="p-5 bg-[var(--bg-muted)]/50 border border-[var(--border)] rounded-[1.5rem] font-mono text-[11px] text-[var(--text-secondary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shadow-inner overflow-hidden truncate">
                         {project.url}
                      </div>
                   </div>
                   
                   <AnimatePresence>
                     {showKeys && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                           <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] ml-1">Service Secret</p>
                           <div className="p-5 bg-[var(--bg-muted)] border border-[var(--border)] rounded-[1.5rem] font-mono text-[11px] text-blue-600 dark:text-blue-400 truncate relative shadow-inner">
                              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 text-[var(--text-muted)]" />
                           </div>
                        </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                   <Button 
                    variant="primary" 
                    size="sm" 
                    disabled={isBackingUp}
                    onClick={() => handleBackup(project.name)}
                    className="flex-1 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[11px] tracking-[0.15em] py-6 sm:py-5 shadow-xl shadow-blue-500/20"
                   >
                      {isBackingUp ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin text-white" />
                          Backing up...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-white" />
                          Snap Backup
                        </>
                      )}
                   </Button>
                   <Button variant="outline" size="sm" className="px-6 py-6 sm:py-5 rounded-2xl border-[var(--border)] bg-[var(--bg-muted)] hover:bg-[var(--border)] text-[var(--text-primary)] group">
                      <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                   </Button>
                </div>
              </motion.div>
            ))}
            
            {/* Add New Project Card */}
            <button className="border-2 border-dashed border-[var(--border)] rounded-[3rem] p-10 flex flex-col items-center justify-center gap-6 group hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all min-h-[340px] shadow-sm hover:shadow-xl duration-700 active:scale-[0.98]">
               <div className="w-18 h-18 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-700 shadow-xl">
                  <Plus className="w-10 h-10" />
               </div>
               <div className="text-center space-y-2">
                  <p className="text-lg font-black text-[var(--text-primary)] uppercase tracking-[0.25em] group-hover:text-blue-600 transition-colors leading-none">Connect New</p>
                  <p className="text-xs text-[var(--text-muted)] font-bold tracking-widest uppercase">Provision Hub</p>
               </div>
            </button>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-1 space-y-8">
           <div className="p-10 rounded-[3rem] bg-[var(--bg-surface)] border border-[var(--border)] space-y-10 shadow-token-sm md:sticky md:top-24">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-[1.5rem] bg-emerald-500/10 flex items-center justify-center shadow-inner border border-emerald-500/10">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] tracking-tight leading-none text-left">Live Health</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.25em] mt-2 text-left">Cluster status</p>
                 </div>
              </div>
              
              <div className="space-y-6">
                 {[
                   { label: 'DB Connectivity', status: 'Operational', color: 'text-emerald-500' },
                   { label: 'Realtime Latency', status: '12ms', color: 'text-indigo-600 dark:text-indigo-400' },
                   { label: 'Storage Cluster', status: '4.2GB / 10GB', color: 'text-[var(--text-secondary)]' },
                   { label: 'Edge Nodes', status: 'Healthy', color: 'text-emerald-500' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2.5 border-b border-[var(--border)] last:border-0 grow">
                      <span className="text-sm font-bold text-[var(--text-secondary)] tracking-tight">{stat.label}</span>
                      <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", stat.color)}>{stat.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[3rem] bg-amber-500/5 dark:bg-red-500/5 border border-amber-500/20 dark:border-red-500/20 space-y-5">
              <div className="flex items-center gap-3 text-amber-600 dark:text-red-500">
                 <AlertTriangle className="w-6 h-6" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Governance</h3>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-bold">
                Manual backups are transient. Production policy requires external encrypted S3 node connection for data persistence.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
