export type BusinessRole = 'OWNER' | 'ADMIN' | 'STAFF';

export interface Permission {
  id: string;
  name: string;
  category: 'store' | 'team' | 'finance' | 'system';
  description: string;
  enabled: boolean;
}

export interface Workspace {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface BusinessUser {
  id: string;
  name: string;
  email: string;
  role: BusinessRole;
  avatar?: string;
  workspaces: string[]; // ids of workspaces the user is in
  permissions: string[]; // ids of custom granular permissions enabled
  status: 'active' | 'pending' | 'suspended';
  invitedAt?: string;
  lastActive?: string;
}

export interface Task {
  id: string;
  workspaceId: string;
  title: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
}

export interface AffiliateNode {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  role: BusinessRole;
  parentId: string | null;
  level: number;
  totalRevenue: number;
  subordinateCount: number;
  workspaces: string[];
  status: 'active' | 'inactive';
}
