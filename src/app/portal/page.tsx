'use client';

import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  Key,
  Layout,
  BookOpen,
  Calendar,
  MessageSquare,
  LogIn
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PortalPage() {
  const { signInWithGoogle, signInWithEmail, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [log, setLog] = useState<{ msg: string; type: 'info' | 'error' } | null>(null);

  useEffect(() => {
    if (user && !loading) {
      router.push('/portal/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <main className="min-h-screen bg-dark flex flex-col items-center justify-center relative overflow-hidden py-40 px-6">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle, var(--accent) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left side: Branding & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                  <Globe className="text-white" size={28} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-white tracking-tight text-xl leading-none">臺灣 EFT 治療學會</span>
                  <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Asia EFT Center</span>
                </div>
              </Link>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                專業成長的<br/><span className="text-primary">核心樞紐</span>
              </h1>
              <p className="text-xl text-white/50 leading-relaxed max-w-md">
                登入您的專屬帳戶，掌握最新的課程動態、臨床文獻，並與專業社群建立連結。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
               {[
                 { icon: BookOpen, label: '文獻資源庫' },
                 { icon: Calendar, label: '課程報名管理' },
                 { icon: Layout, label: '實習督導媒合' },
                 { icon: MessageSquare, label: '專業社群討論' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-white/40 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                       <item.icon size={20} />
                    </div>
                    <span className="text-sm font-bold tracking-wide">{item.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Right side: Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             <div className="p-12 md:p-16 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] shadow-2xl space-y-10 relative z-10">
                <div className="space-y-4 text-center">
                  <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-accent/20">
                     <Lock className="text-dark" size={36} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">會員登入</h2>
                  <p className="text-white/30 text-sm font-bold uppercase tracking-[0.2em]">Member Authentication</p>
                </div>

                <div className="space-y-6">
                   {/* Google Login Button */}
                   <button 
                    onClick={signInWithGoogle}
                    className="w-full py-5 bg-white text-dark font-bold rounded-3xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                   >
                     <LogIn size={24} />
                     <span>使用 Google 帳號登入</span>
                   </button>

                   <div className="flex items-center gap-4 py-2">
                     <div className="h-px flex-grow bg-white/10" />
                     <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">或者</span>
                     <div className="h-px flex-grow bg-white/10" />
                   </div>

                   <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsLoggingIn(true);
                      setLog({ msg: '正在驗證身分...', type: 'info' });
                      
                      const formattedEmail = email.includes('@') ? email : `${email}@tweft.org`;
                      const { error } = await signInWithEmail(formattedEmail, password);
                      
                      if (error) {
                        setLog({ msg: `登入失敗: ${error.message}`, type: 'error' });
                        setIsLoggingIn(false);
                      } else {
                        setLog({ msg: '驗證成功，正在跳轉...', type: 'info' });
                      }
                    }}
                    className="space-y-6"
                   >
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">帳號 / 電子郵件</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                            <input 
                              type="text" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Your account"
                              className="w-full bg-white/5 border border-white/10 rounded-3xl px-14 py-5 text-white focus:bg-white/10 focus:border-primary transition-all outline-none placeholder:text-white/10"
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">登入密碼</label>
                        <div className="relative">
                            <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                            <input 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-white/5 border border-white/10 rounded-3xl px-14 py-5 text-white focus:bg-white/10 focus:border-primary transition-all outline-none placeholder:text-white/10"
                            />
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 rounded-md border-2 border-white/20 bg-white/5 group-hover:border-primary transition-all" />
                            <span className="text-xs font-bold text-white/40 group-hover:text-white/60 transition-colors">記住我</span>
                          </label>
                          <button type="button" className="text-xs font-bold text-primary hover:text-accent transition-colors">忘記密碼？</button>
                      </div>

                      {/* Real-time Log Message */}
                      <AnimatePresence>
                        {log && (
                           <motion.div 
                             initial={{ opacity: 0, y: -10 }} 
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, scale: 0.95 }}
                             className={cn(
                               "p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-3",
                               log.type === 'error' ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-primary/10 border-primary/20 text-primary"
                             )}
                           >
                             <div className={cn("w-2 h-2 rounded-full", log.type === 'error' ? "bg-red-500" : "bg-primary animate-pulse")} />
                             {log.msg}
                           </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-6 bg-primary/20 border border-primary/30 text-primary font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all uppercase tracking-widest disabled:opacity-50"
                      >
                          {isLoggingIn ? (
                             <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>帳號密碼登入</span>
                              <ArrowRight size={20} />
                            </>
                          )}
                      </button>
                   </form>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-5">
                   <p className="text-xs text-white/30 font-bold">還沒有專業會員帳號？</p>
                   <button className="px-10 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                      立即申請加入協會
                   </button>
                </div>
             </div>

             {/* Footer decorative text */}
             <div className="mt-12 flex items-center justify-center gap-3 text-white/20">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">SSL Secure Connection</span>
             </div>

             {/* Background glow behind card */}
             <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[80px] -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
