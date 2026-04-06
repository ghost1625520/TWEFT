'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  RefreshCw,
  Globe,
  ArrowRight
} from 'lucide-react';

const eftSteps = [
  {
    number: '01',
    title: '穩定情緒 (De-escalation)',
    description: '識別關係中負面的循環與情緒。治療師會協助雙方停下互相攻擊或撤退的慣性，建立初步的安全感。'
  },
  {
    number: '02',
    title: '重塑連結 (Restructuring)',
    description: '深入探索底層的情緒與需求。協助雙方表達脆弱面，並在安全的互動中重新建立情感上的依附與共鳴。'
  },
  {
    number: '03',
    title: '鞏固成果 (Consolidation)',
    description: '建立新的正向互動模式，並將其應用到日常生活中。鞏固雙方的安全依附關係，提升未來面對衝突的韌性。'
  }
];

export default function EFTIntroPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="什麼是 EFT" 
        subtitle="What is EFT"
        description="情緒焦點治療 (Emotionally Focused Therapy, EFT) 是一套以科學為基礎、以「依附理論」為核心的系統設計。它不僅是處理衝突，更是協助我們在情緒的「涵容之海」中學會自在遨遊，而不被強大的情感洪流所淹沒。"
      />

      {/* Science & Proof Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-xl font-bold text-dark">科學實證</h3>
              <p className="text-dark/60 text-sm">研究顯示 EFT 能顯著降低焦慮與憂鬱，並大幅提升關係滿意度。</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-dark">
                <Heart size={40} />
              </div>
              <h3 className="text-xl font-bold text-dark">核心連結</h3>
              <p className="text-dark/60 text-sm">從「依附理論」出發，處理人類最底層對安全感與連結的需求。</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Zap size={40} />
              </div>
              <h3 className="text-xl font-bold text-dark">快速見效</h3>
              <p className="text-dark/60 text-sm">相較於傳統療法，EFT 在相對短時間內能達成深層的情感改善。</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-dark rounded-[3rem] text-white space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <RefreshCw size={200} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight relative z-10">從「看見循環」到「建立安全感」</h2>
            <p className="text-xl text-white/70 leading-relaxed relative z-10">
              在 EFT 的視角裡，爭執、冷戰或逃避不只是個性能不能合的問題，而是一場「追趕與撤退」的原舞曲。當我們看見這套習慣的負面循環，就能停止指責，開始溫暖地接住彼此的情緒。
            </p>
            <button className="flex items-center gap-2 px-8 py-4 bg-accent text-dark font-bold rounded-full relative z-10 hover:scale-105 transition-transform">
              預約專業心理諮商
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-dark">治療的三大階段</h2>
            <p className="text-dark/60">EFT 透過循序漸進的過程，協助雙方從混沌的衝突走向清晰、透明的連結。</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eftSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-12 bg-white rounded-[2.5rem] shadow-xl shadow-dark/5 border border-dark/5 relative group"
              >
                <span className="absolute top-8 right-12 text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">{step.number}</span>
                <h3 className="text-2xl font-bold text-dark mb-6 relative z-10">{step.title}</h3>
                <p className="text-dark/60 leading-relaxed relative z-10">{step.description}</p>
                <div className="pt-8 relative z-10">
                   <div className="w-12 h-1 bg-primary/20 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content / Founders */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* Philosophy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                我們的核心理念
              </div>
              <h2 className="text-4xl font-bold text-dark leading-tight">
                情緒不只是反應，<br/>更是改變的<span className="text-primary">關鍵能量</span>
              </h2>
              <p className="text-lg text-dark/60 leading-relaxed">
                EFT 創始人 Sue Johnson 博士曾說：「情緒告訴我們什麼是對我們重要的，並引導我們向他人尋求聯繫。」在治療過程中，我們不只是壓抑情緒，而是學習連結情緒，透過情緒的轉化來改變關係。
              </p>
              <div className="space-y-4">
                {[
                  '依附理論為基石 (Attachment Theory)',
                  '專注於當下的互動循環 (Present Process)',
                  '非病理化的視角 (Non-pathologizing)',
                  '結構化的變革過程 (Structured Stages)'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <ArrowRight size={12} className="text-dark" />
                    </div>
                    <span className="text-sm font-bold text-dark/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] bg-dark/5 overflow-hidden border border-dark/5">
                {/* Image Placeholder with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 flex items-center justify-center p-12 text-center">
                   <div className="space-y-4">
                      <Globe size={80} className="mx-auto text-primary opacity-20" />
                      <p className="text-xs font-bold text-dark/30 uppercase tracking-widest">EFT Global Community</p>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 p-10 bg-white shadow-2xl rounded-[2.5rem] border border-primary/5 max-w-[280px]">
                 <p className="text-sm italic font-medium text-dark/70">
                   "EFT 讓伴侶看見彼此在焦慮背後的愛，在撤退背後的痛。"
                 </p>
                 <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20" />
                    <div>
                       <p className="text-xs font-bold text-dark">Dr. Sue Johnson</p>
                       <p className="text-[10px] text-dark/40 font-bold">EFT 創始人</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-dark/5" />

          {/* Why choose EFT - Stat cards */}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-dark">為何選擇 EFT？</h2>
              <p className="text-dark/60 max-w-2xl mx-auto">它是目前國際上少數能通過嚴謹實證研究，並獲得高度認可的伴侶治療模式。</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { label: '成功率', value: '70-75%', desc: '伴侶能從嚴重的關係困擾中康復' },
                 { label: '改善率', value: '90%', desc: '關係滿意度在治療後獲得顯著改善' },
                 { label: '持久性', value: '極高', desc: '追蹤研究顯示療效在治療結束後依然穩定' }
               ].map((stat, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -5 }}
                   className="p-10 bg-white border border-primary/10 rounded-3xl text-center space-y-4 hover:shadow-2xl hover:shadow-primary/5 transition-all"
                 >
                    <p className="text-5xl font-black text-primary">{stat.value}</p>
                    <p className="font-bold text-dark">{stat.label}</p>
                    <p className="text-sm text-dark/60 leading-relaxed">{stat.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Preview */}
      <section className="py-32 bg-dark text-white text-center rounded-t-[5rem] mt-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12">適合誰進行 EFT？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 text-left">
            {[
              '經常因小事引發激烈爭執的伴侶',
              '感到關係疏離、話不投機的夫妻',
              '想提升孩子情緒調節能力的家長',
              '在人際關係中感到不安、焦慮者'
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] flex items-start gap-4 group hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                   <ShieldCheck size={18} />
                </div>
                <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">準備好開啟情感修復之旅了嗎？</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-12 py-5 bg-accent text-dark font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20">
                尋找認證治療師
              </button>
              <button className="px-12 py-5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/10">
                查看常見問題
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
