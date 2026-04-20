'use client';

import { ArrowRight, Check, Truck, Zap } from 'lucide-react';
import { DELIVERY_OPTIONS } from '@/lib/constants/delivery';
import { DeliveryOptionId } from '@/lib/types/cart';
import { cn } from '@/lib/cn';

interface Props {
  value: DeliveryOptionId;
  onChange: (value: DeliveryOptionId) => void;
  onNext: () => void;
  onBack: () => void;
}

const ICONS = {
  standard: Truck,
  express: Zap,
} as const;

export function DeliveryStep({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {DELIVERY_OPTIONS.map((opt) => {
          const Icon = ICONS[opt.id];
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                'w-full text-left p-5 rounded-3xl border-2 flex items-center gap-4 transition-all',
                selected
                  ? 'border-rose-500 bg-rose-50/40 shadow-lg shadow-rose-500/5'
                  : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                  selected ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900">
                    {opt.label}
                  </span>
                  {selected && (
                    <Check className="w-4 h-4 text-rose-500" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {opt.description} · {opt.etaDays}
                </p>
              </div>
              <span className="text-lg font-black tabular-nums shrink-0">
                ${opt.fee}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 h-14 rounded-2xl border-2 border-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs hover:border-slate-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-rose-500 transition-colors shadow-lg shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
        >
          Continue to payment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
