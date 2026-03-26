'use client';

import Link from 'next/link';
import { MoreHorizontal, Eye, Edit2, CheckCircle, XCircle, Mail, Ban, Trash2, Users, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Modal } from '@/components/ui/Modal';
import type { Organization, OrgStatus } from '@/lib/types/organization';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const statusBadge: Record<OrgStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
  suspended: 'danger',
};

const planBadge = { starter: 'neutral', growth: 'info', enterprise: 'purple' } as const;

interface OrgCardProps {
  org: Organization;
  onStatusChange: (id: string, status: OrgStatus) => void;
}

export function OrgCard({ org, onStatusChange }: OrgCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const menuItems = [
    { id: 'view', label: 'View Detail', icon: <Eye className="w-4 h-4" />, onClick: () => window.location.assign(`/admin/organizations/${org.id}`) },
    { id: 'edit', label: 'Edit', icon: <Edit2 className="w-4 h-4" />, onClick: () => {} },
    {
      id: 'toggle', divider: true,
      label: org.status === 'active' ? 'Deactivate' : 'Activate',
      icon: org.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />,
      onClick: () => setConfirmOpen(true),
    },
    { id: 'email', label: 'Send Email', icon: <Mail className="w-4 h-4" />, onClick: () => {} },
    { id: 'suspend', label: 'Suspend', icon: <Ban className="w-4 h-4" />, variant: 'danger' as const, onClick: () => {} },
    { id: 'delete', label: 'Delete', icon: <Trash2 className="w-4 h-4" />, variant: 'danger' as const, divider: true, onClick: () => {} },
  ];

  return (
    <>
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 hover:shadow-token-md transition-all duration-200 hover:border-[var(--accent)]/30 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Link href={`/admin/organizations/${org.id}`} className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-sm font-bold accent-text">{org.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[var(--text-primary)] truncate group-hover:accent-text transition-colors">{org.name}</p>
              <p className="text-[11px] text-[var(--text-muted)] truncate">{org.slug}</p>
            </div>
          </Link>
          <DropdownMenu
            trigger={
              <button
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="More options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            }
            items={menuItems}
          />
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <Badge variant={statusBadge[org.status]} dot size="sm">{org.status}</Badge>
          <Badge variant={planBadge[org.plan]} size="sm">{org.plan}</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[var(--bg-muted)] rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3 h-3 text-[var(--text-muted)]" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Users</span>
            </div>
            <p className="text-sm font-bold text-[var(--text-primary)]">{org.userCount}</p>
          </div>
          <div className="bg-[var(--bg-muted)] rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3 h-3 text-[var(--text-muted)]" />
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Revenue</span>
            </div>
            <p className="text-sm font-bold text-[var(--text-primary)]">${(org.revenue / 1000).toFixed(1)}k</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">{org.owner.name.charAt(0)}</span>
            </div>
            <span className="text-xs text-[var(--text-muted)] truncate max-w-[100px]">{org.owner.name}</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">
            {new Date(org.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={org.status === 'active' ? 'Deactivate Organization' : 'Activate Organization'}
        description={`Are you sure you want to ${org.status === 'active' ? 'deactivate' : 'activate'} "${org.name}"?`}
        variant={org.status === 'active' ? 'danger' : 'default'}
        confirmLabel={org.status === 'active' ? 'Deactivate' : 'Activate'}
        onConfirm={() => { onStatusChange(org.id, org.status === 'active' ? 'inactive' : 'active'); setConfirmOpen(false); }}
      />
    </>
  );
}
