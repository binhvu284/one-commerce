'use client';

import { useState } from 'react';
import { 
  Share2, 
  Users, 
  TrendingUp,
  Award,
  UserPlus,
  LayoutList,
  Network,
  Maximize2,
  MoreVertical,
  Eye,
  Trash2,
  Mail,
  User,
  AlertCircle,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { AffiliateTree } from '@/components/business/affiliate/AffiliateTree';
import { useBusinessRole } from '@/components/providers/RoleProvider';

// Mock Data for the MVP
const MOCK_REFERRER = {
  name: 'Sarah Connor',
  email: 'sarah.c@sky.net',
  avatar: null,
  role: 'OWNER'
};

const MOCK_F1_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN', joinDate: '2024-03-01', children: [] },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'STAFF', joinDate: '2024-03-15', children: [
    { id: '5', name: 'Alice Wong', email: 'alice@example.com', role: 'STAFF', joinDate: '2024-03-20' }
  ] },
  { id: '3', name: 'Mike Ross', email: 'mike@pearson.com', role: 'STAFF', joinDate: '2024-03-20', children: [] },
];

const MAX_F1 = 4;

export default function AffiliatePage() {
  const { role, isAdmin, isOwner } = useBusinessRole();
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('tree');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const isF1Full = MOCK_F1_MEMBERS.length >= MAX_F1;

  return (
    <div className={cn(
      "space-y-8 max-w-7xl mx-auto pb-20 transition-all duration-500",
      isFullScreen && "fixed inset-0 z-[200] bg-slate-50 dark:bg-slate-950 p-4 overflow-hidden max-w-none pb-4"
    )}>
      {/* Header - Hidden in Full Screen */}
      {!isFullScreen && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.2em] text-[10px]">
              <Share2 className="w-3.5 h-3.5" />
              Social Growth Engine
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Member</h1>
            <p className="text-slate-500 font-medium">Manage your network hierarchy and referral connections.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowInviteModal(true)}
              className={cn(
                "rounded-2xl h-12 px-8 font-black shadow-lg transition-all",
                isF1Full 
                  ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
              )}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {isF1Full ? 'Slots Full (4/4)' : 'Invite New Member'}
            </Button>
          </div>
        </div>
      )}

      {/* Main Grid - Hidden in Full Screen */}
      {!isFullScreen && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Referrer & F1 List */}
          <div className="lg:col-span-1 space-y-8">
            {/* My Referrer */}
            <section className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 text-center lg:text-left">My Referrer</h3>
              {MOCK_REFERRER ? (
                <div className="p-5 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <User className="w-20 h-20 -mr-6 -mt-6" />
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black">
                      {MOCK_REFERRER.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black truncate">{MOCK_REFERRER.name}</p>
                      <p className="text-[11px] text-blue-100 font-medium truncate">{MOCK_REFERRER.email}</p>
                    </div>
                    <div className="text-[8px] font-black bg-white/20 px-2 py-1 rounded-full uppercase tracking-widest leading-none">
                      {MOCK_REFERRER?.role || 'SYSTEM'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-slate-400 italic">No Referrer (Direct Signup)</p>
                </div>
              )}
            </section>

            {/* Direct F1 List */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Referrals (F1)</h3>
                <span className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-full",
                  isF1Full ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                )}>
                  {MOCK_F1_MEMBERS.length}/{MAX_F1}
                </span>
              </div>
              
              <div className="space-y-3">
                {MOCK_F1_MEMBERS.map(member => (
                  <div key={member.id} className="p-4 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center font-black text-slate-400 group-hover:text-blue-500 transition-colors">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black truncate text-slate-900 dark:text-white">{member.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium truncate">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                
                {/* Available Slots */}
                {Array.from({ length: MAX_F1 - MOCK_F1_MEMBERS.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-4 rounded-3xl border-2 border-dashed border-slate-100 dark:border-white/5 flex items-center justify-center">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Available Slot</p>
                  </div>
                ))}

                {isF1Full && (
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold leading-tight">Max F1 limit reached. You can no longer invite new members directly.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    viewMode === 'list' ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <LayoutList className="w-3.5 h-3.5" />
                  Card List
                </button>
                <button 
                  onClick={() => setViewMode('tree')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    viewMode === 'tree' ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Network className="w-3.5 h-3.5" />
                  Hierarchy Tree
                </button>
              </div>

              <button 
                onClick={() => setIsFullScreen(true)}
                className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden min-h-[600px] relative shadow-2xl">
              <AnimatePresence mode="wait">
                {viewMode === 'list' ? (
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 space-y-4 h-full overflow-y-auto"
                  >
                    {MOCK_F1_MEMBERS.map(member => (
                      <MemberListItem key={member.id} member={member} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="tree"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-[600px] w-full bg-slate-900 relative"
                  >
                    <AffiliateTree />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen View */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-full w-full flex flex-col bg-slate-950 rounded-[2rem] shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <div>
                   <h2 className="text-xl font-black text-white">Advanced Hierarchy Viewer</h2>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Network Map • Auto-Layout Enabled</p>
                </div>
              </div>
              <button 
                onClick={() => setIsFullScreen(false)}
                className="p-3 bg-white/5 rounded-2xl text-white hover:bg-red-500/20 hover:text-red-500 transition-all font-black text-xs flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                EXIT
              </button>
            </div>
            <div className="flex-1 relative">
               <AffiliateTree />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MemberListItem({ member }: { member: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-2">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-blue-500/30 transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center font-black shadow-sm group-hover:text-blue-500 transition-colors">
            {member?.name?.charAt(0) || '?'}
          </div>
          <div>
            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{member.name}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Joined {member.joinDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest",
            member.role === 'ADMIN' ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400"
          )}>
            {member.role}
          </div>
          <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isExpanded && "rotate-180")} />
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-8 space-y-2 border-l-2 border-slate-100 dark:border-white/5 ml-5 mt-1"
          >
            {member.children && member.children.length > 0 ? (
              member.children.map((child: any) => (
                <div key={child.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-white/2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center text-[10px] font-black">
                      {child?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 dark:text-white">{child.name}</p>
                      <p className="text-[9px] text-slate-500 font-medium">{child.email}</p>
                    </div>
                  </div>
                  <div className="text-[7px] font-black bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded-full uppercase tracking-widest opacity-60">
                    {child.role}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/2 text-[10px] text-slate-400 font-bold italic text-center">
                No sub-members found.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
