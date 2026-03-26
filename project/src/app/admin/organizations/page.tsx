'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, LayoutGrid, LayoutList, SlidersHorizontal, Plus, X } from 'lucide-react';
import { OrgTable } from '@/components/organizations/OrgTable';
import { OrgCard } from '@/components/organizations/OrgCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockOrganizations } from '@/lib/mock/organizations';
import type { Organization, OrgStatus, OrgPlan } from '@/lib/types/organization';
import { cn } from '@/lib/cn';

type ViewMode = 'table' | 'grid';

const STATUS_OPTIONS: { label: string; value: OrgStatus | 'all' }[] = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'Suspended', value: 'suspended' },
];

const PLAN_OPTIONS: { label: string; value: OrgPlan | 'all' }[] = [
  { label: 'All Plans', value: 'all' },
  { label: 'Starter', value: 'starter' },
  { label: 'Growth', value: 'growth' },
  { label: 'Enterprise', value: 'enterprise' },
];

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>(mockOrganizations);
  const [view, setView] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrgStatus | 'all'>('all');
  const [planFilter, setPlanFilter] = useState<OrgPlan | 'all'>('all');

  const filtered = useMemo(() => {
    return orgs.filter(o => {
      const q = search.toLowerCase();
      const matchSearch = !q || o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q) || o.slug.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchPlan = planFilter === 'all' || o.plan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    });
  }, [orgs, search, statusFilter, planFilter]);

  const handleStatusChange = useCallback((id: string, status: OrgStatus) => {
    setOrgs(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const activeFiltersCount = (statusFilter !== 'all' ? 1 : 0) + (planFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPlanFilter('all');
  };

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Organizations</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            {filtered.length} of {orgs.length} organizations
          </p>
        </div>
        <Button variant="primary" size="sm" id="add-org-btn">
          <Plus className="w-4 h-4" />
          Add Organization
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-3 shadow-token-sm">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or slug..."
              className={cn(
                'w-full h-9 pl-9 pr-9 text-sm rounded-lg border transition-all',
                'bg-[var(--bg-muted)] border-[var(--border)]',
                'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]'
              )}
              id="org-search-input"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as OrgStatus | 'all')}
            className={cn(
              'h-9 px-3 text-sm rounded-lg border cursor-pointer',
              'bg-[var(--bg-muted)] border-[var(--border)] text-[var(--text-primary)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]'
            )}
            id="org-status-filter"
          >
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={e => setPlanFilter(e.target.value as OrgPlan | 'all')}
            className={cn(
              'h-9 px-3 text-sm rounded-lg border cursor-pointer',
              'bg-[var(--bg-muted)] border-[var(--border)] text-[var(--text-primary)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]'
            )}
            id="org-plan-filter"
          >
            {PLAN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Clear filters */}
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 h-9 px-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
              <X className="w-3.5 h-3.5" />
              Clear ({activeFiltersCount})
            </button>
          )}

          <div className="flex-1" />

          {/* View toggle */}
          <div className="flex items-center gap-0.5 bg-[var(--bg-muted)] rounded-lg p-0.5 border border-[var(--border)]">
            <button
              onClick={() => setView('table')}
              className={cn(
                'w-8 h-7 rounded flex items-center justify-center transition-all',
                view === 'table' ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-token-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              )}
              aria-label="Table view"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={cn(
                'w-8 h-7 rounded flex items-center justify-center transition-all',
                view === 'grid' ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-token-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {(statusFilter !== 'all' || planFilter !== 'all') && (
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1"><SlidersHorizontal className="w-3 h-3" />Filters:</span>
            {statusFilter !== 'all' && (
              <button onClick={() => setStatusFilter('all')} className="flex items-center gap-1 text-[11px] bg-[var(--accent-light)] accent-text px-2 py-0.5 rounded-full hover:opacity-80 transition-opacity">
                Status: {statusFilter} <X className="w-2.5 h-2.5" />
              </button>
            )}
            {planFilter !== 'all' && (
              <button onClick={() => setPlanFilter('all')} className="flex items-center gap-1 text-[11px] bg-[var(--accent-light)] accent-text px-2 py-0.5 rounded-full hover:opacity-80 transition-opacity">
                Plan: {planFilter} <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {view === 'table' ? (
        <OrgTable orgs={filtered} onStatusChange={handleStatusChange} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(org => (
            <OrgCard key={org.id} org={org} onStatusChange={handleStatusChange} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-[var(--text-muted)]">
              <Search className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No organizations found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
