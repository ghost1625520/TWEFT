'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  User, 
  Star, 
  Filter,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const therapists = [
  {
    name: '林心理師',
    title: 'ICEEFT 認證治療師 / 諮商心理師',
    specialties: ['伴侶諮商', '情緒壓力', '原生家庭'],
    location: '台北市大安區',
    experience: '12 年臨床經驗',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2076&auto=format&fit=crop'
  },
  {
    name: '張諮商師',
    title: 'EFT 進階培訓治療師',
    specialties: ['個人探索', '焦慮憂鬱', '創傷復原'],
    location: '新北市板橋區',
    experience: '8 年臨床經驗',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2072&auto=format&fit=crop'
  },
  {
    name: '陳醫師',
    title: '精神科專科醫師 / EFT 培訓者',
    specialties: ['親子溝通', '職場壓力', '情緒調適'],
    location: '台北市中山區',
    experience: '15 年臨床經驗',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop'
  }
];

export default function FindTherapistPage() {
  return (
    <main className="bg-[#FAF9F6]">
      <SubpageHero 
        title="找心理師" 
        subtitle="Find a Therapist"
        description="尋找經過專業 EFT 培訓的治療師。我們致力於為您媒合最合適的專業支援，協助您在安全的環境中重建連結。"
      />

      {/* Search Section */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-10 bg-white rounded-[3rem] shadow-2xl shadow-dark/5 space-y-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select className="w-full pl-14 pr-6 py-5 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary appearance-none text-dark font-bold">
                  <option>選擇地區 (全台)</option>
                  <option>台北市</option>
                  <option>新北市</option>
                  <option>台中市</option>
                  <option>高雄市</option>
                </select>
              </div>
              <div className="relative group">
                <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select className="w-full pl-14 pr-6 py-5 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary appearance-none text-dark font-bold">
                  <option>培訓等級 (不限)</option>
                  <option>ICEEFT 認證治療師</option>
                  <option>進階培訓治療師</option>
                  <option>基礎培訓治療師</option>
                </select>
              </div>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="搜尋關鍵字或姓名" 
                  className="w-full pl-14 pr-6 py-5 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary text-dark font-bold"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-bold text-dark/40 uppercase tracking-widest mr-2">熱門標籤</span>
              {['伴侶諮商', '情緒調節', '原生家庭', '青少年', '創傷復原'].map((tag) => (
                <button key={tag} className="px-5 py-2.5 bg-white border border-dark/10 rounded-full text-sm font-bold text-dark/60 hover:border-primary hover:text-primary transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results List */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col gap-12">
          {therapists.map((therapist, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 lg:p-10 rounded-[3rem] shadow-xl shadow-dark/5 hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row gap-10 group border border-dark/5"
            >
              <div className="lg:w-1/4">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${therapist.image}')` }} />
                </div>
              </div>
              <div className="lg:w-3/4 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black text-dark">{therapist.name}</h3>
                      <p className="text-primary font-bold uppercase tracking-wider">{therapist.title}</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full">
                      <Star size={16} className="text-dark fill-dark" />
                      <span className="text-sm font-bold text-dark">權威推薦</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {therapist.specialties.map((spec) => (
                      <span key={spec} className="px-4 py-2 bg-dark/5 rounded-xl text-sm font-bold text-dark/70">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 pt-4 border-t border-dark/5">
                    <div className="flex items-center gap-3 text-dark/70 font-semibold">
                      <MapPin size={20} className="text-primary" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center gap-3 text-dark/70 font-semibold">
                      <User size={20} className="text-primary" />
                      {therapist.experience}
                    </div>
                    <div className="flex items-center gap-3 text-dark/70 font-semibold">
                       <CheckCircle size={20} className="text-accent" />
                       接受預約中
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
                  <button className="w-full sm:w-auto px-10 py-4 bg-dark text-white font-bold rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-2">
                    查看完整介紹
                    <ArrowRight size={18} />
                  </button>
                  <button className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-dark/5 text-dark font-bold rounded-2xl hover:border-primary transition-all flex items-center justify-center gap-2">
                    預約諮商
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Verification Badge */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6 text-center space-y-12">
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={48} className="text-accent" />
          </div>
          <h2 className="text-4xl font-bold max-w-2xl mx-auto leading-tight">所有心理師皆經過 ICEEFT 國際培訓標準核可</h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">
            協會嚴格審核入駐治療師的專業背景與實習記錄，確保每一位在此列出的專業人員都具備處理複雜情感連結與關係動力的能力。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-8">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-primary">100%</span>
              <p className="text-left text-sm text-white/40 font-bold uppercase tracking-widest">國際認證<br/>符合標準</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-primary">24h</span>
              <p className="text-left text-sm text-white/40 font-bold uppercase tracking-widest">快速響應<br/>初步媒合</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
