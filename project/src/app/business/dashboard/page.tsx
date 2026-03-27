'use client';

import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  CreditCard,
  ArrowUpRight,
  Package,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ChartsWrapper } from '@/components/dashboard/ChartsWrapper';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { ActivityItem } from '@/lib/types/admin';

const mockActivity: ActivityItem[] = [
  { 
    id: '1', 
    type: 'payment_received', 
    title: 'New order: #ORD-9281', 
    timestamp: new Date().toISOString(), 
    description: '$128.00 from Jane Doe',
    badge: 'success'
  },
  { 
    id: '2', 
    type: 'user_registered', 
    title: 'New customer: Mike Ross', 
    timestamp: new Date(Date.now() - 3600000).toISOString(), 
    description: 'Joined via Instagram link',
    badge: 'info'
  },
  { 
    id: '3', 
    type: 'payment_received', 
    title: 'Payment received: $492.00', 
    timestamp: new Date(Date.now() - 10800000).toISOString(), 
    description: 'Stripe transaction successful' 
  },
];

export default function BusinessDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Store Overview</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Tracking your business performance for the last 30 days.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button variant="primary" size="sm">Manage Storefront</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Revenue"
          value="12,842.20"
          prefix="$"
          growth={12.5}
          icon={CreditCard}
          iconBg="bg-indigo-500/10"
          iconColor="text-indigo-500"
        />
        <StatsCard
          title="Orders"
          value="482"
          growth={8.2}
          icon={ShoppingBag}
          iconBg="bg-violet-500/10"
          iconColor="text-violet-500"
        />
        <StatsCard
          title="Customers"
          value="1,204"
          growth={-3.1}
          icon={Users}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-500"
        />
        <StatsCard
          title="Inventory"
          value="85"
          growth={2.4}
          icon={Package}
          iconBg="bg-amber-500/10"
          iconColor="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartsWrapper title="Sales Performance" subtitle="Revenue trends over time">
            <div className="h-[300px] flex items-center justify-center bg-[var(--bg-muted)]/30 rounded-2xl border border-dashed border-[var(--border)]">
               <div className="flex flex-col items-center gap-2 text-[var(--text-secondary)]">
                  <TrendingUp className="w-8 h-8 opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">Sales Analytics Overlay</p>
               </div>
            </div>
          </ChartsWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)]">
               <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Top Channels</h3>
               <div className="space-y-4">
                  {[
                    { name: 'Instagram', value: 45, color: 'bg-indigo-500' },
                    { name: 'Facebook', value: 30, color: 'bg-blue-500' },
                    { name: 'Direct Search', value: 25, color: 'bg-emerald-500' },
                  ].map(c => (
                    <div key={c.name} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                        <span>{c.name}</span>
                        <span>{c.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--bg-muted)] rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-1000", c.color)} style={{ width: `${c.value}%` }} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] flex flex-col justify-center items-center text-center">
               <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-sm font-bold text-[var(--text-primary)]">Conversion Rate</h3>
               <p className="text-3xl font-black text-[var(--text-primary)] mt-1">3.4%</p>
               <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-2">+0.5% from last week</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <RecentActivity items={mockActivity} />
        </div>
      </div>
    </div>
  );
}
