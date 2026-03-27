'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Sun, Moon, ChevronRight, X, Menu } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { cn } from '@/lib/cn';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Admin',
  '/admin/dashboard': 'Dashboard',
  '/admin/organizations': 'Organizations',
  '/admin/customers': 'Customers',
  '/admin/reports': 'Reports',
  '/admin/revenue': 'Revenue',
  '/admin/settings': 'Settings',
  '/admin/security': 'Security',
};

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let current = '';
  for (const part of parts) {
    current += '/' + part;
    const label = breadcrumbMap[current] ?? part.charAt(0).toUpperCase() + part.slice(1);
    crumbs.push({ label, href: current });
  }
  return crumbs;
}

const mockNotifications = [
  { id: 1, title: 'New organization registered', time: '2m ago', read: false },
  { id: 2, title: 'Plan upgrade: BeautyHub Vietnam', time: '1h ago', read: false },
  { id: 3, title: 'Payment received: $48,291', time: '3h ago', read: true },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { toggleMobile } = useSidebar();
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const breadcrumbs = getBreadcrumbs(pathname);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header
      className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-[60px] border-b border-[var(--border)] bg-[var(--bg-surface)] backdrop-blur-md bg-opacity-80 sticky top-0 z-30"
    >
      {/* Left: Menu Toggle (Mobile) + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 -ml-2 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-sm min-w-0 overflow-hidden">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div key={crumb.href} className="flex items-center gap-1.5 min-w-0">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />}
                <Link
                  href={crumb.href}
                  className={cn(
                    'truncate transition-colors duration-200',
                    isLast
                      ? 'font-bold text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hidden sm:block'
                  )}
                >
                  {crumb.label}
                </Link>
                {/* On mobile, show only the last breadcrumb clearly */}
                {isLast && (
                   <span className="sm:hidden font-bold text-[var(--text-primary)] truncate">
                     {crumb.label}
                   </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <div
            className={cn(
              'flex items-center gap-2 h-9 px-3 rounded-xl border transition-all duration-300',
              'text-[var(--text-muted)] bg-[var(--bg-muted)]',
              searchFocused
                ? 'border-[var(--accent)] ring-4 ring-[var(--accent)]/10 w-64'
                : 'border-[var(--border)] w-44 hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <Search className="w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search anything..."
              className="flex-1 bg-transparent text-sm outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] min-w-0"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {!searchFocused && (
              <div className="flex items-center gap-1 text-[10px] bg-[var(--bg-surface)] border border-[var(--border)] px-1.5 py-0.5 rounded-lg text-[var(--text-muted)] font-medium flex-shrink-0 shadow-sm">
                <span>⌘</span>
                <span>K</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] rounded-lg transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <div className="flex items-center border-l border-[var(--border)] ml-1 pl-1 md:ml-2 md:pl-2 gap-1 md:gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <button
              id="header-notifications-btn"
              onClick={() => setNotifOpen(v => !v)}
              className={cn(
                "relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer",
                notifOpen ? "bg-[var(--bg-muted)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
              )}
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[var(--bg-surface)]" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-token-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--bg-muted)]/50">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{unreadCount} unread</span>
                  )}
                </div>
                <div className="divide-y divide-[var(--border)] max-h-[360px] overflow-y-auto">
                  {mockNotifications.map(n => (
                    <div key={n.id} className={cn('px-5 py-4 hover:bg-[var(--bg-muted)] transition-colors cursor-pointer group relative', !n.read && 'bg-indigo-500/5')}>
                      {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />}
                      <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors">{n.title}</p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-1.5 font-medium">
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        {n.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3.5 border-t border-[var(--border)] bg-[var(--bg-muted)]/30">
                  <button className="text-xs text-indigo-500 hover:text-indigo-600 font-bold transition-colors w-full text-center">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            id="header-theme-toggle"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          {/* User Profile */}
          <div className="ml-1 flex items-center gap-2.5 p-1 pr-3 rounded-xl hover:bg-[var(--bg-muted)] transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-[var(--border)] group-hover:ring-indigo-500 transition-all shadow-md overflow-hidden">
              <span className="text-white text-xs font-black">SA</span>
            </div>
            <div className="hidden lg:block min-w-0">
               <p className="text-[11px] font-bold text-[var(--text-primary)] truncate leading-none mb-0.5">Super Admin</p>
               <p className="text-[9px] text-[var(--text-muted)] font-medium truncate leading-none">Standard Plan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
