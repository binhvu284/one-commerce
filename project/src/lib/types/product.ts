export type ProductStatus = 'active' | 'draft' | 'out_of_stock';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Red / M"
  sku: string;
  price: number;
  stock: number;
  image?: string;
}

export interface ProductBadge {
  type: 'mall' | 'hot' | 'sale' | 'new' | 'custom';
  label: string;
  color?: string;
}

export interface Product {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  images: string[];
  category: string;
  status: ProductStatus;
  variants: ProductVariant[];
  badges: ProductBadge[];
  rating: number;
  reviewCount: number;
  soldCount: number;
  createdAt?: string;
  flashSale?: {
    endTime: string;
    salePrice: number;
    stockLimit: number;
    soldProgress: number; // 0-100
  };
  attributes: Record<string, string[]>; // e.g. { "Color": ["Red", "Blue"], "Size": ["S", "M", "L"] }
}

export interface Category {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  image: string;
}
