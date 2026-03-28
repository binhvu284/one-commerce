'use client';

import { useState, useEffect } from 'react';
import { 
  Settings2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  Search,
  Zap,
  Mic2,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

interface AIProvider {
  id: string;
  name: string;
  description: string;
  type: 'llm' | 'voice' | 'image' | 'specialized';
  logo: React.ReactNode;
  color: string;
  url: string;
}

const PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4o, GPT-4, GPT-3.5 Turbo',
    type: 'llm',
    logo: <div className="w-5 h-5 bg-emerald-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">O</div>,
    color: 'emerald',
    url: 'https://platform.openai.com/',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude 3.5 Sonnet, Opus, Haiku',
    type: 'llm',
    logo: <div className="w-5 h-5 bg-orange-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">A</div>,
    color: 'orange',
    url: 'https://console.anthropic.com/',
  },
  {
    id: 'google',
    name: 'Google Gemini',
    description: 'Gemini 1.5 Pro, Flash',
    type: 'llm',
    logo: <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">G</div>,
    color: 'blue',
    url: 'https://aistudio.google.com/',
  },
  {
    id: 'groq',
    name: 'Groq',
    description: 'Ultra-fast Llama 3, Mixtral',
    type: 'llm',
    logo: <Zap className="w-4 h-4 text-orange-500" />,
    color: 'orange',
    url: 'https://console.groq.com/',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'High-quality AI Voices & TTS',
    type: 'voice',
    logo: <Mic2 className="w-4 h-4 text-indigo-500" />,
    color: 'indigo',
    url: 'https://elevenlabs.io/',
  },
  {
    id: 'vapi',
    name: 'Vapi',
    description: 'Real-time Voice AI Platform',
    type: 'voice',
    logo: <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold italic">V</div>,
    color: 'blue',
    url: 'https://vapi.ai/',
  },
];

