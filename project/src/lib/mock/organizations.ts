import type { Organization } from '@/lib/types/organization';

export const mockOrganizations: Organization[] = [
  {
    id: 'org_001',
    name: 'Luxe Fashion Vietnam',
    slug: 'luxe-fashion',
    logo: 'https://images.unsplash.com/photo-1583333222044-c68a70c88bc1?w=128&h=128&fit=crop',
    email: 'contact@luxefashion.vn',
    status: 'active',
    plan: 'enterprise',
    userCount: 45,
    orderCount: 3240,
    revenue: 128500,
    country: 'Vietnam',
    industry: 'Fashion & Apparel',
    joinedAt: '2024-08-15',
    lastActiveAt: '2026-03-25',
    owner: { name: 'Nguyen Thi Lan', email: 'lan@luxefashion.vn' },
    storeSettings: {
      published: true,
      theme: {
        primaryColor: '#e11d48', // rose-600
        secondaryColor: '#4c0519', // rose-950
        backgroundColor: '#fff1f2', // rose-50
        textColor: '#881337', // rose-900
        fontFamily: 'Plus Jakarta Sans',
        headerStyle: 'search-focused',
        borderRadius: 'large',
      },
      layout: [
        { id: 'h1', type: 'hero', enabled: true, order: 1 },
        { id: 'f1', type: 'flash-sale', enabled: true, order: 2 },
        { id: 'c1', type: 'categories', enabled: true, order: 3 },
        { id: 'p1', type: 'featured-products', enabled: true, order: 4 },
      ],
      announcement: {
        text: '🎉 Grand Opening Sale - Up to 50% OFF for all new items!',
        enabled: true,
        link: '/sale',
      },
    },
  },
  {
    id: 'org_002',
    name: 'TechStore Pro',
    slug: 'techstore',
    email: 'support@techstore.pro',
    status: 'active',
    plan: 'growth',
    userCount: 18,
    orderCount: 1890,
    revenue: 67200,
    country: 'Vietnam',
    industry: 'Electronics',
    joinedAt: '2024-10-03',
    lastActiveAt: '2026-03-26',
    owner: { name: 'Tran Van Minh', email: 'minh@techstore.pro' },
    storeSettings: {
      published: true,
      theme: {
        primaryColor: '#0ea5e9', // sky-500
        secondaryColor: '#082f49', // sky-default
        backgroundColor: '#f0f9ff', // sky-50
        textColor: '#0c4a6e', // sky-900
        fontFamily: 'Outfit',
        headerStyle: 'minimal',
        borderRadius: 'medium',
      },
      layout: [
        { id: 'h2', type: 'hero', enabled: true, order: 1 },
        { id: 'c2', type: 'categories', enabled: true, order: 2 },
        { id: 'p2', type: 'featured-products', enabled: true, order: 3 },
      ],
    },
  },
];

export function getOrgBySlug(slug: string): Organization | undefined {
  return mockOrganizations.find(o => o.slug === slug);
}
