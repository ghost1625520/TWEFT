'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Bell, 
  Calendar, 
  Tag, 
  ArrowRight,
  ChevronRight,
  Newspaper,
  Megaphone,
  Trophy
} from 'lucide-react';

const newsItems = [
  {
    type: '公告',
    title: '2026 年度國際導師專題演講：EFT 在數位時代的挑戰',
    date: '2026/04/10',
    description: '本次專題演講將由 ICEEFT 創辦人特別預錄談話，探討線上諮商中情緒連結的維度。同步提供即時中文字幕與摘要。',
    tag: '重要'
  },
  {
    type: '課程',
    title: '【熱烈報名中】六月份台北 Externship 基礎訓練名額倒數',
    date: '2026/04/02',
    description: '年度重點認證課程 Externship 目前僅剩個位數名額。對 EFT 感興趣的諮商心理師、精神科醫師請把握機會。',
    tag: '熱門'
  },
  {
    type: '獲獎',
    title: '賀！本會徐諮商師榮獲優良心理師獎項',
    date: '2026/03/25',
    description: '感謝徐諮商師長期在偏鄉地區推廣 EFT 心理教育，為多個家庭建立穩固的情緒安全網。',
    tag: '喜訊'
  },
  {
    type: '資源',
    title: '官網會員專區「文獻資料庫」全新改版升級',
    date: '2026/03/10',
    description: '我們優化了閱讀體驗，並新增多篇 2024 年國際期刊對關係修復的最新研究節錄。歡迎會員登入查閱。',
    tag: '更新'
  }
];

export default function NewsPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="活動公告" 
        subtitle="News & Events"
        description="掌握臺灣 EFT 治療學會的最新動向、課程資訊與重要公告。我們致力於分享專業成長與社群的點滴喜悅。"
      />

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-12">
            {newsItems.map((news, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col sm:flex-row gap-8 border-b border-dark/5 pb-12 hover:border-primary/20 transition-all"
              >
                <div className="sm:w-32 shrink-0 space-y-2">
                   <div className="text-sm font-bold text-dark/30 uppercase tracking-widest">{news.date.split('/')[1]}月 {news.date.split('/')[2]}日</div>
                   <div className="w-16 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
                   <div className="text-3xl font-black text-dark/10 group-hover:text-primary/20 transition-colors">{news.date.split('/')[0]}</div>
                </div>
                <div className="space-y-4 flex-grow">
                   <div className="flex items-center gap-3">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        news.type === '公告' ? 'bg-primary text-white' :
                        news.type === '課程' ? 'bg-accent text-dark' :
                        news.type === '獲獎' ? 'bg-purple-100 text-purple-700' :
                        'bg-dark/5 text-dark/60'
                      }`}>
                        {news.type}
                      </span>
                      <span className="text-xs font-bold text-primary tracking-widest uppercase">{news.tag}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors leading-tight">
                     {news.title}
                   </h3>
                   <p className="text-dark/60 leading-relaxed max-w-2xl">
                     {news.description}
                   </p>
                   <button className="flex items-center gap-2 text-dark font-bold hover:gap-4 transition-all text-sm group-hover:text-primary">
                     閱讀更多全文
                     <ArrowRight size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
            
            {/* Pagination Placeholder */}
            <div className="flex items-center justify-center gap-4 pt-12">
               <button className="w-12 h-12 rounded-2xl bg-dark text-white flex items-center justify-center shadow-lg">1</button>
               <button className="w-12 h-12 rounded-2xl bg-dark/5 text-dark/40 hover:bg-dark/10 flex items-center justify-center transition-all">2</button>
               <button className="w-12 h-12 rounded-2xl bg-dark/5 text-dark/40 hover:bg-dark/10 flex items-center justify-center transition-all">3</button>
               <div className="w-12 h-px bg-dark/10" />
               <button className="w-12 h-12 rounded-2xl bg-dark/5 text-dark/40 hover:bg-dark/10 flex items-center justify-center transition-all">
                  <ChevronRight size={20} />
               </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-16">
            {/* Categories */}
            <div className="p-10 bg-dark/5 rounded-[2.5rem] space-y-8">
               <h4 className="text-xs font-bold text-dark uppercase tracking-widest">全站動態分類</h4>
               <ul className="space-y-4">
                  {[
                    { name: '學會及國際公告', count: 12, icon: Megaphone },
                    { name: '課程與訓練', count: 45, icon: Calendar },
                    { name: '獲獎與肯定', count: 8, icon: Trophy },
                    { name: '專業資源更新', count: 32, icon: Newspaper },
                  ].map((cat, i) => (
                    <li key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white rounded-xl p-3 -m-3 transition-all duration-300">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                             <cat.icon size={20} />
                          </div>
                          <span className="font-bold text-dark/70 group-hover:text-dark">{cat.name}</span>
                       </div>
                       <span className="text-xs font-bold text-dark/20">{cat.count}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Newsletter */}
            <div className="p-10 bg-primary rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Bell size={120} />
               </div>
               <div className="space-y-4 relative z-10">
                  <h4 className="text-2xl font-bold tracking-tight">訂閱週報</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    每週接收我們精選的 EFT 相關研究摘要、國際大師觀點與最新課程通知。
                  </p>
               </div>
               <div className="space-y-4 relative z-10">
                  <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    className="w-full bg-white/20 border border-white/20 rounded-xl px-6 py-4 placeholder:text-white/40 text-white focus:bg-white/30 transition-all outline-none"
                  />
                  <button className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                    立即訂閱
                  </button>
               </div>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest relative z-10">
                  放心，我們絕不發送垃圾郵件。
               </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
