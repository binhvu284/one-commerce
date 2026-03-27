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
  Zap
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
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Key className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Security & Infrastructure</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-none">API Access Tokens</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-medium">
            Generate secure access tokens for external apps and services to interact with OneCommerce API.
          </p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Generate New Token
        </Button>
      </header>

      {/* Warning Box */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-start shadow-sm">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
           <p className="text-sm font-bold text-amber-500 uppercase tracking-widest text-[10px]">Security Requirement</p>
           <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
             Access tokens should be treated with the same sensitivity as your main password. Use tokens to connect to external MCP servers or mobile applications.
           </p>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-token-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-muted)]/50">
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Token Name</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Created</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Last Used</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {tokens.map((token) => (
                <tr key={token.id} className="group hover:bg-[var(--bg-muted)]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 shadow-sm border border-blue-500/10">
                        <Zap className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{token.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {token.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-muted)] text-xs font-medium italic">
                    {token.lastUsed || <span>Never used</span>}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={token.status === 'active' ? 'success' : 'neutral'} className="rounded-md uppercase text-[9px] font-black tracking-widest px-2 shadow-sm">
                      {token.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all hidden group-hover:inline-flex">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="group-hover:hidden text-[var(--text-muted)] opacity-20">•••</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl p-8 overflow-hidden"
            >
              {!generatedToken ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">New Access Token</h2>
                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">Give your token a descriptive name to remember where it is used.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Token Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Claude Desktop Connection" 
                      value={newTokenName}
                      onChange={(e) => setNewTokenName(e.target.value)}
                      className="w-full px-5 py-4 bg-[var(--bg-muted)] border border-[var(--border)] rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)] font-medium placeholder:text-[var(--text-muted)]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button onClick={handleCreateToken} className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black uppercase text-xs tracking-widest gap-2">
                      Generate Token
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight leading-none">Token Generated</h2>
                    <p className="text-sm text-[var(--text-secondary)] font-medium">Please copy your token now. You won't be able to see it again!</p>
                  </div>

                  <div className="relative group">
                    <div className="w-full p-6 bg-[var(--bg-muted)] border border-blue-500/30 rounded-2xl font-mono text-sm text-blue-600 dark:text-blue-400 break-all pr-12 text-left shadow-inner">
                      {generatedToken}
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blue-600/20 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl transition-all"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                     <p className="text-[10px] text-red-500 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        Unrecoverable Secret
                     </p>
                     <Button onClick={closeAndReset} variant="outline" className="w-full py-6 rounded-2xl border-[var(--border)] bg-[var(--bg-muted)] hover:bg-[var(--border)] font-black uppercase text-xs tracking-widest text-[var(--text-primary)]">
                        I've Saved the Token
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
