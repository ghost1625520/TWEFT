'use client';

import { useState } from 'react';
import { SubpageHero } from '@/components/SubpageHero';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  MessageCircle, 
  Search,
  ArrowRight
} from 'lucide-react';

const faqs = [
  {
    category: '大眾諮詢',
    question: 'EFT 治療通常需要進行多久？',
    answer: 'EFT 是一種短期且結構化的治療法。對於一般的伴侶衝突，通常在 8 到 20 次會談中就能看到顯著的改善。然而，具體次數仍會依據問題的複雜度（如是否有創傷背景）而有所不同。'
  },
  {
    category: '大眾諮詢',
    question: '如果我的伴侶不願意一起來諮商怎麼辦？',
    answer: '雖然 EFT 以修復伴侶關係著稱，但個人也可以進行 EFIT (Emotionally Focused Individual Therapy)。透過處理個人內在的依附需求與情緒模式，您依然能改善與他人的互動質量。'
  },
  {
    category: '專業培訓',
    question: '成為國際認證的 EFT 治療師需要哪些步驟？',
    answer: '認證路徑包含四個核心階段：Externship (基礎訓練)、Core Skills (核心技術)、個人與小組督導，以及最後的錄影檔案審核。完整路徑通常需要 2-3 年的時間精進。'
  },
  {
    category: '專業培訓',
    question: '非心理諮商背景的人可以參加培訓嗎？',
    answer: '我們的「大眾工作坊」歡迎所有人參加。但若要參加「國際認證課程 (Externship)」，則需具備心理師、醫師或相關系所研究生等專業身分。'
  },
  {
    category: '關於協會',
    question: '如何加入協會成為會員？',
    answer: '只要是認同 EFT 理念的專業人士或學生，皆可透過官網「會員專區」提交申請。入會後可享有課程優惠、專業督導媒合及內部文獻資源庫的使用權。'
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="bg-white">
      <SubpageHero 
        title="常見問題" 
        subtitle="FAQ"
        description="關於 EFT 治療、課程培訓或協會運作的疑問。我們整理了最常被問到的問題，協助您快速獲得解答。"
      />

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Search bar */}
          <div className="relative group mb-20">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-primary transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="輸入關鍵字搜尋問題..."
              className="w-full pl-16 pr-8 py-6 bg-dark/5 rounded-[2.5rem] border-none focus:ring-2 focus:ring-primary text-xl font-medium tracking-tight transition-all placeholder:text-dark/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            {faqs.filter(f => f.question.includes(searchQuery) || f.answer.includes(searchQuery)).map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden border border-dark/5 rounded-[2rem] bg-white shadow-xl shadow-dark/5"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left group hover:bg-dark/5 transition-colors"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary">{faq.category}</span>
                    <h3 className="text-xl font-bold text-dark pr-8">{faq.question}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === i ? 'bg-primary text-white rotate-180' : 'bg-dark/5 text-dark/30 group-hover:text-dark'}`}>
                    {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-10 pb-10 pt-2 text-lg text-dark/60 leading-relaxed max-w-3xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-24 p-12 bg-accent/20 rounded-[3rem] border border-accent/40 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-lg text-primary">
                <MessageCircle size={32} />
              </div>
              <h4 className="text-2xl font-bold text-dark">找不到您需要的答案？</h4>
              <p className="text-dark/60">沒問題！我們非常樂意直接解答您的個別疑問。</p>
            </div>
            <button className="px-10 py-5 bg-dark text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-primary transition-all">
              直接向我們提問
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
