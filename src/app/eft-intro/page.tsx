'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  RefreshCw,
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
        description="情緒焦點治療 (Emotionally Focused Therapy, EFT) 是一套以科學研究為基礎，專注於情緒與關係連結的系統性治療法。"
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

      {/* FAQ Section Preview */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-dark mb-12">適合誰進行 EFT？</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            '經常因小事引發激烈爭執的伴侶',
            '感到關係疏離、話不投機的夫妻',
            '想提升孩子情緒調節能力的家長',
            '在人際關係中感到不安、焦慮者'
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border-2 border-primary/10 rounded-2xl flex items-center justify-center text-dark/70 font-bold hover:border-primary transition-colors">
              {item}
            </div>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
          查看更多常見問題
          <ArrowRight size={20} />
        </button>
      </section>
    </main>
  );
}
