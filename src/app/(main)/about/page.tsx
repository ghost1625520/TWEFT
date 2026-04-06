'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  History, 
  Target, 
  Users, 
  Award,
  Globe,
  CheckCircle2,
  Heart,
  Milestone,
  Sparkles
} from 'lucide-react';

const coreValues = [
  {
    icon: History,
    title: '成立宗旨',
    description: '我們致力於推廣情緒焦點治療 (EFT)，為對親密關係平衡有興趣的人士提供專業資源，並協助個人與家庭建立安全的情緒連結。'
  },
  {
    icon: Target,
    title: '協會使命',
    description: '透過系統化的培訓與國際認證，提升台灣臨床心理諮商的品質，讓 EFT 成為修復關係、共創幸福的有力工具。'
  },
  {
    icon: Users,
    title: '專業社群',
    description: '建立一個互助、成長且專業的實務社群，讓治療師能在安全與受支持的環境中精進臨床技術。'
  }
];

const milestones = [
  {
    year: '2012',
    title: '協會籌備成立',
    description: '一群深度認同 EFT 理念的台灣心理師，在參加北美 ICEEFT 研討會後，決定將這股力量帶回台灣，啟動協會籌備工作。',
    tag: '起點'
  },
  {
    year: '2014',
    title: '首屆 Externship 於台北舉辦',
    description: '邀請 ICEEFT 認可的國際訓練員來台，首屆基礎訓練課程順利完成，吸引超過 40 名心理師參加，開啟 EFT 本土化的元年。',
    tag: '里程碑'
  },
  {
    year: '2017',
    title: '獲得 ICEEFT 正式授權',
    description: '協會通過嚴格審核，正式成為 ICEEFT 在亞洲的授權培訓機構，成為全台唯一具備此資格的專業組織。',
    tag: '國際認可'
  },
  {
    year: '2019',
    title: '會員人數突破 300 位',
    description: '跟隨社會對心理健康的重視，會員規模快速成長，並同步擴大線上督導社群，讓全台各地的治療師都能獲得資源支持。',
    tag: '成長'
  },
  {
    year: '2022',
    title: '啟動 EFIT 個人治療推廣計畫',
    description: '在傳統伴侶治療以外，協會積極推廣 EFIT (情緒焦點個人治療)，讓更多有個人議題需求的個案能獲得 EFT 的幫助。',
    tag: '拓展'
  },
  {
    year: '2025',
    title: '數位學習平台與會員系統上線',
    description: '正式推出整合線上學習、督導媒合與文獻資料庫的數位平台，讓 EFT 的學習不再受地理限制。',
    tag: '數位躍升'
  }
];

const leadershipTeam = [
  {
    name: '郭○○ 博士',
    role: '學會理事長',
    affiliation: '國立台灣師範大學 教育心理與輔導學系',
    desc: '台灣 EFT 推廣的奠基人，致力整合國際研究與本土臨床實務超過 20 年。'
  },
  {
    name: 'Dr. Ting Jackie',
    role: '國際訓練委員會主任',
    affiliation: 'ICEEFT 認證訓練員 (Trainer)',
    desc: '負責協調 ICEEFT 認證課程品質審核，是連結台灣與國際培訓體系的核心橋樑。'
  },
  {
    name: '徐○○ 博士',
    role: '研究與倫理委員',
    affiliation: '諮商心理學博士 / 資深臨床心理師',
    desc: '主導協會年度研究計畫，確保所有培訓方案符合最高學術與倫理標準。'
  },
  {
    name: '林○○ 諮詢委員',
    role: '社群與會員事務',
    affiliation: 'ICEEFT 認證治療師',
    desc: '負責管理超過 500 位會員的社群運作，打造溫暖且相互支持的專業大家庭。'
  }
];

