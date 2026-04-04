'use client';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Target,
  FileText
} from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  const stats = [
    { label: '已完成課程', value: '4', icon: BookOpen, color: 'text-primary' },
    { label: '認證里程碑', value: '2/4', icon: Target, color: 'text-accent' },
    { label: '累積學分', value: '32', icon: TrendingUp, color: 'text-green-500' },
  ];

  const upcomingCourses = [
    { title: '高階 EFT 核心技術工作坊', date: '2026/05/12', time: '09:00 - 17:00' },
    { title: 'ICEEFT 國際認證專題講座', date: '2026/06/05', time: '19:30 - 21:00' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
            早安，{profile?.full_name || '夥伴'}
          </h1>
          <p className="text-white/40 mt-2 font-medium">歡迎回到臺灣 EFT 治療學會專業後台。</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-bold hover:bg-white/10 transition-all">
              下載註冊證明
           </button>
           <button className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              查看本月課表
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/[0.08] transition-all"
          >
            <div className={`p-4 bg-white/5 rounded-2xl w-fit mb-6 ${stat.color}`}>
               <stat.icon size={24} />
            </div>
            <div className="space-y-1">
               <p className="text-sm font-bold text-white/30 uppercase tracking-widest">{stat.label}</p>
               <h3 className="text-4xl font-black text-white leading-none tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Feed: Progress */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white tracking-tight">我的學習進度</h3>
              <button className="text-xs font-bold text-primary hover:gap-2 flex items-center gap-1 transition-all">全部課程 <ArrowRight size={14} /></button>
           </div>
           
           <div className="space-y-4">
              {[
                { title: 'EFT Externship 核心訓練', progress: 85, color: 'bg-primary' },
                { title: '伴侶治療中的高度衝突管理', progress: 40, color: 'bg-accent' },
              ].map((course, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white uppercase tracking-tight">{course.title}</h4>
                      <span className="text-sm font-black text-white/40">{course.progress}%</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${course.color}`} 
                      />
                   </div>
                </div>
              ))}
           </div>

           {/* Quick Actions */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-8 bg-primary rounded-[2.5rem] text-white flex flex-col justify-between aspect-[16/7] relative overflow-hidden group cursor-pointer">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Award size={100} />
                 </div>
                 <h4 className="text-2xl font-black leading-tight relative z-10">預約專業督導</h4>
                 <ArrowRight className="relative z-10" />
              </div>
              <div className="p-8 bg-[#2A2A2E] rounded-[2.5rem] text-white flex flex-col justify-between aspect-[16/7] relative overflow-hidden group cursor-pointer">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <FileText size={100} />
                 </div>
                 <h4 className="text-2xl font-black leading-tight relative z-10">文獻資料庫</h4>
                 <ArrowRight className="relative z-10" />
              </div>
           </div>
        </div>

        {/* Sidebar: Upcoming & Alerts */}
        <div className="lg:col-span-1 space-y-8">
           <h3 className="text-xl font-bold text-white tracking-tight">即將到來的課程</h3>
           <div className="space-y-4">
              {upcomingCourses.map((course, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-3 hover:border-primary/30 transition-all cursor-pointer">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                      <Clock size={12} />
                      <span>{course.date}</span>
                   </div>
                   <h4 className="font-bold text-white leading-tight">{course.title}</h4>
                   <p className="text-xs text-white/30 font-medium">{course.time}</p>
                </div>
              ))}
           </div>

           {/* Professional Membership Alert */}
           <div className="p-8 bg-accent/20 border border-accent/40 rounded-[2.5rem] space-y-6">
              <h4 className="text-xl font-bold text-white tracking-tight">會籍提醒</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                您的「專業會員」權限將於 45 天後到期。續約後可繼續維持在「國際認證心理師」名錄中的顯示。
              </p>
              <button className="w-full py-4 bg-accent text-dark font-black rounded-2xl text-sm hover:scale-[1.02] transition-all">
                立即進行續約手續
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
