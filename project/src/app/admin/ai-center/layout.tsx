import { motion } from 'framer-motion';

export default function AICenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full">
      {children}
    </div>
  );
}
