'use client';

import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  FileText, 
  Zap, 
  Shield, 
  Globe, 
  LifeBuoy,
  PlayCircle,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'getting-started', title: 'Getting Started', icon: Zap, count: 12, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'org-management', title: 'Org Management', icon: Shield, count: 8, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'store-setup', title: 'Storefront Setup', icon: Globe, count: 15, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'affiliate-program', title: 'Affiliate Program', icon: FileText, count: 6, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const popularArticles = [
  'How to invite new team members?',
  'Configuring custom domain names',
  'Understanding commission structures',
  'Managing high-volume orders',
  'Setting up workspace permissions',
];

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20 shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">Knowledge Base</span>
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-[var(--text-primary)] tracking-tight">How can we help?</h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium">Search our comprehensive guides, tutorials, and documentation.</p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search for articles, guides..." 
            className="w-full pl-16 pr-6 py-5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2rem] shadow-token-lg text-lg outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
             <kbd className="px-2 py-1 rounded bg-[var(--bg-muted)] text-[10px] font-black border border-[var(--border)] text-[var(--text-muted)]">⌘</kbd>
             <kbd className="px-2 py-1 rounded bg-[var(--bg-muted)] text-[10px] font-black border border-[var(--border)] text-[var(--text-muted)]">K</kbd>
          </div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] text-left hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <cat.icon className={`w-7 h-7 ${cat.color}`} />
            </div>
            <h3 className="text-xl font-black text-[var(--text-primary)] mb-1 tracking-tight">{cat.title}</h3>
            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">{cat.count} Articles</p>
          </motion.button>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Popular Articles */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">Popular Articles</h2>
            <button className="text-xs font-black uppercase text-indigo-500 tracking-widest border-b-2 border-indigo-500/20 hover:border-indigo-500 transition-all">View all</button>
          </div>
          <div className="space-y-3">
            {popularArticles.map((article, idx) => (
              <motion.button
                key={idx}
                className="w-full flex items-center justify-between p-5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl hover:bg-[var(--bg-muted)]/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{article}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </section>

        {/* Sidebar - Support/Resources */}
        <aside className="space-y-6">
          <div className="p-8 bg-indigo-500 text-white rounded-[2.5rem] space-y-6 shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000" />
            
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight">Need Direct Support?</h3>
              <p className="text-xs text-white/70 leading-relaxed font-medium">Our team is available 24/7 to help you with any technical issues or implementation challenges.</p>
            </div>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
              Contact Support
            </button>
          </div>

          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2rem] space-y-4">
            <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-4">Quick Resources</h3>
            {[
              { label: 'Video Tutorials', icon: PlayCircle },
              { label: 'FAQ Section', icon: HelpCircle },
              { label: 'API Reference', icon: ArrowUpRight },
            ].map((item, idx) => (
              <button key={idx} className="w-full flex items-center gap-3 p-2 hover:translate-x-1 transition-all">
                <item.icon className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold text-[var(--text-primary)]">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
