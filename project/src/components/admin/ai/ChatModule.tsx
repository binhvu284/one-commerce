'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  StopCircle, 
  PanelRight, 
  Bot, 
  User,
  Sparkles,
  ChevronDown,
  Trash2,
  Copy,
  RotateCcw,
  Monitor,
  Search,
  Globe,
  Zap,
  Plus,
  History,
  Layout,
  ChevronLeft,
  X,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  toolUsed?: string;
}

const MODELS = [
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', color: 'text-blue-500' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', color: 'text-emerald-500' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: 'text-orange-500' },
];

export function ChatModule({ onBack }: { onBack?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello Admin! I am the OneCommerce AI Assistant. How can I help you build and scale your operations today?' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    const currentInput = input;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: currentInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    const assistantId = Date.now().toString() + '-assistant';
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    // Simulated API Call
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          provider_id: selectedModel.id,
        })
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          streamedContent += decoder.decode(value, { stream: true });
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: streamedContent } : m));
        }
      }
    } catch (error) {
       setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: 'Error: Connection failed detected. Please check your credentials.' } : m));
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex w-full h-full bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/20">
      
      {/* 1. Left Navigation Sidebar: Gemini Integrated Style */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div 
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex flex-col w-[260px] h-full bg-slate-100/30 dark:bg-white/[0.02] border-r border-slate-200 dark:border-white/[0.05] flex-shrink-0 z-20 backdrop-blur-xl"
          >
             <div className="flex flex-col h-full p-4 pt-10">
                <button 
                    onClick={() => setMessages([{ id: Date.now().toString(), role: 'assistant', content: 'New session started. How can I assist?' }])}
                    className="flex items-center gap-3 px-4 py-3 rounded-full bg-slate-200 dark:bg-white/[0.05] hover:bg-slate-300 dark:hover:bg-white/[0.1] transition-all text-sm font-semibold mb-8 group"
                >
                    <Plus className="w-5 h-5 text-blue-500 transition-transform group-hover:rotate-90" />
                    New Chat
                </button>

                <div className="flex-1 overflow-y-auto space-y-1">
                   <p className="px-4 text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4">Recent Conversations</p>
                   {['eCommerce Agent Workflow', 'Platform Growth Plan', 'API Debug Session', 'Customer Support Simulation'].map((title, i) => (
                      <button 
                        key={i}
                        className={cn(
                            "w-full px-4 py-2.5 rounded-xl text-left text-sm transition-all flex items-center gap-3",
                            i === 0 ? "bg-white dark:bg-white/5 font-bold shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-white/[0.02]"
                        )}
                      >
                         <MessageSquare className="w-4 h-4 opacity-50 flex-shrink-0" />
                         <span className="truncate">{title}</span>
                      </button>
                   ))}
                </div>

                <div className="mt-auto space-y-1 pt-4 border-t border-slate-200 dark:border-white/[0.05]">
                    <button className="w-full px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/50 dark:hover:bg-white/[0.02] transition-all flex items-center gap-3 text-slate-500">
                        <History className="w-4 h-4" />
                        Activity
                    </button>
                    <button className="w-full px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/50 dark:hover:bg-white/[0.02] transition-all flex items-center gap-3 text-slate-500">
                        <Zap className="w-4 h-4 text-amber-500" />
                        Upgrade Plan
                    </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 relative overflow-hidden transition-all duration-500">
         
         {/* Top Unified Header (Gemini Style) */}
         <div className="h-14 flex items-center justify-between px-4 border-b border-transparent sticky top-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl z-30">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none"
                    title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <Layout className="w-5 h-5 text-slate-500" />
                </button>
                
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-1.5 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all cursor-pointer group relative">
                    <button 
                        onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                        className="flex items-center gap-2 outline-none"
                    >
                        <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                           {selectedModel.name}
                           <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 dark:text-slate-600 transition-transform", isModelMenuOpen && "rotate-180")} />
                        </span>
                    </button>
                    
                    {isModelMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsModelMenuOpen(false)} />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden shadow-indigo-500/5"
                            >
                                {MODELS.map(m => (
                                    <button 
                                        key={m.id}
                                        onClick={() => { setSelectedModel(m); setIsModelMenuOpen(false); }}
                                        className={cn(
                                            "w-full p-3.5 flex flex-col items-start gap-0.5 rounded-xl transition-all",
                                            selectedModel.id === m.id ? "bg-blue-500/10" : "hover:bg-slate-50 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Sparkles className={cn("w-4 h-4", m.id === 'gemini-1-5-pro' ? "text-blue-500" : "text-amber-500")} />
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium ml-6">{m.provider} High Performance</span>
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-all rounded-full px-4 h-9"
                    onClick={onBack}
                >
                   Close Session
                </Button>
                <button 
                    onClick={() => setShowCanvas(!showCanvas)}
                    className={cn(
                        "p-2 rounded-full transition-all duration-300",
                        showCanvas ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                    )}
                >
                    <PanelRight className="w-5 h-5" />
                </button>
            </div>
         </div>

         {/* Messages Area (Centric wide flow) */}
         <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-hide bg-white dark:bg-slate-950 px-4 md:px-0"
         >
            <div className="max-w-4xl mx-auto w-full flex flex-col py-12 space-y-12">
                {messages.map((msg, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id} 
                        className={cn(
                            "flex items-start gap-4 md:gap-7 group",
                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        {/* Gemini Assistant Star or User Icon */}
                        <div className={cn(
                            "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 relative",
                            msg.role === 'assistant' 
                                ? "bg-transparent text-blue-500" 
                                : "bg-slate-200 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 font-bold"
                        )}>
                            {msg.role === 'assistant' ? (
                                <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                            ) : (
                                <div className="text-sm md:text-base">LB</div>
                            )}
                        </div>

                        {/* Content Shell */}
                        <div className={cn(
                            "flex flex-col gap-4 min-w-0 flex-1",
                            msg.role === 'user' ? "items-end" : "items-start"
                        )}>
                            <div className={cn(
                                "text-sm md:text-lg leading-[1.7] whitespace-pre-wrap selection:bg-blue-500/20",
                                msg.role === 'user' 
                                    ? "bg-slate-100 dark:bg-white/[0.03] px-6 py-3.5 rounded-[1.75rem] max-w-[85%] text-slate-800 dark:text-slate-200" 
                                    : "text-slate-800 dark:text-slate-200 w-full"
                            )}>
                                {msg.content}
                                {msg.content === '' && isStreaming && (
                                    <div className="flex gap-2.5 mt-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 animate-bounce rounded-full" />
                                        <div className="w-1.5 h-1.5 bg-blue-500 animate-bounce rounded-full [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-blue-500 animate-bounce rounded-full [animation-delay:-0.3s]" />
                                    </div>
                                )}
                            </div>

                            {/* Gemini Reaction Bar (Subtle) */}
                            {msg.role === 'assistant' && !isStreaming && msg.content && (
                                <div className="flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 translate-x-1">
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                                        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 transition-colors"><ThumbsDown className="w-4 h-4" /></button>
                                    </div>
                                    <div className="h-3 w-px bg-slate-200 dark:bg-white/10" />
                                    <div className="flex items-center gap-1">
                                       <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 transition-colors"><RotateCcw className="w-4 h-4" /></button>
                                       <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 transition-colors"><Copy className="w-4 h-4" /></button>
                                       <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="h-44 md:h-56" /> {/* Scroll Margin */}
         </div>

         {/* 3. The New Gemini Pill Input (Truly Floating) */}
         <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col items-center pointer-events-none z-40 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-950 dark:via-slate-950/40">
            <div 
                className={cn(
                    "w-full max-w-4xl bg-slate-100 dark:bg-white/[0.04] p-1 rounded-[2.5rem] pointer-events-auto border-2 transition-all shadow-2xl overflow-hidden backdrop-blur-3xl",
                    "border-transparent focus-within:border-blue-500/20 focus-within:bg-white dark:focus-within:bg-white/[0.07] focus-within:shadow-blue-500/5"
                )}
            >
                <div className="flex items-end gap-1 px-3 py-1">
                    <button className="p-3.5 text-slate-400 dark:text-slate-600 hover:text-blue-500 transition-all outline-none flex-shrink-0">
                        <Plus className="w-6 h-6" />
                    </button>
                    
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder={isStreaming ? "AI is processing..." : "Ask OneCommerce AI..."}
                        className="flex-1 bg-transparent border-none outline-none resize-none text-[15px] md:text-lg min-h-[52px] py-3.5 max-h-[30vh] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-700 font-medium leading-relaxed scrollbar-hide mb-1"
                        rows={1}
                        disabled={isStreaming}
                    />

                    <div className="flex items-center gap-1.5 p-2 flex-shrink-0 mb-1">
                        <button className="p-3 text-slate-400 dark:text-slate-600 hover:text-blue-500 transition-all outline-none hidden md:block">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button className="p-3 text-slate-400 dark:text-slate-600 hover:text-blue-500 transition-all outline-none">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={handleSend}
                           disabled={!input.trim() || isStreaming}
                           className={cn(
                             "w-11 h-11 rounded-full flex items-center justify-center transition-all",
                             input.trim() && !isStreaming 
                                ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                                : "bg-transparent text-slate-300 dark:text-slate-800"
                           )}
                        >
                            {isStreaming ? (
                               <StopCircle className="w-5 h-5 animate-pulse" />
                            ) : (
                               <ArrowRight className="w-6 h-6" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
            {/* Minimal Guardrail */}
            <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-700 font-bold uppercase tracking-[0.2em] text-center">OneCommerce AI Assistant v3.5 // Powered by Core-Alpha Engine</p>
         </div>
      </div>

      {/* 4. Canvas Side View (Right) */}
      <AnimatePresence>
        {showCanvas && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sidebarOpen ? '40%' : '50%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex flex-col border-l border-slate-200 dark:border-white/[0.05] bg-white dark:bg-slate-900 overflow-hidden relative shadow-2xl"
          >
             <div className="h-14 flex items-center justify-between px-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-white/[0.05]">
                <div className="flex items-center gap-3">
                   <Monitor className="w-4 h-4 text-blue-500" />
                   <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">Live Canvas</span>
                </div>
             </div>
             <div className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950">
                <div className="max-w-xl mx-auto space-y-10">
                   {/* Artifact UI */}
                   <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/[0.05] shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/10 blur-[50px]" />
                      <div className="relative space-y-8">
                         <div className="space-y-4">
                            <h2 className="text-2xl font-black italic tracking-tight text-slate-900 dark:text-white uppercase leading-none">Drafting Logic</h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-500 leading-relaxed">Generated code and structural outlines appear here for real-time collaboration.</p>
                         </div>
                         <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] rounded-[2rem] border border-black/5 dark:border-white/5">
                            <div className="w-full h-44 flex flex-col items-center justify-center gap-3 opacity-20">
                               <Layout className="w-10 h-10" />
                               <span className="text-[10px] font-black uppercase tracking-widest leading-none">Awaiting Output</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
