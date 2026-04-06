'use client';

import React, { useEffect, useState } from 'react';
import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  FileText, 
  Video, 
  Download, 
  Search,
  ArrowRight,
  Layers,
  Lock
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ModuleRenderer, type ModuleData } from '@/components/ModuleRenderer';

const categories = ['學術論文', '臨床影音', '中文教材', '國際文獻', '工具清單'];

const staticResources = [
  {
    type: 'PDF',
    title: 'EFT 治療核心成效研究綜述 (2024 更新版)',
    category: '學術論文',
    date: '2024/02/10',
    size: '1.2 MB',
    isPremium: false
  },
  {
    type: 'VIDEO',
    title: '第一階段深度介入技術演示：修復負面循環',
    category: '臨床影音',
    date: '2023/11/25',
    duration: '45 mins',
    isPremium: true
  },
  {
    type: 'DOC',
    title: '伴侶諮商初次會談評估量表 (中文版)',
    category: '工具清單',
    date: '2023/09/12',
    size: '450 KB',
    isPremium: false
  },
  {
    type: 'DOC',
    title: '從依附理論看成人親密關係中的焦慮與逃避',
    category: '中文教材',
    date: '2023/08/04',
    size: '2.1 MB',
    isPremium: true
  }
];

export default function ResourcesPage() {
  const [modules, setModules] = useState<ModuleData[] | null>(null);

  useEffect(() => {
    async function fetchPage() {
      const { data } = await supabase
        .from('cms_pages')
        .select('modules')
        .eq('slug', 'resources')
        .single();
      
      if (data && data.modules) setModules(data.modules);
    }
    fetchPage();
  }, []);

  if (modules && modules.length > 0) {
    return (
      <main className="bg-[#FBFCFD] pt-20">
        <ModuleRenderer modules={modules} />
      </main>
    );
  }

  return (
    <main className="bg-[#FBFCFD]">
      <SubpageHero 
        title="專業資源庫" 
        subtitle="Professional Resources"
        description="匯集全球 EFT 臨床實務與學術研究資源。無論是諮商師的專業進修，或是對心理學有興趣的讀者，都能在此找到權威、深度的學習素材。"
      />

      {/* Filter Header */}
      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl shadow-dark/5 flex flex-col lg:flex-row items-center gap-8 border border-white/20">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar w-full lg:w-auto">
               <button className="px-6 py-3 bg-dark text-white rounded-xl text-sm font-bold whitespace-nowrap">全部資源</button>
               {categories.map((cat) => (
                 <button key={cat} className="px-6 py-3 bg-white border border-dark/10 rounded-xl text-sm font-bold text-dark/60 hover:bg-dark/5 whitespace-nowrap transition-all">{cat}</button>
               ))}
            </div>
            <div className="h-px lg:h-10 w-full lg:w-px bg-dark/5 hidden lg:block" />
            <div className="flex-grow w-full lg:w-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="搜尋文獻標題、關鍵字..." 
                className="w-full pl-16 pr-8 py-4 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary text-dark font-medium transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Cards Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Primary CTA Card */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="md:col-span-2 lg:col-span-1 p-12 bg-dark rounded-[3rem] text-white flex flex-col justify-between overflow-hidden relative group"
           >
             <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Layers size={180} />
             </div>
             <div className="space-y-6 relative z-10">
               <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
                 <Lock size={32} />
               </div>
               <h3 className="text-3xl font-bold tracking-tight">會員專屬文獻</h3>
               <p className="text-white/60 leading-relaxed">
                 加入臺灣 EFT 治療學會，立即解鎖超過 200+ 篇深度教學影音、中文翻譯文獻與督導級案例分析。
               </p>
             </div>
             <button className="flex items-center gap-2 group mt-12 relative z-10 w-fit">
               <span className="px-8 py-4 bg-primary text-white font-bold rounded-2xl group-hover:bg-primary/80 transition-all">立即登入會員</span>
               <div className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
                  <ArrowRight size={20} />
               </div>
             </button>
           </motion.div>

           {/* List of resources */}
           {staticResources.map((res: any, i: number) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-10 bg-white rounded-[3rem] border border-dark/5 shadow-xl shadow-dark/5 flex flex-col justify-between group hover:border-primary/20 hover:shadow-2xl transition-all duration-500"
             >
               <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {res.type === 'VIDEO' ? <Video size={28} /> : <FileText size={28} />}
                    </div>
                    {res.isPremium && (
                      <div className="px-3 py-1 bg-accent/20 rounded-full flex items-center gap-1">
                        <Lock size={12} className="text-dark" />
                        <span className="text-[10px] font-bold text-dark uppercase tracking-widest">Premium</span>
                      </div>
                    )}
                 </div>
                 <div className="space-y-2">
                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-dark/30">{res.category}</p>
                   <h4 className="text-xl font-bold text-dark leading-tight group-hover:text-primary transition-colors">{res.title}</h4>
                 </div>
               </div>
               <div className="flex flex-col gap-6 mt-12">
                 <div className="flex items-center justify-between text-xs font-bold text-dark/40 uppercase tracking-widest">
                   <span>{res.date}</span>
                   <span>{res.size || res.duration}</span>
                 </div>
                 <button className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${res.isPremium ? 'bg-dark/5 text-dark/40' : 'bg-white border-2 border-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                   {res.isPremium ? '僅限會員存取' : '立即下載'}
                   {res.isPremium ? <Lock size={18} /> : <Download size={18} />}
                 </button>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-24 bg-dark text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
               <h2 className="text-4xl font-bold tracking-tight">精彩主題專文</h2>
               <p className="text-white/40 max-w-xl">透過協會導師撰寫的專文，深入淺出地理解 EFT 的臨床運用與依附理論的奧妙。</p>
            </div>
            <button className="flex items-center gap-3 text-accent font-bold hover:gap-5 transition-all text-sm uppercase tracking-[0.2em]">
              閱讀所有文章
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: '當憤怒成為呼求：理解伴侶衝突中的抗議行為',
                author: '劉老師',
                image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop'
              },
              {
                title: '依附損傷的修復：讓心跳重新同步的瞬間',
                author: '郭老師',
                image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=2071&auto=format&fit=crop'
              }
            ].map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/9] rounded-[3rem] overflow-hidden mb-8 relative">
                   <div className="absolute inset-0 bg-dark/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                   <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url('${article.image}')` }} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                   <button className="px-4 py-1 bg-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">臨床專欄</button>
                   <div className="w-1 h-1 rounded-full bg-white/20" />
                   <p className="text-white/40 text-xs font-bold">作者：{article.author}</p>
                </div>
                <h3 className="text-3xl font-bold group-hover:text-accent transition-colors leading-tight">{article.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
