'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  Zap, 
  RefreshCw,
  ArrowRight,
  X,
  Check,
  Waves,
  Link2,
  Ear,
  MessageCircle,
  Repeat,
  Star,
  HeartHandshake
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

// EFT's 7 RISSSC Steps — simplified for public
const sevenSteps = [
  { icon: Ear, step: 'R — Reflect', title: '反映情緒', desc: '治療師以溫和的語言，如實映照個案當下的情緒體驗，讓情感感到「被看見」。' },
  { icon: MessageCircle, step: 'I — Inquire', title: '深度追問', desc: '邀請個案進一步探索情緒的細節與底層脆弱感，超越表面的憤怒或冷漠。' },
  { icon: Waves, step: 'S — Soften', title: '柔化防衛', desc: '在安全的環境下，逐步減少個案的防衛機制，觸及更深層的情感核心。' },
  { icon: Heart, step: 'S — Share', title: '分享脆弱', desc: '協助個案以真實的脆弱感，而非憤怒或指責，表達內心的深層需求。' },
  { icon: Link2, step: 'S — Synthesize', title: '統整新理解', desc: '重新框架互動循環，讓雙方看見彼此的情感模式從「攻擊與逃跑」轉化為「求援與連結」。' },
  { icon: Repeat, step: 'C — Create', title: '創造新互動', desc: '引導雙方在治療室中進行真實的情感連結，建立嶄新且更具安全感的回應方式。' },
  { icon: HeartHandshake, step: '→ Bond', title: '深化安全依附', desc: '將治療中的成果帶入日常，建立持久的安全依附關係，成為彼此穩固的情感避風港。' },
];

const eftIsNotVsIs = [
  { 
    isNot: '責怪你「太情緒化」', 
    is: '陪你靠近那份被沖走的感受' 
  },
  { 
    isNot: '要你壓抑或管理情緒', 
    is: '讓你在情緒的深海裡學會游泳' 
  },
  { 
    isNot: '分析為什麼你有這種問題', 
    is: '看見你在關係中的位置與渴望' 
  },
  { 
    isNot: '給你一套「衝突解決手冊」', 
    is: '協助你觸及改變的情感核心' 
  },
];

