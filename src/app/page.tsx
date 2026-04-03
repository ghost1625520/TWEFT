'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Users, Award, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                Emotionally Focused Therapy
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                建立深層連結<br />
                <span className="text-primary italic font-light">重塑</span>依附關係
              </h1>
              
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                我們是「臺灣EFT治療學會」，致力於推廣情緒焦點治療 (EFT)，透過實證研究與專業培訓，協助治療師與大眾建立更安全、更親密的關係。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/courses" 
                  className="px-8 py-4 bg-primary text-dark font-bold rounded-full hover:bg-white transition-all shadow-xl hover:shadow-primary/20 flex items-center gap-2 group"
                >
                  探索認證課程 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/eft-intro" 
                  className="px-8 py-4 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-md border border-white/10"
                >
                  什麼是 EFT？
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">500+</div>
                  <div className="text-xs text-white/40 font-bold tracking-wider uppercase">認證會員</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">20+</div>
                  <div className="text-xs text-white/40 font-bold tracking-wider uppercase">國際督導</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-xs text-white/40 font-bold tracking-wider uppercase">年度課程</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 aspect-square rounded-3xl overflow-hidden glass p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-800">
                  <div className="w-full h-full bg-gradient-to-br from-primary/40 via-secondary/20 to-dark relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=1000" 
                      alt="EFT Therapy Session"
                      className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass p-6 rounded-2xl shadow-2xl z-20 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-accent rounded-lg text-dark">
                    <Award size={20} />
                  </div>
                  <span className="text-xs font-bold text-white">國際認證</span>
                </div>
                <div className="text-sm text-white/60 leading-tight">符合 ICEEFT 國際標準認證路徑</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl shadow-2xl z-20 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary rounded-lg text-white">
                    <Users size={20} />
                  </div>
                  <span className="text-xs font-bold text-white">專業社群</span>
                </div>
                <div className="text-sm text-white/60 leading-tight">匯集全台頂尖 EFT 治療師</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "專業課程", desc: "從初階到進階的完整認證體系", href: "/courses" },
              { icon: Users, title: "尋找心理師", desc: "媒合最受專業認證的 EFT 治療師", href: "/find-therapist" },
              { icon: Award, title: "認證路徑", desc: "邁向國際認證治療師的必經之路", href: "/certification" },
            ].map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-primary transition-all duration-500 hover:scale-105"
              >
                <item.icon size={40} className="text-primary group-hover:text-white transition-colors mb-8" />
                <h3 className="text-2xl font-bold text-dark group-hover:text-white transition-colors mb-4">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-white/80 transition-colors">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-primary group-hover:text-white font-bold transition-colors">
                  了解更多 <ChevronRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/dots.svg')] bg-repeat" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">最新消息</h2>
                <Link href="/news" className="text-sm text-primary font-bold hover:underline">查看全部</Link>
              </div>
              <div className="space-y-8">
                {[
                  { date: "MAR 15", cat: "活動公告", title: "2024 年度國際 EFT 研討會報名正式啟動" },
                  { date: "FEB 28", cat: "專業資源", title: "【新書推薦】《情緒焦點治療實務手冊》中文版上市" },
                  { date: "JAN 12", cat: "學術分享", title: "蘇珊·強森博士：依附科學在現代社會的應用" },
                ].map((item, i) => (
                  <Link key={i} href="/news" className="block group text-left">
                    <div className="flex gap-6 items-start">
                      <div className="shrink-0 text-center">
                        <span className="block text-xl font-bold text-primary">{item.date.split(' ')[1]}</span>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{item.date.split(' ')[0]}</span>
                      </div>
                      <div className="pt-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/5 text-[10px] font-bold text-primary mb-2 uppercase tracking-widest">{item.cat}</span>
                        <h3 className="font-bold text-lg text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold border-l-4 border-accent pl-4">即將開課</h2>
                <Link href="/courses" className="text-sm text-accent font-bold hover:underline">瀏覽所有課程</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "EFT 伴侶治療國際認證：初階 (Externship)", date: "2024/05/20 - 05/23", status: "報名中", price: "NT$ 28,000" },
                  { title: "情緒焦點個人治療 (EFIT)：一階課程", date: "2024/07/08 - 07/11", status: "即將截止", price: "NT$ 25,000" },
                ].map((course, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/50 transition-all group flex flex-col justify-between text-left">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase",
                          course.status === '報名中' ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                        )}>
                          {course.status}
                        </span>
                        <span className="text-sm font-bold text-accent">{course.price}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors leading-tight">{course.title}</h3>
                      <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
                        <ArrowRight size={14} className="text-accent" />
                        <span>{course.date}</span>
                      </div>
                    </div>
                    <Link href="/courses" className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-accent hover:text-dark transition-all flex items-center justify-center gap-2">
                      了解詳情 <ChevronRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 skew-x-12 translate-x-1/2" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">準備好開啟你的 EFT 專業旅程了嗎？</h2>
          <p className="text-xl mb-12 text-dark/70 font-medium">加入 500+ 位專業治療師行列，從這裡開始你的國際認證之路。</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/membership" className="px-10 py-5 bg-dark text-white font-bold rounded-full hover:scale-105 transition-all shadow-2xl">
              申請加入會員
            </Link>
            <Link href="/contact" className="px-10 py-5 bg-white text-dark font-bold rounded-full hover:bg-slate-50 transition-all border border-dark/10">
              聯繫秘書處
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
