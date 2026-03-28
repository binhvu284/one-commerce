'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Eye, Edit2, CheckCircle, XCircle, Mail, Ban, Trash2,
  MoreHorizontal, ChevronUp, ChevronDown, Building2,
} from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import type { Organization, OrgStatus } from '@/lib/types/organization';
import { cn } from '@/lib/cn';

const statusBadge: Record<OrgStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
  suspended: 'danger',
};

const planBadge = { starter: 'neutral', growth: 'info', enterprise: 'purple' } as const;

type SortKey = 'name' | 'plan' | 'userCount' | 'revenue' | 'status' | 'joinedAt';

interface OrgTableProps {
  orgs: Organization[];
  onStatusChange: (id: string, status: OrgStatus) => void;
}

export function OrgTable({ orgs, onStatusChange }: OrgTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [confirmModal, setConfirmModal] = useState<{ type: 'deactivate' | 'delete' | 'suspend'; org: Organization } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...orgs].sort((a, b) => {
    let av: string | number = a[sortKey] as string | number;
    let bv: string | number = b[sortKey] as string | number;
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="flex flex-col -space-y-1 ml-1 opacity-40">
      <ChevronUp className={cn('w-2.5 h-2.5', sortKey === col && sortDir === 'asc' && 'opacity-100 text-[var(--accent)]')} />
      <ChevronDown className={cn('w-2.5 h-2.5', sortKey === col && sortDir === 'desc' && 'opacity-100 text-[var(--accent)]')} />
    </span>
  );

  const handleConfirm = async () => {
    if (!confirmModal) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (confirmModal.type === 'deactivate') onStatusChange(confirmModal.org.id, confirmModal.org.status === 'active' ? 'inactive' : 'active');
    if (confirmModal.type === 'suspend') onStatusChange(confirmModal.org.id, 'suspended');
    setLoading(false);
    setConfirmModal(null);
  };

  const getMenuItems = (org: Organization) => [
    {
      id: 'view', label: 'View Detail', icon: <Eye className="w-4 h-4" />,
      onClick: () => window.location.assign(`/admin/organizations/${org.id}`),
    },
    { id: 'edit', label: 'Edit', icon: <Edit2 className="w-4 h-4" />, onClick: () => {} },
    {
      id: 'toggle', divider: true,
      label: org.status === 'active' ? 'Deactivate' : 'Activate',
      icon: org.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />,
      onClick: () => setConfirmModal({ type: 'deactivate', org }),
    },
    { id: 'email', label: 'Send Email', icon: <Mail className="w-4 h-4" />, onClick: () => {} },
    {
      id: 'suspend', label: 'Suspend', icon: <Ban className="w-4 h-4" />, variant: 'danger' as const,
      onClick: () => setConfirmModal({ type: 'suspend', org }),
    },
    {
      id: 'delete', label: 'Delete', icon: <Trash2 className="w-4 h-4" />, variant: 'danger' as const, divider: true,
      onClick: () => setConfirmModal({ type: 'delete', org }),
    },
  ];

  const thCls = 'px-4 py-3 text-left text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap';

  return (
    <>
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] shadow-token-sm">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--bg-muted)]">
              <tr>
                <th className={thCls}>
                  <button onClick={() => handleSort('name')} className="flex items-center hover:text-[var(--text-primary)] transition-colors">
                    Organization <SortIcon col="name" />
                  </button>
                </th>
                <th className={thCls}>
                  <button onClick={() => handleSort('plan')} className="flex items-center hover:text-[var(--text-primary)] transition-colors">
                    Plan <SortIcon col="plan" />
                  </button>
                </th>
                <th className={thCls}>
                  <button onClick={() => handleSort('userCount')} className="flex items-center hover:text-[var(--text-primary)] transition-colors">
                    Users <SortIcon col="userCount" />
                  </button>
                </th>
                <th className={thCls}>
                  <button onClick={() => handleSort('revenue')} className="flex items-center hover:text-[var(--text-primary)] transition-colors">
                    Revenue <SortIcon col="revenue" />
                  </button>
                </th>
                <th className={thCls}>
                  <button onClick={() => handleSort('status')} className="flex items-center hover:text-[var(--text-primary)] transition-colors">
                    Status <SortIcon col="status" />
                  </button>
                </th>
                <th className={thCls}>
                  <button onClick={() => handleSort('joinedAt')} className="flex items-center hover:text-[var(--text-primary)] transition-colors">
                    Joined <SortIcon col="joinedAt" />
                  </button>
                </th>
                <th className={thCls + ' text-center'}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {sorted.map(org => (
                <tr key={org.id} className="hover:bg-[var(--bg-muted)] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/organizations/${org.id}`} className="flex items-center gap-2.5 group">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <span className="text-xs font-bold accent-text">{org.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--text-primary)] truncate group-hover:accent-text transition-colors">{org.name}</p>
                        <p className="text-xs text-[var(--text-muted)] truncate">{org.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={planBadge[org.plan]}>{org.plan}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] font-medium">{org.userCount}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] font-medium">${org.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadge[org.status]} dot>{org.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                    {new Date(org.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DropdownMenu
                      trigger={
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
                          id={`org-more-${org.id}`}
                          aria-label="More options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      }
                      items={getMenuItems(org)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-[var(--text-muted)]">
            <Building2 className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No organizations found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Confirm Modals */}
      <Modal
        open={confirmModal?.type === 'deactivate'}
        onClose={() => setConfirmModal(null)}
        title={confirmModal?.org.status === 'active' ? 'Deactivate Organization' : 'Activate Organization'}
        description={
          confirmModal?.org.status === 'active'
            ? `Deactivating "${confirmModal?.org.name}" will prevent them from accessing the platform. You can reactivate at any time.`
            : `Reactivating "${confirmModal?.org.name}" will restore their access to the platform.`
        }
        variant={confirmModal?.org.status === 'active' ? 'danger' : 'default'}
        confirmLabel={confirmModal?.org.status === 'active' ? 'Deactivate' : 'Activate'}
        onConfirm={handleConfirm}
        loading={loading}
      />

      <Modal
        open={confirmModal?.type === 'suspend'}
        onClose={() => setConfirmModal(null)}
        title="Suspend Organization"
        description={`Suspending "${confirmModal?.org.name}" will immediately lock their account and notify the owner.`}
        variant="danger"
        confirmLabel="Suspend Organization"
        onConfirm={handleConfirm}
        loading={loading}
      />

      <Modal
        open={confirmModal?.type === 'delete'}
        onClose={() => setConfirmModal(null)}
        title="Delete Organization"
        description={`This will permanently delete "${confirmModal?.org.name}" and all associated data. This action cannot be undone.`}
        variant="danger"
        confirmLabel="Delete Permanently"
        onConfirm={handleConfirm}
        loading={loading}
      />
    </>
  );
}
