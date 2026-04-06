'use client';

import { use } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Bookmark,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock data for detail view
  const newsDetail = {
    id,
    type: '公告',
    title: '2026 年度國際導師專題演講：EFT 在數位時代的挑戰',
    date: '2026/04/10',
    tag: '重要',
    author: '學會秘書處',
    readTime: '5 min read',
    content: `
      情緒焦點治療 (EFT) 自創立以來，始終強調人際連結中的「情感可及性 (Accessibility)」、「回應性 (Responsiveness)」與「參與感 (Engagement)」。然而，隨著數位科技的普及，諮商的形式正經歷前所未有的變革。
      
      本次專題演講將由 ICEEFT 創辦人特別預錄談話，探討線上諮商中情緒連結的維度。同步提供即時中文字幕與摘要。
      
      ### 講座重點摘要：
      1. **數位屏障下的非語言訊息**：當面對面接觸受限時，治療師如何透過螢幕捕捉細微的 attachment cues。
      2. **線上治療室的安全性建立**：如何遠端建構一個能讓個案安心展露脆弱性的「安全基地」。
      3. **遠距督導的實務挑戰**：針對亞太地區治療師在跨時區練習中的常見困難提出解方。

      我們誠摯邀請所有對此議題感興趣的專業人員參與，共同探索 EFT 在未來醫療體系中的無限可能。
    `,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  };

  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-dark/30 uppercase tracking-widest mb-12">
          <Link href="/" className="hover:text-primary transition-colors">首頁</Link>
          <ChevronRight size={14} />
          <Link href="/news" className="hover:text-primary transition-colors">活動公告</Link>
          <ChevronRight size={14} />
          <span className="text-dark/60 truncate max-w-[200px] md:max-w-none">{newsDetail.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <article className="lg:col-span-8 space-y-12">
            <header className="space-y-8">
              <div className="flex items-center gap-3">
                 <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                   {newsDetail.type}
                 </span>
                 <span className="text-xs font-bold text-primary tracking-widest uppercase">{newsDetail.tag}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-dark leading-tight tracking-tight">
                {newsDetail.title}
              </h1>

              <div className="flex flex-wrap items-center gap-8 py-8 border-y border-dark/5">
                 <div className="flex items-center gap-3 text-dark/40 font-bold text-xs uppercase tracking-widest">
                    <Calendar size={18} className="text-primary" />
                    {newsDetail.date}
                 </div>
                 <div className="flex items-center gap-3 text-dark/40 font-bold text-xs uppercase tracking-widest">
                    <User size={18} className="text-primary" />
                    {newsDetail.author}
                 </div>
                 <div className="flex items-center gap-3 text-dark/40 font-bold text-xs uppercase tracking-widest">
                    <Clock size={18} className="text-primary" />
                    {newsDetail.readTime}
                 </div>
              </div>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
               <img 
                 src={newsDetail.image} 
                 alt={newsDetail.title}
                 className="w-full h-full object-cover"
               />
            </motion.div>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-dark prose-p:text-dark/70 prose-p:leading-relaxed space-y-8">
               {newsDetail.content.split('\n').map((para, i) => (
                 para.trim().startsWith('###') ? (
                   <h3 key={i} className="text-2xl pt-8">{para.replace('###', '').trim()}</h3>
                 ) : para.trim() ? (
                   <p key={i}>{para.trim()}</p>
                 ) : null
               ))}
            </div>

            <footer className="pt-12 border-t border-dark/5 flex items-center justify-between">
               <Link href="/news" className="flex items-center gap-2 text-dark/40 font-bold hover:text-primary transition-all group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                  返回列表
               </Link>
               <div className="flex items-center gap-4">
                  <button className="p-3 bg-dark/5 hover:bg-dark/10 rounded-xl text-dark/60 transition-all">
                     <Share2 size={20} />
                  </button>
                  <button className="p-3 bg-dark/5 hover:bg-dark/10 rounded-xl text-dark/60 transition-all">
                     <Bookmark size={20} />
                  </button>
               </div>
            </footer>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
             <div className="p-10 bg-dark/5 rounded-[2.5rem] space-y-8">
                <h4 className="text-xs font-bold text-dark uppercase tracking-widest">相關閱讀</h4>
                <div className="space-y-8">
                   {[1, 2, 3].map((i) => (
                     <Link key={i} href={`/news/${i}`} className="group block space-y-3">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">2026/03/2{i}</span>
                        <h5 className="font-bold text-dark group-hover:text-primary transition-colors leading-snug">
                          {i === 1 ? '官網會員專區文獻資料庫全新改版' : i === 2 ? '賀！本會徐諮商師榮獲優良心理師' : '六月份台北基礎訓練名額倒數'}
                        </h5>
                     </Link>
                   ))}
                </div>
             </div>

             <div className="p-10 bg-primary/5 border border-primary/20 rounded-[2.5rem] space-y-6">
                <h4 className="text-lg font-bold text-dark">需要協助？</h4>
                <p className="text-sm text-dark/60 leading-relaxed">
                  如果您對本次公告或活動有任何疑問，歡迎聯繫本會秘書處，我們將竭誠為您服務。
                </p>
                <Link href="/contact" className="block w-full py-4 bg-primary text-white font-bold rounded-2xl text-center hover:scale-105 transition-all shadow-lg shadow-primary/20">
                  聯絡我們
                </Link>
             </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
