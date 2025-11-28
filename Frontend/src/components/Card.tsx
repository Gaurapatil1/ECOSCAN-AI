import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: boolean;
}

export default function Card({ children, className = '', hoverScale = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverScale ? { scale: 1.05 } : {}}
      className={`bg-[#1A1A1A] rounded-xl p-6 shadow-xl border border-[#2A2A2A] ${className}`}
    >
      {children}
    </motion.div>
  );
}
