-- Migration: Ecommerce schema (v1 + RLS)
-- Adds catalog, cart, checkout, order, payment, shipping, discount,
-- audit tables and row-level security policies on top of the initial
-- multi-tenant scaffold.

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');

CREATE TYPE order_status AS ENUM (
    'pending_payment',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
);

CREATE TYPE order_event_type AS ENUM (
    'created',
    'payment_received',
    'payment_failed',
    'status_change',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
    'note'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'authorized',
    'captured',
    'failed',
    'refunded',
    'partially_refunded'
);

CREATE TYPE shipment_status AS ENUM (
    'pending',
    'shipped',
    'delivered',
    'returned',
    'cancelled'
);

CREATE TYPE discount_type AS ENUM ('percentage', 'fixed', 'free_shipping', 'bogo');

-- =============================================================================
-- EXTEND products
-- =============================================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_price DECIMAL(10,2) CHECK (sale_price IS NULL OR sale_price >= 0);
ALTER TABLE products ADD COLUMN IF NOT EXISTS status product_status DEFAULT 'draft';
ALTER TABLE products ADD COLUMN IF NOT EXISTS primary_image_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Drop legacy columns that are superseded by status + variant stock
ALTER TABLE products DROP COLUMN IF EXISTS is_active;
ALTER TABLE products DROP COLUMN IF EXISTS inventory_count;

CREATE UNIQUE INDEX IF NOT EXISTS idx_products_tenant_slug ON products(tenant_id, slug);
CREATE INDEX IF NOT EXISTS idx_products_tenant_status ON products(tenant_id, status);

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- categories
-- =============================================================================

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, slug)
);
CREATE INDEX idx_categories_tenant ON categories(tenant_id);

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Link product to category (after categories exists)
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);

-- =============================================================================
-- product_variants
-- =============================================================================

CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(128) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    compare_at_price DECIMAL(10,2) CHECK (compare_at_price IS NULL OR compare_at_price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, sku)
);
CREATE INDEX idx_variants_product ON product_variants(product_id);

CREATE TRIGGER update_product_variants_updated_at
    BEFORE UPDATE ON product_variants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- product_images
-- =============================================================================

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_images_product ON product_images(product_id);

-- =============================================================================
-- addresses
-- =============================================================================

CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    label VARCHAR(64),
    recipient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(128) NOT NULL,
    state VARCHAR(128),
    postal_code VARCHAR(32),
    country CHAR(2) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_addresses_user ON addresses(user_id);

CREATE TRIGGER update_addresses_updated_at
    BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- carts
-- =============================================================================

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    token TEXT UNIQUE NOT NULL,  -- guest cart identifier (cookie)
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_carts_user ON carts(user_id);
CREATE INDEX idx_carts_tenant ON carts(tenant_id);

CREATE TRIGGER update_carts_updated_at
    BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    variant_id UUID REFERENCES product_variants(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(cart_id, product_id, variant_id)
);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);

CREATE TRIGGER update_cart_items_updated_at
    BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- orders
-- =============================================================================

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    number VARCHAR(32) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending_payment',
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    discount_total DECIMAL(12,2) NOT NULL DEFAULT 0,
    shipping_total DECIMAL(12,2) NOT NULL DEFAULT 0,
    tax_total DECIMAL(12,2) NOT NULL DEFAULT 0,
    grand_total DECIMAL(12,2) NOT NULL DEFAULT 0,
    shipping_address_id UUID REFERENCES addresses(id) ON DELETE SET NULL,
    billing_address_id UUID REFERENCES addresses(id) ON DELETE SET NULL,
    discount_code VARCHAR(64),
    notes TEXT,
    placed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, number)
);
CREATE INDEX idx_orders_tenant ON orders(tenant_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE order_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,   -- snapshot at purchase time
    variant_name VARCHAR(255),
    sku VARCHAR(128),
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_order_lines_order ON order_lines(order_id);

CREATE TABLE order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    type order_event_type NOT NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    from_status order_status,
    to_status order_status,
    note TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_order_events_order ON order_events(order_id);

-- =============================================================================
-- payments
-- =============================================================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    provider VARCHAR(64) NOT NULL,        -- e.g. 'stripe'
    provider_payment_id VARCHAR(255),     -- payment_intent id
    status payment_status NOT NULL DEFAULT 'pending',
    method VARCHAR(64),                   -- e.g. 'card', 'bank_transfer'
    amount DECIMAL(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    raw JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_tenant ON payments(tenant_id);
CREATE INDEX idx_payments_provider_id ON payments(provider, provider_payment_id);

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- shipments
-- =============================================================================

CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    status shipment_status NOT NULL DEFAULT 'pending',
    carrier VARCHAR(128),
    service VARCHAR(128),
    tracking_number VARCHAR(128),
    tracking_url TEXT,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_shipments_order ON shipments(order_id);
CREATE INDEX idx_shipments_tenant ON shipments(tenant_id);

CREATE TRIGGER update_shipments_updated_at
    BEFORE UPDATE ON shipments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- discounts
-- =============================================================================

CREATE TABLE discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(64) NOT NULL,
    description TEXT,
    type discount_type NOT NULL,
    value DECIMAL(12,2) NOT NULL CHECK (value >= 0),
    minimum_subtotal DECIMAL(12,2) DEFAULT 0,
    usage_limit INTEGER,                   -- NULL = unlimited
    usage_count INTEGER NOT NULL DEFAULT 0,
    per_customer_limit INTEGER,
    applicable_product_ids UUID[] DEFAULT '{}',
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, code)
);
CREATE INDEX idx_discounts_tenant ON discounts(tenant_id);

