'use client';

import { useState } from 'react';
import { 
  Plus, 
  Key, 
  Copy, 
  Check, 
  Trash2, 
  AlertCircle, 
  ShieldCheck,
  Calendar,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

interface Token {
  id: string;
  name: string;
  createdAt: string;
  lastUsed: string | null;
  status: 'active' | 'revoked';
}

const mockTokens: Token[] = [
  { id: '1', name: 'Internal CRM Sync', createdAt: '2026-03-20', lastUsed: '2 hours ago', status: 'active' },
  { id: '2', name: 'Mobile App CI', createdAt: '2026-02-15', lastUsed: 'Yesterday', status: 'active' },
  { id: '3', name: 'Legacy Data Migrator', createdAt: '2026-01-10', lastUsed: '2 months ago', status: 'revoked' },
];

export default function ApiTokensPage() {
  const [tokens, setTokens] = useState<Token[]>(mockTokens);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCreateToken = () => {
    if (!newTokenName) return;
    
    // Generate a mock secure token
    const tokenValue = `oc_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setGeneratedToken(tokenValue);
    
    const newToken: Token = {
      id: Math.random().toString(36).substring(7),
      name: newTokenName,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      status: 'active',
    };
    
    setTokens([newToken, ...tokens]);
  };

  const copyToClipboard = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const closeAndReset = () => {
    setIsModalOpen(false);
    setGeneratedToken(null);
    setNewTokenName('');
    setIsCopied(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Key className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Security & Infrastructure</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">API Tokens</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-medium">
            Manage secure access tokens for external apps and services.
          </p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20 py-6 sm:py-5">
          <Plus className="w-4 h-4" />
          New Token
        </Button>
      </header>

      {/* Warning Box */}
      <div className="p-5 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex gap-4 items-start shadow-sm">
        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
        <div className="space-y-1">
           <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none">Security Warning</p>
           <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
             Treat tokens with the same sensitivity as passwords. Connect to external MCP servers or mobile applications securely.
           </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-token-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-muted)]/50">
                <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.15em] text-[var(--text-muted)]">Token Identity</th>
                <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.15em] text-[var(--text-muted)]">Created</th>
                <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.15em] text-[var(--text-muted)]">Activity</th>
                <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.15em] text-[var(--text-muted)]">Status</th>
                <th className="px-6 py-5 text-[10px] uppercase font-black tracking-[0.15em] text-[var(--text-muted)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {tokens.map((token) => (
                <tr key={token.id} className="group hover:bg-[var(--bg-muted)]/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/10">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{token.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[11px] font-bold">
                      <Calendar className="w-3.5 h-3.5 opacity-50" />
                      {token.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[var(--text-muted)] text-[11px] font-bold italic">
                    {token.lastUsed || <span>Never used</span>}
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={token.status === 'active' ? 'success' : 'neutral'} className="rounded-lg uppercase text-[9px] font-black tracking-[0.1em] px-2.5 py-1">
                      {token.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {tokens.map((token) => (
          <div key={token.id} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2rem] p-6 space-y-5 shadow-token-sm active:scale-[0.98] transition-transform">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/10">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--text-primary)] leading-tight">{token.name}</h3>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-0.5">ID: {token.id}</p>
                </div>
              </div>
              <Badge variant={token.status === 'active' ? 'success' : 'neutral'} className="rounded-lg uppercase text-[8px] font-black tracking-[0.1em] px-2 py-0.5">
                {token.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1 border-t border-[var(--border)]">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Created At</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)]">
                   <Calendar className="w-3.5 h-3.5 opacity-50" />
                   {token.createdAt}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest leading-none">Last Activity</p>
                <p className="text-xs font-bold text-[var(--text-secondary)] truncate italic">
                  {token.lastUsed || 'Never used'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
               <Button variant="outline" className="flex-1 py-4 rounded-xl text-[10px] font-black tracking-widest uppercase border-[var(--border)]">
                  Edit Name
               </Button>
               <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 active:bg-red-500 active:text-white transition-colors">
                  <Trash2 className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAndReset}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl p-7 md:p-10 overflow-hidden"
            >
              {!generatedToken ? (
                <div className="space-y-7">
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">New Secret Token</h2>
                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">Name your token to identify its usage in external applications.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Identity Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AWS Integration" 
                      value={newTokenName}
                      onChange={(e) => setNewTokenName(e.target.value)}
                      className="w-full px-6 py-5 bg-[var(--bg-muted)] border border-[var(--border)] rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 text-[var(--text-primary)] font-bold placeholder:text-[var(--text-muted)] transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <Button onClick={handleCreateToken} className="w-full py-7 rounded-[1.5rem] bg-blue-600 hover:bg-blue-500 font-black uppercase text-[11px] tracking-[0.2em] gap-2 shadow-xl shadow-blue-500/20">
                      Generate Secret
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-7 text-center">
                  <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-4 group animate-bounce">
                    <ShieldCheck className="w-10 h-10 text-blue-600" />
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">Token Ready</h2>
                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">Copy this token securely. It will be hidden forever after you close this.</p>
                  </div>

                  <div className="relative group">
                    <div className="w-full p-7 bg-[var(--bg-muted)] border-2 border-dashed border-blue-500/30 rounded-3xl font-mono text-sm text-blue-600 dark:text-blue-400 break-all pr-14 text-left shadow-inner">
                      {generatedToken}
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg active:scale-95 transition-all"
                    >
                      {isCopied ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
                    </button>
                  </div>

                  <div className="pt-4 flex flex-col gap-4">
                     <p className="text-[10px] text-red-500 font-black uppercase tracking-widest flex items-center justify-center gap-2 bg-red-500/5 py-3 rounded-xl border border-red-500/10">
                        <AlertCircle className="w-4 h-4 animate-pulse" />
                        Unrecoverable Security Secret
                     </p>
                     <Button onClick={closeAndReset} className="w-full py-6 rounded-[1.5rem] bg-[var(--text-primary)] text-[var(--bg-surface)] hover:bg-slate-800 font-black uppercase text-[10px] tracking-widest shadow-xl">
                        I've Stored the Token Securely
                     </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
