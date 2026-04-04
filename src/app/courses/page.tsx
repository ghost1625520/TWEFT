'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Users,
  Search,
  ArrowRight,
  Filter,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';

const courses = [
  {
    category: '國際認證課程',
    title: 'EFT 基礎訓練課程 (Externship)',
    date: '2026/05/15 - 05/18',
    instructor: 'Dr. T. Jackie (ICEEFT Trainer)',
    location: '台北 / 線上實體同步',
    price: 'NT$ 22,000',
    description: '深入瞭解 EFT 的理論體系與核心介入技術。本課程為國際認證的第一哩路，適合心理諮商師與精神科醫師。',
    tag: '熱門',
    status: '報名中'
  },
  {
    category: '進階專業培訓',
    title: '核心技術與深度介入工作坊',
    date: '2026/06/20 - 06/22',
    instructor: '郭教授 (ICEEFT Supervisor)',
    location: '台中實體',
    price: 'NT$ 15,600',
    description: '針對 Core Skills 進行深度演練，小組督導與實務操作。快速提升在治療室中的情感承接能力。',
    tag: '專業',
    status: '報名中'
  },
  {
    category: '線上自學課程',
    title: '關係修復微型影音課程：看見循環',
    date: '隨時隨地，即刻啟程',
    instructor: '協會專業團隊製作',
    location: '線上學習平台',
    price: 'NT$ 3,200',
    description: '針對大眾設計的入門影音課，五個單元教你看懂伴侶間的互動模式與情緒底氣。',
    tag: '自學',
    status: '開放中'
  }
];

export default function CoursesPage() {
  return (
    <main className="bg-[#F8F9FA]">
      <SubpageHero 
        title="臨床培訓課程" 
        subtitle="Clinical Training"
        description="提供從初階入門到進階認證的完整 EFT 培訓體系。透過國際化師資與豐富實務，培育最專業的心理諮商人才。"
      />

      {/* Filter & Search */}
      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-8 bg-white rounded-3xl shadow-2xl shadow-dark/5 flex flex-col md:flex-row items-center gap-6 border border-dark/5">
            <div className="flex-grow w-full md:w-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="text" 
                placeholder="搜尋課程名稱、講師或類別..." 
                className="w-full pl-12 pr-6 py-4 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all text-dark font-medium"
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-dark/10 rounded-2xl text-dark font-bold hover:bg-dark/5 transition-colors flex-1 md:flex-none">
                <Filter size={20} />
                篩選類別
              </button>
              <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex-1 md:flex-none">
                搜尋
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3rem] overflow-hidden flex flex-col lg:flex-row group border border-dark/5 shadow-2xl shadow-dark/5 hover:border-primary/20 transition-all duration-500"
            >
              <div className="lg:w-1/3 relative h-[300px] lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-dark/20 z-10" />
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-1.5 bg-accent text-dark text-xs font-bold rounded-full uppercase tracking-widest shadow-xl">
                    {course.tag}
                  </span>
                </div>
              </div>
              <div className="lg:w-2/3 p-10 lg:p-14 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">{course.category}</span>
                      <h3 className="text-3xl font-bold text-dark group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                    </div>
                    <span className="shrink-0 px-4 py-1 border-2 border-primary/20 rounded-full text-primary font-bold text-xs uppercase tracking-wider">
                      {course.status}
                    </span>
                  </div>
                  <p className="text-dark/60 leading-relaxed max-w-2xl">{course.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 text-dark/70 font-semibold text-sm">
                      <Calendar size={18} className="text-primary" />
                      {course.date}
                    </div>
                    <div className="flex items-center gap-3 text-dark/70 font-semibold text-sm">
                      <MapPin size={18} className="text-primary" />
                      {course.location}
                    </div>
                    <div className="flex items-center gap-3 text-dark/70 font-semibold text-sm">
                      <BookOpen size={18} className="text-primary" />
                      講師：{course.instructor}
                    </div>
                    <div className="flex items-center gap-3 text-dark/70 font-semibold text-sm">
                      <Clock size={18} className="text-primary" />
                      時數：12 小時
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-12 pt-8 border-t border-dark/5">
                  <div className="text-left w-full sm:w-auto">
                    <p className="text-xs text-dark/40 font-bold uppercase tracking-widest mb-1">投資未來</p>
                    <p className="text-3xl font-black text-dark tracking-tighter">{course.price}</p>
                  </div>
                  <button className="w-full sm:w-auto px-10 py-5 bg-dark text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all">
                    了解更多並報名
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Path CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="p-16 rounded-[4rem] bg-dark relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,var(--primary),transparent)]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">不知道從哪裡開始？</h2>
            <p className="text-xl text-white/50 leading-relaxed">
              我們為不同階段的學習者規劃了專屬的成長路徑，無論你是對自我探索感興趣，或是想成為獲得國際認證的治療師，都能找到合適的方向。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button className="px-10 py-5 bg-accent text-dark font-bold rounded-2xl hover:scale-105 transition-all">
                探索認證路徑
              </button>
              <button className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                諮商與輔導諮詢
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
