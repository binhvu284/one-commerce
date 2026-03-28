-- Migration: AI Center Schema
-- Description: Table to store encrypted AI configurations and provider settings.

CREATE TYPE ai_provider_status AS ENUM ('active', 'inactive', 'error');

CREATE TABLE IF NOT EXISTS ai_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id TEXT NOT NULL UNIQUE, -- e.g., 'openai', 'anthropic', 'groq', 'elevenlabs'
    provider_name TEXT NOT NULL,      -- e.g., 'OpenAI', 'Claude (Anthropic)', 'Groq (Open Source)'
    encrypted_key TEXT,               -- AES-256-CBC encrypted key
    status ai_provider_status DEFAULT 'inactive',
    settings JSONB DEFAULT '{}'::jsonb, -- default models, temperature, max_tokens, etc.
    feature_flags JSONB DEFAULT '{}'::jsonb, -- e.g., { "is_chat_enabled": true, "is_voice_enabled": false }
    metadata JSONB DEFAULT '{}'::jsonb, -- logo_url, description, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_configurations_provider_id ON ai_configurations(provider_id);

-- Updated_at trigger (if standard function exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_ai_configurations_updated_at') THEN
        CREATE TRIGGER update_ai_configurations_updated_at
        BEFORE UPDATE ON ai_configurations
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
EXCEPTION
    WHEN undefined_function THEN
        -- Standard function not found, skipping trigger creation for now
        NULL;
END $$;

-- RLS (Row Level Security) - Only accessible by Super Admin (assuming there's an admin role)
ALTER TABLE ai_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow super admins to manage all ai_configurations"
ON ai_configurations
FOR ALL
USING (auth.jwt() ->> 'role' = 'super_admin') -- Simplified, adjust based on actual role system
WITH CHECK (auth.jwt() ->> 'role' = 'super_admin');
