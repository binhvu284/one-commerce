'use client';

import { AffiliateTree } from '@/components/business/affiliate/AffiliateTree';
import { GitBranch, Info, Share2, Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function AffiliatePage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 mb-1">
            <GitBranch className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Network</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">Organization Tree</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            Visualize your entire affiliate network up to 5 levels deep. Track performance and network growth in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Report
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export SVG
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Maximize2 className="w-4 h-4" />
            Full Screen
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-1 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm"
          >
            <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-4">Tree Statistics</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Members', value: '28', color: 'text-indigo-500' },
                { label: 'Total Revenue', value: '$1.25M', color: 'text-emerald-500' },
                { label: 'Max Depth', value: '5/5 Levels', color: 'text-amber-500' },
                { label: 'Avg Width', value: '3.4 F1s', color: 'text-blue-500' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center group">
                  <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{stat.label}</span>
                  <span className={`text-sm font-black ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="p-5 rounded-3xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">Navigation Pro-tip</p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-300 leading-relaxed">
                  Use your mouse wheel to zoom. Click and drag to pan across the organization tree. Click on a node to see detailed stats.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 min-h-[600px] flex flex-col">
          <AffiliateTree />
        </div>
      </div>
    </div>
  );
}
