'use client';

import { useParams } from 'next/navigation';
import { TaskListView } from '@/components/business/workspace/TaskListView';
import { mockWorkspaces, mockTasks, mockBusinessUsers } from '@/lib/mock/business';
import { 
  Briefcase, 
  Settings, 
  Users, 
  Layout, 
  List, 
  Filter, 
  Search,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function WorkspacePage() {
  const params = useParams();
  const workspaceId = params.id as string;
  
  const workspace = mockWorkspaces.find(ws => ws.id === workspaceId);
  const tasks = mockTasks.filter(t => t.workspaceId === workspaceId);

  if (!workspace) {
    return <div className="p-20 text-center font-bold text-[var(--text-secondary)]">Workspace not found</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Internal Project</span>
              <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">ID: {workspaceId}</span>
            </div>
            <h1 className="text-3xl font-black text-[var(--text-primary)]">{workspace.name}</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">{workspace.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="w-4 h-4" />
            Members
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Workspace Settings
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-[var(--bg-muted)]/50 p-1 rounded-xl border border-[var(--border)]">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-bold shadow-sm ring-1 ring-inset ring-[var(--border)]">
            <List className="w-3.5 h-3.5" />
            List View
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[var(--text-secondary)] text-xs font-bold hover:bg-[var(--bg-muted)] transition-all">
            <Layout className="w-3.5 h-3.5" />
            Board
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-[var(--border)] rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none"
            />
          </div>
          <Button variant="outline" size="sm" className="px-3">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TaskListView tasks={tasks} users={mockBusinessUsers} />
      </motion.div>
    </div>
  );
}
