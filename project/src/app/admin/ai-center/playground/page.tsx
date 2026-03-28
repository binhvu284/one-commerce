'use client';

import { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

// Modules
import { ChatModule } from '@/components/admin/ai/ChatModule';
// import { VoiceLab } from '@/components/admin/ai/VoiceLab';
// import { AgentLab } from '@/components/admin/ai/AgentLab';
// import { CustomerSim } from '@/components/admin/ai/CustomerSim';

type LabTab = 'chat' | 'voice' | 'agent' | 'customer';

const TABS: { id: LabTab, label: string, icon: React.ReactNode, description: string }[] = [
  { 
    id: 'chat', 
    label: 'AI Chat Lab', 
    icon: <MessageSquare className="w-4 h-4" />, 
    description: 'Multi-model testing with Canvas support.' 
  },
  { 
    id: 'voice', 
    label: 'Voice Lab', 
    icon: <Mic2 className="w-4 h-4" />, 
    description: 'Test TTS and Real-time voice agents.' 
  },
  { 
    id: 'agent', 
    label: 'Agent Lab', 
    icon: <Cpu className="w-4 h-4" />, 
    description: 'Build and test agentic workflows.' 
  },
  { 
    id: 'customer', 
    label: 'Customer Sim', 
    icon: <UserRound className="w-4 h-4" />, 
    description: 'Simulate customer interactions.' 
  },
];

export default function AIPlaygroundPage() {
  const [activeTab, setActiveTab] = useState<LabTab>('chat');

  return (
    <div className="flex flex-col gap-8 h-full min-h-[70vh]">
      {/* Dynamic Tab Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "group relative p-4 text-left rounded-3xl border transition-all duration-300",
              activeTab === tab.id 
                ? "bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-600/20" 
                : "bg-white dark:bg-slate-800/20 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/40 shadow-sm"
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                activeTab === tab.id 
                  ? "bg-white/20 text-white" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-indigo-500 shadow-inner"
              )}>
                {tab.icon}
              </div>
              <span className={cn(
                "text-[11px] font-black uppercase tracking-widest",
                activeTab === tab.id ? "text-white" : "text-slate-400 dark:text-slate-500"
              )}>
                {tab.label}
              </span>
            </div>
            <p className={cn(
               "text-[10px] font-bold leading-relaxed",
               activeTab === tab.id ? "text-indigo-100" : "text-slate-500 dark:text-slate-600"
            )}>
              {tab.description}
            </p>
            
            {activeTab === tab.id && (
              <motion.div 
                layoutId="active-tab"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
              />
            )}
          </button>
        ))}
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
               <div className="p-10 flex flex-col items-center justify-center gap-6">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-indigo-500 border border-indigo-500/10 shadow-lg">
                     <Mic2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Voice Lab UI</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                     <VoiceOption 
                        name="ElevenLabs" 
                        description="Prime Voice AI" 
                        logo={<div className="font-black text-black">11</div>}
                        bgColor="bg-white"
                     />
                     <VoiceOption 
                        name="Voicekiller" 
                        description="Professional Cloner" 
                        logo={<div className="font-black text-white italic">VK</div>}
                        bgColor="bg-red-600"
                     />
                  </div>
               </div>
            )}
            {activeTab === 'agent' && (
               <div className="p-10 flex flex-col items-center justify-center gap-6">
                  <div className="w-20 h-20 bg-orange-500/10 rounded-[2.5rem] flex items-center justify-center text-orange-500 border border-orange-500/10 shadow-lg">
                     <Cpu className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Agent Lab</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] -mt-4 mb-4">Experimental Workflows</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                     <AgentOption 
                        name="Direct Logic" 
                        description="Custom coded workflow" 
                        icon={<Monitor className="w-5 h-5" />}
                     />
                     <AgentOption 
                        name="Framework Agent" 
                        description="Vercel AI SDK / LangChain" 
                        icon={<Zap className="w-5 h-5 text-yellow-500" />}
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
