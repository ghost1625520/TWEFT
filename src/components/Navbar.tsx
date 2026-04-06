'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Globe, 
  Search,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { 
    name: '關於學會', 
    href: '/about',
    submenu: [
      { name: '協會介紹', href: '/about' },
      { name: '國際連結', href: '/international' },
      { name: '聯絡我們', href: '/contact' },
      { name: '常見問題', href: '/faq' },
    ]
  },
  { 
    name: '探索 EFT', 
    href: '/eft-intro',
    submenu: [
      { name: '什麼是 EFT', href: '/eft-intro' },
      { name: '專業資源庫', href: '/resources' },
    ]
  },
  { 
    name: '臨床培訓', 
    href: '/courses',
    submenu: [
      { name: '所有課程', href: '/courses' },
      { name: '認證路徑', href: '/certification' },
      { name: '師資陣容', href: '/faculty' },
    ]
  },
  { name: '活動公告', href: '/news' },
  { name: '國際認證心理師', href: '/find-therapist', highlight: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { profile, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightPage = !['/', '/portal'].includes(pathname) && !pathname.startsWith('/portal/dashboard');

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4",
      scrolled ? "py-2" : "py-6"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto rounded-full transition-all duration-500 border",
        scrolled 
          ? "bg-dark/80 backdrop-blur-xl shadow-2xl px-6 py-2 border-white/10" 
          : cn(
              "backdrop-blur-md px-8 py-3",
              isLightPage 
                ? "bg-dark/40 border-dark/10 shadow-lg" 
                : "bg-white/5 border-white/10"
            )
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-auto min-w-[120px] transition-transform duration-500 group-hover:scale-105">
              {/* Using img for the user-provided logo */}
              <img 
                src="/logo.png" 
                alt="twEFT 臺灣 EFT 情緒焦點學會" 
                className="h-full w-auto object-contain brightness-0 invert" 
                onError={(e) => {
                  // Fallback if logo.png is not yet uploaded
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden flex-col text-left">
                <span className="font-bold text-white tracking-tight text-lg leading-none">臺灣 EFT 治療學會</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Asia EFT Center</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-bold transition-colors py-2",
                    item.highlight ? "text-accent" : "text-white/80 hover:text-white",
                    pathname === item.href && "text-white"
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={14} className="opacity-50" />}
                </Link>

                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-48 mt-2 p-2 bg-dark/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
                    >
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Member Portal Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            {!loading && (
              <Link 
                href={profile ? "/portal/dashboard" : "/portal"}
                className="group relative px-6 py-2.5 bg-accent text-dark font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(226,241,175,0.3)]"
              >
                <div className="relative z-10 flex items-center gap-2">
                  {profile ? <LayoutDashboard size={18} /> : <User size={18} />}
                  <span>{profile ? (profile.full_name || '後台儀表板') : '會員專區'}</span>
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            )}
          </div>

          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-24 left-4 right-4 bg-dark/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-6"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col gap-3 text-left">
                  <Link 
                    href={item.href}
                    className="text-xl font-bold text-white hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="text-sm text-white/50 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              <Link 
                href={profile ? "/portal/dashboard" : "/portal"}
                className="w-full py-4 bg-accent text-dark font-bold rounded-2xl flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                {profile ? <LayoutDashboard size={20} /> : <User size={20} />}
                {profile ? (profile.full_name || '後台儀表板') : '會員專區'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
