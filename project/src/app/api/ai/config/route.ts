import { NextResponse } from 'next/server';
import { encrypt, decrypt } from '@/lib/services/encryption';

// Mock DB for MVP - In production, this would use Supabase/PostgreSQL
let aiConfigs: any[] = [];

export async function GET() {
  // Return configurations without sensitive keys
  const safeConfigs = aiConfigs.map(config => {
    const { encrypted_key, ...safe } = config;
    return { ...safe, is_configured: !!encrypted_key };
  });
  
  return NextResponse.json(safeConfigs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider_id, provider_name, api_key } = body;
    
    if (!provider_id || !api_key) {
      return NextResponse.json({ error: 'Missing provider_id or api_key' }, { status: 400 });
    }

    const encrypted_key = encrypt(api_key);
    
    const newConfig = {
      id: Math.random().toString(36).substring(7),
      provider_id,
      provider_name,
      encrypted_key,
      status: 'active',
      updated_at: new Date().toISOString()
    };
    
    // Upsert logic for mock
    const index = aiConfigs.findIndex(c => c.provider_id === provider_id);
    if (index !== -1) {
      aiConfigs[index] = newConfig;
    } else {
      aiConfigs.push(newConfig);
    }
    
    return NextResponse.json({ success: true, message: 'Configuration saved and encrypted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper for testing connection (Mock)
export async function PUT(req: Request) {
  const body = await req.json();
  const { provider_id } = body;
  
  // Simulate network latency or actual provider test
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json({ success: true, message: `Connected to ${provider_id} successfully` });
}
