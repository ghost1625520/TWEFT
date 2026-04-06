'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SubpageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  pattern?: 'dots' | 'grid' | 'none';
  variant?: 'mist' | 'deep';
}

export function SubpageHero({ 
  title, 
  subtitle, 
  description, 
  className,
  pattern = 'dots',
  variant = 'mist'
}: SubpageHeroProps) {
  const isMist = variant === 'mist';

  return (
    <section className={cn(
      "relative pt-40 pb-24 overflow-hidden",
      isMist 
        ? "bg-gradient-to-br from-[#4D6270] via-[#3E5260] to-[#304450]"
        : "bg-dark",
      className
    )}>
      {/* Layered atmospheric backgrounds */}
      <div className="absolute inset-0 z-0">
        {/* Radial glow from bottom — like light through fog */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_140%,rgba(184,205,212,0.25),transparent_70%)]" />
        {/* Top mist veil */}
        <div className="absolute top-0 inset-x-0 h-2/3 bg-gradient-to-b from-[rgba(184,205,212,0.06)] to-transparent" />
        {/* Subtle left-side light */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(ellipse_at_0%_50%,rgba(184,205,212,0.08),transparent_60%)]" />

        {pattern === 'dots' && (
          <div 
            className="absolute inset-0 opacity-[0.08]" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(184,205,212,0.8) 1px, transparent 1px)', 
              backgroundSize: '44px 44px' 
            }} 
          />
        )}
        {pattern === 'grid' && (
          <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(184,205,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,205,212,0.5) 1px, transparent 1px)', 
              backgroundSize: '80px 80px' 
            }} 
          />
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {subtitle && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/15 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
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
                transition={{ duration: 0.08, delay: 0.3 + i * 0.04 }}
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
              className="text-lg text-white/55 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom gradient fade into content */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F4F1EC]/20 to-transparent" />
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
