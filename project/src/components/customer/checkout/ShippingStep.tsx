'use client';

import { ArrowRight } from 'lucide-react';
import { ShippingAddress } from '@/lib/types/cart';
import { cn } from '@/lib/cn';
import { useState } from 'react';

interface Props {
  value: ShippingAddress;
  onChange: (value: ShippingAddress) => void;
  onNext: () => void;
}

const FIELDS: Array<{
  key: keyof ShippingAddress;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  span?: 'full' | 'half';
}> = [
  { key: 'fullName', label: 'Full name', placeholder: 'Jane Doe', required: true },
  { key: 'email', label: 'Email', placeholder: 'jane@example.com', type: 'email', required: true },
  { key: 'phone', label: 'Phone', placeholder: '+84 912 345 678', required: true, span: 'half' },
  { key: 'country', label: 'Country', placeholder: 'Vietnam', required: true, span: 'half' },
  { key: 'line1', label: 'Address line 1', placeholder: '123 Nguyen Hue', required: true },
  { key: 'line2', label: 'Address line 2 (optional)', placeholder: 'Apartment, suite, etc.' },
  { key: 'city', label: 'City', placeholder: 'Ho Chi Minh City', required: true, span: 'half' },
  { key: 'state', label: 'State / Province', placeholder: 'District 1', required: true, span: 'half' },
  { key: 'postalCode', label: 'Postal code', placeholder: '700000', required: true, span: 'half' },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ShippingStep({ value, onChange, onNext }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    for (const f of FIELDS) {
      if (f.required && !value[f.key]?.toString().trim()) {
        next[f.key] = 'Required';
      }
    }
    if (value.email && !emailRegex.test(value.email)) {
      next.email = 'Invalid email';
    }
    if (value.phone && !/^[+0-9\s()-]{7,}$/.test(value.phone)) {
      next.phone = 'Invalid phone';
    }
    setErrors(next);
    if (Object.keys(next).length === 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <div
            key={f.key}
            className={cn(
              'space-y-1.5',
              f.span === 'half' ? 'sm:col-span-1' : 'sm:col-span-2'
            )}
          >
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {f.label}
            </label>
            <input
              type={f.type ?? 'text'}
              value={value[f.key] ?? ''}
              onChange={(e) =>
                onChange({ ...value, [f.key]: e.target.value })
              }
              placeholder={f.placeholder}
              className={cn(
                'w-full h-12 rounded-2xl border-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:border-rose-500',
                errors[f.key] ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              )}
            />
            {errors[f.key] && (
              <p className="text-[10px] font-bold text-rose-500">{errors[f.key]}</p>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-rose-500 transition-colors shadow-lg shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
      >
        Continue to delivery
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
