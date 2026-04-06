'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  Globe,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Link2,
  Heart,
  Milestone
} from 'lucide-react';

const globalRegions = [
  { region: '北美洲', country: '美國・加拿大', desc: 'ICEEFT 總部所在地，EFT 的發源地與最高學術研究中心', flag: '🌎' },
  { region: '歐洲', country: '英國・荷蘭・德國・法國', desc: '多個國家級協會成立，EFT 在歐洲持續快速發展', flag: '🌍' },
  { region: '亞太區', country: '台灣・香港・澳洲・新加坡', desc: 'twEFT 作為台灣唯一授權機構，引領亞洲地區推廣', flag: '🌏' },
  { region: '中東・澳洲', country: '以色列・澳洲', desc: '新興 EFT 推廣區域，本土化培訓積極展開', flag: '🌐' },
];

const certificationLevels = [
  {
    level: 'EFT Therapist',
    badge: 'Level 1',
    badgeColor: 'bg-accent/30 text-dark',
    desc: 'ICEEFT 認定的基礎認證等級。治療師需展示對 EFT 模式的基本理解與應用能力。',
    requirements: ['完成 Externship 課程', '96 小時 EFT 治療個案', '督導者書面評估'],
    global: '全球互認'
  },
  {
    level: 'Certified EFT Therapist',
    badge: 'Level 2',
    badgeColor: 'bg-primary/20 text-primary',
    desc: '進階認證，展示在複雜個案中的高度臨床熟練度與彈性應對能力。',
    requirements: ['完成 Core Skills 課程', '持續個別督導記錄', 'ICEEFT 認證督導書面推薦'],
    global: '全球最廣泛認可'
  },
  {
    level: 'EFT Supervisor',
    badge: 'Level 3',
    badgeColor: 'bg-secondary/25 text-dark',
    desc: '具備指導他人學習 EFT 的高階臨床能力，對 EFT 模式有深度研究貢獻。',
    requirements: ['持有 Certified EFT 認證', '臨床督導培訓課程', 'ICEEFT 審核委員會評估'],
    global: '授權督導他人'
  },
  {
    level: 'EFT Trainer',
    badge: 'Level 4',
    badgeColor: 'bg-dark text-white',
    desc: '最高等級，具備設計並主導 ICEEFT 認可培訓課程的完整資格，在全球任何地區均受認可。',
    requirements: ['持有 Supervisor 認證', '國際年會參與記錄', 'ICEEFT 委員會嚴格審核通過'],
    global: '國際授課資格'
  },
];

const internationalFaculty = [
  {
    name: 'Dr. Sue Johnson',
    role: 'ICEEFT 創始人 / EFT 創始人',
    origin: '加拿大渥太華大學',
    bio: '情緒焦點治療 (EFT) 的開創者，《Hold Me Tight》作者。她的開創性研究奠定了 EFT 的科學基礎，並持續推動全球 EFT 教育的最高標準。',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    badge: 'Founder'
  },
  {
    name: 'Dr. Les Greenberg',
    role: 'EFT 共同創始人 / 情緒理論奠基者',
    origin: '約克大學心理學系',
    bio: '與 Sue Johnson 共同發展出 EFT 的情緒理論框架。他的「以情緒為中心的心理治療」研究對全球心理治療領域產生了深遠影響。',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    badge: 'Co-Founder'
  },
  {
    name: 'Dr. Scott Woolley',
    role: 'ICEEFT 執行董事',
    origin: '美國 Alliant International University',
    bio: '現任 ICEEFT 執行董事，負責監督全球 EFT 培訓標準與認證流程。曾多次來台訪問 twEFT，見證台灣 EFT 教育的高品質發展。',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    badge: 'ICEEFT Director'
  },
];

const partnerOrgs = [
  { name: 'ICEEFT', full: 'International Centre for Excellence in EFT', country: '加拿大' },
  { name: 'ACEFT', full: 'Australian Centre for EFT', country: '澳洲' },
  { name: 'ICEEFT Europe', full: 'European EFT Training Network', country: '歐元區' },
  { name: 'HKEFT', full: 'Hong Kong EFT Community', country: '香港' },
];

