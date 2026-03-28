'use client';

import { useState } from 'react';
import { UserList } from '@/components/business/people/UserList';
import { RoleModal } from '@/components/business/people/RoleModal';
import { AffiliateTree } from '@/components/business/affiliate/AffiliateTree';
import { BusinessUser, BusinessRole } from '@/lib/types/business';
import { mockBusinessUsers } from '@/lib/mock/business';
import { Users, ShieldAlert, ArrowUpRight, GitBranch, List, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useBusinessRole } from '@/components/providers/RoleProvider';

type TabType = 'members' | 'affiliate';

export default function PeoplePage() {
  const { role, isAdmin, isOwner } = useBusinessRole();
  const [activeTab, setActiveTab] = useState<TabType>('members');
  const [users, setUsers] = useState<BusinessUser[]>(mockBusinessUsers);
  const [selectedUser, setSelectedUser] = useState<BusinessUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isAdmin) {
    return (
      <div className="h-[70-vh] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black italic tracking-tight uppercase">Access Denied</h2>
          <p className="text-slate-500 font-medium max-w-xs">Only Organization Owners and Admins can manage team members and access control.</p>
        </div>
      </div>
    );
  }

  const handleEditRole = (user: BusinessUser) => {
    // Owner cannot be edited by anyone
    if (user.role === 'owner') return;
    // Admin can only be edited by Owner
    if (user.role === 'admin' && !isOwner) return;

    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveRole = (userId: string, role: BusinessRole, permissions: string[]) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role, permissions } : u
    ));
    setIsModalOpen(false);
    console.log('Saved user permissions:', { userId, role, permissions });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Team Management</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">People & Access</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Manage your organization members, assign roles, and visualize your affiliate network.
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
          <div className="pr-2 text-right md:text-left">
            <p className="text-xs font-bold text-[var(--text-primary)]">Upgrade Team</p>
            <p className="text-[10px] text-[var(--text-secondary)]">Increase member limit</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-indigo-500" />
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-[var(--border)]">
        {[
          { id: 'members', label: 'Team Members', icon: List },
          { id: 'affiliate', label: 'Affiliate Tree', icon: GitBranch },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "relative flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all",
              activeTab === tab.id ? "text-indigo-500" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'members' ? (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-indigo-500 text-white flex flex-col justify-between aspect-[2/1] lg:aspect-auto">
                  <div className="flex justify-between items-start">
                    <ShieldAlert className="w-8 h-8 opacity-40" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Security Tip</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Review Critical Permissions</h3>
                    <p className="text-xs opacity-80 mt-1">Audit which team members have access to financial reports regularly.</p>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <UserList users={users} onEditRole={handleEditRole} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="affiliate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full min-h-[600px] flex flex-col"
            >
              <AffiliateTree />
            </motion.div>
          )}
        </AnimatePresence>
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
