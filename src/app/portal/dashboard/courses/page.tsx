'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    { 
      id: 1, 
      title: 'EFT Externship：核心訓練課程', 
      progress: 85, 
      lastWatched: '2026/03/28', 
      duration: '18 小時',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 2, 
      title: '伴侶治療中的高度衝突管理', 
      progress: 40, 
      lastWatched: '2026/04/01', 
      duration: '12 小時',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 3, 
      title: '情緒焦點治療：與青少年工作', 
      progress: 0, 
      lastWatched: '-', 
      duration: '8 小時',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-white tracking-tight">我的學習中心</h1>
           <p className="text-white/40 mt-2 font-medium uppercase tracking-widest text-[10px]">Learning Management System</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="搜尋我的課程..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm text-white focus:border-primary outline-none transition-all w-64"
              />
           </div>
           <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all">
              <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all flex flex-col"
          >
            {/* Course Image */}
            <div className="relative aspect-video overflow-hidden">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
               <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                     <Clock size={12} />
                     <span>{course.duration} 課程</span>
                  </div>
                  <h3 className="font-bold text-white text-lg leading-tight">{course.title}</h3>
               </div>
               <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                     <Play size={24} fill="currentColor" />
                  </div>
               </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 flex-grow">
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                     <span className="text-white/40 uppercase tracking-widest">課程進度</span>
                     <span className="text-primary">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary" 
                     />
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                     <span>上次觀看: {course.lastWatched}</span>
                  </div>
                  <button className="text-sm font-bold text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                     繼續學習
                     <ChevronRight size={16} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}

        {/* Placeholder for "Add More" */}
        <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center space-y-4 hover:border-primary/20 transition-all cursor-pointer group">
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/10 group-hover:text-primary transition-colors">
              <BookOpen size={32} />
           </div>
           <div>
              <p className="text-sm font-bold text-white/20 uppercase tracking-widest group-hover:text-white/40 transition-colors">探索更多課程</p>
              <p className="text-xs text-white/10 group-hover:text-white/20 transition-colors">持續精進您的專業技能</p>
           </div>
        </div>
      </div>
    </div>
  );
}
