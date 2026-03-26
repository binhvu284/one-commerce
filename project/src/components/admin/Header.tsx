'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, Sun, Moon, ChevronRight, X } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
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
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const breadcrumbs = getBreadcrumbs(pathname);
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header
      className="flex-shrink-0 flex items-center justify-between px-6 h-[60px] border-b border-[var(--border)] bg-[var(--bg-surface)] sticky top-0 z-30"
    >
      {/* Left: Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm min-w-0">
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.href} className="flex items-center gap-1.5 min-w-0">
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />}
            <span
              className={cn(
                'truncate',
                idx === breadcrumbs.length - 1
                  ? 'font-semibold text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hidden sm:block'
              )}
            >
              {crumb.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <div
            className={cn(
              'flex items-center gap-2 h-8 px-3 rounded-lg border transition-all duration-200',
              'text-[var(--text-muted)] bg-[var(--bg-muted)]',
              searchFocused
                ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20 w-52'
                : 'border-[var(--border)] w-40 hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <Search className="w-3.5 h-3.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-xs outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] min-w-0"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {!searchFocused && (
              <kbd className="text-[10px] bg-[var(--bg-surface)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-muted)] flex-shrink-0">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            id="header-notifications-btn"
            onClick={() => setNotifOpen(v => !v)}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-surface)]" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-token-lg z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <span className="text-xs text-[var(--accent)] font-medium">{unreadCount} unread</span>
                  )}
                  <button onClick={() => setNotifOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {mockNotifications.map(n => (
                  <div key={n.id} className={cn('px-4 py-3 hover:bg-[var(--bg-muted)] transition-colors cursor-pointer', !n.read && 'bg-[var(--accent-light)]')}>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{n.title}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-[var(--border)]">
                <button className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          id="header-theme-toggle"
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer ring-2 ring-[var(--border)] hover:ring-[var(--accent)] transition-all">
          <span className="text-white text-xs font-bold">SA</span>
        </div>
      </div>
    </header>
  );
}
