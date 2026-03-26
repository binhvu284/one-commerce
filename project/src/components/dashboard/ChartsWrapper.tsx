'use client';

import dynamic from 'next/dynamic';
import type { ChartDataPoint } from '@/lib/types/admin';

const ChartSkeleton = () => (
  <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 h-[280px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
  </div>
);

const OrgGrowthChartLazy = dynamic(
  () => import('./Charts').then(m => m.OrgGrowthChart),
  { ssr: false, loading: ChartSkeleton }
);

const RevenueChartLazy = dynamic(
  () => import('./Charts').then(m => m.RevenueChart),
  { ssr: false, loading: ChartSkeleton }
);

export function OrgGrowthChart({ data }: { data: ChartDataPoint[] }) {
  return <OrgGrowthChartLazy data={data} />;
}

export function RevenueChart({ data }: { data: ChartDataPoint[] }) {
  return <RevenueChartLazy data={data} />;
}