CREATE TRIGGER update_discounts_updated_at
    BEFORE UPDATE ON discounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE discount_redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discount_id UUID NOT NULL REFERENCES discounts(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    amount_saved DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_redemptions_discount ON discount_redemptions(discount_id);
CREATE INDEX idx_redemptions_order ON discount_redemptions(order_id);

-- =============================================================================
-- activity_logs (audit trail)
-- =============================================================================

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL = platform scope
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    type VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_activity_logs_tenant ON activity_logs(tenant_id);
CREATE INDEX idx_activity_logs_actor ON activity_logs(actor_id);

-- =============================================================================
-- ROW-LEVEL SECURITY
-- =============================================================================

ALTER TABLE tenants           ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_members    ENABLE ROW LEVEL SECURITY;
ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories        ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants  ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses         ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts             ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders            ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_lines       ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs     ENABLE ROW LEVEL SECURITY;

-- -------------------- tenants --------------------
CREATE POLICY tenants_read ON tenants
    FOR SELECT USING (is_super_admin() OR is_tenant_member(id));
CREATE POLICY tenants_write ON tenants
    FOR ALL USING (is_super_admin()) WITH CHECK (is_super_admin());

-- -------------------- profiles --------------------
CREATE POLICY profiles_read_self ON profiles
    FOR SELECT USING (id = auth.uid() OR is_super_admin());
CREATE POLICY profiles_update_self ON profiles
    FOR UPDATE USING (id = auth.uid() OR is_super_admin())
    WITH CHECK (id = auth.uid() OR is_super_admin());
CREATE POLICY profiles_admin_write ON profiles
    FOR INSERT WITH CHECK (is_super_admin());
CREATE POLICY profiles_admin_delete ON profiles
    FOR DELETE USING (is_super_admin());

-- -------------------- tenant_members --------------------
CREATE POLICY tm_read ON tenant_members
    FOR SELECT USING (
        is_super_admin()
        OR user_id = auth.uid()
        OR is_tenant_member(tenant_id)
    );
CREATE POLICY tm_write ON tenant_members
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    );

-- -------------------- products --------------------
-- Public can read active products for the storefront
CREATE POLICY products_public_read ON products
    FOR SELECT USING (status = 'active' OR is_super_admin() OR is_tenant_member(tenant_id));
CREATE POLICY products_write ON products
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    );

-- -------------------- categories --------------------
CREATE POLICY categories_public_read ON categories
    FOR SELECT USING (true);
CREATE POLICY categories_write ON categories
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    );

-- -------------------- product_variants & product_images --------------------
-- Readability inherits product visibility (active or member). For simplicity
-- we allow public read; writes require tenant owner/admin via product lookup.

CREATE POLICY variants_public_read ON product_variants
    FOR SELECT USING (true);
CREATE POLICY variants_write ON product_variants
    FOR ALL USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_variants.product_id
              AND has_tenant_role(p.tenant_id, ARRAY['owner','admin']::tenant_role[])
        )
    ) WITH CHECK (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_variants.product_id
              AND has_tenant_role(p.tenant_id, ARRAY['owner','admin']::tenant_role[])
        )
    );

CREATE POLICY images_public_read ON product_images
    FOR SELECT USING (true);
CREATE POLICY images_write ON product_images
    FOR ALL USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_images.product_id
              AND has_tenant_role(p.tenant_id, ARRAY['owner','admin']::tenant_role[])
        )
    ) WITH CHECK (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_images.product_id
              AND has_tenant_role(p.tenant_id, ARRAY['owner','admin']::tenant_role[])
        )
    );

