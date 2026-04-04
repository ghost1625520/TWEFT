'use client';

import { SubpageHero } from '@/components/SubpageHero';
import { motion } from 'motion/react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Instagram,
  Facebook,
  Globe
} from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-white">
      <SubpageHero 
        title="聯絡我們" 
        subtitle="Contact Us"
        description="有任何關於培訓、諮商媒合或協會事務的問題嗎？歡迎透過表單或下方聯繫資訊與我們聯繫。我們的團隊將在 1-2 個工作日內回覆您。"
      />

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-dark">讓我們開啟對話</h2>
              <p className="text-lg text-dark/60 leading-relaxed max-w-md">
                您的回饋與詢問對我們至關重要。無論是想了解 EFT 的學習路徑，或是想尋求專業的媒體合作。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold mb-1">電子郵件</p>
                  <p className="text-dark font-bold">info@aft-eft.org.tw</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold mb-1">聯絡電話</p>
                  <p className="text-dark font-bold">+886 02-XXXX-XXXX</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold mb-1">協會地址</p>
                  <p className="text-dark font-bold leading-tight">臺北市中正區衡陽路<br/>某處辦公大樓（範例）</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold mb-1">服務時間</p>
                  <p className="text-dark font-bold">週一至週五<br/>09:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-dark/5">
              <p className="text-sm font-bold text-dark/40 uppercase tracking-widest mb-6">社群追蹤</p>
              <div className="flex items-center gap-6">
                {[Facebook, Instagram, Globe].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-14 h-14 bg-dark/5 rounded-full flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white transition-all shadow-lg shadow-dark/5"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-dark rounded-[3.5rem] shadow-2xl shadow-dark/20 relative"
          >
             <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">您的姓名</label>
                    <input 
                      type="text" 
                      placeholder="張志明"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">聯絡信箱</label>
                    <input 
                      type="email" 
                      placeholder="example@gmail.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">詢問類別</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary focus:ring-0 transition-all appearance-none">
                    <option className="bg-dark">課程報名諮詢</option>
                    <option className="bg-dark">諮商媒合協助</option>
                    <option className="bg-dark">入會申請詢問</option>
                    <option className="bg-dark">其他合作建議</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">訊息內容</label>
                  <textarea 
                    rows={5}
                    placeholder="請簡述您的需求..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-white/20 resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-5 bg-accent text-dark font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent/20">
                  <Send size={20} />
                  送出詢問表單
                </button>
             </form>

             {/* Background Decoration */}
             <div className="absolute inset-0 bg-primary/10 rounded-[3.5rem] -rotate-1 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-24 bg-dark/5">
        <div className="container mx-auto px-6">
          <div className="aspect-[21/9] bg-dark/10 rounded-[3rem] shadow-xl border border-dark/5 flex items-center justify-center text-dark/30 font-bold overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/121.5177,25.0422,14/1200x500@2x?access_token=your_token')] bg-cover bg-center" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <MapPin size={32} className="text-primary" />
              </div>
              <p className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest uppercase font-bold text-dark">Google Maps 載入中</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
