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
  Bot,
  Copy
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
    logo: (
      <svg viewBox="0 0 256 260" className="w-6 h-6"><path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" /></svg>
    ),
    color: 'emerald',
    url: 'https://platform.openai.com/',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Claude 3.5 Sonnet, Opus, Haiku',
    type: 'llm',
    logo: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z"></path></svg>
    ),
    color: 'orange',
    url: 'https://console.anthropic.com/',
  },
  {
    id: 'google',
    name: 'Google Gemini',
    description: 'Gemini 1.5 Pro, Flash',
    type: 'llm',
    logo: (
      <svg viewBox="0 0 296 298" className="w-8 h-8" fill="none"><mask id="a" width="296" height="298" x="0" y="0" maskUnits="userSpaceOnUse" style={{maskType: 'alpha'}}><path fill="#3186FF" d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="163" cy="149" fill="#3689FF" rx="196" ry="159"/></g><g filter="url(#c)"><ellipse cx="33.5" cy="142.5" fill="#F6C013" rx="68.5" ry="72.5"/></g><g filter="url(#d)"><ellipse cx="19.5" cy="148.5" fill="#F6C013" rx="68.5" ry="72.5"/></g><g filter="url(#e)"><path fill="#FA4340" d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66l50 76.5Z"/></g><g filter="url(#f)"><path fill="#FA4340" d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89l50 76.5Z"/></g><g filter="url(#g)"><path fill="#14BB69" d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201 50-76.5Z"/></g><g filter="url(#h)"><path fill="#14BB69" d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201 50-76.5Z"/></g></g><defs><filter id="b" width="464" height="390" x="-69" y="-46" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="18"/></filter><filter id="c" width="265" height="273" x="-99" y="6" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="d" width="265" height="273" x="-113" y="12" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="e" width="299.5" height="329" x="-41.5" y="-130" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="f" width="299.5" height="329" x="-45" y="-153" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="g" width="299.5" height="329" x="-41" y="91" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="h" width="299.5" height="329" x="-39" y="132" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter></defs></svg>
    ),
    color: 'blue',
    url: 'https://aistudio.google.com/',
  },
  {
    id: 'groq',
    name: 'Groq',
    description: 'Ultra-fast Llama 3, Mixtral',
    type: 'llm',
    logo: (
      <svg viewBox="0 0 201 201" className="w-6 h-6"><path fill="#F54F35" d="M0 0h201v201H0V0Z"/><path fill="#FEFBFB" d="m128 49 1.895 1.52C136.336 56.288 140.602 64.49 142 73c.097 1.823.148 3.648.161 5.474l.03 3.247.012 3.482.017 3.613c.01 2.522.016 5.044.02 7.565.01 3.84.041 7.68.072 11.521.007 2.455.012 4.91.016 7.364l.038 3.457c-.033 11.717-3.373 21.83-11.475 30.547-4.552 4.23-9.148 7.372-14.891 9.73l-2.387 1.055c-9.275 3.355-20.3 2.397-29.379-1.13-5.016-2.38-9.156-5.17-13.234-8.925 3.678-4.526 7.41-8.394 12-12l3.063 2.375c5.572 3.958 11.135 5.211 17.937 4.625 6.96-1.384 12.455-4.502 17-10 4.174-6.784 4.59-12.222 4.531-20.094l.012-3.473c.003-2.414-.005-4.827-.022-7.241-.02-3.68 0-7.36.026-11.04-.003-2.353-.008-4.705-.016-7.058l.025-3.312c-.098-7.996-1.732-13.21-6.681-19.47-6.786-5.458-13.105-8.211-21.914-7.792-7.327 1.188-13.278 4.7-17.777 10.601C75.472 72.012 73.86 78.07 75 85c2.191 7.547 5.019 13.948 12 18 5.848 3.061 10.892 3.523 17.438 3.688l2.794.103c2.256.082 4.512.147 6.768.209v16c-16.682.673-29.615.654-42.852-10.848-8.28-8.296-13.338-19.55-13.71-31.277.394-9.87 3.93-17.894 9.562-25.875l1.688-2.563C84.698 35.563 110.05 34.436 128 49Z"/></svg>
    ),
    color: 'orange',
    url: 'https://console.groq.com/',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'High-quality AI Voices & TTS',
    type: 'voice',
    logo: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z"/></svg>
    ),
    color: 'indigo',
    url: 'https://elevenlabs.io/',
  },
  {
    id: 'vapi',
    name: 'Vapi',
    description: 'Real-time Voice AI Platform',
    type: 'voice',
    logo: (
      <svg width="32" height="12" viewBox="0 0 60 24" fill="none" className="w-10 h-4"><path d="M11.6667 0L7.5 13.3333L3.33333 0H0L5.83333 18.6667H9.16667L15 0H11.6667Z" fill="currentColor"></path><path d="M22.5 0H19.1667L13.3333 18.6667H16.6667L17.5 16H24.1667L25 18.6667H28.3333L22.5 0ZM18.3333 13.3333L20.8333 5.33333L23.3333 13.3333H18.3333Z" fill="currentColor"></path><path d="M29.1667 0V18.6667H32.5V10.6667H37.5C40.2614 10.6667 42.5 8.42809 42.5 5.66667C42.5 2.90524 40.2614 0.666667 37.5 0.666667H29.1667V0ZM32.5 7.33333V3.33333H37.5C38.7887 3.33333 39.8333 4.378 39.8333 5.66667C39.8333 6.95533 38.7887 8 37.5 8H32.5V7.33333Z" fill="currentColor"></path><path d="M44.1667 0V18.6667H47.5V0H44.1667Z" fill="currentColor"></path></svg>
    ),
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">AI Configurations</h2>
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
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold text-slate-900 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
           />
        </div>
      </header>

      {/* Grouped Provider Sections */}
      <div className="space-y-12">
        {['llm', 'voice', 'specialized'].map((type) => {
          const providers = filteredProviders.filter(p => p.type === type);
          if (providers.length === 0) return null;

          return (
            <div key={type} className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="h-px flex-1 bg-slate-200 dark:bg-white/5" />
                 <h3 className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] flex items-center gap-2">
                    {type === 'llm' ? <Bot className="w-3.5 h-3.5" /> : type === 'voice' ? <Mic2 className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                    {type === 'llm' ? 'LLM Models' : type === 'voice' ? 'Voice & Audio' : 'Specialized Agents'}
                 </h3>
                 <div className="h-px flex-1 bg-slate-200 dark:bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {providers.map((provider) => (
                  <motion.div
                    key={provider.id}
                    layoutId={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className={cn(
                       "group relative bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-white/5 rounded-3xl p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-slate-300 dark:hover:border-white/10 transition-all active:scale-[0.98] shadow-sm hover:shadow-md",
                       selectedProvider?.id === provider.id && "ring-2 ring-indigo-500 border-transparent bg-slate-50 dark:bg-slate-800/60"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                       <div className={cn(
                         "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110",
                         provider.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500" :
                         provider.color === 'orange' ? "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-500" :
                         provider.color === 'blue' ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-500" :
                         provider.color === 'indigo' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-500" :
                         "bg-slate-500/10 border-slate-200 dark:border-slate-500/20 text-slate-600 dark:text-slate-400"
                       )}>
                          {provider.logo}
                       </div>
                    </div>

                    <div className="space-y-1">
                       <h3 className="text-base font-black text-slate-900 dark:text-white">{provider.name}</h3>
                       <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{provider.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isConfigured(provider.id) ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300 dark:bg-slate-700"
                          )} />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            isConfigured(provider.id) ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400 dark:text-slate-600"
                          )}>
                            {isConfigured(provider.id) ? 'Ready' : 'Setup Required'}
                          </span>
                       </div>
                       <div className={cn(
                          "p-2 transition-colors",
                          isConfigured(provider.id) ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400 dark:text-slate-600 group-hover:text-indigo-400"
                       )}>
                          <Settings2 className="w-4 h-4" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
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
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-5">
                   <div className={cn(
                     "w-16 h-16 rounded-[1.5rem] flex items-center justify-center border shadow-xl",
                     selectedProvider.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-500" :
                     selectedProvider.color === 'orange' ? "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-500" :
                     selectedProvider.color === 'blue' ? "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-500" :
                     selectedProvider.color === 'indigo' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-500" :
                     "bg-slate-500/10 border-slate-200 dark:border-slate-500/20 text-slate-600 dark:text-slate-400"
                   )}>
                      {selectedProvider.logo}
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedProvider.name}</h3>
                      <a 
                        href={selectedProvider.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 hover:underline"
                      >
                         <ExternalLink className="w-3 h-3" />
                         Get API Key from dashboard
                      </a>
                   </div>
                </div>

                {/* API Key Input */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1 flex items-center justify-between">
                      API Management Secret
                      <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none font-black px-1.5 py-0">ENCRYPTED</Badge>
                   </label>
                   <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type={showKey ? 'text' : 'password'} 
                        placeholder={`Paste your ${selectedProvider.name} API key here...`}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-slate-900 dark:text-white font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all"
                      />
                      <button 
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                         {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-400 dark:text-slate-600 font-bold px-1 italic">
                      * Key is stored using AES-256-CBC and decrypted only during inference.
                   </p>
                </div>

                {/* Connection Test */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <h4 className="text-sm font-black text-slate-900 dark:text-white leading-none tracking-tight">System Ping</h4>
                         <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Verify connection status</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleTestConnection}
                        disabled={isTesting || !apiKey}
                        className="h-9 px-4 rounded-xl border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
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
                          testResult === 'success' ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-500" : "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-500"
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
                    className="px-8 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all"
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
