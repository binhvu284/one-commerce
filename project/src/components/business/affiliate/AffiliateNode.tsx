'use client';

import { Handle, Position } from '@xyflow/react';
import { Badge } from '@/components/ui/Badge';
import { BusinessRole } from '@/lib/types/business';
import { Shield, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/cn';

const roleConfig: Record<string, { label: string; variant: any }> = {
  OWNER: { label: 'Owner', variant: 'purple' },
  ADMIN: { label: 'Admin', variant: 'info' },
  STAFF: { label: 'Staff', variant: 'neutral' },
};

export function AffiliateNode({ data }: { data: any }) {
  const { name, avatar, role, totalRevenue, subordinateCount, status } = data;
  const config = roleConfig[role as BusinessRole];

  return (
    <div className={cn(
      "group relative p-4 rounded-2xl bg-[var(--bg-surface)] border-2 shadow-token-lg min-w-[240px] transition-all hover:scale-105 active:scale-95",
      status === 'active' ? "border-[var(--border)]" : "border-slate-300 opacity-60"
    )}>
      {/* Target handle for incoming edges (Top) */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white" />
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 p-0.5 border border-indigo-200">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover rounded-[14px]" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-indigo-700">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--bg-surface)]",
            status === 'active' ? "bg-emerald-500" : "bg-slate-400"
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-black text-[var(--text-primary)] truncate">{name}</span>
            <Shield className="w-3 h-3 text-indigo-500 opacity-50" />
          </div>
          <Badge variant={config.variant} size="sm" className="px-1.5 py-0 text-[9px] font-black uppercase">
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-4">
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1">
            <TrendingUp className="w-2.5 h-2.5" />
            Revenue
          </p>
          <p className="text-xs font-black text-emerald-600">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1">
            <Users className="w-2.5 h-2.5" />
            Network
          </p>
          <p className="text-xs font-black text-[var(--text-primary)]">{subordinateCount} subs</p>
        </div>
      </div>

      {/* Source handle for outgoing edges (Bottom) */}
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white" />
      
      {/* Decorative indicator for level depth */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[8px] font-black tracking-widest">
        L{data.level}
      </div>
    </div>
  );
}
