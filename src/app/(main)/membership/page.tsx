'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  CheckCircle2, 
  CreditCard, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Trophy
} from 'lucide-react';

const membershipLevels = [
  {
    name: '學生會員',
    price: 'NT$ 1,200',
    period: '每年度',
    description: '專為在學學生設計。提供最基礎的專業入門資源與課程優惠。',
    features: [
      '獲取協會最新電子週報',
      '學術研討會報名八折優惠',
      '存取基礎文獻資料庫',
      '優先預約大眾講座'
    ],
    cta: '提交學生證申請',
    highlight: false
  },
  {
    name: '專業會員',
    price: 'NT$ 3,000',
    period: '每年度',
    description: '針對正式執業的心理師、醫師。完整的專業支持與國際接軌資源。',
    features: [
      '所有認證課程專屬早鳥價',
      '解鎖「臨床影音」文獻庫',
      '名列官方「找心理師」清單',
      '加入內部專業督導社群',
      '獲取課程結業電子證書'
    ],
    cta: '立即申請加入',
    highlight: true
  },
  {
    name: '贊助會員',
    price: 'NT$ 10,000+',
    period: '自由捐助',
    description: '為熱心推廣 EFT 理念的個人或機構設計。支持台灣心理健康教育的發展。',
    features: [
      '官網首頁贊助商標示',
      '定期活動保留席位',
      '年度成果報告專遞',
      '獲頒年度感謝獎狀',
      '享有所有專業會員權利'
    ],
    cta: '聯繫秘書處',
    highlight: false
  }
];

export default function MembershipPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="加入會員" 
        subtitle="Membership"
        description="加入臺灣 EFT 治療學會，與超過 500 位專業同儕並肩同行。我們提供最權威的資源與溫暖的連結，支持您的專業成長之路。"
      />

      {/* Why Join Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-dark leading-tight">連結專業、精進實務、<br/>守護情感。</h2>
              <p className="text-xl text-dark/60 leading-relaxed">
                成為會員不僅是獲得一份資源處，更是加入一個致力於「由心出發」的專業社群。在這裡，您能獲得：
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: '權威認證支持', desc: '我們是全台唯一獲得 ICEEFT 授權的學術組織。' },
                { icon: Zap, title: '最先進的臨床技術', desc: '第一時間獲取國際大師的最新研究與介入模型。' },
                { icon: UserPlus, title: '跨領域專業交流', desc: '與精神醫學、社會工作與心理諮商領域的專家深度連結。' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <item.icon size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-dark">{item.title}</h4>
                    <p className="text-dark/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="aspect-square bg-dark rounded-[4rem] p-16 text-white flex flex-col justify-center gap-10 relative z-10"
            >
               <div className="w-24 h-24 bg-accent rounded-[2rem] flex items-center justify-center text-dark">
                 <Trophy size={48} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-4xl font-bold tracking-tight">成就卓越的<br/>治療藝術</h3>
                  <p className="text-white/40 text-lg leading-relaxed">
                    我們提供的不只是學分，更是陪伴您在治療室中，穩定接住每一個破碎靈魂的力量。
                  </p>
               </div>
               <div className="pt-8 border-t border-white/10 flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-black text-primary">500+</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">現有會員</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-3xl font-black text-primary">95%</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">續會比例</p>
                  </div>
               </div>
            </motion.div>
            <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-3 translate-x-6 translate-y-6 -z-10" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-dark/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-bold text-dark">選擇適合您的會員類別</h2>
            <p className="text-dark/60 italic">每位加入的成員，都是台灣關係治療發展的重要推手。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {membershipLevels.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-12 rounded-[3.5rem] bg-white border-2 flex flex-col justify-between group transition-all duration-500 shadow-2xl shadow-dark/5 ${level.highlight ? 'border-primary ring-8 ring-primary/5' : 'border-white hover:border-primary/20'}`}
              >
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">{level.name}</span>
                       {level.highlight && (
                        <div className="px-3 py-1 bg-primary text-white rounded-full flex items-center gap-1">
                          <Sparkles size={12} fill="white" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                        </div>
                       )}
                    </div>
                    <div className="flex items-baseline gap-2">
                       <span className="text-5xl font-black text-dark">{level.price}</span>
                       <span className="text-dark/40 font-bold text-sm uppercase tracking-widest">/ {level.period}</span>
                    </div>
                    <p className="text-dark/60 text-sm leading-relaxed">{level.description}</p>
                  </div>

                  <ul className="space-y-5">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-dark/80 text-sm font-medium">
                        <CheckCircle2 size={18} className="text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-12">
                   <button className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${level.highlight ? 'bg-dark text-white hover:bg-primary shadow-xl shadow-primary/20' : 'bg-white border-2 border-dark/5 text-dark hover:border-primary'}`}>
                      {level.cta}
                      <ArrowRight size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="p-16 rounded-[4rem] bg-dark relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.03]" 
                style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-4xl font-bold text-white leading-tight">簡易的入會流程</h2>
                 <div className="space-y-12">
                    {[
                      { step: '01', title: '提交申請表單', desc: '填寫基本資料並上傳專業證明（心理師國考證書、醫事人員卡等）。' },
                      { step: '02', title: '秘書處線上審核', desc: '我們將在 3-5 個工作日內完成審核並透過電子郵件通知。' },
                      { step: '03', title: '繳納年度會費', desc: '審核通過後，可透過線上刷卡、ATM 轉帳完成入會繳費。' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 relative">
                         {i < 2 && <div className="absolute left-6 top-16 bottom-0 w-px bg-white/10" />}
                         <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black shrink-0">
                           {item.step}
                         </div>
                         <div className="space-y-2">
                           <h4 className="text-xl font-bold text-white">{item.title}</h4>
                           <p className="text-white/40 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] space-y-8">
                 <CreditCard size={48} className="text-primary" />
                 <h3 className="text-3xl font-bold text-white">支付方式說明</h3>
                 <p className="text-white/60 leading-relaxed">
                   我們提供多樣化的安全支付途徑。會費收入將全數投入於協會資源庫開發、翻譯國際文獻，以及舉辦在台的大師培訓工作坊。
                 </p>
                 <div className="flex flex-wrap gap-4">
                    {['VISA', 'MasterCard', 'ATM 轉帳', 'Line Pay', 'WebATM'].map((pay) => (
                      <span key={pay} className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold text-white/40 border border-white/5">
                        {pay}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6 max-w-2xl space-y-12">
           <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Sparkles size={40} />
           </div>
           <h2 className="text-4xl font-bold text-dark">讓專業與情感在此匯流</h2>
           <p className="text-dark/60 text-xl leading-relaxed italic">
             「治療師的自我修煉，是為個案開啟希望的第一道門。」
           </p>
           <button className="px-12 py-6 bg-dark text-white font-bold rounded-3xl hover:bg-primary transition-all shadow-2xl shadow-dark/20 text-xl tracking-tight">
             立即開始我的會員申請
           </button>
        </div>
      </section>
    </main>
  );
}
