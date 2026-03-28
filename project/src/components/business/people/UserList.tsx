'use client';

import { MoreVertical, Mail, Shield, UserPlus, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { BusinessUser, BusinessRole } from '@/lib/types/business';
import { motion } from 'framer-motion';

const roleConfig: Record<BusinessRole, { label: string; variant: any; icon: any }> = {
  OWNER: { label: 'Owner', variant: 'purple', icon: Shield },
  ADMIN: { label: 'Admin', variant: 'info', icon: Shield },
  STAFF: { label: 'Staff', variant: 'neutral', icon: Shield },
};

interface UserListProps {
  users: BusinessUser[];
  onEditRole: (user: BusinessUser) => void;
}

export function UserList({ users, onEditRole }: UserListProps) {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--bg-muted)]/50 border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <UserPlus className="w-4 h-4" />
            Invite User
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-muted)]/30">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">User</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">Role</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">Workspaces</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">Last Active</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {users.map((user, idx) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-[var(--bg-muted)]/20 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-[var(--bg-surface)] shadow-sm">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-indigo-700">{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{user.name}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={roleConfig[user.role].variant} size="sm" className="font-bold">
                    {roleConfig[user.role].label}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.workspaces.length > 0 ? (
                      user.workspaces.map(wsId => (
                        <span key={wsId} className="px-1.5 py-0.5 rounded bg-[var(--bg-muted)] text-[10px] font-bold text-[var(--text-secondary)] border border-[var(--border)]">
                          {wsId}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-[var(--text-secondary)] opacity-50 italic">No workspace</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge 
                    variant={user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'neutral'} 
                    dot 
                    size="sm"
                  >
                    {user.status.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-xs text-[var(--text-secondary)] font-medium">
                  {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs font-bold"
                      onClick={() => onEditRole(user)}
                    >
                      Edit Role
                    </Button>
                    <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
