import type { AdminStats, ChartDataPoint, ActivityItem } from '@/lib/types/admin';

export const mockAdminStats: AdminStats = {
  totalOrgs: 1247,
  orgGrowth: 12.5,
  activeUsers: 8432,
  userGrowth: 8.3,
  mrr: 48291,
  mrrGrowth: 23.1,
  newThisMonth: 127,
  newGrowth: 18.2,
};

export const mockChartData: ChartDataPoint[] = [
  { month: 'Apr', orgs: 820, users: 5200, revenue: 28400 },
  { month: 'May', orgs: 890, users: 5800, revenue: 31200 },
  { month: 'Jun', orgs: 950, users: 6100, revenue: 33800 },
  { month: 'Jul', orgs: 1010, users: 6450, revenue: 36100 },
  { month: 'Aug', orgs: 1070, users: 6900, revenue: 38500 },
  { month: 'Sep', orgs: 1100, users: 7100, revenue: 40200 },
  { month: 'Oct', orgs: 1130, users: 7350, revenue: 42100 },
  { month: 'Nov', orgs: 1160, users: 7600, revenue: 43800 },
  { month: 'Dec', orgs: 1175, users: 7800, revenue: 44900 },
  { month: 'Jan', orgs: 1195, users: 7950, revenue: 46200 },
  { month: 'Feb', orgs: 1220, users: 8200, revenue: 47500 },
  { month: 'Mar', orgs: 1247, users: 8432, revenue: 48291 },
];

export const mockActivityFeed: ActivityItem[] = [
  {
    id: 'act_1',
    type: 'org_joined',
    title: 'New organization registered',
    description: 'BookWorld Vietnam joined the platform',
    timestamp: '2026-03-26T10:15:00Z',
    badge: 'success',
  },
  {
    id: 'act_2',
    type: 'org_upgraded',
    title: 'Plan upgrade',
    description: 'Luxe Fashion Vietnam upgraded to Enterprise',
    timestamp: '2026-03-25T16:30:00Z',
    badge: 'info',
  },
  {
    id: 'act_3',
    type: 'payment_received',
    title: 'Payment received',
    description: 'Monthly billing cycle — $48,291 collected',
    timestamp: '2026-03-01T00:00:00Z',
    badge: 'success',
  },
  {
    id: 'act_4',
    type: 'org_suspended',
    title: 'Organization suspended',
    description: 'FreshMart Grocer suspended due to payment failure',
    timestamp: '2026-01-10T09:00:00Z',
    badge: 'danger',
  },
  {
    id: 'act_5',
    type: 'user_registered',
    title: 'New users registered',
    description: '24 new business users registered today',
    timestamp: '2026-03-26T08:00:00Z',
    badge: 'info',
  },
  {
    id: 'act_6',
    type: 'support_ticket',
    title: 'Support ticket opened',
    description: 'TechStore Pro reported checkout integration issue',
    timestamp: '2026-03-24T14:20:00Z',
    badge: 'warning',
  },
];
