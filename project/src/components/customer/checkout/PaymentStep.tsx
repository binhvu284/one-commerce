'use client';

import { AlertCircle, Check, CreditCard, Loader2, Lock, Wallet } from 'lucide-react';
import { PaymentMethod } from '@/lib/types/cart';
import { cn } from '@/lib/cn';

interface Props {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  submitting: boolean;
  error: string | null;
}

export function PaymentStep({
  value,
  onChange,
  onBack,
  onPlaceOrder,
  submitting,
  error,
}: Props) {
  const options: {
    id: PaymentMethod;
    label: string;
    description: string;
    icon: typeof CreditCard;
  }[] = [
    {
      id: 'vnpay',
      label: 'VNPay',
      description: 'Pay securely with VNPay (sandbox simulation)',
      icon: CreditCard,
    },
    {
      id: 'cod',
      label: 'Cash on Delivery',
      description: 'Pay in cash when your order arrives',
      icon: Wallet,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
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
                  {selected && <Check className="w-4 h-4 text-rose-500" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {value === 'vnpay' && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 text-xs text-slate-500">
          <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            This is a simulated VNPay flow. Placing the order will run a mock
            payment call (~1.2s) and return a transaction ID.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 text-xs text-rose-600 border border-rose-100">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex-1 h-14 rounded-2xl border-2 border-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs hover:border-slate-300 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={submitting}
          className="flex-[2] h-14 rounded-2xl bg-rose-500 text-white font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            <>Place order</>
          )}
        </button>
      </div>
    </div>
  );
}
