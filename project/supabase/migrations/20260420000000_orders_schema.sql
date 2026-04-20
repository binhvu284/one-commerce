-- Migration: Orders, Customer Addresses, Shipping Methods
-- Scope: designed for Level 2 backend. In Level 1, the storefront persists
-- cart and orders to localStorage (see src/lib/stores/*.ts). This schema is
-- included to document the intended server-side data model and RLS strategy.

-- 1. Customer shipping addresses (optional for guest checkout)
CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(120) NOT NULL,
    state VARCHAR(120) NOT NULL,
    postal_code VARCHAR(30) NOT NULL,
    country VARCHAR(80) NOT NULL DEFAULT 'Vietnam',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Shipping methods (admin-configurable)
CREATE TABLE shipping_methods (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'standard', 'express'
    label VARCHAR(120) NOT NULL,
    description TEXT,
    fee DECIMAL(10,2) NOT NULL CHECK (fee >= 0),
    eta_days VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO shipping_methods (id, label, description, fee, eta_days) VALUES
    ('standard', 'Standard Shipping', 'Reliable delivery to your door', 5.00, '5 – 7 business days'),
    ('express',  'Express Shipping',  'Priority handling & courier delivery', 15.00, '1 – 2 business days');

-- 3. Orders
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_method AS ENUM ('vnpay', 'cod', 'stripe');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_id VARCHAR(50) UNIQUE NOT NULL, -- human-friendly id e.g. ORD-...
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- nullable => guest checkout
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    status order_status NOT NULL DEFAULT 'pending',

    -- Embedded snapshot of address (so order stays correct if customer later edits address book)
    ship_full_name VARCHAR(255) NOT NULL,
    ship_phone VARCHAR(50) NOT NULL,
    ship_email VARCHAR(255) NOT NULL,
    ship_line1 VARCHAR(255) NOT NULL,
    ship_line2 VARCHAR(255),
    ship_city VARCHAR(120) NOT NULL,
    ship_state VARCHAR(120) NOT NULL,
    ship_postal_code VARCHAR(30) NOT NULL,
    ship_country VARCHAR(80) NOT NULL,

    shipping_method_id VARCHAR(50) NOT NULL REFERENCES shipping_methods(id),
    shipping_fee DECIMAL(10,2) NOT NULL CHECK (shipping_fee >= 0),

    payment_method payment_method NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    payment_transaction_id VARCHAR(120),

    subtotal DECIMAL(12,2) NOT NULL CHECK (subtotal >= 0),
    total DECIMAL(12,2) NOT NULL CHECK (total >= 0),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- 4. Order line items (snapshot of product/variant at purchase time)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id VARCHAR(80) NOT NULL,
    name VARCHAR(255) NOT NULL,
    variant_name VARCHAR(255) NOT NULL,
    image_url TEXT,
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total DECIMAL(12,2) GENERATED ALWAYS AS (unit_price * quantity) STORED
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Row Level Security policies (to be added alongside auth integration):
--   * customers can SELECT their own orders (user_id = auth.uid())
--   * tenant staff can SELECT/UPDATE orders for their tenant
--   * guest orders (user_id IS NULL) accessible via signed display_id token