export default function EFTIntroPage() {
  return (
    <main className="bg-[#F7F4EF]">
      <SubpageHero 
        title="什麼是 EFT" 
        subtitle="What is EFT"
        description="情緒焦點治療 (EFT) 是一套以科學為基礎、以「依附理論」為核心的系統設計。它不僅是處理衝突，更是協助我們在情緒的「涵容之海」中學會自在遨遊，而不被強大的情感洪流所淹沒。"
      />

      {/* Science & Proof Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/15">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-xl font-bold text-dark">科學實證</h3>
              <p className="text-dark/60 text-sm leading-relaxed">研究顯示 EFT 能顯著降低焦慮與憂鬱，並大幅提升關係滿意度。超過 30 年的隨機對照試驗支持。</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-secondary/15 rounded-full flex items-center justify-center text-secondary border border-secondary/20">
                <Heart size={40} />
              </div>
              <h3 className="text-xl font-bold text-dark">核心連結</h3>
              <p className="text-dark/60 text-sm leading-relaxed">從「依附理論」出發，處理人類最底層對安全感與連結的需求。情緒是引導，而非敵人。</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-accent/30 rounded-full flex items-center justify-center text-dark border border-accent/40">
                <Zap size={40} />
              </div>
              <h3 className="text-xl font-bold text-dark">快速見效</h3>
              <p className="text-dark/60 text-sm leading-relaxed">相較於傳統療法，EFT 在 8-20 次會談中即能達成深層的情感改善，70-75% 伴侶獲得康復。</p>
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
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">從「看見循環」到「建立安全感」</h2>
              <p className="text-xl text-white/70 leading-relaxed">
                在 EFT 的視角裡，爭執、冷戰或逃避不只是個性能不能合的問題，而是一場「追趕與撤退」的原始舞曲。當我們看見這套習慣的負面循環，就能停止指責，開始溫暖地接住彼此的情緒。
              </p>
              <p className="text-white/50 leading-relaxed">
                這樣的改變不是因為雙方努力「變好」，而是因為在安全的治療關係中，我們第一次真正地被「看見」了。
              </p>
            </div>
            <button className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full relative z-10 hover:bg-primary/80 transition-colors">
              預約專業心理諮商
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* EFT IS / IS NOT Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-dark">EFT 真正做的是什麼？</h2>
            <p className="text-dark/60 max-w-xl mx-auto">很多人對「情緒治療」有些誤解。我們想在這裡說清楚。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-6 py-4 bg-dark/5 rounded-2xl mb-6">
                <X size={18} className="text-dark/30 shrink-0" />
                <span className="text-dark/40 font-bold text-xs uppercase tracking-widest">EFT 不是…</span>
              </div>
              {eftIsNotVsIs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-dark/3 border border-dark/5"
                >
                  <div className="w-7 h-7 rounded-full bg-dark/8 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={14} className="text-dark/30" />
                  </div>
                  <p className="text-dark/50 font-medium leading-relaxed">{item.isNot}</p>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-6 py-4 bg-primary/10 rounded-2xl mb-6">
                <Check size={18} className="text-primary shrink-0" />
                <span className="text-primary font-bold text-xs uppercase tracking-widest">EFT 真正做的是…</span>
              </div>
              {eftIsNotVsIs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/8 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-primary" />
                  </div>
                  <p className="text-dark font-medium leading-relaxed">{item.is}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-[#F7F4EF]">
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
                className="p-12 bg-white rounded-[2.5rem] shadow-xl shadow-dark/5 border border-primary/8 relative group hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
              >
                <span className="absolute top-8 right-12 text-6xl font-black text-primary/8 group-hover:text-primary/15 transition-colors">{step.number}</span>
                <h3 className="text-2xl font-bold text-dark mb-6 relative z-10">{step.title}</h3>
                <p className="text-dark/60 leading-relaxed relative z-10">{step.description}</p>
                <div className="pt-8 relative z-10">
                  <div className="w-12 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Steps / Change Events */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-bold text-xs uppercase tracking-widest">
              <Star size={14} />
              核心技術
            </div>
            <h2 className="text-4xl font-bold tracking-tight">EFT 的七個改變舞步</h2>
            <p className="text-white/50 leading-relaxed text-lg">
              這不是一套操作程序，而是一段真實的情感旅程。每個步驟都是在邀請個案更靠近自己的內心，同時也靠近彼此。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sevenSteps.slice(0, 4).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/8 hover:border-primary/40 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <s.icon size={24} />
                </div>
                <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">{s.step}</p>
                <h4 className="text-lg font-bold text-white mb-3">{s.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {sevenSteps.slice(4).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 4) * 0.1 }}
                className={`p-8 border rounded-[2rem] hover:border-primary/40 transition-all duration-500 group ${i === 2 ? 'bg-primary/20 border-primary/30' : 'bg-white/5 border-white/10 hover:bg-white/8'}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <s.icon size={24} />
                </div>
                <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">{s.step}</p>
                <h4 className="text-lg font-bold text-white mb-3">{s.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-32">
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
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <ArrowRight size={10} className="text-primary" />
                    </div>
                    <span className="text-sm font-bold text-dark/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Replace globe placeholder with quote card */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-primary/15 bg-white shadow-xl shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 flex flex-col items-start justify-between p-12">
                  <div className="space-y-8 w-full">
                    <div className="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center text-primary">
                      <Heart size={32} />
                    </div>
                    <div className="text-6xl text-primary/20 font-black leading-none">"</div>
                    <blockquote className="text-2xl font-bold text-dark leading-relaxed">
                      情緒是人類最原始的溝通語言，也是關係中最被低估的資源。
                    </blockquote>
                    <div className="space-y-1">
                      <p className="text-primary font-bold text-sm">Dr. Sue Johnson</p>
                      <p className="text-dark/40 text-xs font-bold uppercase tracking-widest">EFT 創始人 · ICEEFT</p>
                    </div>
                  </div>
                  <div className="w-full pt-8 border-t border-primary/10 grid grid-cols-3 gap-4">
                    {[
                      { val: '70%', label: '療效成功率' },
                      { val: '30+', label: '年研究歷史' },
                      { val: '75+', label: '國際研究支持' },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xl font-black text-primary">{s.val}</p>
                        <p className="text-[9px] text-dark/40 font-bold uppercase tracking-wider">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 p-8 bg-dark shadow-2xl rounded-[2rem] border border-white/5 max-w-[240px] z-20">
                <p className="text-sm font-medium text-white/70 italic leading-relaxed">
                  「EFT 讓伴侶看見彼此在焦慮背後的愛，在撤退背後的痛。」
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/30" />
                  <div>
                    <p className="text-xs font-bold text-white">Dr. Sue Johnson</p>
                    <p className="text-[10px] text-white/30 font-bold">EFT 創始人</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
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
                  className="p-10 bg-white border border-primary/10 rounded-3xl text-center space-y-4 hover:shadow-2xl hover:shadow-primary/8 transition-all"
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

      {/* Who is EFT for */}
      <section className="py-32 bg-dark text-white text-center rounded-t-[5rem] mt-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12">適合誰進行 EFT？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 text-left">
            {[
              '經常因小事引發激烈爭執的伴侶',
              '感到關係疏離、話不投機的夫妻',
              '想提升孩子情緒調節能力的家長',
              '在人際關係中感到不安、焦慮者',
              '曾受過情感傷害、難以信任他人者',
              '正在經歷失落或生命轉換期的個人'
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2rem] flex items-start gap-4 group hover:bg-white/8 hover:border-primary/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                  <ShieldCheck size={16} />
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
              <button className="px-12 py-5 bg-primary text-white font-black rounded-full hover:bg-primary/80 active:scale-95 transition-all shadow-xl shadow-primary/20">
                尋找認證治療師
              </button>
              <button className="px-12 py-5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/10">
                查看認證課程
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
