'use client';

import React, { useState, useEffect } from 'react';
import { SubpageHero } from '@/components/SubpageHero';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Search,
  ArrowRight,
  Layers,
  Lock,
  Loader2,
  FileDown
} from 'lucide-react';
import { supabase, type ResourceItem } from '@/lib/supabase';

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadResources() {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setResources(data);
      }
      setLoading(false);
    }
    loadResources();
  }, []);

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-[#FBFCFD] min-h-screen">
      <SubpageHero 
        title="專業資源下載" 
        subtitle="Professional Resources"
        description="匯集全球 EFT 臨床實務與學術研究資源。無論是諮商師的專業進修，或是對心理學有興趣的讀者，都能在此找到權威、深度的學習素材。"
      />

      {/* Filter & Search */}
      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl shadow-dark/5 flex flex-col lg:flex-row items-center gap-8 border border-white/20">
            <div className="flex-grow w-full lg:w-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="搜尋文獻標題、關鍵字..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-4 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary text-dark font-medium transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-24 container mx-auto px-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-dark/40 font-bold uppercase tracking-widest text-xs">同步資源庫中...</p>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Member CTA Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 bg-dark rounded-[3rem] text-white flex flex-col justify-between overflow-hidden relative group"
              >
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                  <Layers size={180} />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
                    <Lock size={32} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight leading-tight">解鎖專業<br />核心文獻</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    加入學會正式會員，獲取超過 100+ 篇國際翻譯文獻與臨床技術演示影音。
                  </p>
                </div>
                <button className="flex items-center gap-2 group mt-12 relative z-10 w-fit">
                  <span className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-white hover:text-dark transition-all">立即登入</span>
                </button>
              </motion.div>

              {filteredResources.map((res, i) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-white rounded-[3rem] border border-dark/5 shadow-xl shadow-dark/5 flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <FileText size={28} />
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] uppercase font-black tracking-widest text-dark/20">{res.category || '一般資源'}</p>
                       <h4 className="text-xl font-black text-dark leading-tight group-hover:text-primary transition-colors">{res.title}</h4>
                    </div>
                    <p className="text-sm text-dark/40 leading-relaxed line-clamp-3">{res.description}</p>
                  </div>
                  <div className="mt-12">
                     <button 
                       onClick={() => window.open(res.file_url, '_blank')}
                       className="w-full py-5 bg-white border-2 border-dark/5 rounded-2xl flex items-center justify-center gap-3 font-black text-dark hover:bg-primary hover:border-primary hover:text-white transition-all"
                     >
                       立即下載檔案
                       <FileDown size={20} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border-4 border-dashed border-dark/5 rounded-[4rem] flex flex-col items-center gap-6">
               <div className="w-20 h-20 bg-dark/5 rounded-3xl flex items-center justify-center text-dark/20"><Search size={40} /></div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black">在此分類下尚無資源</h3>
                 <p className="text-dark/40">管理員尚未在下載專區上傳相關檔案。請稍後再試。</p>
               </div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
