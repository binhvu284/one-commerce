'use client';

import {
  Building2,
  Users,
  DollarSign,
  Sparkles,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { OrgGrowthChart, RevenueChart } from '@/components/dashboard/ChartsWrapper';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { mockAdminStats, mockChartData, mockActivityFeed } from '@/lib/mock/admin-stats';
import { mockOrganizations } from '@/lib/mock/organizations';
import { Badge } from '@/components/ui/Badge';
import type { OrgStatus } from '@/lib/types/organization';



const statusVariant: Record<OrgStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
  suspended: 'danger',
};

export default function DashboardPage() {
  const stats = mockAdminStats;
  const recentOrgs = mockOrganizations.slice(0, 5);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">
          Overview of OneCommerce platform performance
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Organizations"
          value={stats.totalOrgs.toLocaleString()}
          growth={stats.orgGrowth}
          icon={Building2}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-950"
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          growth={stats.userGrowth}
          icon={Users}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950"
        />
        <StatsCard
          title="Monthly Revenue"
          value={stats.mrr.toLocaleString()}
          growth={stats.mrrGrowth}
          icon={DollarSign}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950"
          prefix="$"
        />
        <StatsCard
          title="New This Month"
          value={stats.newThisMonth.toLocaleString()}
          growth={stats.newGrowth}
          icon={Sparkles}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950"
          prefix="+"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrgGrowthChart data={mockChartData} />
        <RevenueChart data={mockChartData} />
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Orgs */}
        <div className="lg:col-span-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] shadow-token-sm">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Recent Organizations</h3>
            <a href="/admin/organizations" className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors flex items-center gap-1">
              View all <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentOrgs.map(org => (
              <div key={org.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-muted)] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold accent-text">{org.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{org.name}</p>
                  <p className="text-xs text-[var(--text-muted)] truncate">{org.industry}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">${org.revenue.toLocaleString()}</span>
                  <Badge variant={statusVariant[org.status]} dot>{org.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick navigation */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Quick Navigate</h3>

          <a
            href="#"
            className="block p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-token-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Business UI</p>
                <Badge variant="warning" size="sm">In Development</Badge>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Preview the store management interface for business users</p>
          </a>

          <a
            href="#"
            className="block p-4 bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-token-md transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Customer Storefront</p>
                <Badge variant="warning" size="sm">In Development</Badge>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Preview the customer-facing shopping experience</p>
          </a>

          <div className="p-4 bg-[var(--accent-light)] rounded-xl border border-[var(--accent)]/20">
            <p className="text-xs font-semibold accent-text mb-1">Sprint 1 Progress</p>
            <div className="w-full h-1.5 bg-[var(--bg-muted)] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '32%' }} />
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1.5">Admin UI in development · 32% complete</p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <RecentActivity items={mockActivityFeed} />
    </div>
  );
}