export default function InternationalPage() {
  return (
    <main className="bg-[#F4F1EC]">
      <SubpageHero
        title="國際連結"
        subtitle="International Partnership"
        description="臺灣 EFT 治療學會是 ICEEFT 認可的亞洲重要培訓夥伴，我們與全球最頂尖的 EFT 研究者及培訓機構緊密合作，確保台灣的 EFT 教育達到國際最高標準。"
      />

      {/* What is ICEEFT */}
      <section className="py-28 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/15">
              <Globe size={14} />
              ICEEFT — The Global Standard
            </div>
            <h2 className="text-4xl font-bold text-dark leading-tight">
              ICEEFT 是什麼？<br/>EFT 的國際品質守護者
            </h2>
            <p className="text-lg text-dark/70 leading-relaxed">
              ICEEFT（國際情緒焦點治療卓越中心）由 EFT 創始人 Dr. Sue Johnson 於加拿大渥太華創立，是全球 EFT 培訓與認證的最高監管機構。
            </p>
            <p className="text-dark/60 leading-relaxed">
              全球超過 <strong>75 個國家</strong>的 EFT 培訓機構均受 ICEEFT 授權監管，確保所有 EFT 治療師的培訓品質一致、具備科學實證基礎，並符合國際倫理規範。
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '75+', label: '授權國家' },
                { value: '5,000+', label: '認證治療師' },
                { value: '30+', label: '年研究歷程' },
              ].map((s, i) => (
                <div key={i} className="p-5 bg-white border border-primary/10 rounded-2xl text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-dark/50 font-bold uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-10 bg-dark rounded-[3rem] text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Globe size={200} />
              </div>
              <div className="relative z-10 space-y-3">
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-black uppercase tracking-widest rounded-full">
                  Official Partnership
                </div>
                <h3 className="text-2xl font-bold">twEFT 的授權地位</h3>
                <p className="text-white/60 leading-relaxed">
                  臺灣 EFT 治療學會（twEFT）是 ICEEFT 在台灣唯一授權的國際培訓機構，也是亞洲地區 EFT 推廣的重要節點。
                </p>
              </div>
              <div className="space-y-3 relative z-10">
                {[
                  '所有認證課程符合 ICEEFT 國際標準',
                  'twEFT 與 ICEEFT 定期進行品質審核',
                  '師資皆持有 ICEEFT 認可之訓練員資格',
                  '台灣取得的認證可在全球通用',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span className="text-sm font-medium text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Regions */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/30 rounded-full text-dark text-xs font-bold uppercase tracking-widest">
              <MapPin size={14} />
              全球分布
            </div>
            <h2 className="text-4xl font-bold text-dark">EFT 在全球的足跡</h2>
            <p className="text-dark/60">從北美到亞太，EFT 已在全球 75 個國家建立起穩固的治療師社群。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalRegions.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#F4F1EC] rounded-[2.5rem] border border-primary/8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/8 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-4xl">{r.flag}</div>
                  <div className="space-y-2">
                    <p className="text-xs font-black text-primary uppercase tracking-widest">{r.region}</p>
                    <h3 className="text-xl font-bold text-dark">{r.country}</h3>
                    <p className="text-dark/60 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Faculty */}
      <section className="py-32 bg-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: 'radial-gradient(circle, rgba(184,205,212,0.8) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary font-bold text-xs uppercase tracking-widest">
              <Star size={14} />
              International Faculty
            </div>
            <h2 className="text-4xl font-bold tracking-tight">EFT 的國際領航者</h2>
            <p className="text-white/50">我們與全球最具影響力的 EFT 先驅保持密切合作，確保台灣的培訓內容始終與國際前沿接軌。</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {internationalFaculty.map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] h-[300px] mb-6">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${person.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-primary/80 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                      {person.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{person.name}</h3>
                    <p className="text-primary text-sm font-bold">{person.role}</p>
                  </div>
                </div>
                <div className="px-2 space-y-3">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{person.origin}</p>
                  <p className="text-white/65 text-sm leading-relaxed">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-28 bg-[#F4F1EC]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-widest border border-primary/15">
              <Award size={14} />
              國際認證體系
            </div>
            <h2 className="text-4xl font-bold text-dark">ICEEFT 四級認證制度</h2>
            <p className="text-dark/60">每一個等級都代表嚴格的臨床訓練歷程。台灣取得的認證，與全球任何 ICEEFT 授權機構互認通用。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationLevels.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-primary/8 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/8 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${cert.badgeColor}`}>
                    {cert.badge}
                  </span>
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest border border-primary/15 px-3 py-1 rounded-full">
                    {cert.global}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-4 leading-tight">{cert.level}</h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-6">{cert.desc}</p>
                <div className="space-y-2.5 border-t border-dark/5 pt-6">
                  <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest">申請條件</p>
                  {cert.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-dark/65">
                      <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={10} className="text-primary" />
                      </div>
                      {req}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-dark">國際合作夥伴</h2>
            <p className="text-dark/60">我們與以下國際組織保持積極的資源共享與合作關係。</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partnerOrgs.map((org, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 bg-[#F4F1EC] rounded-[2rem] text-center border border-primary/8 hover:border-primary/20 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all text-primary/60">
                  <Link2 size={22} />
                </div>
                <p className="font-black text-dark text-sm">{org.name}</p>
                <p className="text-[10px] text-dark/40 font-bold mt-1">{org.country}</p>
                <p className="text-[9px] text-dark/30 mt-2 leading-tight">{org.full}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters — Taiwan */}
      <section className="py-28 bg-[#F4F1EC]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-dark leading-tight">
                在台灣取得的認證，<br/>在<span className="text-primary">全球都有效</span>
              </h2>
              <p className="text-lg text-dark/70 leading-relaxed">
                ICEEFT 認證的最大優勢，在於它的國際互認性。無論您日後在台灣、香港、澳洲還是北美執業，持有 ICEEFT 認定的資格都代表著全球心理諮商界的最高認可。
              </p>
              <div className="space-y-4">
                {[
                  { title: '台灣市場稀缺性', desc: '目前全台認證 EFT 治療師稀少，市場需求遠超供給' },
                  { title: '國際移動力', desc: '認證可攜帶至任何國家，適合有海外執業計畫的治療師' },
                  { title: '專業社群歸屬', desc: '加入 ICEEFT 全球網絡，持續獲得最新研究與資源分享' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-primary/8">
                    <div className="w-8 h-8 bg-primary/15 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Heart size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-dark">{item.title}</p>
                      <p className="text-sm text-dark/60 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-10 bg-dark rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck size={150} />
                </div>
                <div className="relative z-10 space-y-2">
                  <Milestone size={32} className="text-primary mb-4" />
                  <h3 className="text-2xl font-bold">認證路徑需要多久？</h3>
                  <p className="text-white/50 leading-relaxed text-sm">依照個人執業進度，完整的 ICEEFT 認證路徑通常需要 2-5 年。twEFT 提供完整的督導支持，協助您有效率地完成每個階段的要求。</p>
                </div>
                <div className="relative z-10 space-y-3">
                  {[
                    { step: '第 1 年', action: 'Externship + 開始個案累積' },
                    { step: '第 2 年', action: 'Core Skills + 個別督導' },
                    { step: '第 3 年', action: '申請 EFT Therapist 認證' },
                    { step: '第 5 年', action: '邁向 Supervisor 等級' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest w-14 shrink-0">{s.step}</span>
                      <div className="flex-grow h-px bg-white/10" />
                      <span className="text-sm text-white/60 font-medium text-right">{s.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-10">
          <h2 className="text-4xl font-bold text-dark">準備好加入這個<br/>全球專業社群了嗎？</h2>
          <p className="text-dark/60 text-lg leading-relaxed">
            無論您是剛接觸 EFT 的心理師新手，或已有多年執業經驗的資深治療師，twEFT 都有為您量身設計的認證路徑。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/certification" className="px-12 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
              查看完整認證路徑
              <ArrowRight size={20} />
            </Link>
            <Link href="/courses" className="px-12 py-5 bg-[#F4F1EC] border-2 border-dark/8 text-dark font-bold rounded-full hover:border-primary/30 transition-all flex items-center gap-3">
              <BookOpen size={18} />
              瀏覽國際認證課程
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
