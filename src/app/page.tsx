'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Users, Award, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ModuleRenderer, type ModuleData } from "@/components/ModuleRenderer";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [dbModules, setDbModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const { data: page } = await supabase.from('pages').select('id').eq('slug', 'home').single();
        if (page) {
          const { data: moduleData } = await supabase
            .from('modules')
            .select('*')
            .eq('page_id', page.id)
            .order('order_index', { ascending: true });

          if (moduleData && moduleData.length > 0) {
            setDbModules(moduleData.map(m => ({
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

  // --- HYBRID RENDERER: If DB is empty, show the ORIGINAL STATIC CONTENT ---
  if (dbModules.length > 0) {
    return (
      <main className="flex flex-col">
        <ModuleRenderer modules={dbModules} />
      </main>
    );
  }

  // --- ORIGINAL STATIC CONTENT (FALLBACK) ---
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-dark">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[80px]" />
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                Emotionally Focused Therapy
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                建立深層連結<br />
                <span className="text-primary italic font-light drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">重塑</span>依附關係
              </h1>
              
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                我們是「臺灣EFT治療學會」，致力於推廣情緒焦點治療 (EFT)，透過實證研究與專業培訓，協助治療師與大眾建立更安全、更親密的關係。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/courses" 
                  className="px-8 py-4 bg-primary text-dark font-bold rounded-full hover:bg-white transition-all shadow-xl hover:shadow-primary/20 flex items-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10">探索認證課程</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                <Link 
                  href="/eft-intro" 
                  className="px-8 py-4 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-md border border-white/10"
                >
                  什麼是 EFT？
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10 overflow-hidden">
                {[
                  { label: "認證會員", value: "500+" },
                  { label: "國際督導", value: "20+" },
                  { label: "年度課程", value: "100+" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] text-white/40 font-bold tracking-wider uppercase">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block z-10"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=1000" 
                   alt="EFT Therapy Session"
                   fill
                   className="object-cover opacity-60"
                   priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 bg-white/10 backdrop-blur-3xl p-6 rounded-3xl shadow-2xl z-20 max-w-[220px] border border-white/20"
              >
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">國際認證</div>
                <div className="text-sm font-bold text-white/70 leading-tight">符合 ICEEFT 國際標準認證路徑</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "專業課程", desc: "從初階到進階的完整認證體系", href: "/courses" },
              { icon: Users, title: "認證心理師", desc: "媒合最受專業認證的 EFT 治療師", href: "/find-therapist" },
              { icon: Award, title: "認證路徑", desc: "邁向國際認證治療師的必經之路", href: "/certification" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-primary transition-all duration-500 hover:scale-105">
                <item.icon size={40} className="text-primary group-hover:text-white transition-colors mb-8" />
                <h3 className="text-2xl font-bold text-dark group-hover:text-white transition-colors mb-4">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-white/80 transition-colors">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
