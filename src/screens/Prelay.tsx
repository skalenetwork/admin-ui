import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export default function Prelay({
  children,
  className = '',
}: { className?: string } & PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex h-full justify-center items-center text-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}
