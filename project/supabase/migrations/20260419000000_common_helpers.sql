-- Migration: Common helpers
-- Shared SQL functions used by RLS policies and triggers across the schema.

-- 1. updated_at trigger function (referenced by ai_center migration and new tables)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- 2. Super admin check (reads profiles.global_role of the current user)
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND global_role = 'super_admin'
    );
$$;

-- 3. Tenant membership check
CREATE OR REPLACE FUNCTION is_tenant_member(t UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM tenant_members
        WHERE tenant_id = t AND user_id = auth.uid()
    );
$$;

-- 4. Current user's role within a tenant (NULL if not a member)
CREATE OR REPLACE FUNCTION tenant_role_for(t UUID)
RETURNS tenant_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT role FROM tenant_members
    WHERE tenant_id = t AND user_id = auth.uid()
    LIMIT 1;
$$;

-- 5. Has one of the given roles in a tenant
CREATE OR REPLACE FUNCTION has_tenant_role(t UUID, roles tenant_role[])
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM tenant_members
        WHERE tenant_id = t AND user_id = auth.uid() AND role = ANY(roles)
    );
$$;

-- 6. Retroactively attach updated_at trigger to ai_configurations
--    (previous migration tolerated missing function; reattach now that it exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_ai_configurations_updated_at') THEN
        CREATE TRIGGER update_ai_configurations_updated_at
        BEFORE UPDATE ON ai_configurations
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