export default function AboutPage() {
  return (
    <main className="bg-[#F7F4EF]">
      <SubpageHero 
        title="關於學會" 
        subtitle="About Association"
        description="臺灣 EFT 治療學會（twEFT）是全台唯一獲 ICEEFT 授權的國際培訓機構，致力於推廣情緒焦點治療，協助人們在安全的情感連結中，重拾生命的深度與韌性。"
      />

      {/* Intro Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              twEFT — Asia EFT Center
            </div>
            <h2 className="text-4xl font-bold text-dark leading-tight">致力於人類最深層的<br/>情感連結</h2>
            <p className="text-lg text-dark/70 leading-relaxed">
              情緒焦點治療 (EFT) 是目前國際科學實證上，對「修復親密關係」極具成效的治療法。我們相信，一段健康的關係中，最重要的核心在於「安全的情緒連結」。
            </p>
            <p className="text-lg text-dark/70 leading-relaxed">
              自協會成立以來，我們已培訓超過數百位優秀的諮商師，並協助數以千計的家庭重新找回心靈的歸屬感。這不只是一個培訓機構——更是一個守護情感連結的專業社群。
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-primary/8 rounded-2xl border border-primary/15">
                <p className="text-3xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">認證心理師</p>
              </div>
              <div className="p-6 bg-accent/20 rounded-2xl border border-accent/30">
                <p className="text-3xl font-bold text-dark mb-1">20+</p>
                <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">國際導師</p>
              </div>
              <div className="p-6 bg-secondary/15 rounded-2xl border border-secondary/20">
                <p className="text-3xl font-bold text-secondary mb-1">12+</p>
                <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">深耕年數</p>
              </div>
              <div className="p-6 bg-dark/5 rounded-2xl border border-dark/10">
                <p className="text-3xl font-bold text-dark mb-1">3,000+</p>
                <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">受益家庭</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 to-transparent z-10" />
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
              <p className="text-white/70 text-sm font-medium italic leading-relaxed">
                「治療師帶著自己走進治療室，情感連結就從那一刻開始。」
              </p>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">— twEFT 協會核心信念</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04]" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-bold text-xs uppercase tracking-widest">
              <Milestone size={14} />
              發展歷程
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">走過的每一步，<br/>都是為了讓連結更深</h2>
            <p className="text-white/50 text-lg">從一個夢想到一個影響全台的專業平台，這是我們共同走過的旅程。</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 pl-20 lg:pl-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Year circle — mobile: absolute left, desktop: center */}
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-16 h-16 rounded-full bg-dark border-2 border-primary/40 flex items-center justify-center z-20 shadow-xl shadow-primary/10">
                    <span className="text-primary font-black text-xs leading-tight text-center">{m.year}</span>
                  </div>

                  {/* Content card */}
                  <div className={`lg:w-[46%] p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/8 hover:border-primary/30 transition-all duration-500 ${i % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">{m.tag}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">{m.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{m.description}</p>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block lg:w-[46%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#F7F4EF]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-dark mb-6">我們的核心價值</h2>
            <p className="text-dark/60">專業、溫暖、國際視野。我們不僅是在做治療，更是在守護每一顆流浪的心。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {coreValues.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[2.5rem] bg-white border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 text-primary shadow-inner">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-dark/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/30 rounded-full text-dark font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} />
              Leadership
            </div>
            <h2 className="text-4xl font-bold text-dark">領導委員會</h2>
            <p className="text-dark/60">帶領學會走向未來的核心人物。他們不只是管理者，更是每一位會員的同行夥伴。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipTeam.map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 bg-[#F7F4EF] rounded-[2.5rem] border border-dark/5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group"
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-primary font-black text-xl border border-primary/20">
                  {person.name[0]}
                </div>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-xl font-bold text-dark">{person.name}</h4>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest">{person.role}</p>
                  </div>
                  <p className="text-dark/40 text-xs font-bold">{person.affiliation}</p>
                  <p className="text-dark/60 text-sm leading-relaxed">{person.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Section */}
      <section id="international" className="py-24 bg-[#F7F4EF]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase">
                <Globe size={20} />
                <span>Global Connection</span>
              </div>
              <h2 className="text-4xl font-bold text-dark leading-tight">與 ICEEFT 國際接軌</h2>
              <p className="text-lg text-dark/70 leading-relaxed">
                本會為 ICEEFT (International Centre for Excellence in Emotionally Focused Therapy) 在亞洲的重要夥伴。我們所有認證課程皆嚴格遵循國際標竿，確保學員獲得與全球同步的專業知識。
              </p>
              <ul className="space-y-4">
                {[
                  '全台唯一授權 ICEEFT 國際認證課程',
                  '定期舉辦國際大師工作坊',
                  '全球心理諮商學術網絡資源共享',
                  '國際認證證書全球通用'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-dark/80 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="p-8 rounded-[3rem] bg-white border border-primary/10 shadow-xl shadow-primary/5 relative">
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-[#F7F4EF] rounded-[2rem] flex flex-col items-center justify-center p-6 text-center border border-primary/10">
                    <Award size={40} className="text-primary mb-4" />
                    <p className="font-bold text-dark">國際標準</p>
                    <p className="text-xs text-dark/40 mt-1">ICEEFT Certified</p>
                  </div>
                  <div className="aspect-square bg-dark rounded-[2rem] flex flex-col items-center justify-center p-6 text-center text-white">
                    <Globe size={40} className="text-accent mb-4" />
                    <p className="font-bold">全球視野</p>
                    <p className="text-xs text-white/40 mt-1">Asia EFT Center</p>
                  </div>
                  <div className="aspect-square bg-primary rounded-[2rem] flex flex-col items-center justify-center p-6 text-center text-white">
                    <Users size={40} className="mb-4" />
                    <p className="font-bold">連結在地</p>
                    <p className="text-xs text-white/60 mt-1">500+ Members</p>
                  </div>
                  <div className="aspect-square bg-[#F7F4EF] rounded-[2rem] flex flex-col items-center justify-center p-6 text-center border border-accent/30">
                    <Heart size={40} className="text-secondary mb-4" />
                    <p className="font-bold text-dark">情感守護</p>
                    <p className="text-xs text-dark/40 mt-1">EFT Philosophy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
