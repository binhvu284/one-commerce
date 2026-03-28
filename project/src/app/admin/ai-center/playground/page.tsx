'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Mic2, 
  Cpu, 
  UserRound,
  FlaskConical,
  Sparkles,
  ChevronRight,
  Monitor,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

// Modules
import { ChatModule } from '@/components/admin/ai/ChatModule';
// import { VoiceLab } from '@/components/admin/ai/VoiceLab';
// import { AgentLab } from '@/components/admin/ai/AgentLab';
// import { CustomerSim } from '@/components/admin/ai/CustomerSim';

type LabTab = 'chat' | 'voice' | 'agent' | 'customer' | null;

interface Feature {
  id: LabTab;
  label: string;
  group: string;
  icon: React.ReactNode;
  description: string;
  requiredType?: string;
}

const FEATURES: Feature[] = [
  { 
    id: 'chat', 
    label: 'AI Chat Lab', 
    group: 'Core LLM', 
    icon: <MessageSquare className="w-5 h-5" />, 
    description: 'Multi-model testing with Canvas support.',
    requiredType: 'llm'
  },
  { 
    id: 'voice', 
    label: 'Voice Lab', 
    group: 'Audio & Speech', 
    icon: <Mic2 className="w-5 h-5" />, 
    description: 'Test TTS and Real-time voice agents.',
    requiredType: 'voice'
  },
  { 
    id: 'agent', 
    label: 'Agent Lab', 
    group: 'Automation', 
    icon: <Cpu className="w-5 h-5" />, 
    description: 'Build and test agentic workflows.',
    requiredType: 'specialized'
  },
  { 
    id: 'customer', 
    label: 'Customer Sim', 
    group: 'Business Tools', 
    icon: <UserRound className="w-5 h-5" />, 
    description: 'Simulate customer interactions.' 
  },
];

