'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Award,
  ArrowRight,
  BookCheck,
  Users
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CertificationPage() {
  const { profile } = useAuth();

  const steps = [
    { 
      id: 1, 
      title: 'EFT Externship', 
      status: 'completed', 
      date: '2025/11/12', 
      description: '掌握情緒焦點治療的核心理論與基本實踐技巧。',
      icon: BookCheck
    },
    { 
      id: 2, 
      title: 'Core Skills Training', 
      status: 'in-progress', 
      progress: 60,
      description: '深入學習四個核心技能模組，包含追蹤循環、深度傾聽與重構情感。',
      icon: ShieldCheck
    },
    { 
      id: 3, 
      title: 'Individual Supervision', 
      status: 'locked', 
      description: '至少 8 小時的一對一專業督導，深化臨床技術。',
      icon: Users
    },
    { 
      id: 4, 
      title: 'Certified Therapist', 
      status: 'locked', 
      description: '通過 ICEEFT 國際認證審核，正式成為國際認證心理師。',
      icon: Award
    }
  ];

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Certification Journey</span>
           <h1 className="text-4xl font-black text-white tracking-tight leading-tight">專業認證路徑</h1>
           <p className="text-white/40 max-w-xl font-medium">
             您的目標是成為 **ICEEFT 國際認證情緒焦點治療師**。目前正處於第二階段訓練中。
           </p>
        </div>
        
        <div className="p-6 bg-primary/10 border border-primary/20 rounded-[2rem] flex items-center gap-6">
           <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
              <Award size={24} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">當前級別</p>
              <p className="text-white font-bold">{profile?.role === 'Professional' ? '專業心理師 (Trainee)' : '一般會員'}</p>
           </div>
        </div>
      </div>

      <div className="relative">
         {/* Connector Line */}
         <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" />

         <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col items-start gap-8 md:flex-row ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Visual Marker */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 flex flex-col items-center">
                   <div className={`w-12 h-12 rounded-full border-4 border-dark flex items-center justify-center shadow-xl transition-all duration-500 ${
                     step.status === 'completed' ? 'bg-primary text-white scale-110' : 
                     step.status === 'in-progress' ? 'bg-white text-dark scale-125' : 
                     'bg-white/5 text-white/20'
                   }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={24} /> : <step.icon size={24} />}
                   </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                   <div className={`p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-4 hover:bg-white/[0.08] transition-all relative overflow-hidden group ${step.status === 'in-progress' ? 'border-primary/30 ring-1 ring-primary/20 bg-primary/5' : ''}`}>
                      {step.status === 'in-progress' && (
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                           <Award size={100} />
                        </div>
                      )}
                      
                      <div className={`flex items-center gap-3 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${
                           step.status === 'completed' ? 'text-primary' : 
                           step.status === 'in-progress' ? 'text-accent' : 
                           'text-white/20'
                         }`}>
                           {step.status === 'completed' ? '已達成' : step.status === 'in-progress' ? '進行中' : '尚未解鎖'}
                         </span>
                         {step.date && <span className="text-[10px] text-white/20 font-bold">{step.date}</span>}
                      </div>

                      <h3 className={`text-2xl font-black tracking-tight ${step.status === 'locked' ? 'text-white/20' : 'text-white'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${step.status === 'locked' ? 'text-white/10' : 'text-white/40'}`}>
                        {step.description}
                      </p>

                      {step.status === 'in-progress' && (
                        <div className="pt-4 space-y-3">
                           <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className="text-white/20">進度估計</span>
                              <span className="text-accent">{step.progress}%</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                style={{ width: `${step.progress}%` }}
                                className="h-full bg-accent" 
                              />
                           </div>
                        </div>
                      )}

                      {(step.status === 'completed' || step.status === 'in-progress') && (
                        <button className={`p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                           <ArrowRight size={16} className="text-white/40" />
                        </button>
                      )}
                   </div>
                </div>
              </motion.div>
            ))}
         </div>
      </div>

      <div className="p-12 bg-accent/10 border border-accent/20 rounded-[3rem] text-center space-y-8 relative overflow-hidden">
         <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 blur-3xl opacity-50 rounded-full" />
         <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl font-bold text-white tracking-tight">準備好申請國際認證了嗎？</h3>
            <p className="text-sm text-white/50 leading-relaxed">
               當您完成所有督導時數並準備好提交治療錄影帶。我們的專業團隊將協助您完成 ICEEFT 國際認證審核。
            </p>
         </div>
         <button className="px-10 py-5 bg-accent text-dark font-black rounded-full shadow-xl shadow-accent/20 hover:scale-105 transition-all relative z-10">
            諮詢認證審核細節
         </button>
      </div>
    </div>
  );
}
