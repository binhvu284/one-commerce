import { Badge } from '@/components/ui/Badge';
import type { ActivityItem } from '@/lib/types/admin';
import { Building2, TrendingUp, DollarSign, AlertCircle, Users, LifeBuoy } from 'lucide-react';

const iconMap = {
  org_joined: Building2,
  org_upgraded: TrendingUp,
  org_suspended: AlertCircle,
  payment_received: DollarSign,
  user_registered: Users,
  support_ticket: LifeBuoy,
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return 'Just now';
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border)] shadow-token-sm">
      <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Recent Activity</h3>
        <button className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {items.map((item) => {
          const Icon = iconMap[item.type] ?? Building2;
          return (
            <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-[var(--bg-muted)] transition-colors">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center mt-0.5">
                <Icon className="w-4 h-4 accent-text" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{item.description}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                {item.badge && <Badge variant={item.badge} size="sm">{item.badge}</Badge>}
                <span className="text-[11px] text-[var(--text-muted)]">{timeAgo(item.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
