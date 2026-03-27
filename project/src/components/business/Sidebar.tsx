'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  User,
  X,
  CreditCard,
  ExternalLink,
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
    title: 'Operations',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/business/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'orders', label: 'Orders', href: '/business/orders', icon: <ShoppingBag className="w-4 h-4" />, inDev: true },
      { id: 'products', label: 'Products', href: '/business/products', icon: <Package className="w-4 h-4" />, inDev: true },
    ],
  },
  {
    title: 'Growth',
    items: [
      { id: 'crm', label: 'Customers', href: '/business/customers', icon: <Users className="w-4 h-4" />, inDev: true },
      { id: 'finance', label: 'Finance', href: '/business/finance', icon: <CreditCard className="w-4 h-4" />, inDev: true },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { id: 'organization', label: 'My Organization', href: '/business/settings/organization', icon: <Settings className="w-4 h-4" /> },
    ],
  },
];

export function Sidebar() {
  const { isCollapsed, setIsCollapsed, isOpen, setIsOpen } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1e1b4b] text-indigo-100">
      {/* Brand */}
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center gap-3 px-1 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/20 ring-1 ring-white/20 overflow-hidden">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 min-w-0"
            >
              <h2 className="text-white font-black text-sm uppercase tracking-wider leading-none">Commerce</h2>
              <p className="text-[10px] text-violet-400 font-bold mt-1 uppercase tracking-widest leading-none">Workspace</p>
            </motion.div>
          )}
        </div>

        {/* View Store (Modern Function) */}
        {!isCollapsed && (
          <Link href="/customer" target="_blank" className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/40 transition-all cursor-pointer group mb-6">
             <div className="flex items-center gap-2 min-w-0">
                <ShoppingBag className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white truncate">Open Storefront</span>
             </div>
             <ExternalLink className="w-3.5 h-3.5 text-violet-500 group-hover:text-white transition-colors" />
          </Link>
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
                  className="text-[10px] uppercase font-black px-4 mb-3 tracking-[0.2em] text-violet-500"
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
                          ? 'bg-violet-500/20 text-white ring-1 ring-violet-400/30'
                          : 'hover:bg-white/5 text-indigo-300 hover:text-white',
                        item.inDev && 'opacity-60 cursor-not-allowed'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active-dot"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]"
                        />
                      )}
                      
                      <span className={cn(
                        'flex-shrink-0 transition-all duration-300',
                        active ? 'text-violet-400 scale-110' : 'group-hover:text-white group-hover:scale-110'
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
                        <span className="text-[8px] bg-indigo-900/50 text-indigo-400 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Dev</span>
                      )}
                    </Link>

                    {isCollapsed && hoveredItem === item.id && (
                      <div className="fixed left-[72px] z-50">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-indigo-950 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 whitespace-nowrap"
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

      {/* Footer Profile */}
      <div className="flex-shrink-0 p-4 border-t border-white/5 bg-black/[0.1]">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl transition-all duration-300 group cursor-pointer hover:bg-white/5",
          isCollapsed && "justify-center"
        )}>
          <div className="relative flex-shrink-0">
             <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 p-[1px]">
                <div className="w-full h-full rounded-[11px] bg-indigo-950 flex items-center justify-center overflow-hidden">
                   <User className="w-4.5 h-4.5 text-white" />
                </div>
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#1e1b4b]" />
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-white truncate leading-tight">Business User</p>
              <p className="text-[10px] text-indigo-400 truncate font-semibold leading-tight">Growth Workspace</p>
            </div>
          )}
          
          {!isCollapsed && (
            <Link 
              href="/"
              className="p-1.5 text-indigo-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
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
      {/* Mobile Drawer (Same as Admin but with business colors) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md z-[100] lg:hidden"
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
                  className="absolute top-4 right-4 p-2 text-indigo-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <div className="relative hidden lg:block flex-shrink-0 z-40 h-full">
        <motion.aside
          animate={{ width: isCollapsed ? 76 : 260 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="h-full overflow-hidden border-r border-white/5 relative"
        >
          {sidebarContent}

          {/* Toggle Button - Now inside */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'absolute right-2 top-6 z-50',
              'w-7 h-7 rounded-lg border flex items-center justify-center',
              'bg-[#1e1b4b]/50 border-white/5 shadow-lg backdrop-blur-sm',
              'text-indigo-400 hover:text-white hover:border-violet-500/50 text-[10px]',
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
