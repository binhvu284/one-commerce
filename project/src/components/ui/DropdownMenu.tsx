'use client';

import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type RefObject,
} from 'react';
import { cn } from '@/lib/cn';

interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function DropdownMenu({ trigger, items, align = 'right', className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      <div onClick={() => setOpen(v => !v)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            'absolute top-full mt-1 z-40 min-w-[180px] py-1',
            'bg-[var(--bg-surface)] rounded-xl border border-[var(--border)]',
            'shadow-token-lg',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, idx) => (
            <div key={item.id}>
              {item.divider && idx > 0 && (
                <div className="my-1 h-px bg-[var(--border)]" />
              )}
              <button
                onClick={() => { item.onClick(); setOpen(false); }}
                disabled={item.disabled}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                  'transition-colors duration-100',
                  item.variant === 'danger'
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-muted)]',
                  'disabled:opacity-40 disabled:cursor-not-allowed'
                )}
              >
                {item.icon && (
                  <span className={cn(
                    'flex-shrink-0 w-4 h-4',
                    item.variant === 'danger' ? 'text-red-500' : 'text-[var(--text-secondary)]'
                  )}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
