import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[#FFD60A] border-t-[#FF3B30] rounded-full"
      />
    </div>
  );
}
