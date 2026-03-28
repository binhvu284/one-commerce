import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/services/encryption';

// Note: In a real app, we would fetch the key from Supabase based on provider_id
// For this MVP, we use the mock storage or environment variables
export async function POST(req: Request) {
  try {
    const { messages, provider_id, model } = await req.json();

    if (!messages || !provider_id) {
      return NextResponse.json({ error: 'Missing messages or provider_id' }, { status: 400 });
    }

    // Logic to get the decrypted API key (Mock for now, normally from DB)
    let apiKey = '';
    let apiUrl = '';
    
    // Example: Manual routing for MVP
    if (provider_id === 'openai') {
      apiKey = process.env.OPENAI_API_KEY || ''; // Normally decrypted from DB
      apiUrl = 'https://api.openai.com/v1/chat/completions';
    } else if (provider_id === 'anthropic') {
      apiKey = process.env.ANTHROPIC_API_KEY || '';
      apiUrl = 'https://api.anthropic.com/v1/messages';
    } else if (provider_id === 'groq') {
      apiKey = process.env.GROQ_API_KEY || '';
      apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    }

    // This is a simplified proxy - for true streaming, we'd use OpenAI SDK or Anthropic SDK
    // But to support all in one, we'll use a generic fetch approach for the MVP
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey, // For Anthropic
        'anthropic-version': '2023-06-01' // For Anthropic
      },
      body: JSON.stringify({
        model: model || 'gpt-4o',
        messages: messages,
        stream: true, // Supporting streaming
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    // Stream back to client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('AI Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
