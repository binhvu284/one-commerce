'use client';

import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StatsCardProps {
  title: string;
  value: string;
  growth: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  prefix?: string;
  suffix?: string;
}

export function StatsCard({ title, value, growth, icon: Icon, iconColor, iconBg, prefix, suffix }: StatsCardProps) {
  const isPositive = growth >= 0;

  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] p-5 shadow-token-sm hover:shadow-token-md transition-shadow duration-200 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {prefix && <span className="text-lg font-semibold text-[var(--text-secondary)]">{prefix}</span>}
            {value}
            {suffix && <span className="text-base font-semibold text-[var(--text-secondary)] ml-0.5">{suffix}</span>}
          </p>
          <div className={cn(
            'mt-2 flex items-center gap-1 text-xs font-medium',
            isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
          )}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{isPositive ? '+' : ''}{growth}%</span>
            <span className="text-[var(--text-muted)] font-normal ml-0.5">vs last month</span>
          </div>
        </div>

        <div className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
          'group-hover:scale-110 transition-transform duration-200',
          iconBg
        )}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
      </div>
    </div>
  );
}
