'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  History, 
  Target, 
  Users, 
  Award,
  Globe,
  CheckCircle2
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

export default function AboutPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="關於學會" 
        subtitle="About Association"
        description="臺灣 EFT 治療學會（Asia EFT Center）是專為情緒焦點治療 (EFT) 定義的專業組織，致力於推廣並提供最優質的國際化臨床培訓。"
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
            <h2 className="text-4xl font-bold text-dark leading-tight">致力於人類最深層的情感連結</h2>
            <p className="text-lg text-dark/70 leading-relaxed">
              情緒焦點治療 (EFT) 是目前國際科學實證上，對「修復親密關係」極具成效的治療法。我們相信，一段健康的關係中，最重要的核心在於「安全的情緒連結」。
            </p>
            <p className="text-lg text-dark/70 leading-relaxed">
              自協會成立以來，我們已培訓超過數百位優秀的諮商師，並協助數以千計的家庭重新找回心靈的歸屬感。
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-3xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">認證心理師</p>
              </div>
              <div className="p-6 bg-accent/10 rounded-2xl border border-accent/20">
                <p className="text-3xl font-bold text-dark mb-1">20+</p>
                <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">國際導師</p>
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
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">我們的核心價值</h2>
            <p className="text-white/60">專業、溫暖、國際視野。我們不僅是在做治療，更是在守護每一顆流浪的心。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {coreValues.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/20">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Section */}
      <section id="international" className="py-24 bg-white">
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
                    <CheckCircle2 size={24} className="text-accent fill-dark/5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
               <div className="p-8 rounded-[3rem] bg-accent/20 border border-accent/30 relative">
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-white rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-6 text-center">
                      <Award size={40} className="text-primary mb-4" />
                      <p className="font-bold text-dark">國際標準</p>
                    </div>
                    <div className="aspect-square bg-dark rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-6 text-center text-white">
                      <Globe size={40} className="text-accent mb-4" />
                      <p className="font-bold">全球視野</p>
                    </div>
                    <div className="aspect-square bg-primary rounded-[2rem] shadow-xl flex flex-col items-center justify-center p-6 text-center text-white">
                      <Users size={40} className="mb-4" />
                      <p className="font-bold">連結在地</p>
                    </div>
                    <div className="aspect-square bg-white rounded-[2rem] shadow-xl border border-primary/10 flex flex-col items-center justify-center p-6 text-center">
                      <CheckCircle2 size={40} className="text-primary mb-4" />
                      <p className="font-bold text-dark">權威認證</p>
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
