'use client';

import { useState, useMemo } from 'react';
import { SubpageHero } from '@/components/SubpageHero';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  User, 
  Star, 
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  Hash,
  Filter
} from 'lucide-react';

const therapists = [
  {
    name: '林心理師',
    category: '治療師',
    title: 'ICEEFT 認證治療師 / 諮商心理師',
    specialties: ['伴侶諮商', '情緒壓力', '原生家庭'],
    location: '台北市大安區',
    institution: '曦和心理諮商所',
    licenseNo: '臨床字第 00XXX 號',
    experience: '12 年臨床經驗',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2076&auto=format&fit=crop'
  },
  {
    name: '陳醫師',
    category: '培訓師',
    title: '精神科專科醫師 / EFT 培訓者',
    specialties: ['親子溝通', '職場壓力', '情緒調適'],
    location: '台北市中山區',
    institution: '心中山診所',
    licenseNo: '醫字第 00XXX 號',
    experience: '15 年臨床經驗',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop'
  },
  {
    name: '郭○○ 教授',
    category: '督導',
    title: 'ICEEFT 認證督導 / 教授',
    specialties: ['婚姻諮商', '情緒聚焦治療', '家族治療'],
    location: '台北市大安區',
    institution: '國立台灣師範大學',
    licenseNo: '諮字第 00XXX 號',
    experience: '25 年臨床經驗',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: '謝○○ 諮商師',
    category: 'LEVEL A',
    title: '諮商心理師',
    location: '台中市西區',
    institution: '心靈綠洲工作室',
    licenseNo: '諮字第 01XXX 號',
  },
  {
    name: '李○○ 心理師',
    category: 'LEVEL A',
    title: '臨床心理師',
    location: '高雄市左營區',
    institution: '高醫附設中學',
    licenseNo: '臨字第 02XXX 號',
  },
  {
    name: '王○○ 心理師',
    category: 'LEVEL A',
    title: '諮商心理師',
    location: '桃園市桃園區',
    institution: '桃園市心理衛生中心',
    licenseNo: '諮字第 03XXX 號',
  }
];

const categories = ['全部', '培訓師', '督導', '治療師', 'LEVEL A'];
const regions = ['選擇地區 (全台)', '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市'];

