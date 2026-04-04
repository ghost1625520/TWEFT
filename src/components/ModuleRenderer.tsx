'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
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
  Plus,
  Layout,
  MessageCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Type Definitions ---
export type ModuleType = 
  | 'Hero' 
  | 'Features' 
  | 'Stats' 
  | 'FAQ' 
  | 'TextContent' 
  | 'CTA' 
  | 'VideoSection' 
  | 'HeroSlider' 
  | 'ImageTextGrid' 
  | 'MasonryGallery' 
  | 'Timeline' 
  | 'PricingGrid'
  | 'FacultyGrid'
  | 'LogoCloud';

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
  background?: 'white' | 'dark' | 'primary-light' | 'slate';
}

// --- Module Components ---

const HeroModule = ({ data }: { data: ModuleData }) => (
  <section className={cn(
    "relative py-32 overflow-hidden",
    data.background === 'dark' ? "bg-dark text-white" : "bg-white text-dark"
  )}>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
          {data.subtitle && <span className="text-primary font-black uppercase tracking-[0.3em] text-xs leading-none">{data.subtitle}</span>}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">{data.title}</h1>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl opacity-60 max-w-2xl leading-relaxed">{data.content}</motion.p>
      </div>
    </div>
  </section>
);

const FeaturesModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {(data.items || []).map((item: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group space-y-6 p-8 rounded-[2rem] hover:bg-slate-50 transition-all">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
               <Shield size={32} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">{item.title || item}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{item.description || '專業的臨床訓練與實務指導，助您深化治療成效。'}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StatsModule = ({ data }: { data: ModuleData }) => (
  <section className="py-20 bg-dark text-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {(data.items || []).map((item: any, i: number) => (
          <div key={i} className="text-center space-y-2">
            <div className="text-5xl font-black text-primary">{item.value || '100+'}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{item.label || item}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const VideoHeroModule = ({ data }: { data: ModuleData }) => (
  <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-dark text-white">
    <div className="absolute inset-0 z-0 opacity-40">
       <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark z-10" />
       <div className="w-full h-full bg-slate-900 flex items-center justify-center">
          <Play size={80} className="text-white/20 animate-pulse" />
       </div>
    </div>
    <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl space-y-8">
       <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tighter">{data.title}</motion.h1>
       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-white/60 font-medium">{data.content}</motion.p>
       <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-transform mx-auto">
          <Play fill="white" size={32} />
       </button>
    </div>
  </section>
);

const HeroSliderModule = ({ data }: { data: ModuleData }) => (
  <section className="relative h-[90vh] overflow-hidden bg-dark text-white">
    <div className="absolute inset-0">
       <Image 
          src={data.image || "https://images.unsplash.com/photo-1573497620053-ea5310f94a17"} 
          alt="Hero Slide" fill className="object-cover opacity-40" 
       />
       <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/20 to-transparent z-10" />
    </div>
    <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
       <div className="max-w-3xl space-y-8">
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
             <span className="w-12 h-0.5 bg-primary" />
             <span className="text-primary font-black uppercase text-xs tracking-widest">{data.subtitle}</span>
          </motion.div>
          <h1 className="text-7xl lg:text-9xl font-black leading-none tracking-tighter">{data.title}</h1>
          <p className="text-xl text-white/60 max-w-xl">{data.content}</p>
          <div className="flex items-center gap-6 pt-6">
             <button className="px-12 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-2xl shadow-primary/40">預約諮詢</button>
             <button className="px-12 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">了解更多</button>
          </div>
       </div>
    </div>
  </section>
);

const ImageTextGridModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
       {(data.items || []).map((item: any, i: number) => (
         <div key={i} className={cn("grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 last:mb-0", i % 2 === 1 && "lg:flex-row-reverse")}>
            <div className={cn("relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group", i % 2 === 1 && "lg:order-2")}>
               <Image src={item.image || "https://images.unsplash.com/photo-1516321497487-e288fb19713f"} alt="Detail" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className={cn("space-y-8", i % 2 === 1 && "lg:order-1")}>
               <div className="w-12 h-1 bg-primary" />
               <h3 className="text-4xl md:text-5xl font-black tracking-tight">{item.title || '為什麼選擇 EFF?'}</h3>
               <p className="text-lg text-slate-500 leading-relaxed font-medium">{item.description || '提供最紮實的臨床指導與實務，助您在轉化過程中建立更深層的同理心。'}</p>
               <button className="flex items-center gap-2 text-primary font-black group">
                  探索細節 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>
       ))}
    </div>
  </section>
);

const MasonryGalleryModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(data.items || []).map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className={cn("relative overflow-hidden group rounded-3xl", i % 3 === 0 ? "aspect-[4/5]" : "aspect-square")}>
               <Image src={typeof item === 'string' ? item : item.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform" />
            </motion.div>
          ))}
       </div>
    </div>
  </section>
);

const TimelineModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
       <div className="flex gap-8 overflow-x-auto pb-8 custom-scrollbar">
          {(data.items || []).map((item: any, i: number) => (
             <motion.div key={i} className="min-w-[320px] p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6 relative overflow-hidden group">
                <div className="text-5xl font-black text-primary/10 absolute -top-2 -right-2 tracking-tighter group-hover:scale-125 transition-transform">{i + 1}</div>
                <h4 className="text-2xl font-black text-dark tracking-tight">{item.title || item}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description || '詳細的認證發展里程碑說明。'}</p>
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
          <div key={i} className={cn("p-10 rounded-[3rem] border transition-all space-y-8", i === 1 ? "bg-dark text-white border-dark scale-105 shadow-2xl" : "bg-white text-dark border-slate-100")}>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{item.title || '專業研習'}</h3>
              <p className="text-sm opacity-50">{item.description || '最適合認證醫師的路徑'}</p>
            </div>
            <div className="text-4xl font-black tracking-tighter text-primary">{item.price || 'NT$ 12,000'}</div>
            <ul className="space-y-4">
              {['國際認證時數', '專家督導課程', '專屬教材資源'].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={16} className="text-primary" />{f}</li>
              ))}
            </ul>
            <button className={cn("w-full py-5 rounded-2xl font-black transition-all", i === 1 ? "bg-primary text-white" : "bg-slate-100")}>立即報名</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-6 max-w-4xl">
       <h2 className="text-4xl font-black text-center mb-16 tracking-tight">{data.title || '常見問題'}</h2>
       <div className="space-y-4">
          {(data.items || []).map((item: any, i: number) => (
             <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                   <h4 className="text-lg font-black text-dark group-hover:text-primary transition-colors">{item.question || item}</h4>
                   <Plus size={20} className="text-primary" />
                </div>
             </div>
          ))}
       </div>
    </div>
  </section>
);

const TextContentModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-3xl space-y-8">
       <h2 className="text-5xl font-black tracking-tight">{data.title}</h2>
       <div className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-line">{data.content}</div>
    </div>
  </section>
);

// --- Main Renderer ---

export function ModuleRenderer({ modules }: { modules: ModuleData[] }) {
  if (!modules) return null;
  return (
    <div className="w-full">
      {modules.map((module) => {
        switch (module.type) {
          case 'Hero': return <HeroModule key={module.id} data={module} />;
          case 'Features': return <FeaturesModule key={module.id} data={module} />;
          case 'Stats': return <StatsModule key={module.id} data={module} />;
          case 'FAQ': return <FAQModule key={module.id} data={module} />;
          case 'VideoSection': return <VideoHeroModule key={module.id} data={module} />;
          case 'PricingGrid': case 'CTA': return <PricingGridModule key={module.id} data={module} />;
          case 'HeroSlider': return <HeroSliderModule key={module.id} data={module} />;
          case 'ImageTextGrid': return <ImageTextGridModule key={module.id} data={module} />;
          case 'MasonryGallery': return <MasonryGalleryModule key={module.id} data={module} />;
          case 'Timeline': return <TimelineModule key={module.id} data={module} />;
          case 'TextContent': return <TextContentModule key={module.id} data={module} />;
          default: return <div key={module.id} className="py-20 bg-red-50 text-red-500 text-center font-bold">Unknown type: {module.type}</div>;
        }
      })}
    </div>
  );
}
