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

  if (dbModules.length > 0) {
    return (
      <main className="flex flex-col">
        <ModuleRenderer modules={dbModules} />
      </main>
    );
  }

  // --- FULL 100% ORIGINAL STATIC CONTENT RESTORED ---
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20 text-left"
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
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass p-4 border border-white/10 shadow-2xl">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-inner relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=1000" 
                      alt="EFT Therapy Session"
                      fill
                      className="object-cover opacity-60"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 glass p-6 rounded-3xl shadow-2xl z-20 max-w-[220px] backdrop-blur-2xl border border-white/20 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-accent rounded-xl text-dark">
                    <Award size={20} />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-widest">國際認證</span>
                </div>
                <div className="text-sm font-bold text-white/70 leading-tight">符合 ICEEFT 國際標準認證路徑</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "專業課程", desc: "從初階到進階的完整認證體系", href: "/courses" },
              { icon: Users, title: "認證心理師", desc: "媒合最受專業認證的 EFT 治療師", href: "/find-therapist" },
              { icon: Award, title: "認證路徑", desc: "邁向國際認證治療師的必經之路", href: "/certification" },
            ].map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-primary transition-all duration-500 hover:scale-105"
              >
                <item.icon size={40} className="text-primary group-hover:text-white transition-colors mb-8" />
                <h3 className="text-2xl font-bold text-dark group-hover:text-white transition-colors mb-4 text-left">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-white/80 transition-colors text-left">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-primary group-hover:text-white font-bold transition-colors">
                  了解更多 <ChevronRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Upcoming Courses */}
      <section className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 text-left">
              <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-12">最新消息</h2>
              <div className="space-y-8">
                {[
                  { date: "MAR 15", cat: "活動公告", title: "2024 年度國際 EFT 研討會報名正式啟動" },
                  { date: "FEB 28", cat: "專業資源", title: "【新書推薦】《情緒焦點治療實務手冊》中文版上市" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start opacity-70 hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <span className="block text-xl font-bold text-primary">{item.date.split(' ')[1]}</span>
                      <span className="text-[10px] font-bold text-white/30 uppercase">{item.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary mb-2 uppercase">{item.cat}</span>
                      <h3 className="font-bold text-white/80 leading-snug">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 text-left">
              <h2 className="text-3xl font-bold border-l-4 border-accent pl-4 mb-12">即將開課</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "EFT 伴侶治療國際認證：初階 (Externship)", date: "2024/05/20 - 05/23", price: "NT$ 28,000" },
                  { title: "情緒焦點個人治療 (EFIT)：一階課程", date: "2024/07/08 - 07/11", price: "NT$ 25,000" },
                ].map((course, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/50 transition-all group">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{course.title}</h3>
                    <p className="text-white/40 text-sm mb-6">{course.date}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent font-bold">{course.price}</span>
                      <button className="px-5 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-accent hover:text-dark transition-all">課程詳情</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-dark relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">準備好開啟你的 EFT 專業旅程了嗎？</h2>
          <p className="text-xl text-dark/70 font-medium">加入 500+ 位專業治療師行列，從這裡開始你的國際認證之路。</p>
          <div className="flex justify-center gap-6">
            <Link href="/membership" className="px-10 py-5 bg-dark text-white font-bold rounded-full hover:scale-105 transition-all">
              申請加入會員
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
