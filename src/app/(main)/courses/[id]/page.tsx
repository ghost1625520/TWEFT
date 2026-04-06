'use client';

import { use } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  BookOpen,
  HelpCircle,
  CreditCard
} from 'lucide-react';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock data for course detail
  const courseDetail = {
    id,
    category: '國際認證課程',
    title: 'EFT 基礎訓練課程 (Externship)',
    date: '2026/05/15 - 05/18',
    instructor: 'Dr. T. Jackie (ICEEFT Trainer)',
    location: '台北 / 線上實體同步',
    price: 'NT$ 22,000',
    description: '深入瞭解 EFT 的理論體系與核心介入技術。本課程為國際認證的第一哩路，適合心理諮商師與精神科醫師。',
    hours: '28 小時',
    capacity: '限額 45 人',
    highlights: [
      'ICEEFT 官方授權課程，累積認證時數',
      '包含大量實務演練與個別化反饋',
      '提供完整 EFT 專有名詞對照手冊',
      '結業後可進入初階督導群組'
    ],
    curriculum: [
      { unit: 'Day 1', title: '成人的愛、依附理論與 EFT 核心階段', topics: ['依附理論基礎', '評估個案循環', '去負向化介入技術'] },
      { unit: 'Day 2', title: '處理情緒與深化介入：改變事件一 (DE-ESCALATION)', topics: ['辨識基礎情緒', '同理心的深化技巧', '處理追逐者與退縮者的模式'] },
      { unit: 'Day 3', title: '重整依附連結：改變事件二 (RESTRUCTURING BONDING)', topics: ['進入依附需求', '兩造雙方的整合與對抗', '促進情感交接 (Enactment)'] },
      { unit: 'Day 4', title: '鞏固與結案：跨模態應用與實作', topics: ['處理治療中的困頓與中斷', '不同個案特質的應用', '認證路徑指南'] },
    ],
    instructorBio: 'Dr. T. Jackie 是 ICEEFT 認證的資深 Trainer，擁有超過 20 年的伴侶治療經驗。他在亞太地區推廣 EFT 已逾 10 年，以溫暖且精準的風格著稱，能夠在小組演練中即時捕捉治療師的阻礙並提供轉化性建議。'
  };

  return (
    <main className="bg-[#F8F9FA] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <Link href="/courses" className="inline-flex items-center gap-2 text-dark/40 font-bold hover:text-primary transition-all mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
          查看所有課程
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-8">
               <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 bg-accent text-dark text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                    {courseDetail.category}
                  </span>
                  <span className="shrink-0 px-4 py-1 border-2 border-primary/20 rounded-full text-primary font-bold text-xs uppercase tracking-wider">
                    報名中
                  </span>
               </div>
               
               <h1 className="text-4xl md:text-5xl font-black text-dark leading-tight tracking-tight">
                {courseDetail.title}
               </h1>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {[
                    { icon: Calendar, label: '開課時間', value: courseDetail.date },
                    { icon: MapPin, label: '授課地點', value: courseDetail.location },
                    { icon: Clock, label: '學分時數', value: courseDetail.hours },
                    { icon: Users, label: '招生對象', value: courseDetail.capacity },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-dark/5 shadow-sm">
                       <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                          <item.icon size={22} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">{item.label}</p>
                          <p className="font-bold text-dark">{item.value}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="space-y-8">
               <h2 className="text-2xl font-black text-dark tracking-tight">課程亮點</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseDetail.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 p-4">
                       <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
                       <p className="text-dark/70 font-medium leading-relaxed">{highlight}</p>
                    </div>
                  ))}
               </div>
            </section>

            <section className="space-y-8">
               <h2 className="text-2xl font-black text-dark tracking-tight">系列課表 </h2>
               <div className="space-y-4">
                  {courseDetail.curriculum.map((day, i) => (
                    <div key={i} className="p-8 bg-white border border-dark/5 rounded-[2.5rem] space-y-4">
                       <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-primary px-3 py-1 bg-primary/5 rounded-lg">{day.unit}</span>
                          <h4 className="font-bold text-dark text-lg">{day.title}</h4>
                       </div>
                       <ul className="pl-12 space-y-2">
                          {day.topics.map((topic, j) => (
                             <li key={j} className="text-sm text-dark/60 flex items-center gap-2">
                                <div className="w-1 h-1 bg-dark/20 rounded-full" />
                                {topic}
                             </li>
                          ))}
                       </ul>
                    </div>
                  ))}
               </div>
            </section>

            <section className="p-12 bg-dark rounded-[3rem] text-white space-y-8">
               <div className="flex items-center gap-4">
                  <BookOpen size={32} className="text-primary" />
                  <h2 className="text-2xl font-black tracking-tight">關於講師</h2>
               </div>
               <div className="space-y-4 flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 rounded-3xl bg-white/10 shrink-0 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-xl font-bold">{courseDetail.instructor}</h4>
                     <p className="text-white/60 leading-relaxed text-sm">
                        {courseDetail.instructorBio}
                     </p>
                  </div>
               </div>
            </section>
          </div>

          {/* Pricing & CTA Sidebar */}
          <aside className="lg:col-span-1 space-y-12">
             <div className="sticky top-32 p-10 bg-white border border-dark/10 rounded-[2.5rem] shadow-2xl shadow-dark/5 space-y-10">
                <div className="space-y-2">
                   <p className="text-xs font-bold text-dark/40 uppercase tracking-widest">課程投資</p>
                   <h3 className="text-4xl font-black text-dark tracking-tighter">{courseDetail.price}</h3>
                   <p className="text-xs text-green-600 font-bold">早鳥報名享 9 折優惠 (至 04/15 止)</p>
                </div>

                <div className="space-y-4">
                   <button className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                      立即報名
                   </button>
                   <button className="w-full py-5 bg-dark/5 text-dark font-black rounded-2xl hover:bg-dark/10 transition-all">
                      諮詢課程詳情
                   </button>
                </div>

                <div className="space-y-6 pt-10 border-t border-dark/5">
                   <div className="flex items-start gap-4">
                      <CreditCard className="text-primary mt-1" size={20} />
                      <div>
                         <p className="font-bold text-dark text-sm">多元支付</p>
                         <p className="text-xs text-dark/50 leading-relaxed">支援信用卡分期、ATM 轉帳、Apple Pay</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <HelpCircle className="text-primary mt-1" size={20} />
                      <div>
                         <p className="font-bold text-dark text-sm">取消政策</p>
                         <p className="text-xs text-dark/50 leading-relaxed">開課前 14 天可全額退費 (扣除手續費)</p>
                      </div>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
