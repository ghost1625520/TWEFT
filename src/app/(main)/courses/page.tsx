'use client';

import { useState } from 'react';
import { SubpageHero } from '@/components/SubpageHero';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Search,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  Award,
  Video,
  Star
} from 'lucide-react';

const allCourses = [
  {
    id: 0,
    category: '國際認證',
    tag: 'Externship',
    tagBg: 'bg-primary',
    tagText: 'text-white',
    title: 'EFT 基礎訓練課程 (Externship)',
    date: '2026/05/15 - 05/18',
    instructor: 'Dr. T. Jackie',
    instructorTitle: 'ICEEFT 認證訓練員 (Trainer)',
    instructorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    location: '台北 / 線上實體同步',
    hours: '28 小時',
    capacity: '40 人',
    price: 'NT$ 22,000',
    description: '深入瞭解 EFT 的理論體系與核心介入技術。本課程為國際認證的第一哩路，適合心理諮商師與精神科醫師。學員將透過現場演示、影片分析及小組練習，掌握 EFT 三階段模型的基本架構。',
    status: '報名中',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    highlights: ['EFT 三階段模型總覽', '現場演示與影片分析', '小組實務練習', '結業認證證書']
  },
  {
    id: 1,
    category: '國際認證',
    tag: 'Core Skills',
    tagBg: 'bg-dark',
    tagText: 'text-white',
    title: '核心技術與深度介入工作坊 (Core Skills)',
    date: '2026/06/20 - 06/22',
    instructor: '郭○○ 教授',
    instructorTitle: 'ICEEFT 認證督導 (Supervisor)',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    location: '台中實體',
    hours: '24 小時',
    capacity: '24 人 (小班制)',
    price: 'NT$ 15,600',
    description: '針對 Core Skills 進行深度演練，以小班制設計確保每位學員都有充分的督導與回饋機會。快速提升在治療室中承接複雜情感的能力，是進階認證申請者的必修課程。',
    status: '即將開放',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    highlights: ['第一至三階段深度演練', '個人案例督導', '錄影分析回饋', '進階認證門檻路徑']
  },
  {
    id: 2,
    category: '督導培訓',
    tag: '個別督導',
    tagBg: 'bg-secondary',
    tagText: 'text-white',
    title: '個別督導媒合計畫 (Individual Supervision)',
    date: '月度持續開放',
    instructor: '協會認證督導群',
    instructorTitle: 'ICEEFT 認證督導',
    instructorImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=800&auto=format&fit=crop',
    location: '線上 / 實體彈性預約',
    hours: '依需求規劃',
    capacity: '1 對 1',
    price: 'NT$ 3,500/小時',
    description: '由 ICEEFT 認可的督導者進行個別案例督導。適合正在申請 EFT 認證的治療師，或需要在複雜個案中獲得專業支持的資深諮商師。可彈性安排每月督導次數。',
    status: '開放中',
    statusColor: 'text-primary bg-primary/8 border-primary/20',
    highlights: ['1 對 1 個別督導', '案例錄影分析', '認證申請輔助', '彈性排程']
  },
  {
    id: 3,
    category: '大眾課程',
    tag: '線上自學',
    tagBg: 'bg-accent',
    tagText: 'text-dark',
    title: '關係修復微型影音課程：看見循環',
    date: '隨時加入，即刻啟程',
    instructor: '協會專業製作團隊',
    instructorTitle: '多位認證治療師共同錄製',
    instructorImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    location: '線上學習平台',
    hours: '5 小時精華',
    capacity: '無人數限制',
    price: 'NT$ 3,200',
    description: '針對大眾設計的入門影音課，五個單元教你看懂伴侶間的互動模式與情緒底氣。不需要任何心理學背景，只需要對關係的好奇心與一份溫柔的勇氣。',
    status: '開放中',
    statusColor: 'text-primary bg-primary/8 border-primary/20',
    highlights: ['5 個精華單元', '終身回看權限', '附學習手冊', '社群討論區']
  },
  {
    id: 4,
    category: '大眾課程',
    tag: '體驗工作坊',
    tagBg: 'bg-accent',
    tagText: 'text-dark',
    title: '「情緒的涵容之海」大眾體驗工作坊',
    date: '2026/07/12（週六）',
    instructor: '徐○○ 博士',
    instructorTitle: '資深認證治療師',
    instructorImage: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800&auto=format&fit=crop',
    location: '台北信義區（場地確認中）',
    hours: '6 小時',
    capacity: '80 人',
    price: 'NT$ 2,800',
    description: '以體驗式學習設計的一日工作坊，透過引導性練習與小組討論，讓參與者親身感受「安全依附」如何在關係中建立與修復。適合一般大眾與初識 EFT 的好奇者。',
    status: '報名中',
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    highlights: ['體驗式學習設計', '小組引導分享', '依附風格測驗', '贈《Hold Me Tight》書簽']
  }
];

