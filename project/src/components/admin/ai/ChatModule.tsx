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
  Image as ImageIcon
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
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', color: 'text-emerald-500' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5', provider: 'Anthropic', color: 'text-orange-500' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5', provider: 'Google', color: 'text-blue-500' },
  { id: 'llama-3-70b', name: 'Llama 3.1', provider: 'Meta', color: 'text-indigo-500' },
];

export function ChatModule() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello Admin! Welcome to the new AI Chat Lab. How can I assist you with your eCommerce infrastructure today?' }
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;
    const currentInput = input;
    const currentTool = activeTool;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: currentInput, toolUsed: currentTool || undefined };
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
          tools: currentTool ? [currentTool] : []
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
       setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: 'Error: Connection failed. Check API config.' } : m));
    } finally {
      setIsStreaming(false);
      setActiveTool(null);
    }
  };

  return (
    <div className="flex h-full bg-transparent overflow-hidden relative">
      
      {/* 1. Left Sidebar: History */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex flex-col border-r border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl h-full flex-shrink-0 relative overflow-hidden"
          >
             <div className="p-4 flex flex-col h-full">
                <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 font-bold uppercase text-[10px] tracking-widest h-11"
                    onClick={() => setMessages([{ id: Date.now().toString(), role: 'assistant', content: 'New session started. How can I help?' }])}
                >
                    <Plus className="w-4 h-4 text-emerald-500" />
                    New Chat
                </Button>

                <div className="mt-8 flex-1 overflow-y-auto space-y-1">
                   <p className="px-3 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3">Recent History</p>
                   {['eCommerce Logic Test', 'Prompt Refinement', 'Customer Sim #204', 'API Token Debug'].map((title, i) => (
                      <button 
                        key={i}
                        className={cn(
                            "w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-3",
                            i === 0 ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                        )}
                      >
                         <History className="w-3.5 h-3.5 opacity-50" />
                         <span className="truncate">{title}</span>
                      </button>
                   ))}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                   <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl border border-indigo-500/10">
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">PRO Plan</p>
                      <p className="text-[9px] text-slate-500 font-bold mb-3">22,401 tokens used today.</p>
                      <div className="h-1 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500 w-1/3" />
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Chat Workspace */}
      <div className="flex-1 flex flex-col relative min-w-0">
         
         {/* Top Header */}
         <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/5 bg-white/30 dark:bg-slate-950/30 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 transition-all"
                >
                    <Layout className="w-4 h-4" />
                </button>
                <div className="relative group">
                    <button 
                        onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none"
                    >
                        <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                            {selectedModel.name}
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </span>
                    </button>
                    {isModelMenuOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsModelMenuOpen(false)} />
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[1.5rem] shadow-2xl z-50 p-2 overflow-hidden"
                            >
                                {MODELS.map(m => (
                                    <button 
                                        key={m.id}
                                        onClick={() => { setSelectedModel(m); setIsModelMenuOpen(false); }}
                                        className={cn(
                                            "w-full p-3 flex flex-col items-start gap-1 rounded-xl transition-all",
                                            selectedModel.id === m.id ? "bg-indigo-500/10" : "hover:bg-slate-50 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Sparkles className={cn("w-3.5 h-3.5", m.color)} />
                                            <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{m.name}</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 lowercase ml-5">{m.provider} API - High Intelligence</span>
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                        "rounded-xl transition-all",
                        showCanvas ? "bg-indigo-600/10 text-indigo-600" : "text-slate-400"
                    )}
                    onClick={() => setShowCanvas(!showCanvas)}
                >
                    <PanelRight className="w-5 h-5" />
                </Button>
            </div>
         </div>

         {/* Messages Area */}
         <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col items-center bg-slate-50/20 dark:bg-slate-950/20"
         >
            <div className="w-full max-w-3xl flex flex-col px-6 py-10 space-y-10">
                {messages.map((msg) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id} 
                        className={cn(
                            "flex items-start gap-6 group",
                            msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        {/* Avatar */}
                        <div className={cn(
                            "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border",
                            msg.role === 'assistant' 
                                ? "bg-indigo-600 border-indigo-500 text-white" 
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/5 text-slate-500"
                        )}>
                            {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        </div>

                        {/* Content */}
                        <div className={cn(
                            "flex flex-col gap-3 min-w-0 max-w-[80%]",
                            msg.role === 'user' ? "items-end" : "items-start"
                        )}>
                            <div className={cn(
                                "p-6 rounded-[2rem] text-sm md:text-base font-medium leading-[1.8] tracking-tight transition-all",
                                msg.role === 'user' 
                                    ? "bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 rounded-tr-none border border-slate-200 dark:border-white/5" 
                                    : "bg-transparent text-slate-800 dark:text-slate-200 selection:bg-indigo-500/20"
                            )}>
                                {msg.content}
                                {msg.content === '' && isStreaming && (
                                    <span className="inline-block w-2 h-5 bg-indigo-500 animate-pulse ml-1 rounded-sm align-middle" />
                                )}
                            </div>

                            {/* Actions & Tools Info */}
                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                {msg.toolUsed && (
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[8px] tracking-[0.2em] uppercase px-2">
                                        {msg.toolUsed} Used
                                    </Badge>
                                )}
                                <div className="flex items-center gap-2.5">
                                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all" title="Copy"><Copy className="w-3.5 h-3.5" /></button>
                                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all" title="Regenerate"><RotateCcw className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Spacer for bottom input */}
            <div className="h-44 flex-shrink-0" />
         </div>

         {/* 3. Floating Bottom Input Bar (Gemini Style) */}
         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 md:pb-10 pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80">
            <div className="max-w-3xl mx-auto w-full pointer-events-auto">
                
                {/* Active Tool Status (Minimal) */}
                <AnimatePresence>
                    {activeTool && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center gap-2 mb-3 ml-4"
                        >
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 animate-pulse">
                                {activeTool === 'web-search' && <Globe className="w-3 h-3" />}
                                {activeTool === 'deep-research' && <Zap className="w-3 h-3" />}
                                {activeTool === 'web-search' ? 'Web Research Active' : 'Thinking Mode ON'}
                                <button onClick={() => setActiveTool(null)} className="ml-1 hover:text-white/70"><X className="w-3 h-3" /></button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative group">
                    <div className={cn(
                        "bg-white dark:bg-slate-900 border-2 transition-all duration-300 rounded-[2.5rem] p-3 pl-4 md:pl-6 shadow-2xl overflow-hidden",
                        "border-slate-200 dark:border-white/10 group-focus-within:border-indigo-500/40 group-focus-within:ring-8 group-focus-within:ring-indigo-500/5"
                    )}>
                        <div className="flex items-end gap-3 min-h-[56px]">
                            {/* Tools Cluster */}
                            <div className="flex items-center gap-1 pb-1 flex-shrink-0 text-slate-400">
                                <button title="Web Research" onClick={() => setActiveTool('web-search')} className={cn("p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none", activeTool === 'web-search' && "text-indigo-600")}>
                                    <Globe className="w-5 h-5 md:w-5.5 md:h-5.5" />
                                </button>
                                <button title="Deep Analyze" onClick={() => setActiveTool('deep-research')} className={cn("p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none", activeTool === 'deep-research' && "text-amber-500")}>
                                    <Zap className="w-5 h-5 md:w-5.5 md:h-5.5" />
                                </button>
                            </div>

                            <textarea 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                placeholder="Message OneCommerce AI Assistant..."
                                className="flex-1 bg-transparent border-none outline-none resize-none text-sm md:text-base py-3.5 max-h-60 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 font-bold leading-relaxed scrollbar-hide"
                                rows={1}
                            />

                            <div className="flex items-center gap-2 pb-1 pr-1 flex-shrink-0">
                                <button className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all outline-none">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={handleSend}
                                    disabled={!input.trim() || isStreaming}
                                    className={cn(
                                        "w-11 h-11 md:w-12 md:h-12 rounded-full transition-all flex items-center justify-center shadow-lg",
                                        input.trim() && !isStreaming 
                                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 scale-100 hover:scale-110 active:scale-95 shadow-xl" 
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 scale-100"
                                    )}
                                >
                                    {isStreaming ? <StopCircle className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Disclaimer */}
                    <p className="text-[10px] text-center mt-4 font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.2em]">OneCommerce AI Hub can make mistakes. Verify important info.</p>
                </div>
            </div>
         </div>
      </div>

      {/* 4. Canvas Side View (Right) */}
      <AnimatePresence>
        {showCanvas && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '50%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex flex-col border-l border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900 overflow-hidden relative"
          >
             <div className="p-4 flex items-center justify-between bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Layout className="w-4 h-4 text-indigo-500" />
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white">Active Canvas</h4>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Workspace v2.0</p>
                    </div>
                </div>
                <button 
                  onClick={() => setShowCanvas(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
             </div>
             <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-10">
                   {/* Artifact Placeholder */}
                   <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />
                        <div className="space-y-6 relative text-slate-800 dark:text-slate-200">
                           <h2 className="text-2xl font-black tracking-tight leading-none italic uppercase">Generated Workflow</h2>
                           <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                             OneCommerce Canvas provides a safe space to preview code, documentation, and system logic generated by AI.
                           </p>
                           <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5">
                              <div className="flex items-center gap-3 mb-4">
                                 <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-[10px]">TS</div>
                                 <span className="text-xs font-black uppercase tracking-widest">sync-service.ts</span>
                              </div>
                              <pre className="text-[10px] font-mono leading-relaxed opacity-60">
                                {`export async function syncOrder() {\n  const result = await db.orders.sync();\n  return result.status;\n}`}
                              </pre>
                           </div>
                        </div>
                   </div>
                   
                   <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-30 text-center space-y-4">
                        <Monitor className="w-12 h-12 mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Waiting for Artifacts...</p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Badge({ children, className }: any) {
    return (
        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
            {children}
        </span>
    );
}
