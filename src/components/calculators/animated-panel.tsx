import { motion } from 'framer-motion';

interface AnimatedPanelProps {
  children: React.ReactNode;
}

export function AnimatedPanel({ children }: AnimatedPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
} 