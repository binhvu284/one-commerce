'use client';

import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Calendar,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { Task, BusinessUser } from '@/lib/types/business';
import { motion } from 'framer-motion';

interface TaskListViewProps {
  tasks: Task[];
  users: BusinessUser[];
}

const statusConfig = {
  todo: { label: 'To Do', icon: Circle, color: 'text-slate-400' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-blue-500' },
  review: { label: 'Review', icon: AlertCircle, color: 'text-amber-500' },
  done: { label: 'Done', icon: CheckCircle2, color: 'text-emerald-500' },
};

const priorityConfig = {
  low: { label: 'Low', variant: 'neutral' as const },
  medium: { label: 'Medium', variant: 'info' as const },
  high: { label: 'High', variant: 'warning' as const },
  urgent: { label: 'Urgent', variant: 'danger' as const },
};

export function TaskListView({ tasks, users }: TaskListViewProps) {
  const getAssignee = (id?: string) => users.find(u => u.id === id);

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-token-sm">
      <div className="overflow-x-auto text-[13px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-muted)]/10">
              <th className="pl-6 py-3 w-10">
                <div className="w-4 h-4 rounded border border-[var(--border)]" />
              </th>
              <th className="px-4 py-3 font-black text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Task Name</th>
              <th className="px-4 py-3 font-black text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Status</th>
              <th className="px-4 py-3 font-black text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Assignee</th>
              <th className="px-4 py-3 font-black text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Due Date</th>
              <th className="px-4 py-3 font-black text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Priority</th>
              <th className="pr-6 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {tasks.map((task, idx) => {
              const status = statusConfig[task.status];
              const assignee = getAssignee(task.assigneeId);
              
              return (
                <motion.tr 
                  key={task.id}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="group hover:bg-[var(--bg-muted)]/20 transition-all cursor-pointer"
                >
                  <td className="pl-6 py-4">
                    <div className="w-4 h-4 rounded border border-[var(--border)] group-hover:border-indigo-400 group-hover:bg-indigo-50/50 transition-colors" />
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "font-bold text-[var(--text-primary)] group-hover:text-indigo-600 transition-colors",
                      task.status === 'done' && "line-through opacity-50 font-medium"
                    )}>
                      {task.title}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <status.icon className={cn("w-4 h-4", status.color)} />
                      <span className="font-medium text-[var(--text-secondary)]">{status.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden ring-2 ring-[var(--bg-surface)]">
                          <img src={assignee.avatar} alt={assignee.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-[var(--text-primary)] tracking-tight">{assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-[var(--text-muted)] italic text-xs">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
                      <Calendar className="w-3.5 h-3.5 opacity-40" />
                      {task.dueDate || 'No date'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={priorityConfig[task.priority].variant} size="sm" className="font-black px-2 uppercase text-[9px]">
                      {priorityConfig[task.priority].label}
                    </Badge>
                  </td>
                  <td className="pr-6 py-4 text-right">
                    <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
            
            <tr className="hover:bg-[var(--bg-muted)]/20 transition-colors cursor-pointer group">
              <td className="pl-6 py-4">
                <Plus className="w-4 h-4 text-indigo-500" />
              </td>
              <td colSpan={6} className="px-4 py-4">
                <span className="text-indigo-500 font-bold group-hover:underline">Add new task...</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
