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
  Command,
  ChevronsUpDown,
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
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-300">
      {/* Brand & Org Switcher */}
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center gap-3 px-1 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20 overflow-hidden">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 min-w-0"
            >
              <h2 className="text-white font-black text-sm uppercase tracking-wider leading-none">OneCommerce</h2>
              <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Platform</p>
            </motion.div>
          )}
        </div>

        {/* Improved Org Switcher (Modern Function) */}
        {!isCollapsed ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 transition-colors cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/20 flex items-center justify-center">
              <span className="text-[10px] font-black text-indigo-400">BH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white truncate">BeautyHub VN</p>
              <p className="text-[9px] text-slate-500 font-medium">Enterprise Plan</p>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          </motion.div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer ring-offset-2 ring-offset-[#0f172a] hover:ring-2 ring-indigo-500/50">
               <span className="text-[10px] font-black text-indigo-400">BH</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-7 scrollbar-hide">
        {navSections.map((section) => (
          <div key={section.title}>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] uppercase font-black px-4 mb-3 tracking-[0.2em] text-slate-600"
                >
                  {section.title}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.inDev ? '#' : item.href}
                      onClick={item.inDev ? (e) => e.preventDefault() : undefined}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 relative',
                        active
                          ? 'bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-transparent text-white ring-1 ring-white/10'
                          : 'hover:bg-white/5 text-slate-400 hover:text-white',
                        item.inDev && 'opacity-60 cursor-not-allowed'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active-glow"
                          className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full"
                        />
                      )}
                      
                      <span className={cn(
                        'flex-shrink-0 transition-all duration-300',
                        active ? 'text-indigo-400 scale-110' : 'group-hover:text-white group-hover:scale-110'
                      )}>
                        {item.icon}
                      </span>

                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex-1 truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}

                      {!isCollapsed && item.inDev && (
                        <span className="text-[8px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Dev</span>
                      )}
                    </Link>

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && hoveredItem === item.id && (
                      <div className="fixed left-[72px] z-50">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-slate-900 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 whitespace-nowrap"
                        >
                          {item.label}
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

      {/* Footer (Quick Stats / Profile) */}
      <div className="flex-shrink-0 p-4 space-y-4">
        {!isCollapsed && (
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
             <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Storage</p>
                <p className="text-[10px] font-bold text-slate-400">85%</p>
             </div>
             <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                />
             </div>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl transition-all duration-300 group cursor-pointer hover:bg-white/5",
          isCollapsed && "justify-center"
        )}>
          <div className="relative flex-shrink-0">
             <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-[#0f172a] flex items-center justify-center overflow-hidden">
                   <User className="w-4.5 h-4.5 text-white" />
                </div>
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#0f172a]" />
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate">Super Admin</p>
              <p className="text-[10px] text-slate-500 truncate font-semibold">admin@onecommerce.io</p>
            </div>
          )}
          
          {!isCollapsed && (
            <Link 
              href="/"
              className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              title="Logout / Switch Context"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-4 top-4 bottom-4 w-[280px] z-[101] lg:hidden overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
            >
              <div className="h-full relative overflow-hidden">
                {sidebarContent}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <div className="relative hidden lg:block flex-shrink-0 z-40">
        <motion.aside
          animate={{ width: isCollapsed ? 76 : 260 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "h-screen overflow-hidden border-r border-white/5 bg-[#0f172a] relative",
            isCollapsed && "items-center"
          )}
        >
          {sidebarContent}

          {/* Toggle Button - Now inside the sidebar */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'absolute right-2 top-6 z-50',
              'w-7 h-7 rounded-lg border flex items-center justify-center',
              'bg-[#1e293b]/50 border-white/5 shadow-lg backdrop-blur-sm',
              'text-slate-400 hover:text-white hover:border-indigo-500/50 text-[10px]',
              'transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95',
              isCollapsed && "right-1/2 translate-x-1/2"
            )}
            title={isCollapsed ? "Expand (Ctrl+B)" : "Collapse (Ctrl+B)"}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </motion.aside>
      </div>
    </>
  );
}