-- -------------------- addresses --------------------
CREATE POLICY addresses_self ON addresses
    FOR ALL USING (
        user_id = auth.uid()
        OR is_super_admin()
        OR (tenant_id IS NOT NULL AND is_tenant_member(tenant_id))
    ) WITH CHECK (
        user_id = auth.uid()
        OR is_super_admin()
        OR (tenant_id IS NOT NULL AND has_tenant_role(tenant_id, ARRAY['owner','admin','staff']::tenant_role[]))
    );

-- -------------------- carts / cart_items --------------------
-- Guest carts are server-managed via service role (cookie token). Authenticated
-- users can access their own cart rows directly.

CREATE POLICY carts_owner ON carts
    FOR ALL USING (
        user_id = auth.uid()
        OR is_super_admin()
    ) WITH CHECK (
        user_id = auth.uid()
        OR is_super_admin()
    );

CREATE POLICY cart_items_owner ON cart_items
    FOR ALL USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM carts c
            WHERE c.id = cart_items.cart_id AND c.user_id = auth.uid()
        )
    ) WITH CHECK (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM carts c
            WHERE c.id = cart_items.cart_id AND c.user_id = auth.uid()
        )
    );

-- -------------------- orders --------------------
CREATE POLICY orders_read ON orders
    FOR SELECT USING (
        user_id = auth.uid()
        OR is_super_admin()
        OR is_tenant_member(tenant_id)
    );
CREATE POLICY orders_write ON orders
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
    );

-- -------------------- order_lines & order_events --------------------
CREATE POLICY order_lines_read ON order_lines
    FOR SELECT USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = order_lines.order_id
              AND (o.user_id = auth.uid() OR is_tenant_member(o.tenant_id))
        )
    );
CREATE POLICY order_lines_write ON order_lines
    FOR ALL USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = order_lines.order_id
              AND has_tenant_role(o.tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
        )
    ) WITH CHECK (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = order_lines.order_id
              AND has_tenant_role(o.tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
        )
    );

CREATE POLICY order_events_read ON order_events
    FOR SELECT USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = order_events.order_id
              AND (o.user_id = auth.uid() OR is_tenant_member(o.tenant_id))
        )
    );
CREATE POLICY order_events_write ON order_events
    FOR ALL USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = order_events.order_id
              AND has_tenant_role(o.tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
        )
    ) WITH CHECK (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = order_events.order_id
              AND has_tenant_role(o.tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
        )
    );

-- -------------------- payments --------------------
CREATE POLICY payments_read ON payments
    FOR SELECT USING (
        is_super_admin()
        OR is_tenant_member(tenant_id)
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = payments.order_id AND o.user_id = auth.uid()
        )
    );
CREATE POLICY payments_write ON payments
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    );

-- -------------------- shipments --------------------
CREATE POLICY shipments_read ON shipments
    FOR SELECT USING (
        is_super_admin()
        OR is_tenant_member(tenant_id)
        OR EXISTS (
            SELECT 1 FROM orders o
            WHERE o.id = shipments.order_id AND o.user_id = auth.uid()
        )
    );
CREATE POLICY shipments_write ON shipments
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin','staff']::tenant_role[])
    );

-- -------------------- discounts --------------------
-- Public can read active discount metadata for validation (anonymous checkout).
CREATE POLICY discounts_public_read ON discounts
    FOR SELECT USING (
        is_active = true
        OR is_super_admin()
        OR is_tenant_member(tenant_id)
    );
CREATE POLICY discounts_write ON discounts
    FOR ALL USING (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    ) WITH CHECK (
        is_super_admin()
        OR has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[])
    );

CREATE POLICY redemptions_read ON discount_redemptions
    FOR SELECT USING (
        is_super_admin()
        OR user_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM discounts d
            WHERE d.id = discount_redemptions.discount_id
              AND is_tenant_member(d.tenant_id)
        )
    );
CREATE POLICY redemptions_write ON discount_redemptions
    FOR ALL USING (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM discounts d
            WHERE d.id = discount_redemptions.discount_id
              AND has_tenant_role(d.tenant_id, ARRAY['owner','admin']::tenant_role[])
        )
    ) WITH CHECK (
        is_super_admin()
        OR EXISTS (
            SELECT 1 FROM discounts d
            WHERE d.id = discount_redemptions.discount_id
              AND has_tenant_role(d.tenant_id, ARRAY['owner','admin']::tenant_role[])
        )
    );

-- -------------------- activity_logs --------------------
CREATE POLICY activity_read ON activity_logs
    FOR SELECT USING (
        is_super_admin()
        OR (tenant_id IS NOT NULL AND has_tenant_role(tenant_id, ARRAY['owner','admin']::tenant_role[]))
    );
-- Writes are expected via service role (server-side logging); only super admin may insert directly.
CREATE POLICY activity_write ON activity_logs
    FOR ALL USING (is_super_admin()) WITH CHECK (is_super_admin());
