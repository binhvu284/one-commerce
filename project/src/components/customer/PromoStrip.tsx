'use client';

import { useEffect, useState } from 'react';
import { Gift, Sparkles, Truck } from 'lucide-react';

const MESSAGES = [
  { icon: Truck, text: 'Free shipping on orders over $150 — worldwide.' },
  { icon: Gift, text: 'Use code WELCOME10 for 10% off your first order.' },
  { icon: Sparkles, text: 'Spring Collection 2026 — now live.' },
];

export function PromoStrip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const { icon: Icon, text } = MESSAGES[i];

  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest">
        <Icon className="w-3.5 h-3.5 text-rose-400" />
        <span className="truncate">{text}</span>
      </div>
    </div>
  );
}
