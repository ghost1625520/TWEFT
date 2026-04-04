'use client';

import React, { useState, useEffect } from 'react';
import { SubpageHero } from '@/components/SubpageHero';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Search,
  ArrowRight,
  Filter,
  Clock,
  MapPin,
  Loader2
} from 'lucide-react';
import { supabase, type Course } from '@/lib/supabase';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'Active');
      
      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-[#F8F9FA] min-h-screen">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all text-dark font-medium outline-none"
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-dark/10 rounded-2xl text-dark font-bold hover:bg-dark/5 transition-colors flex-1 md:flex-none">
                <Filter size={20} />
                篩選類別
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="py-24 container mx-auto px-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-dark/40 font-bold uppercase tracking-widest text-xs">同步課程內容中...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-12">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[3rem] overflow-hidden flex flex-col lg:flex-row group border border-dark/5 shadow-2xl shadow-dark/5 hover:border-primary/20 transition-all duration-500"
                >
                  <div className="lg:w-1/3 relative h-[300px] lg:h-auto overflow-hidden bg-slate-900 flex items-center justify-center">
                    <BookOpen size={64} className="text-white/10 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-4 py-1.5 bg-accent text-dark text-xs font-bold rounded-full uppercase tracking-widest shadow-xl">
                        {course.category || '專業課程'}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-10 lg:p-14 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-sm font-bold text-primary uppercase tracking-widest">培訓類別</span>
                          <h3 className="text-3xl font-bold text-dark group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex items-center gap-3 text-dark/70 font-semibold text-sm">
                          <Calendar size={18} className="text-primary" />
                          2026/05/15 - 05/18 (範例)
                        </div>
                        <div className="flex items-center gap-3 text-dark/70 font-semibold text-sm">
                          <MapPin size={18} className="text-primary" />
                          台北實體 / 線上同步
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-12 pt-8 border-t border-dark/5">
                      <div className="text-left w-full sm:w-auto">
                        <p className="text-xs text-dark/40 font-bold uppercase tracking-widest mb-1">精進專業</p>
                        <p className="text-3xl font-black text-dark tracking-tighter">{course.price || '電洽諮詢'}</p>
                      </div>
                      <Link href={`/courses/${course.id}`} className="w-full sm:w-auto px-10 py-5 bg-dark text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-dark/10">
                        課程詳情與報名
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border-4 border-dashed border-dark/5 rounded-[4rem] flex flex-col items-center gap-6">
               <div className="w-20 h-20 bg-dark/5 rounded-3xl flex items-center justify-center text-dark/20"><BookOpen size={40} /></div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black">尚無開放報名的課程</h3>
                 <p className="text-dark/40">目前資料庫中沒有活躍的課程消息。請稍後再試或聯繫秘書處。</p>
               </div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="p-16 rounded-[4rem] bg-dark text-center text-white relative overflow-hidden backdrop-blur-3xl border border-white/5">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-black tracking-tight">打造專業認證之路</h2>
            <p className="text-xl text-white/40 leading-relaxed">我們為不同階段的治療師規劃了完整的認證體系，從基礎訓、進階訓到國際認證，陪伴您每一步的成長。</p>
            <button className="px-10 py-5 bg-primary text-white font-black rounded-3xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all">探索認證路徑</button>
          </div>
        </div>
      </section>
    </main>
  );
}
