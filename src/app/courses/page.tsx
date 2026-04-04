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

// --- ORIGINAL STATIC DATA (FALLBACK) ---
const staticCourses = [
  {
    id: 's1',
    category: '國際認證課程',
    title: 'EFT 基礎訓練課程 (Externship)',
    price: 'NT$ 22,000',
    status: 'Active'
  },
  {
    id: 's2',
    category: '進階專業培訓',
    title: '核心技術與深度介入工作坊',
    price: 'NT$ 15,600',
    status: 'Active'
  },
  {
    id: 's3',
    category: '線上自學課程',
    title: '關係修復影音課程：看見循環',
    price: 'NT$ 3,200',
    status: 'Active'
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'Active');
      
      if (!error && data && data.length > 0) {
        setCourses(data);
      } else {
        // Fallback to static if DB is empty
        setCourses(staticCourses);
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
        title="培訓課程導覽" 
        subtitle="Clinical Training"
        description="提供從初階入門到進階認證的完整培訓體系。培育專業人才，協助您邁向國際認證治療師之路。"
      />

      <section className="py-12 -mt-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="p-8 bg-white rounded-3xl shadow-2xl shadow-dark/5 flex flex-col md:flex-row items-center gap-6 border border-dark/5">
            <div className="flex-grow w-full md:w-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={20} />
              <input 
                type="text" 
                placeholder="搜尋課程..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-dark/5 rounded-2xl border-none focus:ring-2 focus:ring-primary text-dark font-medium outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-dark/40 font-bold uppercase tracking-widest text-xs">同步中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[3rem] overflow-hidden flex flex-col lg:flex-row group border border-dark/5 shadow-2xl shadow-dark/5 hover:border-primary/20 transition-all duration-500"
                >
                  <div className="lg:w-1/3 relative h-[300px] lg:h-auto bg-slate-900 flex items-center justify-center">
                    <BookOpen size={48} className="text-white/10 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-accent text-dark text-xs font-bold rounded-full uppercase tracking-widest">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-10 lg:p-14 flex flex-col justify-between">
                    <div>
                      <span className="text-sm font-bold text-primary uppercase mb-2 block">新梯次報名中</span>
                      <h3 className="text-3xl font-black text-dark group-hover:text-primary transition-colors">{course.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="flex items-center gap-3 text-dark/70 text-sm font-semibold"><Calendar size={18} className="text-primary" /> 國際標準授課</div>
                        <div className="flex items-center gap-3 text-dark/70 text-sm font-semibold"><MapPin size={18} className="text-primary" /> 台北 / 線上</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-12 pt-8 border-t border-dark/5 text-left">
                       <div className="w-full sm:w-auto">
                         <p className="text-xs text-dark/40 font-black uppercase tracking-widest">投資未來</p>
                         <p className="text-3xl font-black text-dark">{course.price}</p>
                       </div>
                       <Link href={`/courses/${course.id}`} className="w-full sm:w-auto px-10 py-5 bg-dark text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all">
                         詳情與報名 <ArrowRight size={20} />
                       </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
