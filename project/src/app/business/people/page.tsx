'use client';

import { useState } from 'react';
import { UserList } from '@/components/business/people/UserList';
import { RoleModal } from '@/components/business/people/RoleModal';
import { BusinessUser, BusinessRole } from '@/lib/types/business';
import { mockBusinessUsers } from '@/lib/mock/business';
import { Users, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PeoplePage() {
  const [users, setUsers] = useState<BusinessUser[]>(mockBusinessUsers);
  const [selectedUser, setSelectedUser] = useState<BusinessUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditRole = (user: BusinessUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveRole = (userId: string, role: BusinessRole, permissions: string[]) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role, permissions } : u
    ));
    setIsModalOpen(false);
    // In real app, this would be a Supabase call
    console.log('Saved user permissions:', { userId, role, permissions });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Team Management</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">People & Access</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Manage your organization members, assign roles, and configure granular permissions across multiple workspaces.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[var(--bg-muted)]/30 border border-[var(--border)] p-4 rounded-2xl">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-surface)] bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="avatar" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-[var(--bg-surface)] bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
          <div className="h-8 w-px bg-[var(--border)]" />
          <div className="pr-2">
            <p className="text-xs font-bold text-[var(--text-primary)]">Upgrade Team</p>
            <p className="text-[10px] text-[var(--text-secondary)]">Increase member limit</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-indigo-500" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-indigo-500 text-white flex flex-col justify-between aspect-[2/1] lg:aspect-auto"
        >
          <div className="flex justify-between items-start">
            <ShieldAlert className="w-8 h-8 opacity-40" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Security Tip</span>
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">Review Critical Permissions</h3>
            <p className="text-xs opacity-80 mt-1">Audit which team members have access to financial reports regularly.</p>
          </div>
        </motion.div>

        <div className="lg:col-span-2">
          <UserList users={users} onEditRole={handleEditRole} />
        </div>
      </div>

      <RoleModal 
        user={selectedUser}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRole}
      />
    </div>
  );
}
