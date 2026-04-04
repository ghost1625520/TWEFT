'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Globe as Facebook,
  Globe as Instagram,
  Globe as Youtube
} from 'lucide-react';

const footerLinks = [
  {
    title: '關於我們',
    links: [
      { name: '協會介紹', href: '/about' },
      { name: '國際連結', href: '/about#international' },
      { name: '聯絡我們', href: '/contact' },
      { name: '常見問題', href: '/faq' },
    ]
  },
  {
    title: '培訓資源',
    links: [
      { name: '臨床培訓課程', href: '/courses' },
      { name: '認證路徑', href: '/certification' },
      { name: '專業資源庫', href: '/resources' },
      { name: '師資陣容', href: '/faculty' },
    ]
  },
  {
    title: '服務與支持',
    links: [
      { name: '找心理師', href: '/find-therapist' },
      { name: '最新動態', href: '/news' },
      { name: '會員專區', href: '/portal' },
      { name: '隱私政策', href: '/privacy' },
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="text-white" size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-tight text-xl leading-none">臺灣 EFT 治療學會</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Asia EFT Center</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              致力於推廣情緒焦點治療 (EFT)，協助個人、伴侶與家庭建立安全的身心連結與共鳴。
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Youtube, Mail].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:bg-white/10 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-accent text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="py-12 border-y border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white/40 group-hover:text-white">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">協會地址</p>
              <p className="text-sm text-white/80">臺北市中正區衡陽路（範例地址）</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white/40 group-hover:text-white">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">與我們連繫</p>
              <p className="text-sm text-white/80">+886 02-XXXX-XXXX</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors text-white/40 group-hover:text-white">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">電子郵件信箱</p>
              <p className="text-sm text-white/80">info@aft-eft.org.tw</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} 臺灣 EFT 治療學會 Emotionally Focused Therapy Association. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs text-white/30 hover:text-white transition-colors">隱私條款</Link>
            <Link href="#" className="text-xs text-white/30 hover:text-white transition-colors">使用規範</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