const filterTabs = ['全部課程', '國際認證', '督導培訓', '大眾課程'];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState('全部課程');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allCourses.filter(c => {
    const matchFilter = activeFilter === '全部課程' || c.category === activeFilter;
    const matchSearch = c.title.includes(searchQuery) || c.instructor.includes(searchQuery) || c.description.includes(searchQuery);
    return matchFilter && matchSearch;
  });

  return (
    <main className="bg-[#F7F4EF]">
      <SubpageHero 
        title="臨床培訓課程" 
        subtitle="Clinical Training"
        description="提供從初階入門到進階認證的完整 EFT 培訓體系。透過國際化師資與豐富實務，培育最專業的心理諮商人才，同時也歡迎對情緒與關係感到好奇的大眾。"
      />

      {/* Filter & Search */}
      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-8 bg-white rounded-3xl shadow-2xl shadow-dark/5 flex flex-col gap-6 border border-primary/8">
            <div className="flex items-center gap-3 flex-wrap">
              {filterTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeFilter === tab 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-dark/5 text-dark/60 hover:bg-dark/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜尋課程名稱、講師或關鍵字..." 
                className="w-full pl-12 pr-6 py-4 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all text-dark font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="py-16 container mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-8"
          >
            {filtered.length === 0 && (
              <div className="py-32 text-center text-dark/30 font-bold text-xl">
                找不到符合的課程，請試試其他關鍵字。
              </div>
            )}
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row group border border-primary/8 shadow-xl shadow-dark/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                {/* ── LEFT INFO PANEL: light Morandi blue ── */}
                <div className="lg:w-[200px] shrink-0 p-8 bg-primary/10 border-r border-primary/15 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.tagBg} ${course.tagText}`}>
                      {course.tag}
                    </span>
                    <div>
                      <p className="text-primary/60 text-[10px] font-bold uppercase tracking-widest">Category</p>
                      <p className="text-dark font-bold text-sm mt-0.5">{course.category}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-dark/50 text-xs font-bold">
                      <Users size={13} className="text-primary/60" />
                      {course.capacity}
                    </div>
                    <div className="flex items-center gap-2 text-dark/50 text-xs font-bold">
                      <Clock size={13} className="text-primary/60" />
                      {course.hours}
                    </div>
                    <div className="pt-4 mt-2 border-t border-primary/15">
                      <p className="text-primary/50 text-[10px] uppercase tracking-widest font-bold mb-1">課程費用</p>
                      <p className="text-xl font-black text-dark tracking-tight">{course.price}</p>
                    </div>
                  </div>
                </div>

                {/* ── CENTER CONTENT ── */}
                <div className="flex-grow p-10 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors leading-tight">
                        {course.title}
                      </h3>
                      <span className={`shrink-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${course.statusColor}`}>
                        {course.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-dark/40 text-xs font-bold">
                      <Award size={13} className="text-primary/60" />
                      <span>{course.instructorTitle}</span>
                    </div>

                    <p className="text-dark/60 leading-relaxed text-sm">{course.description}</p>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      {course.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-dark/60 font-medium">
                          <Star size={11} className="text-primary shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-5 pt-4 border-t border-dark/5">
                      <div className="flex items-center gap-2 text-dark/50 font-semibold text-xs">
                        <Calendar size={14} className="text-primary" />
                        {course.date}
                      </div>
                      <div className="flex items-center gap-2 text-dark/50 font-semibold text-xs">
                        <MapPin size={14} className="text-primary" />
                        {course.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <Link href={`/courses/${course.id}`} className="w-full sm:w-auto px-10 py-4 bg-dark text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all text-sm">
                      了解詳情並報名
                      <ArrowRight size={18} />
                    </Link>
                    <button className="w-full sm:w-auto px-8 py-4 bg-white border border-dark/8 text-dark font-bold rounded-2xl hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-sm">
                      <Video size={16} />
                      預覽課程簡介
                    </button>
                  </div>
                </div>

                {/* ── RIGHT IMAGE PANEL: instructor photo + Morandi overlay ── */}
                <div className="hidden lg:block lg:w-[220px] shrink-0 relative overflow-hidden">
                  {/* Photo */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url('${course.instructorImage}')` }}
                  />
                  {/* Morandi gradient overlay — top fade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/20 to-dark/80" />
                  {/* Soft mist top */}
                  <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-[#A8BEC6]/60 to-transparent" />
                  {/* Instructor name at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-1">
                    <p className="text-white font-bold text-sm leading-tight">{course.instructor}</p>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest leading-tight">
                      {course.instructorTitle}
                    </p>
                  </div>
                  {/* Decorative accent dot */}
                  <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary/80" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Path CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="p-16 rounded-[4rem] bg-dark relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,var(--primary),transparent)]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-bold text-xs uppercase tracking-widest">
              <BookOpen size={14} />
              學習路徑諮詢
            </div>
            <h2 className="text-4xl font-bold tracking-tight">不知道從哪裡開始？</h2>
            <p className="text-xl text-white/50 leading-relaxed">
              我們為不同階段的學習者規劃了專屬的成長路徑。無論你是剛接觸 EFT 的新手，或是想邁向國際認證的資深治療師，都能找到最適合的方向。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/certification" className="px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/80 transition-all">
                探索認證路徑
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/10">
                諮詢選課建議
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