export default function AIPlaygroundPage() {
  const [activeTab, setActiveTab] = useState<LabTab>(null);
  const [configs, setConfigs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ai/config')
      .then(res => res.json())
      .then(data => {
        setConfigs(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const isReady = (requiredType?: string) => {
    if (!requiredType) return true;
    return configs.some(c => {
        const provider = c.provider_id;
        // Search in PROVIDERS from configuration page logic (we mirror it here or fetch better)
        // For MVP, we check if any config exists for this type
        return c.is_configured;
    });
  };

  if (!activeTab) {
    return (
      <div className="space-y-12 pb-20">
        <header className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-500">
            <FlaskConical className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Testing Environment</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">AI Playground</h2>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Select a feature to start testing. Some features require active API configurations.
          </p>
        </header>

        <div className="space-y-12">
            {['Core LLM', 'Audio & Speech', 'Automation', 'Business Tools'].map(groupName => {
                const groupFeatures = FEATURES.filter(f => f.group === groupName);
                if (groupFeatures.length === 0) return null;

                return (
                    <div key={groupName} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] whitespace-nowrap">
                                {groupName}
                            </h3>
                            <div className="h-px w-full bg-slate-200 dark:bg-white/5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupFeatures.map((feature) => {
                                const ready = isReady(feature.requiredType);
                                return (
                                    <motion.div
                                        key={feature.id}
                                        whileHover={{ y: -5 }}
                                        onClick={() => ready && setActiveTab(feature.id)}
                                        className={cn(
                                            "group p-8 rounded-[2.5rem] bg-white dark:bg-slate-800/20 border-2 transition-all cursor-pointer shadow-sm relative overflow-hidden",
                                            ready 
                                                ? "border-slate-100 dark:border-white/5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5" 
                                                : "opacity-60 grayscale border-dashed border-slate-200 dark:border-white/10 cursor-not-allowed"
                                        )}
                                    >
                                        <div className="flex items-start justify-between mb-8">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3",
                                                ready ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                                            )}>
                                                {feature.icon}
                                            </div>
                                            {ready ? (
                                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-none font-black text-[9px] tracking-widest px-2 py-0.5 rounded-lg">READY</Badge>
                                            ) : (
                                                <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-none font-black text-[9px] tracking-widest px-2 py-0.5 rounded-lg uppercase">Setup Required</Badge>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{feature.label}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{feature.description}</p>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className={ready ? "text-indigo-500" : "text-slate-400"}>
                                                {ready ? 'Launch Module' : 'Locked'}
                                            </span>
                                            <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", ready ? "text-indigo-500" : "text-slate-400")} />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full min-h-[70vh]">
      <div className="flex items-center justify-between">
        <button 
            onClick={() => setActiveTab(null)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all shadow-sm"
        >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to selection
        </button>

        <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Testing</p>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{FEATURES.find(f => f.id === activeTab)?.label}</h4>
             </div>
             <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                {FEATURES.find(f => f.id === activeTab)?.icon}
             </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden min-h-[600px] flex flex-col shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="flex-1 flex flex-col h-full bg-slate-50/30 dark:bg-slate-900/50"
          >
            {activeTab === 'chat' && (
               <ChatModule />
            )}
            {activeTab === 'voice' && (
               <div className="p-10 flex flex-col items-center justify-center gap-10">
                  <div className="relative">
                      <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-indigo-500 border border-indigo-500/10 shadow-lg relative z-10">
                         <Mic2 className="w-10 h-10" />
                      </div>
                      <div className="absolute inset-0 bg-indigo-500/20 blur-[40px] rounded-full animate-pulse" />
                  </div>
                  
                  <div className="text-center space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Voice Lab Interface</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Select sound engine to begin</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                     <VoiceOption 
                        name="ElevenLabs" 
                        description="Prime Voice AI - TTS & Cloning" 
                        logo={<div className="font-black text-black text-lg">11</div>}
                        bgColor="bg-white"
                     />
                     <VoiceOption 
                        name="Vapi" 
                        description="Real-time Voice AI Platform" 
                        logo={<div className="font-black text-white italic">V</div>}
                        bgColor="bg-blue-600"
                     />
                  </div>
               </div>
            )}
            {activeTab === 'agent' && (
               <div className="p-10 flex flex-col items-center justify-center gap-10">
                   <div className="relative">
                      <div className="w-24 h-24 bg-orange-500/10 rounded-[2.5rem] flex items-center justify-center text-orange-500 border border-orange-500/10 shadow-lg relative z-10">
                         <Cpu className="w-10 h-10" />
                      </div>
                      <div className="absolute inset-0 bg-orange-500/20 blur-[40px] rounded-full animate-pulse" />
                  </div>

                  <div className="text-center space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Agent Flow Lab</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Select orchestration logic</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                     <AgentOption 
                        name="Direct Logic" 
                        description="Custom coded workflow scripts" 
                        icon={<Monitor className="w-6 h-6" />}
                     />
                     <AgentOption 
                        name="Framework Agent" 
                        description="Vercel AI SDK / LangChain / CrewAI" 
                        icon={<Zap className="w-6 h-6 text-yellow-500" />}
                     />
                  </div>
               </div>
            )}
             {/* User Section (Placeholder) */}
             {activeTab === 'customer' && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-8">
                   <div className="relative">
                      <div className="w-32 h-32 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 overflow-hidden">
                         <UserRound className="w-16 h-16 text-slate-400" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce duration-3000 z-20">
                         <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full animate-pulse" />
                   </div>
                   
                   <div className="text-center max-w-md space-y-4">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Customer Simulation</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-600 font-bold leading-relaxed">
                         Test how your AI handles real-world customer objections and queries in a safe, sandboxed environment.
                      </p>
                      <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
                         Initialize Simulator
                      </button>
                   </div>
                </div>
             )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VoiceOption({ name, description, logo, bgColor }: any) {
   return (
      <div className="p-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all cursor-pointer group shadow-sm hover:shadow-md">
         <div className="flex items-center gap-4 mb-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-md", bgColor)}>
               {logo}
            </div>
            <div>
               <h4 className="text-sm font-black text-slate-900 dark:text-white">{name}</h4>
               <p className="text-[10px] text-slate-500 font-bold">{description}</p>
            </div>
         </div>
         <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-end">
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 transition-colors" />
         </div>
      </div>
   );
}

function AgentOption({ name, description, icon }: any) {
   return (
      <div className="p-6 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 rounded-3xl hover:border-orange-500/30 transition-all cursor-pointer group shadow-sm hover:shadow-md">
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-orange-500 transition-all">
               {icon}
            </div>
            <div>
               <h4 className="text-sm font-black text-slate-900 dark:text-white">{name}</h4>
               <p className="text-[10px] text-slate-500 font-bold">{description}</p>
            </div>
         </div>
         <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-end">
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-orange-500 transition-colors" />
         </div>
      </div>
   );
}
