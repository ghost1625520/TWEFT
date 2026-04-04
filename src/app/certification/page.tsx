'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Award, 
  CheckCircle, 
  BookOpen, 
  Users, 
  ShieldCheck,
  FileCheck,
  ArrowRight,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';

const steps = [
  {
    title: '基礎訓練 (Externship)',
    duration: '28-30 小時',
    description: '核心理論與階段模式的全面概覽。包含現場演示、影片分析及小組練習。',
    icon: BookOpen,
    color: 'bg-primary/10 text-primary'
  },
  {
    title: '核心技術 (Core Skills)',
    duration: '48 小時 (分四次)',
    description: '深入演練 EFT 的具體介入技術。分段訓練第一階段與第二階段的臨床實務。',
    icon: LayoutGrid,
    color: 'bg-accent/20 text-dark'
  },
  {
    title: '個人與團體督導',
    duration: '至少 8 小時個人督導',
    description: '由 ICEEFT 認可的督導進行個別指導。需提交錄影帶進行臨床討論。',
    icon: Users,
    color: 'bg-primary/10 text-primary'
  },
  {
    title: '最終認證審核',
    duration: 'ICEEFT 總部評分',
    description: '提交兩段錄影帶與相關個案摘要。展現您對 EFT 模型的高掌握度。',
    icon: FileCheck,
    color: 'bg-dark text-white'
  }
];

export default function CertificationPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="認證路徑" 
        subtitle="Certification Path"
        description="成為國際認可的情緒焦點治療師。我們提供嚴謹、系統化且充滿支持的認證體系，協助您達成職業生涯的新高峰。"
      />

      {/* Intro Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-dark font-bold text-xs uppercase tracking-widest">
              <ShieldCheck size={16} />
              <span>ICEEFT Certified</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-bold text-dark leading-tight">不僅是一張證照，<br/>更是一份對卓越的承諾</h2>
           <p className="text-xl text-dark/60 leading-relaxed">
             ICEEFT 是全球最具權威的情緒焦點治療組織。獲得認證代表您的專業能力已達到國際標竿，並能在各種複雜的伴侶或個人諮商中，穩定地提供高品質的療效。
           </p>
        </div>
      </section>

      {/* Path Steps */}
      <section className="py-24 bg-dark/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white rounded-[3rem] shadow-xl shadow-dark/5 border border-dark/5 flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
              >
                <div className="space-y-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.color} shadow-lg group-hover:rotate-6 transition-transform`}>
                    <step.icon size={28} />
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Step 0{i+1}</p>
                     <h3 className="text-2xl font-bold text-dark leading-tight">{step.title}</h3>
                     <div className="flex items-center gap-2 text-dark/40 font-bold text-xs uppercase tracking-widest">
                        <TrendingUp size={14} />
                        {step.duration}
                     </div>
                     <p className="text-dark/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="pt-8">
                   <div className="w-8 h-1 bg-dark/10 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
             <h2 className="text-4xl font-bold text-dark leading-tight">獲得認證後的優勢</h2>
             <div className="space-y-8">
                {[
                  { title: '官方名錄推薦', desc: '您的姓名將列入 ICEEFT 全球與本會官方找治療師名錄，增加曝光。' },
                  { title: '專業社群支持', desc: '加入內部專業群組，與資深督導與同儕進行臨床案例討論與資源共享。' },
                  { title: '課程優惠待遇', desc: '享有協會主辦大型國際工作坊與特定進階課程的專屬早鳥或會員折扣。' },
                  { title: '個案轉介優先', desc: '協會在接到外部媒體或企業合作需求時，將優先推薦具認證資格之會員。' }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-6 group">
                     <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <CheckCircle size={24} />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-xl font-bold text-dark">{benefit.title}</h4>
                        <p className="text-dark/60">{benefit.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, rotate: -5 }}
               whileInView={{ opacity: 1, rotate: 0 }}
               viewport={{ once: true }}
               className="aspect-square bg-dark rounded-[4rem] p-16 text-white flex flex-col justify-center gap-8 relative z-10"
             >
                <div className="w-20 h-20 bg-accent rounded-[1.5rem] flex items-center justify-center text-dark">
                   <Award size={48} />
                </div>
                <h3 className="text-4xl font-bold tracking-tight">準備好開始您的<br/>專業成長之旅了嗎？</h3>
                <p className="text-white/50 text-lg leading-relaxed">
                  我們會一步步協助您，從基礎訓練到最終審核，確保您在過程中感受到支持與專業導引。
                </p>
                <button className="flex items-center gap-3 px-10 py-5 bg-white text-dark font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-8">
                   下載認證指南 PDF
                   <ArrowRight size={20} />
                </button>
             </motion.div>
             <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-3 translate-x-4 translate-y-4 -z-10" />
          </div>
        </div>
      </section>

      {/* External Link */}
      <section className="py-24 bg-dark text-white text-center">
         <div className="container mx-auto px-6 max-w-2xl space-y-8">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.4em]">ICEEFT Global</p>
            <h2 className="text-3xl font-bold">瞭解更多關於國際總部認證細節</h2>
            <p className="text-white/40 leading-relaxed">
              您可以造訪 ICEEFT 官方網站獲取最新的認證標準、規費說明與全球認證治療師資料庫。
            </p>
            <a href="https://iceeft.com" target="_blank" className="inline-flex items-center gap-2 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
               <span className="font-bold">造訪 ICEEFT 官網</span>
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
         </div>
      </section>
    </main>
  );
}
