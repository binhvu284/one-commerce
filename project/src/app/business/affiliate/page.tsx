'use client';

import { useState } from 'react';
import { 
  Share2, 
  Copy, 
  QrCode, 
  Link as LinkIcon, 
  Users, 
  TrendingUp,
  Award,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { AffiliateTree } from '@/components/business/affiliate/AffiliateTree';
import { useBusinessRole } from '@/components/providers/RoleProvider';

export default function AffiliatePage() {
  const { role, isAdmin } = useBusinessRole();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const referCode = "ONE-BUSINESS-2024";
  const inviteLink = `https://onecommerce.vn/signup?ref=${referCode}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-[10px]">
            <Share2 className="w-3.5 h-3.5" />
            Social Growth Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Member</h1>
          <p className="text-slate-500 font-medium">Track your network growth and referral hierarchy (F1 & F2).</p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setShowInviteModal(true)}
            className="rounded-2xl bg-blue-600 hover:bg-blue-700 h-12 px-8 font-black shadow-lg shadow-blue-500/20"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite New Member
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xl space-y-4">
           <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                 <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
           </div>
           <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Direct Referrals (F1)</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">24 Members</h3>
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xl space-y-4">
           <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                 <GitBranch className="w-5 h-5" />
              </div>
           </div>
           <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Sub-network (F2)</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">156 Members</h3>
           </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xl space-y-4">
           <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                 <Award className="w-5 h-5" />
              </div>
           </div>
           <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Commission Tier</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Gold Affiliate</h3>
           </div>
        </div>
      </div>

      {/* Visual Tree Engine */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Organizational Visualization
           </h2>
           {isAdmin && (
             <span className="text-[10px] text-blue-500 font-bold bg-blue-500/10 px-3 py-1 rounded-full">
                Admin Mode: Full Structure Access
             </span>
           )}
        </div>
        <AffiliateTree />
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowInviteModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-white/10 space-y-8"
            >
              <div className="text-center space-y-2">
                 <h3 className="text-2xl font-black tracking-tight">Expand Your Network</h3>
                 <p className="text-slate-500 font-medium">Share your unique credentials to grow your organization.</p>
              </div>

              <div className="space-y-4">
                 {/* Refer Code */}
                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 px-1">Your Referral Code</p>
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all">
                       <span className="flex-1 px-4 text-sm font-black tracking-widest">{referCode}</span>
                       <Button 
                         onClick={() => handleCopy(referCode)}
                         className="rounded-xl h-10 px-4 bg-white dark:bg-white/10 text-slate-800 dark:text-white border-0 shadow-sm"
                       >
                          {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
                       </Button>
                    </div>
                 </div>

                 {/* Invite Link */}
                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 px-1">Direct Invite Link</p>
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-transparent hover:border-purple-500/30 transition-all">
                       <span className="flex-1 px-4 text-xs font-bold text-slate-500 truncate">{inviteLink}</span>
                       <Button 
                         onClick={() => handleCopy(inviteLink)}
                         className="rounded-xl h-10 px-4 bg-white dark:bg-white/10 text-slate-800 dark:text-white border-0 shadow-sm"
                       >
                          <LinkIcon className="w-4 h-4" />
                       </Button>
                    </div>
                 </div>

                 {/* QR Code Placeholder */}
                 <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/10 space-y-4">
                    <div className="w-32 h-32 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                       <QrCode className="w-full h-full text-slate-900" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scan to join the organization</p>
                 </div>
              </div>

              <Button 
                onClick={() => setShowInviteModal(false)}
                className="w-full rounded-2xl h-14 bg-slate-900 dark:bg-white dark:text-black font-black uppercase tracking-widest text-[11px]"
              >
                Close & Continue
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Fixed missing icon from imports
import { GitBranch } from 'lucide-react';
