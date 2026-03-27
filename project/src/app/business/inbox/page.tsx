'use client';

import { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Plus, 
  Settings,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

const mockChats = [
  { id: '1', name: 'Admin Notifications', lastMsg: 'Important: System maintenance tonight.', time: '10:24 AM', unread: 2, isSystem: true },
  { id: '2', name: 'Marketing Team', lastMsg: 'Jordan: The new banners are ready.', time: '9:12 AM', unread: 0, isGroup: true },
  { id: '3', name: 'Sarah Chen', lastMsg: 'Can we review the product list?', time: 'Yesterday', unread: 0 },
  { id: '4', name: 'Global Sales', lastMsg: 'Mike: We hit the target!', time: 'Monday', unread: 0, isGroup: true },
];

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4 overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className="w-80 flex flex-col bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-[var(--text-primary)]">Messages</h2>
            <button className="p-1.5 hover:bg-[var(--bg-muted)] rounded-lg transition-colors">
              <Plus className="w-5 h-5 text-indigo-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg-muted)]/50 border border-[var(--border)] rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full text-left p-3 rounded-2xl flex items-center gap-3 transition-all",
                selectedChat.id === chat.id 
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                  : "hover:bg-[var(--bg-muted)] text-[var(--text-primary)]"
              )}
            >
              <div className="relative flex-shrink-0">
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg border-2",
                  selectedChat.id === chat.id ? "bg-white/20 border-white/30" : "bg-indigo-100 border-white"
                )}>
                  {chat.isSystem ? <ShieldCheck className="w-5 h-5" /> : chat.name.charAt(0)}
                </div>
                {chat.unread > 0 && selectedChat.id !== chat.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-[var(--bg-surface)] flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-black truncate">{chat.name}</span>
                  <span className={cn(
                    "text-[10px] font-bold",
                    selectedChat.id === chat.id ? "text-white/70" : "text-[var(--text-secondary)]"
                  )}>{chat.time}</span>
                </div>
                <p className={cn(
                  "text-[11px] truncate leading-tight opacity-70",
                  selectedChat.id === chat.id ? "text-white" : "text-[var(--text-secondary)]"
                )}>
                  {chat.lastMsg}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-lg">
              {selectedChat.isSystem ? <ShieldCheck className="w-5 h-5" /> : selectedChat.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-black text-[var(--text-primary)] leading-none">{selectedChat.name}</h3>
              <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-widest">Online Now</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-[var(--bg-muted)] rounded-lg transition-colors"><Phone className="w-4 h-4 text-[var(--text-secondary)]" /></button>
            <button className="p-2 hover:bg-[var(--bg-muted)] rounded-lg transition-colors"><Video className="w-4 h-4 text-[var(--text-secondary)]" /></button>
            <div className="w-px h-6 bg-[var(--border)] mx-1" />
            <button className="p-2 hover:bg-[var(--bg-muted)] rounded-lg transition-colors"><Settings className="w-4 h-4 text-[var(--text-secondary)]" /></button>
            <button className="p-2 hover:bg-[var(--bg-muted)] rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-[var(--text-secondary)]" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--bg-muted)]/10">
          <div className="flex flex-col gap-4">
             <div className="flex justify-center">
                <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-[var(--border)] rounded-full text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider">Today, March 28</span>
             </div>

             {/* System Message */}
             <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0"><ShieldCheck className="w-4 h-4" /></div>
                <div className="space-y-1">
                   <div className="p-3 bg-white dark:bg-slate-800 border border-[var(--border)] rounded-2xl rounded-tl-none shadow-sm">
                      <p className="text-xs font-bold text-indigo-500 mb-1 tracking-widest uppercase text-[9px]">Admin Notification</p>
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                        Notice: We have implemented the new organization tree visualization. Please check the People & Access page to view your network hierarchy.
                      </p>
                   </div>
                   <span className="text-[9px] font-bold text-[var(--text-muted)] ml-1">10:24 AM</span>
                </div>
             </div>

             {/* User Message */}
             <div className="flex flex-row-reverse gap-3 max-w-[80%] self-end">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shrink-0">B</div>
                <div className="space-y-1 flex flex-col items-end">
                   <div className="p-3 bg-indigo-600 text-white rounded-2xl rounded-tr-none shadow-lg shadow-indigo-600/10">
                      <p className="text-sm leading-relaxed">
                        Thanks Alex! The new UI looks amazing. I am testing the tree view now.
                      </p>
                   </div>
                   <span className="text-[9px] font-bold text-[var(--text-muted)] mr-1">10:30 AM · Read</span>
                </div>
             </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 bg-[var(--bg-muted)]/50 border border-[var(--border)] rounded-2xl p-1.5 pr-2">
            <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all"><Plus className="w-5 h-5 text-[var(--text-secondary)]" /></button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-[var(--text-primary)]"
            />
            <Button size="sm" className="rounded-xl px-4 py-2 gap-2">
              Send
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
