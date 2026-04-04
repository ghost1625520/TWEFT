'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SubpageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  pattern?: 'dots' | 'grid' | 'none';
}

export function SubpageHero({ 
  title, 
  subtitle, 
  description, 
  className,
  pattern = 'dots'
}: SubpageHeroProps) {
  return (
    <section className={cn(
      "relative pt-40 pb-20 overflow-hidden bg-dark",
      className
    )}>
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(138,159,168,0.2),transparent)]" />
        {pattern === 'dots' && (
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        )}
        {pattern === 'grid' && (
          <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {subtitle && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent text-dark text-xs font-bold tracking-widest uppercase mb-6"
            >
              {subtitle}
            </motion.span>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.3 + i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/60 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Decorative Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
