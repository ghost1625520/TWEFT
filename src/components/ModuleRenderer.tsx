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
    "relative py-32 overflow-hidden min-h-[80vh] flex items-center",
    data.background === 'dark' ? "bg-dark text-white" : "bg-white text-dark"
  )}>
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" />
    </div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-5xl space-y-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          {data.subtitle && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {data.subtitle}
            </div>
          )}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white">
            {data.title?.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-primary italic font-light block mt-2 drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
        </motion.div>
        
        {data.content && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-white/60 max-w-2xl leading-relaxed font-medium">{data.content}</motion.p>}
        
        {(data.primaryAction || data.secondaryAction) && (
          <div className="flex flex-wrap gap-6 pt-4">
             {data.primaryAction && (
               <button className="px-12 py-5 bg-primary text-white font-black rounded-full hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3">
                 {data.primaryAction.label} <ArrowRight size={20} />
               </button>
             )}
             {data.secondaryAction && (
               <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
                 {data.secondaryAction.label}
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  </section>
);

const FeaturesModule = ({ data }: { data: ModuleData }) => (
  <section className={cn("py-24", data.background === 'dark' ? "bg-dark text-white" : "bg-white text-dark")}>
    <div className="container mx-auto px-6">
      {data.title && <h2 className="text-4xl font-black mb-16 text-center tracking-tight">{data.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(data.items || []).map((item: any, i: number) => {
          const Icon = item.icon === 'BookOpen' ? BookOpen : item.icon === 'Users' ? Users : item.icon === 'Award' ? Award : Shield;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:bg-primary transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-primary/20"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary transition-all mb-10 shadow-inner">
                 <Icon size={32} />
              </div>
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors mb-4">{item.title || item}</h3>
              <p className="text-slate-500 group-hover:text-white/80 transition-colors font-medium leading-relaxed">{item.desc || '專業的臨床培訓與實務指導，助您在治療中建立深層連結。'}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const StatsModule = ({ data }: { data: ModuleData }) => (
  <section className="py-24 bg-[#0A0A0B] text-white relative overflow-hidden border-y border-white/5">
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 max-w-6xl mx-auto items-center">
        {(data.items || []).map((item: any, i: number) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            className="text-center md:text-left space-y-4 relative group"
          >
            <div className="text-6xl lg:text-7xl font-black text-white tracking-tighter group-hover:text-primary transition-colors duration-500">
               {item.value || '100+'}
               <span className="text-primary ml-1 group-hover:animate-pulse">.</span>
            </div>
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">
               {item.label || item}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const HeroSliderModule = ({ data }: { data: ModuleData }) => (
  <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-dark text-white">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" />
      <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[80px]" />
    </div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

    <div className="container mx-auto px-6 lg:px-8 relative z-20 w-full pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="space-y-10">
           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
             <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
             {data.subtitle || "Emotionally Focused Therapy"}
           </div>
           <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
              {data.title?.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-primary italic font-light block mt-2 drop-shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)]" : ""}>
                   {word}{' '}
                </span>
              ))}
           </h1>
           <p className="text-xl text-white/50 max-w-xl leading-relaxed font-medium">
              {data.content || "提供專業的臨床訓練與實務指導，助您細緻掌握情緒轉化技術。"}
           </p>
           <div className="flex flex-wrap gap-5 pt-4">
              <button className="px-12 py-5 bg-primary text-white font-black rounded-full hover:bg-white hover:text-dark transition-all shadow-2xl shadow-primary/20 flex items-center gap-3 active:scale-95">
                 探索課程 <ArrowRight size={22} />
              </button>
              <button className="px-12 py-5 bg-white/5 text-white font-black rounded-full hover:bg-white/10 transition-all backdrop-blur-md border border-white/10 active:scale-95">
                 什麼是 EFT?
              </button>
           </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative hidden lg:block">
           <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden glass p-4 border border-white/10 shadow-2xl group">
              <div className="w-full h-full rounded-[3.5rem] overflow-hidden bg-slate-900 relative">
                 <Image 
                   src={data.image || "https://images.unsplash.com/photo-1573497620053-ea5310f94a17"} 
                   alt="Hero" fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
                 />
                 <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-colors" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 animate-ping opacity-20" />
                 </div>
              </div>
           </div>
           
           {/* Floating Cards */}
           <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-10 -right-10 glass p-8 rounded-[2.5rem] shadow-2xl z-30 max-w-[240px] border border-white/20">
              <div className="flex items-center gap-4 mb-3">
                 <div className="p-3 bg-accent rounded-2xl text-dark"><Award size={20} /></div>
                 <span className="text-[11px] font-black text-white uppercase tracking-widest">國際認證</span>
              </div>
              <p className="text-sm font-bold text-white/60">符合全球最嚴格的專業培訓路徑</p>
           </motion.div>

           <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -bottom-10 -left-10 glass p-8 rounded-[2.5rem] shadow-2xl z-30 max-w-[240px] border border-white/20">
              <div className="flex items-center gap-4 mb-3">
                 <div className="p-3 bg-primary rounded-2xl text-white"><Users size={20} /></div>
                 <span className="text-[11px] font-black text-white uppercase tracking-widest">專業社群</span>
              </div>
              <p className="text-sm font-bold text-white/60">匯集全台頂尖認證治療師團隊</p>
           </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const VideoHeroModule = ({ data }: { data: ModuleData }) => (
  <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-dark text-white">
    <div className="absolute inset-0 z-0 overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/40 to-dark z-10" />
       <Image src={data.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} alt="Video Background" fill className="object-cover opacity-30" />
    </div>
    <div className="container mx-auto px-6 relative z-20 text-center max-w-5xl space-y-12">
       <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="space-y-6">
          {data.subtitle && <span className="text-accent font-black uppercase tracking-[0.4em] text-xs">{data.subtitle}</span>}
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-none">{data.title}</h1>
       </motion.div>
       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed">{data.content}</motion.p>
       <button className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)] hover:scale-110 transition-transform mx-auto active:scale-95 group">
          <Play fill="white" size={40} className="group-hover:scale-110 transition-transform" />
       </button>
    </div>
  </section>
);

const ImageTextGridModule = ({ data }: { data: ModuleData }) => (
  <section className={cn("py-32", data.background === 'dark' ? "bg-dark text-white" : "bg-white text-dark")}>
    <div className="container mx-auto px-6">
       {(data.items || []).map((item: any, i: number) => (
         <div key={i} className={cn("grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-40 last:mb-0", i % 2 === 1 && "lg:flex-row-reverse")}>
            <div className={cn("relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl group", i % 2 === 1 && "lg:order-2")}>
               <Image src={item.image || "https://images.unsplash.com/photo-1516321497487-e288fb19713f"} alt="Detail" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[4rem]" />
            </div>
            <div className={cn("space-y-10", i % 2 === 1 && "lg:order-1 text-right lg:items-end")}>
               <div className={cn("w-20 h-2 bg-primary rounded-full", i % 2 === 1 && "ml-auto")} />
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{item.title}</h3>
               <p className="text-xl text-slate-500 leading-relaxed font-medium">{item.description}</p>
               <button className="flex items-center gap-3 text-primary font-black group text-lg active:scale-95">
                  深入了解細節 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
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
          case 'Hero': return <HeroSliderModule key={module.id} data={module} />;
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
