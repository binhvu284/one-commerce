'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  DollarSign,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Zap,
  Construction,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  inDev?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'organizations', label: 'Organizations', href: '/admin/organizations', icon: <Building2 className="w-4 h-4" /> },
      { id: 'customers', label: 'Customers', href: '/admin/customers', icon: <Users className="w-4 h-4" />, inDev: true },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { id: 'reports', label: 'Reports', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" />, inDev: true },
      { id: 'revenue', label: 'Revenue', href: '/admin/revenue', icon: <DollarSign className="w-4 h-4" />, inDev: true },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" />, inDev: true },
      { id: 'security', label: 'Security', href: '/admin/security', icon: <Shield className="w-4 h-4" />, inDev: true },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Keyboard shortcut Cmd/Ctrl + B
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setCollapsed(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen flex-shrink-0 overflow-hidden"
      style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-[60px] flex-shrink-0 border-b border-white/5">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center shadow-lg">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <span className="text-white font-bold text-sm tracking-tight whitespace-nowrap">
                OneCommerce
              </span>
              <span className="block text-[10px] text-white/40 leading-none whitespace-nowrap">
                Admin Console
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Sections */}
      <div className="flex-1 overflow-y-auto py-3 space-y-1">
        {navSections.map((section) => (
          <div key={section.title} className="px-2">
            {/* Section title */}
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] uppercase font-semibold px-2 py-1.5 tracking-widest"
                  style={{ color: 'rgba(148,163,184,0.5)' }}
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.inDev ? '#' : item.href}
                      onClick={item.inDev ? (e) => e.preventDefault() : undefined}
                      className={cn(
                        'flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-150',
                        'relative group',
                        active
                          ? 'bg-[var(--bg-sidebar-active)] text-white'
                          : 'text-[var(--text-sidebar)] hover:bg-[var(--bg-sidebar-hover)] hover:text-white',
                        item.inDev && 'opacity-60 cursor-not-allowed'
                      )}
                    >
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-[var(--accent)]"
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        />
                      )}

                      <span className="flex-shrink-0">{item.icon}</span>

                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.12 }}
                            className="flex-1 whitespace-nowrap text-[13px] font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {!collapsed && item.inDev && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold uppercase tracking-wide flex-shrink-0"
                          >
                            Dev
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>

                    {/* Tooltip when collapsed */}
                    {collapsed && hoveredItem === item.id && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                        <div className="bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-2">
                          {item.label}
                          {item.inDev && (
                            <Construction className="w-3 h-3 text-amber-400" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="my-2 h-px bg-white/[0.04]" />
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex-shrink-0 border-t border-white/5 p-2">
        <div className={cn(
          'flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group',
        )}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-[12px] font-semibold text-white truncate">Super Admin</p>
                <p className="text-[10px] text-white/40 truncate">admin@onecommerce.io</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-1 rounded text-white/30 hover:text-white/70 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(v => !v)}
        className={cn(
          'absolute -right-3 top-[72px] z-10',
          'w-6 h-6 rounded-full border flex items-center justify-center',
          'bg-[var(--bg-surface)] border-[var(--border)]',
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]',
          'transition-all duration-150 shadow-token-sm cursor-pointer'
        )}
        title={`${collapsed ? 'Expand' : 'Collapse'} sidebar (Ctrl+B)`}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
