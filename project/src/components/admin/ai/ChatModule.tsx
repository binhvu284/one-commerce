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
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o (OpenAI)', provider: 'openai' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'google' },
  { id: 'llama-3-70b', name: 'Llama 3 70b (Groq)', provider: 'groq' },
];

export function ChatModule() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello Admin! I am ready to test your AI configurations. Which model should we experiment with today?' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    const assistantId = Date.now().toString() + '-assistant';
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          provider_id: selectedModel.provider,
          model: selectedModel.id
        })
      });

      if (!response.ok) throw new Error('Failed to fetch AI response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          // In a real proxy, you'd parse SSE (Server-Sent Events)
          // For this MVP proxy, we assumption the chunk is part of the text
          streamedContent += chunk;
          
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: streamedContent } : m));
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: 'Error: Connection failed. Check your API configurations.' } : m));
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className={cn(
        "flex flex-1 overflow-hidden transition-all duration-500 rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl bg-white dark:bg-slate-950",
        showCanvas ? "flex-row" : "flex-col"
    )}>
      {/* Sidebar: Chat Area */}
      <div className={cn(
        "flex flex-col bg-slate-50/50 dark:bg-slate-800/20 border-r border-slate-200 dark:border-white/5 transition-all duration-500",
        showCanvas ? "w-1/3" : "w-full h-full"
      )}>
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-white dark:bg-transparent">
            <div className="relative">
                <button 
                    onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
                >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {selectedModel.name}
                    <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-600" />
                </button>
                
                <AnimatePresence>
                    {isModelMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                        >
                            {MODELS.map(model => (
                                <button
                                    key={model.id}
                                    onClick={() => {
                                        setSelectedModel(model);
                                        setIsModelMenuOpen(false);
                                    }}
                                    className="w-full p-3 text-left rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex flex-col gap-0.5"
                                >
                                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{model.name}</span>
                                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">{model.provider}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button 
                onClick={() => setShowCanvas(!showCanvas)}
                className={cn(
                    "p-2 rounded-xl border transition-all shadow-sm",
                    showCanvas ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-white"
                )}
            >
                <PanelRight className="w-4 h-4" />
            </button>
        </div>

        {/* Message List */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-white dark:bg-slate-950/20">
            {messages.map((msg) => (
                <div key={msg.id} className={cn(
                    "flex flex-col gap-2 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                )}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                        {msg.role === 'assistant' ? (
                            <div className="w-5 h-5 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <Bot className="w-3 h-3" />
                            </div>
                        ) : (
                            <div className="w-5 h-5 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-white border border-slate-200 dark:border-white/5">
                                <User className="w-3 h-3" />
                            </div>
                        )}
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{msg.role}</span>
                    </div>
                    <div className={cn(
                        "p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm",
                        msg.role === 'user' 
                          ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10" 
                          : "bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none"
                    )}>
                        {msg.content}
                        {msg.content === '' && isStreaming && (
                             <span className="inline-block w-1.5 h-4 bg-indigo-500 animate-pulse ml-1" />
                        )}
                    </div>
                    
                    {msg.role === 'assistant' && msg.content && !isStreaming && (
                        <div className="flex items-center gap-3 px-2">
                             <button className="text-slate-600 hover:text-white transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                             <button className="text-slate-600 hover:text-white transition-colors"><RotateCcw className="w-3.5 h-3.5" /></button>
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] dark:shadow-none">
            <div className="relative flex items-end gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[1.5rem] p-4 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5 dark:focus-within:ring-indigo-500/10 transition-all shadow-inner">
                <button className="p-2.5 text-slate-400 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-white transition-colors bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                    <Paperclip className="w-5 h-5" />
                </button>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder="Enter command or message..."
                    className="flex-1 bg-transparent border-none outline-none resize-none text-sm py-2.5 max-h-32 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 font-bold leading-relaxed"
                    rows={1}
                />
                <button 
                   onClick={handleSend}
                   disabled={!input.trim() || isStreaming}
                   className={cn(
                     "p-3 rounded-2xl transition-all shadow-xl",
                     input.trim() && !isStreaming 
                        ? "bg-indigo-600 text-white scale-100 active:scale-95 shadow-indigo-600/20" 
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                   )}
                >
                    {isStreaming ? <StopCircle className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
                </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.25em]">Shift + Enter for new line</p>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.25em]">Admin Testing Lab</p>
            </div>
        </div>
      </div>

      {/* Canvas View: Artifacts Area */}
      <AnimatePresence>
        {showCanvas && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '66.666%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden relative"
          >
             {/* Canvas Header */}
             <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-white/80 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/10">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">Project Artifact</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Dynamic View v1.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all uppercase">Code</button>
                    <button className="px-4 py-1.5 rounded-lg bg-indigo-600 border border-indigo-500 text-[10px] font-bold text-white transition-all uppercase shadow-lg shadow-indigo-500/20">Preview</button>
                </div>
             </div>

             {/* Canvas Content */}
             <div className="flex-1 p-10 overflow-auto scrollbar-hide">
                <div className="max-w-4xl mx-auto space-y-8 pb-20">
                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[60px] rounded-full group-hover:bg-indigo-600/10 transition-all" />
                        
                        <div className="space-y-6 relative">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Generated workflow</h2>
                            <p className="text-slate-500 dark:text-slate-500 font-medium leading-relaxed">This is a simulation of the artifacts you asked me to generate. In reality, this canvas would render code components, task charts, or system logs based on the assistant's response.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-3 shadow-inner">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500"><CheckCircle2 className="w-5 h-5" /></div>
                                    <h5 className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-tight">Task Automation</h5>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-600 font-bold leading-relaxed lowercase">System successfully initialized the cross-region sync agent.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-3 shadow-inner">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500"><Activity className="w-5 h-5" /></div>
                                    <h5 className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-tight">Performance Metrics</h5>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-600 font-bold leading-relaxed lowercase">Inference time: 450ms. Token cost: $0.002.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Example Generated Component</span>
                        </div>
                        <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                             <div className="w-20 h-20 bg-indigo-600 rounded-3xl animate-spin-slow shadow-[0_0_40px_rgba(79,70,229,0.3)]" />
                             <p className="text-slate-900 dark:text-white font-black text-lg tracking-tight">Interactive Artifact</p>
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

// Helpers for Artifact Icons (needed for placeholder)
function CheckCircle2(props: any) { return <Sparkles {...props} /> }
function Activity(props: any) { return <Monitor {...props} /> }
