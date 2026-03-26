export interface AdminStats {
  totalOrgs: number;
  orgGrowth: number;
  activeUsers: number;
  userGrowth: number;
  mrr: number;
  mrrGrowth: number;
  newThisMonth: number;
  newGrowth: number;
}

export interface ChartDataPoint {
  month: string;
  orgs: number;
  users: number;
  revenue: number;
}

export interface ActivityItem {
  id: string;
  type: 'org_joined' | 'org_upgraded' | 'org_suspended' | 'user_registered' | 'payment_received' | 'support_ticket';
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
  badge?: 'success' | 'warning' | 'danger' | 'info';
}
