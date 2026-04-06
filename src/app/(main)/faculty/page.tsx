'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Globe as Linkedin, 
  Globe, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  History,
  Briefcase
} from 'lucide-react';

const faculty = [
  {
    name: 'Dr. Ting Jackie',
    title: 'ICEEFT 國際認證訓練員 (Trainer)',
    education: '美國密西根州立大學諮商心理博士',
    specialty: 'EFT 伴侶治療、督導訓練、情緒調節',
    experience: '超過 20 年臨床諮商與培訓經驗，成功在亞洲推廣 EFT 多年。',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2076&auto=format&fit=crop',
    tags: ['Trainer', 'Supervisor']
  },
  {
    name: '郭○○ 教授',
    title: 'ICEEFT 認證督導 (Supervisor)',
    education: '國立台灣師範大學教育心理與輔導學系教授',
    specialty: '婚姻諮商、情緒聚焦治療、家族治療',
    experience: '台灣 EFT 推廣的元老級人物，致力於本土化實務研究與人才培育。',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop',
    tags: ['Supervisor', 'Professor']
  },
  {
    name: '徐○○ 博士',
    title: 'ICEEFT 認證治療師 / 督導候選人',
    education: '諮商心理學博士 / 資深臨床心理師',
    specialty: '創傷情緒、青少年問題、關係重建',
    experience: '深耕社區與醫療體系，廣泛運用 EFT 處理複雜心理議題。',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2072&auto=format&fit=crop',
    tags: ['Candidate', 'Researcher']
  }
];

export default function FacultyPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="師資陣容" 
        subtitle="Our Faculty"
        description="匯集海內外最頂尖的 EFT 專家。我們的導師不僅具備深厚的學術功底，更擁有數萬小時的臨床實務經驗。"
      />

      {/* Intro Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold text-dark leading-tight">傳承自國際標準，<br/>紮根於在地實務</h2>
            <p className="text-xl text-dark/60 leading-relaxed">
              協會的所有師資皆經過 ICEEFT 嚴格遴選與認證。他們不仅是知識的傳授者，更是您在專業成長路上的同行者與守護者。
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dark/5">
                {[
                  { label: '國際級培訓員', value: '03' },
                  { label: '認證督導', value: '15+' },
                  { label: '培訓時數', value: '10K+' },
                  { label: '服務學員', value: '1M+' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-4xl font-black text-primary">{stat.value}</p>
                    <p className="text-xs font-bold text-dark/30 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
             <div className="p-12 bg-dark rounded-[4rem] text-white space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                   <ShieldCheck size={180} />
                </div>
                <h3 className="text-3xl font-bold tracking-tight relative z-10">師資認證標準</h3>
                <p className="text-white/50 leading-relaxed relative z-10">
                  所有導師需具備心理學或相關領域博士或碩士學位，並持有 ICEEFT 頒發的 Trainer 或 Supervisor 資格。每年需參與國際年會，確保教學內容與全球同步。
                </p>
                <div className="space-y-4 relative z-10">
                   {['嚴謹的臨床錄影審核', '數千小時的督導經驗', '對依附理論的深度研究', '優異的教學評鑑紀錄'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                         <span className="text-sm font-bold text-white/70">{item}</span>
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers List */}
      <section className="py-24 bg-dark/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-24">
            {faculty.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image & Tags */}
                <div className="lg:w-1/3 relative">
                  <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10">
                     <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105" style={{ backgroundImage: `url('${member.image}')` }} />
                  </div>
                  <div className="absolute -top-6 -right-6 z-20 flex flex-col gap-2">
                     {member.tags.map((tag) => (
                       <span key={tag} className="px-4 py-2 bg-accent text-dark text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl">
                         {tag}
                       </span>
                     ))}
                  </div>
                  <div className={`absolute inset-0 bg-primary/20 rounded-[3.5rem] rotate-6 translate-x-4 translate-y-4 -z-0 ${i % 2 !== 0 ? '-rotate-6 -translate-x-4' : ''}`} />
                </div>

                {/* Content */}
                <div className="lg:w-2/3 space-y-8">
                  <div className="space-y-2">
                     <h3 className="text-5xl font-black text-dark tracking-tight">{member.name}</h3>
                     <p className="text-2xl font-bold text-primary">{member.title}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-dark/5">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-dark font-bold uppercase tracking-widest text-xs">
                           <GraduationCap size={18} className="text-primary" />
                           教育背景
                        </div>
                        <p className="text-dark/60 text-sm leading-relaxed">{member.education}</p>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-dark font-bold uppercase tracking-widest text-xs">
                           <Briefcase size={18} className="text-primary" />
                           專業專長
                        </div>
                        <p className="text-dark/60 text-sm leading-relaxed">{member.specialty}</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-dark font-bold uppercase tracking-widest text-xs">
                        <History size={18} className="text-primary" />
                        臨床經歷與成就
                     </div>
                     <p className="text-lg text-dark/70 leading-relaxed max-w-3xl italic">
                       「{member.experience}」
                     </p>
                  </div>

                  <div className="flex items-center gap-6 pt-8">
                     <button className="flex items-center gap-3 px-10 py-5 bg-dark text-white font-bold rounded-2xl hover:bg-primary transition-all">
                        查看完整著作與開課
                        <ArrowRight size={20} />
                     </button>
                     <div className="flex items-center gap-4">
                       {[Linkedin, Globe, Mail].map((Icon, idx) => (
                         <button key={idx} className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center text-dark/40 hover:bg-white hover:text-primary hover:border-primary transition-all shadow-sm">
                            <Icon size={20} />
                         </button>
                       ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
         <div className="container mx-auto px-6 max-w-2xl space-y-12">
            <h2 className="text-4xl font-bold text-dark">想邀請我們的導師進行演講或合作？</h2>
            <p className="text-dark/60 text-xl leading-relaxed">
              我們非常樂意將 EFT 的專業知識帶入您的機構。歡迎透過下方按鈕聯繫協調相關事宜。
            </p>
            <button className="px-12 py-6 bg-accent text-dark font-bold rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-accent/20">
               提交合作意向書
            </button>
         </div>
      </section>
    </main>
  );
}