export default function AIConfigurationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [configs, setConfigs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const res = await fetch('/api/ai/config');
      const data = await res.json();
      setConfigs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProviders = PROVIDERS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTestConnection = async () => {
    if (!apiKey) return;
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/ai/config', {
        method: 'PUT',
        body: JSON.stringify({ provider_id: selectedProvider?.id }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) setTestResult('success');
      else setTestResult('error');
    } catch (err) {
      setTestResult('error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!apiKey || !selectedProvider) return;
    
    try {
      const res = await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider_id: selectedProvider.id,
          provider_name: selectedProvider.name,
          api_key: apiKey
        })
      });
      
      if (res.ok) {
        setSelectedProvider(null);
        setApiKey('');
        fetchConfigs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isConfigured = (providerId: string) => {
    return configs.find(c => c.provider_id === providerId)?.is_configured;
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-500">
            <Settings2 className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Infrastructure Setup</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight leading-none">AI Configurations</h2>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Configure your API keys and provider settings. All keys are encrypted (AES-256) before storage.
          </p>
        </div>

        <div className="relative group w-full sm:w-64">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
           <input 
              type="text" 
              placeholder="Filter providers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-800/40 border border-white/5 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold text-white transition-all placeholder:text-slate-600"
           />
        </div>
      </header>

      {/* Provider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProviders.map((provider) => (
          <motion.div
            key={provider.id}
            layoutId={provider.id}
            onClick={() => setSelectedProvider(provider)}
            className={cn(
               "group relative bg-slate-800/20 border border-white/5 rounded-3xl p-6 cursor-pointer hover:bg-slate-800/40 hover:border-white/10 transition-all active:scale-[0.98]",
               selectedProvider?.id === provider.id && "ring-2 ring-indigo-500 border-transparent bg-slate-800/60"
            )}
          >
            <div className="flex items-start justify-between mb-4">
               <div className={cn(
                 "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110",
                 provider.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                 provider.color === 'orange' ? "bg-orange-500/10 border-orange-500/20 text-orange-500" :
                 provider.color === 'blue' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                 provider.color === 'indigo' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                 "bg-slate-500/10 border-slate-500/20 text-slate-400"
               )}>
                  {provider.logo}
               </div>
               <Badge variant="neutral" className="rounded-lg uppercase text-[8px] font-black tracking-widest px-2 py-0.5 border-white/5 bg-slate-700/50">
                  {provider.type}
               </Badge>
            </div>

            <div className="space-y-1">
               <h3 className="text-base font-black text-white">{provider.name}</h3>
               <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{provider.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isConfigured(provider.id) ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-700"
                  )} />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    isConfigured(provider.id) ? "text-emerald-500" : "text-slate-600"
                  )}>
                    {isConfigured(provider.id) ? 'Configured' : 'Not Configured'}
                  </span>
               </div>
               <div className={cn(
                  "p-2 transition-colors",
                  isConfigured(provider.id) ? "text-emerald-500" : "text-slate-600 group-hover:text-indigo-400"
               )}>
                  <Settings2 className="w-4 h-4" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Config Panel (Modal/Sheet) */}
      <AnimatePresence>
        {selectedProvider && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProvider(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-5">
                   <div className={cn(
                     "w-16 h-16 rounded-[1.5rem] flex items-center justify-center border shadow-xl",
                     selectedProvider.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                     selectedProvider.color === 'orange' ? "bg-orange-500/10 border-orange-500/20 text-orange-500" :
                     selectedProvider.color === 'blue' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                     selectedProvider.color === 'indigo' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                     "bg-slate-500/10 border-slate-500/20 text-slate-400"
                   )}>
                      {selectedProvider.logo}
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-white">{selectedProvider.name}</h3>
                      <a 
                        href={selectedProvider.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 hover:underline"
                      >
                         <ExternalLink className="w-3 h-3" />
                         Get API Key from dashboard
                      </a>
                   </div>
                </div>

                {/* API Key Input */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 flex items-center justify-between">
                      API Management Secret
                      <Badge className="bg-slate-800 text-slate-400 border-none font-black px-1.5 py-0">ENCRYPTED</Badge>
                   </label>
                   <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type={showKey ? 'text' : 'password'} 
                        placeholder={`Paste your ${selectedProvider.name} API key here...`}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 bg-slate-800 border border-white/5 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-white font-bold placeholder:text-slate-600 transition-all"
                      />
                      <button 
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-white transition-colors"
                      >
                         {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-600 font-bold px-1 italic">
                      * Key is stored using AES-256-CBC and decrypted only during inference.
                   </p>
                </div>

                {/* Connection Test */}
                <div className="p-6 bg-slate-800/50 rounded-3xl border border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <h4 className="text-sm font-black text-white leading-none tracking-tight">System Ping</h4>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verify connection status</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleTestConnection}
                        disabled={isTesting || !apiKey}
                        className="h-9 px-4 rounded-xl border-white/5 hover:bg-white/5 text-[10px] font-bold uppercase tracking-wider"
                      >
                         {isTesting ? 'Testing...' : 'Test Connection'}
                      </Button>
                   </div>

                   <AnimatePresence>
                     {testResult && (
                       <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border",
                          testResult === 'success' ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" : "bg-red-500/5 border-red-500/20 text-red-500"
                        )}
                       >
                          {testResult === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          <span className="text-[11px] font-black uppercase tracking-widest">
                            {testResult === 'success' ? 'Connection Established' : 'Authentication Failed'}
                          </span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex gap-4">
                   <Button 
                    onClick={handleSaveConfig}
                    disabled={!apiKey}
                    className="flex-1 py-7 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-500 font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-indigo-500/20 border-none disabled:opacity-50"
                   >
                      Save Configuration
                   </Button>
                   <button 
                    onClick={() => {
                      setSelectedProvider(null);
                      setApiKey('');
                      setTestResult(null);
                    }}
                    className="px-8 bg-slate-800 hover:bg-slate-700 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all"
                   >
                      Discard
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