export default function FindTherapistPage() {
  const [filterCategory, setFilterCategory] = useState('全部');
  const [selectedRegion, setSelectedRegion] = useState('選擇地區 (全台)');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTherapists = useMemo(() => {
    return therapists.filter(t => {
      const matchCategory = filterCategory === '全部' || t.category === filterCategory;
      const matchRegion = selectedRegion === '選擇地區 (全台)' || t.location.includes(selectedRegion);
      const matchSearch = t.name.includes(searchQuery) || (t.institution && t.institution.includes(searchQuery));
      return matchCategory && matchRegion && matchSearch;
    });
  }, [filterCategory, selectedRegion, searchQuery]);

  return (
    <main className="bg-[#FAF9F6]">
      <SubpageHero 
        title="找心理師" 
        subtitle="Find a Therapist"
        description="尋找經過專業 EFT 培訓的治療師。我們致力於為您媒合最合適的專業支援，協助您在安全的環境中重建連結。"
      />

      {/* Filter Section */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-10 bg-white rounded-[3rem] shadow-2xl shadow-dark/5 space-y-10 border border-white/20">
            {/* Search & Region */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary appearance-none text-dark font-bold cursor-pointer"
                >
                  {regions.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋關鍵字或姓名、執業機構" 
                  className="w-full pl-14 pr-6 py-5 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary text-dark font-bold"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 pt-6 border-t border-dark/5">
              <div className="flex items-center gap-3 text-sm font-bold text-dark/40 uppercase tracking-widest shrink-0">
                <Filter size={18} className="text-primary" />
                資格篩選
              </div>
              <div className="flex flex-wrap gap-3">
                 {categories.map((cat) => (
                   <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${filterCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-dark/5 text-dark/50 hover:bg-dark/10'}`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Display */}
      <section className="py-24 container mx-auto px-6">
        <AnimatePresence mode="wait">
          {filteredTherapists.length > 0 ? (
            <motion.div 
              key={filterCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="flex items-end justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-dark">搜尋結果</h2>
                  <p className="text-sm text-dark/40 font-bold uppercase tracking-widest">Found {filteredTherapists.length} practitioners</p>
                </div>
              </div>

              {/* Certified Cards View */}
              {(filterCategory === '全部' || filterCategory === '培訓師' || filterCategory === '督導' || filterCategory === '治療師') && (
                <div className="flex flex-col gap-12">
                  {filteredTherapists
                    .filter(t => t.category !== 'LEVEL A')
                    .map((therapist, i) => (
                    <motion.div
                      key={therapist.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white p-6 lg:p-10 rounded-[3rem] shadow-xl shadow-dark/5 hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row gap-10 group border border-dark/5 relative overflow-hidden"
                    >
                      {/* Certified Badge */}
                      <div className="absolute top-0 right-0 p-8">
                         <div className="flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full">
                           <Star size={16} className="text-dark fill-dark" />
                           <span className="text-[10px] font-black text-dark uppercase tracking-widest">
                             {therapist.category === '培訓師' ? 'Trainer' : therapist.category === '督導' ? 'Supervisor' : 'Certified'}
                           </span>
                         </div>
                      </div>

                      <div className="lg:w-1/4">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-dark/10">
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${therapist.image}')` }} />
                        </div>
                      </div>
                      <div className="lg:w-3/4 flex flex-col justify-between py-2">
                        <div className="space-y-6">
                          <div className="space-y-1">
                            <h3 className="text-4xl font-black text-dark tracking-tight">{therapist.name}</h3>
                            <p className="text-primary font-bold uppercase tracking-wider text-sm">{therapist.title}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            {therapist.specialties?.map((spec) => (
                              <span key={spec} className="px-4 py-2 bg-dark/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-dark/70">
                                {spec}
                              </span>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 pt-8 border-t border-dark/5">
                            <div className="flex items-center gap-3 text-dark font-bold text-sm">
                              <MapPin size={18} className="text-primary" />
                              {therapist.location}
                            </div>
                            <div className="flex items-center gap-3 text-dark font-bold text-sm">
                              <Building size={18} className="text-primary" />
                              {therapist.institution}
                            </div>
                            <div className="flex items-center gap-3 text-dark/40 font-bold text-[10px] uppercase tracking-widest">
                              <Hash size={16} className="text-dark/20" />
                              {therapist.licenseNo}
                            </div>
                            <div className="flex items-center gap-3 text-dark/40 font-bold text-[10px] uppercase tracking-widest">
                               <CheckCircle size={16} className="text-accent" />
                               Accepting Reservations
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
                          <button className="w-full sm:w-auto px-12 py-5 bg-dark text-white font-black rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-dark/10 tracking-widest uppercase text-xs">
                            查看簡介
                            <ArrowRight size={18} />
                          </button>
                          <button className="w-full sm:w-auto px-12 py-5 bg-white border-2 border-dark/5 text-dark font-black rounded-2xl hover:border-primary transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                            預約諮商
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Level A Table View */}
              {(filterCategory === '全部' || filterCategory === 'LEVEL A') && (
                <div className="space-y-10">
                   {(filterCategory === '全部' && filteredTherapists.some(t => t.category === 'LEVEL A')) && (
                     <div className="pt-20 border-t border-dark/5">
                        <h2 className="text-3xl font-black text-dark mb-4 tracking-tight">LEVEL A 完訓名錄</h2>
                        <p className="text-dark/40 font-bold uppercase tracking-[0.3em] text-xs">Foundation Level Practitioners</p>
                     </div>
                   )}
                   {(filterCategory === 'LEVEL A' || (filterCategory === '全部' && filteredTherapists.some(t => t.category === 'LEVEL A'))) && (
                     <div className="overflow-x-auto rounded-[2.5rem] border border-dark/5 bg-white shadow-xl shadow-dark/5">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="bg-dark/5 text-dark/40 text-[10px] uppercase font-black tracking-[0.3em] border-b border-dark/5">
                                 <th className="px-10 py-6"> practitioner 姓名</th>
                                 <th className="px-10 py-6">Institution 執業機構</th>
                                 <th className="px-10 py-6">Region 地區</th>
                                 <th className="px-10 py-6">License Number</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-dark/5">
                              {filteredTherapists
                                .filter(t => t.category === 'LEVEL A')
                                .map((t, idx) => (
                                <motion.tr 
                                  key={t.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="group hover:bg-dark/5 transition-colors"
                                >
                                   <td className="px-10 py-8">
                                      <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={18} />
                                         </div>
                                         <span className="text-lg font-black text-dark group-hover:text-primary transition-colors">{t.name}</span>
                                      </div>
                                   </td>
                                   <td className="px-10 py-8 text-dark/60 font-bold">{t.institution}</td>
                                   <td className="px-10 py-8 text-dark/40 font-bold text-sm tracking-tight">{t.location}</td>
                                   <td className="px-10 py-8">
                                      <span className="px-3 py-1 bg-dark/5 rounded-lg text-[10px] font-black text-dark/40 uppercase tracking-widest break-all">
                                        {t.licenseNo}
                                      </span>
                                   </td>
                                </motion.tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                   )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-40 text-center space-y-6"
            >
               <div className="w-20 h-20 bg-dark/5 rounded-full flex items-center justify-center mx-auto text-dark/20">
                  <Search size={40} />
               </div>
               <h3 className="text-2xl font-bold text-dark">找不到相符的結果</h3>
               <p className="text-dark/40">請嘗試更改篩選條件或搜尋關鍵字。</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Verification Badge */}
      <section className="py-24 bg-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-6 text-center space-y-12 relative z-10">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShieldCheck size={48} className="text-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black max-w-3xl mx-auto leading-tight italic tracking-tight">所有心理師皆經過 ICEEFT 國際培訓標準核可</h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto italic">
            我們嚴格審核治療師的專業背景，確保每一位在此列出的專業人員都具備處理複雜情感連結的能力。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 pt-12">
            <div className="flex items-center gap-6 group">
              <span className="text-6xl font-black text-primary group-hover:scale-110 transition-transform">100%</span>
              <p className="text-left text-[10px] text-white/30 font-black uppercase tracking-[0.2em] leading-relaxed">
                International<br/>Certification<br/>Verified
              </p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-6 group">
              <span className="text-6xl font-black text-primary group-hover:scale-110 transition-transform">24h</span>
              <p className="text-left text-[10px] text-white/30 font-black uppercase tracking-[0.2em] leading-relaxed">
                Expert<br/>Initial<br/>Matching
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
