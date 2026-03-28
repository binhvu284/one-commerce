import { motion } from 'framer-motion';

export default function AICenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
