'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Shield, 
  Zap,
  Play,
  Users,
  Award,
  BookOpen,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Type Definitions ---
export type ModuleType = 'Hero' | 'Features' | 'Stats' | 'FAQ' | 'TextContent' | 'CTA' | 'LMSPreview' | 'VideoSection';

export interface ModuleData {
  id: string | number;
  type: ModuleType;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: string[] | any[];
  image?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  background?: 'white' | 'dark' | 'primary-light';
}

// --- Module Components ---

const HeroModule = ({ data }: { data: ModuleData }) => (
  <section className={cn(
    "relative py-32 overflow-hidden",
    data.background === 'dark' ? "bg-dark text-white" : "bg-white text-dark"
  )}>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {data.subtitle && (
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
              {data.subtitle}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            {data.title}
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl opacity-60 leading-relaxed max-w-2xl"
        >
          {data.content}
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="flex flex-wrap gap-4 pt-6"
        >
          {data.primaryAction && (
            <a href={data.primaryAction.href} className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20">
              {data.primaryAction.label}
            </a>
          )}
          {data.secondaryAction && (
            <a href={data.secondaryAction.href} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              {data.secondaryAction.label}
            </a>
          )}
        </motion.div>
      </div>
    </div>
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
       <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent blur-3xl rounded-full translate-x-1/2" />
    </div>
  </section>
);

const FeaturesModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <h2 className="text-4xl font-bold text-dark tracking-tight">{data.title}</h2>
        <p className="text-dark/50 leading-relaxed">{data.content}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(data.items || []).map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-primary/5 rounded-[2.5rem] border border-primary/5 hover:border-primary/20 transition-all group"
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-8 group-hover:scale-110 transition-transform">
              {i === 0 ? <Shield size={28} /> : i === 1 ? <Zap size={28} /> : <Star size={28} />}
            </div>
            <h4 className="text-xl font-bold text-dark mb-4">{item.title || item}</h4>
            <p className="text-dark/60 text-sm leading-relaxed">{item.description || '專業的情緒焦點治療體系，為您的實務操作提供最強大的理論與技術支持。'}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StatsModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-dark text-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {(data.items || []).map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center space-y-2"
          >
            <p className="text-5xl font-black text-primary tracking-tighter">{item.value}</p>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FAQModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-4xl font-bold text-dark mb-16 text-center">{data.title || '常見問題'}</h2>
      <div className="space-y-4">
        {(data.items || []).map((item: any, i: number) => (
          <details key={i} className="group p-8 bg-primary/5 rounded-[2rem] border border-transparent hover:border-primary/20 transition-all">
            <summary className="flex items-center justify-between font-bold text-lg text-dark cursor-pointer list-none">
              {item.question || item}
              <Plus size={20} className="group-open:rotate-45 transition-transform text-primary" />
            </summary>
            <p className="mt-6 text-dark/60 leading-relaxed">
              {item.answer || '我們提供完整的認證路徑與專業支持，協助您在 EFT 的領域中持續成長與精進。'}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// --- New Module Components ---

const VideoHeroModule = ({ data }: { data: ModuleData }) => (
  <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-dark">
    <div className="absolute inset-0 z-0 opacity-40">
       <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark z-10" />
       {/* Placeholder for dynamic video */}
       <div className="w-full h-full bg-slate-900 flex items-center justify-center">
          <Play size={80} className="text-white/20 animate-pulse" />
       </div>
    </div>
    <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl space-y-8">
       <motion.h1 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         className="text-6xl md:text-8xl font-black text-white tracking-tighter"
       >
         {data.title}
       </motion.h1>
       <motion.p 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="text-xl text-white/60 font-medium"
       >
         {data.content}
       </motion.p>
       <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-transform mx-auto">
          <Play fill="white" size={32} />
       </button>
    </div>
  </section>
);

const TimelineModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-6">
       <div className="flex items-center gap-6 mb-20 overflow-x-auto pb-4 custom-scrollbar">
          {(data.items || []).map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[300px] p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4"
            >
               <div className="text-3xl font-black text-primary/20">{i + 1}</div>
               <h4 className="text-xl font-bold text-dark">{item.title || item}</h4>
               <p className="text-dark/50 text-sm leading-relaxed">{item.description || '詳細的認證或發展里程碑。'}</p>
            </motion.div>
          ))}
       </div>
    </div>
  </section>
);

const PricingGridModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(data.items || []).map((item: any, i: number) => (
          <div key={i} className={cn(
            "p-10 rounded-[3rem] border transition-all space-y-8",
            i === 1 ? "bg-dark text-white border-dark scale-105 shadow-2xl" : "bg-white text-dark border-slate-100"
          )}>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{item.title || '專業方案'}</h3>
              <p className="text-sm opacity-50">{item.description || '最適合個人的學習路徑'}</p>
            </div>
            <div className="text-4xl font-black">{item.price || 'NT$ 0'}</div>
            <ul className="space-y-4">
              {['國際認證時數', '專家督導課程', '專屬教材資源'].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={cn(
              "w-full py-4 rounded-2xl font-bold transition-all",
              i === 1 ? "bg-primary text-white" : "bg-slate-100 hover:bg-slate-200"
            )}>
              立即報名
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main Renderer ---

export function ModuleRenderer({ modules }: { modules: ModuleData[] }) {
  return (
    <>
      {modules.map((module) => {
        switch (module.type) {
          case 'Hero': return <HeroModule key={module.id} data={module} />;
          case 'Features': return <FeaturesModule key={module.id} data={module} />;
          case 'Stats': return <StatsModule key={module.id} data={module} />;
          case 'FAQ': return <FAQModule key={module.id} data={module} />;
          case 'VideoSection': return <VideoHeroModule key={module.id} data={module} />;
          case 'CTA': return <PricingGridModule key={module.id} data={module} />;
          // Add more cases as needed
          default: return <div key={module.id} className="py-12 bg-red-500/10 text-red-500 text-center">Unknown Module Type: {module.type}</div>;
        }
      })}
    </>
  );
}
