export type OrgStatus = 'active' | 'inactive' | 'pending' | 'suspended';
export type OrgPlan = 'starter' | 'growth' | 'enterprise';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: 'Inter' | 'Roboto' | 'Outfit' | 'Plus Jakarta Sans';
  headerStyle: 'minimal' | 'search-focused' | 'classic';
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
}

export interface SectionLayout {
  id: string;
  type: 'hero' | 'flash-sale' | 'categories' | 'featured-products' | 'banner-grid' | 'promo-banner';
  enabled: boolean;
  order: number;
}

export interface StoreSettings {
  published: boolean;
  theme: ThemeConfig;
  layout: SectionLayout[];
  announcement?: {
    text: string;
    enabled: boolean;
    link?: string;
  };
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  email: string;
  phone?: string;
  website?: string;
  status: OrgStatus;
  plan: OrgPlan;
  userCount: number;
  orderCount: number;
  revenue: number;
  country: string;
  industry: string;
  joinedAt: string;
  lastActiveAt: string;
  description?: string;
  owner: {
    name: string;
    email: string;
    avatar?: string;
  };
  storeSettings?: StoreSettings;
}

export interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'manager' | 'staff';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface OrgActivity {
  id: string;
  type: 'plan_upgrade' | 'plan_downgrade' | 'user_added' | 'user_removed' | 'status_change' | 'payment' | 'login';
  description: string;
  actor: string;
  timestamp: string;
  metadata?: Record<string, string>;
}
