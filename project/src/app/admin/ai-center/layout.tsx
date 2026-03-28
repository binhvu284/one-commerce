import { motion } from 'framer-motion';

export default function AICenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-white tracking-tight">AI Center</h1>
        <p className="text-slate-500 text-sm font-medium">Manage, track, and test your AI infrastructure.</p>
      </div>
      
      {children}
    </div>
  );
}
