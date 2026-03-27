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
  X,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useSidebar } from '@/components/providers/SidebarProvider';

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
  const { isCollapsed, setIsCollapsed, isOpen, setIsOpen } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Keyboard shortcut Cmd/Ctrl + B
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isCollapsed, setIsCollapsed]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-[60px] flex-shrink-0 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
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
                <span className="block text-[10px] text-white/40 leading-none whitespace-nowrap uppercase tracking-wider font-semibold">
                  Admin Console
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 -mr-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6 scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.title}>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] uppercase font-bold px-3 mb-2 tracking-[0.15em] text-white/30"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.id}
                    className="relative px-1"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.inDev ? '#' : item.href}
                      onClick={item.inDev ? (e) => e.preventDefault() : undefined}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative overflow-hidden',
                        active
                          ? 'bg-gradient-to-r from-white/[0.08] to-transparent text-white ring-1 ring-white/10'
                          : 'text-white/50 hover:text-white hover:bg-white/5',
                        item.inDev && 'opacity-60 cursor-not-allowed'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-[var(--accent)]"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      <span className={cn(
                        'flex-shrink-0 transition-transform duration-200',
                        active ? 'text-[var(--accent)] scale-110' : 'group-hover:scale-110 group-hover:text-white'
                      )}>
                        {item.icon}
                      </span>

                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
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

                      {!isCollapsed && item.inDev && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-bold uppercase tracking-wider flex-shrink-0">
                          Dev
                        </span>
                      )}
                    </Link>

                    {isCollapsed && hoveredItem === item.id && (
                      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-[100] pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-2xl ring-1 ring-white/10 flex items-center gap-2"
                        >
                          {item.label}
                          {item.inDev && <Construction className="w-2.5 h-2.5 text-amber-500" />}
                        </motion.div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile */}
      <div className="flex-shrink-0 p-4 border-t border-white/5 bg-white/[0.02]">
        <div className={cn(
          'flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer group',
          isCollapsed ? 'justify-center' : 'items-center'
        )}>
          <div className="flex-shrink-0 relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-[var(--accent)] transition-all overflow-hidden shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0f172a]" />
          </div>
          
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[12px] font-bold text-white truncate">Super Admin</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-white/20 hover:text-white transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
                <p className="text-[10px] text-white/40 truncate font-medium">admin@onecommerce.io</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#0f172a] z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 68 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative hidden lg:flex flex-col h-screen flex-shrink-0 overflow-hidden z-20"
        style={{ 
          background: '#0f172a', 
          borderRight: '1px solid rgba(255,255,255,0.06)' 
        }}
      >
        {sidebarContent}

        {/* Collapse toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'absolute -right-3 top-[72px] z-10',
            'w-6 h-6 rounded-full border flex items-center justify-center',
            'bg-[#1e293b] border-white/10 shadow-xl',
            'text-white/40 hover:text-white hover:border-[var(--accent)]',
            'transition-all duration-200 hover:scale-110 cursor-pointer'
          )}
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>
    </>
  );
}
