-- Migration: Initial Schema Setup for OneCommerce
-- Includes: Tenants, Profiles, Tenant Memberships, and Products.

-- 1. Tenants (Stores)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- Used for routing (e.g., store.com/slug)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users & Profiles (Extends auth.users)
CREATE TYPE global_role AS ENUM ('super_admin', 'business_user', 'customer');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    global_role global_role DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tenant Memberships (RBAC for Business Users)
CREATE TYPE tenant_role AS ENUM ('owner', 'product_manager', 'sales');

CREATE TABLE tenant_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role tenant_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, user_id)
);

-- 4. Products (Bound to a specific tenant)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    inventory_count INTEGER DEFAULT 0 CHECK (inventory_count >= 0),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies to be added later
