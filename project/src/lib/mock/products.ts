import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    orgId: 'org_main',
    name: 'Midnight Chronograph',
    slug: 'midnight-chronograph',
    description: 'A masterpiece of precision and elegance. Crafted with premium stainless steel and a sapphire crystal dial.',
    basePrice: 1250,
    salePrice: 999,
    images: ['/images/products/watch.png'],
    category: 'Accessories',
    status: 'active',
    variants: [
      { id: 'v1', name: 'Black Onyx', sku: 'WATCH-BLK', price: 999, stock: 15 },
      { id: 'v2', name: 'Silver Slate', sku: 'WATCH-SLV', price: 1050, stock: 8 }
    ],
    badges: [
      { type: 'hot', label: 'Bestseller' },
      { type: 'new', label: 'New Arrival' }
    ],
    rating: 4.9,
    reviewCount: 124,
    soldCount: 450,
    flashSale: {
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
      salePrice: 899,
      stockLimit: 10,
      soldProgress: 65
    },
    attributes: {
      "Color": ["Black Onyx", "Silver Slate"],
      "Material": ["Stainless Steel", "Sapphire Glass"]
    }
  },
  {
    id: 'prod_2',
    orgId: 'org_main',
    name: 'Aura Wireless Headphones',
    slug: 'aura-wireless',
    description: 'Immersive sound with adaptive noise cancellation. Experience audio like never before with Aura.',
    basePrice: 350,
    images: ['/images/products/headphones.png'],
    category: 'Electronics',
    status: 'active',
    variants: [
      { id: 'v3', name: 'Cloud White', sku: 'AUDIO-WHT', price: 350, stock: 30 },
      { id: 'v4', name: 'Space Gray', sku: 'AUDIO-GRY', price: 350, stock: 45 }
    ],
    badges: [
      { type: 'mall', label: 'OneCommerce Choice' }
    ],
    rating: 4.8,
    reviewCount: 310,
    soldCount: 890,
    attributes: {
      "Color": ["Cloud White", "Space Gray"],
      "Battery": ["40 Hours"]
    }
  },
  {
    id: 'prod_3',
    orgId: 'org_main',
    name: 'Nero Leather Carryall',
    slug: 'nero-leather-carryall',
    description: 'Handcrafted Italian leather bag designed for the modern professional.',
    basePrice: 590,
    salePrice: 450,
    images: ['/images/products/bag.png'],
    category: 'Bags',
    status: 'active',
    variants: [
      { id: 'v5', name: 'Classic Tan', sku: 'BAG-TAN', price: 450, stock: 5 }
    ],
    badges: [
      { type: 'sale', label: '25% OFF' }
    ],
    rating: 4.7,
    reviewCount: 88,
    soldCount: 120,
    attributes: {
      "Material": ["Full-Grain Leather"]
    }
  }
];

export const CATEGORIES = [
  { id: 'cat_1', orgId: 'org_main', name: 'All', slug: 'all', image: '' },
  { id: 'cat_2', orgId: 'org_main', name: 'Accessories', slug: 'accessories', image: '' },
  { id: 'cat_3', orgId: 'org_main', name: 'Electronics', slug: 'electronics', image: '' },
  { id: 'cat_4', orgId: 'org_main', name: 'Bags', slug: 'bags', image: '' }
];
