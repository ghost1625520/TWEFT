'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText,
  UserCheck,
  Server,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: '資料收集與使用',
      content: '我們收集的資料僅用於提升您的服務體驗與課程管理。包含：姓名、聯絡電郵、執業執照編號（僅限專業會員）以及課程參與紀錄。我們絕不對外販售或分享您的個人隱私資料給第三方廣告機構。'
    },
    {
      icon: Lock,
      title: '安全性保障',
      content: '您的資料存儲於加密伺服器中。對於支付資訊，我們採用業界頂尖的第三方金鑰加密技術（如 Stripe/SSL），任何人（包含本會工作人員）皆無法直接存取您的信用卡完整資訊。'
    },
    {
      icon: Server,
      title: 'Cookie 技術與應用',
      content: '本網站使用 Cookie 以優化瀏覽體驗，例如維持登入狀態與分析流量。您可以在瀏覽器設定中隨時停用 Cookie，但這可能會影響網站部分功能的正常運作。'
    },
    {
      icon: UserCheck,
      title: '您的權利',
      content: '您隨時有權利要求更新、修正或刪除存儲於本學會的個人資料。如有需要，請透過「聯絡我們」頁面或發送電郵至秘書處信箱，我們將迅速為您處理。'
    }
  ];

  return (
    <main className="bg-white">
      <SubpageHero 
        title="隱私權政策" 
        subtitle="Privacy Policy"
        description="您的信任是本學會運作的基石。我們致力於以最高標準保護您的個人隱私與臨床資料，確保您在此平台上的每一次互動都是安全且受保護的。"
      />

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
             {sections.map((section, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-10 bg-dark/5 rounded-[2.5rem] border border-dark/5 hover:bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-500 group"
               >
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <section.icon size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-dark mb-6">{section.title}</h3>
                 <p className="text-dark/60 leading-relaxed text-sm">
                   {section.content}
                 </p>
               </motion.div>
             ))}
          </div>

          {/* Detailed Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose prose-slate max-w-none bg-dark/5 p-12 lg:p-16 rounded-[4rem] border border-dark/5"
          >
             <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.4em] text-xs mb-8">
                <FileText size={16} />
                <span>Legal Statement</span>
             </div>
             
             <h2 className="text-3xl font-black text-dark mb-8">服務條款與守則</h2>
             <div className="space-y-8 text-dark/70 leading-relaxed">
               <p>
                 「臺灣EFT治療學會」（以下簡稱本會）為保護本會會員及使用本網站服務者之個人資料，謹依個人資料保護法規定，告知您下列事項：
               </p>
               
               <div className="space-y-4">
                 <h4 className="text-dark font-bold text-xl uppercase tracking-tight italic">一、資料收集目的與類別</h4>
                 <p>
                   本會基於會員管理、課程推廣、學術研究及法定義務執行之目的，於必要範圍內收集、處理及利用您的個人資料。相關類別包括：識別類（姓名、電話、電子郵件）、特徵類（性別）、職業類（心理師證號、執業機構）。
                 </p>
               </div>

               <div className="space-y-4">
                 <h4 className="text-dark font-bold text-xl uppercase tracking-tight italic">二、資料利用之期間與地區</h4>
                 <p>
                   除法令另有規定外，您的個人資料將於本會存續期間內，在本會提供服務之地區（含國際合作單位地區）進行處理。所有國際資料傳輸皆會採取必要的安全保護措施。
                 </p>
               </div>

               <div className="space-y-4">
                 <h4 className="text-dark font-bold text-xl uppercase tracking-tight italic">三、權利行使</h4>
                 <p>
                   依據個人資料保護法第三條規定，您可以隨時：查詢或請求閱覽您的個人資料、請求提供複本、請求補充或更正、請求停止收集、處理、利用或請求刪除。
                 </p>
               </div>
             </div>

             <div className="mt-16 pt-12 border-t border-dark/10 flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-xs text-dark/30 font-bold uppercase tracking-widest">
                  最後更新日期：2024 年 04 月 04 日
                </p>
                <div className="flex items-center gap-4">
                   <ShieldCheck size={20} className="text-primary" />
                   <span className="text-dark font-bold text-sm tracking-tight italic">本政策符合相關國際個資保護標準</span>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-dark text-white text-center">
        <div className="container mx-auto px-6 max-w-xl space-y-12">
            <h2 className="text-4xl font-bold">對隱私保護還有疑問？</h2>
            <p className="text-white/40 text-xl leading-relaxed">
              我們非常重視您的隱私權。如果您對您的個人資料安全有任何擔憂或建議，我們隨時聽取您的回饋。
            </p>
            <button className="px-12 py-6 bg-primary text-dark font-bold rounded-3xl hover:bg-white transition-all shadow-2xl flex items-center gap-3 mx-auto group">
               聯繫我們的法律與安全小組
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </section>
    </main>
  );
}
