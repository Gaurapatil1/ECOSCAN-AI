import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'red' | 'yellow' | 'outline';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'red',
  onClick,
  type = 'button',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300';

  const variants = {
    red: 'bg-[#FF3B30] text-white hover:bg-[#FF5247] shadow-lg hover:shadow-xl',
    yellow: 'bg-[#FFD60A] text-[#0D0D0D] hover:bg-[#FFE347] shadow-lg hover:shadow-xl',
    outline: 'border-2 border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
