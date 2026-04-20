import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Globe, Mail, Phone, Users, DollarSign,
  ShoppingBag, Calendar, Activity, Building2, ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getOrgById, mockOrgUsers, mockOrgActivity } from '@/lib/mock/organizations';
import type { OrgStatus } from '@/lib/types/organization';
import type { Metadata } from 'next';

const statusBadge: Record<OrgStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  active: 'success', pending: 'warning', inactive: 'neutral', suspended: 'danger',
};
const planBadge = { starter: 'neutral', growth: 'info', enterprise: 'purple' } as const;
const roleBadge = { OWNER: 'purple', ADMIN: 'info', STAFF: 'neutral' } as const;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const org = getOrgById(id);
  return { title: org ? `${org.name} — Organizations` : 'Organization Not Found' };
}

export default async function OrgDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = getOrgById(id);

  if (!org) return notFound();

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* Back + Header */}
      <div>
        <Link
          href="/admin/organizations"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Organizations
        </Link>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center">
              <span className="text-xl font-bold accent-text">{org.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-bold text-[var(--text-primary)]">{org.name}</h1>
                <Badge variant={statusBadge[org.status]} dot size="md">{org.status}</Badge>
                <Badge variant={planBadge[org.plan]} size="md">{org.plan} plan</Badge>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">{org.slug} · {org.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Mail className="w-3.5 h-3.5" /> Email
            </Button>
            <Button variant="secondary" size="sm">
              <Building2 className="w-3.5 h-3.5" /> Edit
            </Button>
            <Button variant="primary" size="sm">
              <ExternalLink className="w-3.5 h-3.5" /> Visit Store
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Team Members', value: org.userCount, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950' },
          { label: 'Total Orders', value: org.orderCount.toLocaleString(), icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950' },
          { label: 'Revenue', value: `$${org.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950' },
          { label: 'Days Active', value: Math.floor((Date.now() - new Date(org.joinedAt).getTime()) / 86400000), icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-4 shadow-token-sm">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">{label}</p>
                <p className="text-lg font-bold text-[var(--text-primary)]">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content: 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left col: Info */}
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 shadow-token-sm">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Organization Info</h2>
            <div className="space-y-3">
              {[
                { label: 'Email', value: org.email, icon: Mail },
                ...(org.phone ? [{ label: 'Phone', value: org.phone, icon: Phone }] : []),
                ...(org.website ? [{ label: 'Website', value: org.website, icon: Globe }] : []),
                { label: 'Country', value: org.country, icon: Globe },
                { label: 'Industry', value: org.industry, icon: Building2 },
                { label: 'Joined', value: new Date(org.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), icon: Calendar },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-[var(--text-muted)] uppercase font-medium">{label}</p>
                    <p className="text-sm text-[var(--text-primary)] truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 shadow-token-sm">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Account Owner</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">{org.owner.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{org.owner.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{org.owner.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right col: Users + Activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Team Members */}
          <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] shadow-token-sm">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Team Members</h2>
              <Badge variant="neutral">{mockOrgUsers.length}</Badge>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {mockOrgUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-muted)] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold accent-text">{user.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={roleBadge[user.role]} size="sm">{user.role}</Badge>
                    <Badge variant={user.status === 'active' ? 'success' : 'neutral'} dot size="sm">{user.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] shadow-token-sm">
            <div className="px-5 py-4 border-b border-[var(--border)] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">Activity Log</h2>
            </div>
            <div className="p-5">
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-[var(--border)]" />
                <div className="space-y-4">
                  {mockOrgActivity.map(activity => (
                    <div key={activity.id} className="flex gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-[var(--accent-light)] border-2 border-[var(--bg-surface)] flex items-center justify-center flex-shrink-0 z-10">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      </div>
                      <div className="flex-1 min-w-0 pb-2">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-[var(--text-muted)]">
                            {new Date(activity.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">·</span>
                          <span className="text-xs text-[var(--text-secondary)]">{activity.actor}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
