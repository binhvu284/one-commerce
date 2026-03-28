'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ChevronRight, 
  X, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { cn } from '@/lib/cn';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Admin',
  '/admin/dashboard': 'Dashboard',
  '/admin/organizations': 'Organizations',
  '/admin/ai-center/configurations': 'Configurations',
  '/admin/ai-center/analytics': 'Analytics',
  '/admin/ai-center/playground': 'Playground',
  '/admin/api-tokens': 'API Tokens',
  '/admin/mcp': 'MCP Servers',
  '/admin/database': 'Database',
  '/business/dashboard': 'Dashboard',
  '/business/people': 'People & Access',
  '/business/wallet': 'My Wallet',
  '/business/affiliate': 'My Member',
};

function getBreadcrumbs(pathname: string, searchParams?: URLSearchParams) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let current = '';
  
  for (const part of parts) {
    current += '/' + part;
    if (part === 'ai-center') continue;
    
    // Attempt mapping
    let label = breadcrumbMap[current] ?? (part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '));
    crumbs.push({ label, href: current });
  }

  // Handle lab subpage in Playground
  if (pathname.includes('/playground') && searchParams?.get('tab')) {
    const tab = searchParams.get('tab');
    const labLabel = tab === 'chat' ? 'AI Chat Lab' : 
                     tab === 'voice' ? 'Voice Lab' : 
                     tab === 'agent' ? 'Agent Lab' : 
                     tab === 'customer' ? 'Customer Sim' : null;
    if (labLabel) {
      crumbs.push({ label: labLabel, href: `${pathname}?tab=${tab}` });
    }
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
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const isAdmin = pathname.startsWith('/admin');
  const baseRoute = isAdmin ? '/admin' : '/business';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 h-[64px] border-b border-[var(--border)] bg-[var(--bg-surface)] backdrop-blur-md bg-opacity-80 sticky top-0 z-30">
      {/* Left: Menu Toggle (Mobile) + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 -ml-2 text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Suspense fallback={<div className="h-4 w-32 bg-[var(--bg-muted)] animate-pulse rounded-full opacity-50" />}>
           <BreadcrumbsWrapper />
        </Suspense>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <div className={cn(
            'flex items-center gap-2 h-9 px-3 rounded-xl border transition-all duration-300',
            'text-[var(--text-muted)] bg-[var(--bg-muted)]',
            searchFocused ? 'border-[var(--accent)] ring-4 ring-[var(--accent)]/10 w-64' : 'border-[var(--border)] w-44'
          )}>
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-xs outline-none text-[var(--text-primary)]"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center border-l border-[var(--border)] ml-1 pl-2 gap-2">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] transition-all">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
             <button onClick={() => setNotifOpen(!notifOpen)} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[var(--bg-surface)]" />}
             </button>
             {notifOpen && (
               <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 border-b border-[var(--border)] bg-[var(--bg-muted)]/50">
                    <h3 className="text-sm font-bold">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border)]">
                    {mockNotifications.map(n => (
                      <div key={n.id} className="p-4 hover:bg-[var(--bg-muted)] cursor-pointer">
                        <p className="text-sm font-bold">{n.title}</p>
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="group flex items-center gap-2 p-1 pl-1 pr-2 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--bg-muted)]/50 transition-all cursor-pointer"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black shadow-lg",
                isAdmin ? "bg-indigo-600" : "bg-emerald-600"
              )}>
                {isAdmin ? 'SA' : 'BU'}
              </div>
              <div className="hidden sm:block text-left">
                 <p className="text-[11px] font-bold text-[var(--text-primary)] leading-none mb-0.5">{isAdmin ? 'Super Admin' : 'Business User'}</p>
                 <div className="flex items-center gap-1">
                    <span className={cn(
                      "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full ring-1",
                      isAdmin ? "bg-indigo-500/10 text-indigo-500 ring-indigo-500/30" : "bg-emerald-500/10 text-emerald-500 ring-emerald-500/30"
                    )}>
                       {isAdmin ? 'Admin Root' : 'Owner'}
                    </span>
                 </div>
              </div>
              <ChevronDown className={cn("w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-300", profileOpen && "rotate-180")} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                 <div className="px-4 py-2 border-b border-[var(--border)] mb-2">
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Account</p>
                    <p className="text-xs font-bold text-[var(--text-primary)] truncate">binh.le@onecommerce.vn</p>
                 </div>
                 
                 <Link 
                   href={`${baseRoute}/profile`}
                   onClick={() => setProfileOpen(false)}
                   className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-blue-500 hover:bg-blue-500/5 transition-all"
                 >
                    <User className="w-4 h-4" />
                    My Profile
                 </Link>
                 
                 <Link 
                   href={`${baseRoute}/settings`}
                   onClick={() => setProfileOpen(false)}
                   className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-blue-500 hover:bg-blue-500/5 transition-all"
                 >
                    <Settings className="w-4 h-4" />
                    Account Settings
                 </Link>

                 <div className="h-px bg-[var(--border)] my-2" />

                 <Link 
                   href="/"
                   className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-all"
                 >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                 </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function BreadcrumbsWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const breadcrumbs = getBreadcrumbs(pathname, searchParams);

  return (
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
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hidden md:block'
              )}
            >
              {crumb.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
