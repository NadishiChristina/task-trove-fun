
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageTransition = ({
  children,
  className,
}: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({
  children,
  className,
  delay = 0,
}: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideUp = ({
  children,
  className,
  delay = 0,
}: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn = ({
  children,
  className,
  direction = 'left',
  delay = 0,
}: PageTransitionProps & { direction?: 'left' | 'right'; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({
  children,
  className,
  delay = 0,
}: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
