'use client';

import React, { useState, useEffect } from "react";
import { ModuleRenderer, type ModuleData } from "@/components/ModuleRenderer";
import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        // 1. Get the home page ID
        const { data: page } = await supabase
          .from('pages')
          .select('id')
          .eq('slug', 'home')
          .single();

        if (page) {
          // 2. Get modules for this page
          const { data: moduleData } = await supabase
            .from('modules')
            .select('*')
            .eq('page_id', page.id)
            .order('order_index', { ascending: true });

          if (moduleData && moduleData.length > 0) {
            setModules(moduleData.map(m => ({
              id: m.id,
              type: m.type as any,
              title: m.title || '',
              subtitle: m.subtitle || '',
              content: m.content || '',
              items: m.items || [],
              image: m.image_url || '',
              background: 'white'
            })));
          }
        }
      } catch (error) {
        console.error("Error loading home modules:", error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="font-black tracking-widest text-xs opacity-40 uppercase">Loading Experience...</p>
      </div>
    );
  }

  // If no modules are found (new DB), show a welcome state
  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-white px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl space-y-8">
           <h1 className="text-6xl font-black tracking-tighter">Welcome to twEFT</h1>
           <p className="text-xl text-white/40 leading-relaxed">您的資料庫尚未建立首頁內容。請前往後台管理中心新增模組，打造頂級的依附關係治療平台。</p>
           <button onClick={() => window.location.href = '/admin'} className="px-10 py-5 bg-primary text-white font-black rounded-3xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
              進入 Command Center 建立內容
           </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="flex flex-col">
      <ModuleRenderer modules={modules} />
    </main>
  );
}
