'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Settings, 
  Users, 
  ShoppingCart, 
  FileCheck, 
  Layout, 
  Eye, 
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Type,
  MoveUp,
  MoveDown,
  Monitor,
  Smartphone,
  List,
  CheckCircle2,
  BookOpen,
  Play,
  Search,
  Filter,
  X,
  CreditCard,
  ShieldCheck,
  FileText,
  MapPin,
  Zap,
  Clock,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleRenderer, type ModuleData, type ModuleType } from '@/components/ModuleRenderer';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('cms');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- CMS STATE ---
  const [siteData, setSiteData] = useState<{ [key: string]: ModuleData[] }>({
    'home': [
      { id: '1', type: 'HeroSlider', title: '情緒焦點治療的核心殿堂', subtitle: 'ASIA EFT CENTER', content: '我們致力於推廣以科學實證為基礎的治療模式，協助心理專業人員深化情感連接。' },
      { id: '2', type: 'Stats', items: [{ label: '結業學員', value: '2,500+' }, { label: '認證心理師', value: '180+' }] },
    ],
    'about': [{ id: 'a1', type: 'TextContent', title: '關於學會', content: '臺灣EFT治療學會是國際認證的專屬機構...' }],
    'courses': [{ id: 'c1', type: 'PricingGrid', title: '選取您的學習路徑' }],
    'resources': [{ id: 'r1', type: 'MasonryGallery', title: '資源下載專區', items: [] }]
  });

  const [currentPage, setCurrentPage] = useState('home');
  const pageModules = siteData[currentPage] || [];

  // --- COLLECTION STATE ---
  const [courses, setCourses] = useState([
    { id: 1, title: 'EFT 國際認證初階 (Externship)', category: 'Core Training', status: 'Active', price: 'NT$ 22,000', syllabus: ['依附理論基礎', '情感追蹤技術'] },
    { id: 2, title: '情緒焦點個人治療 (EFIT)', category: 'Specialized', status: 'Draft', price: 'NT$ 18,000', syllabus: ['個人與關係的整合'] }
  ]);

  const [news, setNews] = useState([
    { id: 1, title: '2025 國際年會台北場公告', date: '2024-03-15', author: 'Secretary', content: '內容建置中...' },
    { id: 2, title: '新書預購：依附科學之鑰', date: '2024-02-28', author: 'Research Team', content: '由 Susan Johnson 親自撰寫...' }
  ]);

  const [users, setUsers] = useState([
    { id: 'u1', name: '王小明', email: 'ming@example.com', role: 'Guest', status: 'Pending', permissions: ['view_cms'] },
    { id: 'u2', name: '李華', email: 'hua@example.com', role: 'Professional', status: 'Verified', permissions: ['edit_cms', 'manage_courses'] }
  ]);

  const [editItem, setEditItem] = useState<any>(null); // For modals

  // --- CMS ACTIONS ---
  const addModule = (type: ModuleType) => {
    const newModule: ModuleData = {
      id: Date.now().toString(),
      type,
      title: `新 ${type} 模塊`,
      subtitle: '更精彩的小標題',
      content: '在此輸入內容與描述...',
      items: type === 'Stats' ? [{ label: '數據', value: '0' }] : type === 'PricingGrid' ? [{title: '課程等級', price: 'NT$ 0'}] : ['新項目 1']
    };
    setSiteData({ ...siteData, [currentPage]: [...pageModules, newModule] });
  };

  const removeModule = (id: string | number) => {
    setSiteData({ ...siteData, [currentPage]: pageModules.filter(m => m.id !== id) });
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const newModules = [...pageModules];
    const newPos = direction === 'up' ? index - 1 : index + 1;
    if (newPos < 0 || newPos >= newModules.length) return;
    [newModules[index], newModules[newPos]] = [newModules[newPos], newModules[index]];
    setSiteData({ ...siteData, [currentPage]: newModules });
  };

  // --- DATA HELPERS ---
  const filteredUsers = users.filter(u => u.name.includes(searchQuery) || u.email.includes(searchQuery));

  const tabs = [
    { id: 'cms', label: '頁面編輯', icon: Layout },
    { id: 'course_mgr', label: '課程大綱', icon: BookOpen },
    { id: 'news_mgr', label: '消息管理', icon: List },
    { id: 'users', label: '會員審核', icon: Users },
    { id: 'settings', label: '權限設定', icon: ShieldCheck },
  ];

  const pagesMap = [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於學會' },
    { id: 'eft-intro', label: '什麼是 EFT' },
    { id: 'courses', label: '課程總覽' },
    { id: 'news', label: '消息消息' },
    { id: 'faculty', label: '師資團隊' },
    { id: 'resources', label: '下載專區' },
    { id: 'membership', label: '加入會員' },
    { id: 'contact', label: '聯絡我們' }
  ];

  const moduleTemplates: { type: ModuleType; label: string; icon: any }[] = [
    { type: 'HeroSlider', label: '頂級輪播', icon: Monitor },
    { type: 'ImageTextGrid', label: '圖文排列', icon: Layout },
    { type: 'MasonryGallery', label: '影像藝廊', icon: ImageIcon },
    { type: 'Features', label: '功能特性', icon: Zap },
    { type: 'Stats', label: '成就數據', icon: CheckCircle2 },
    { type: 'Timeline', label: '發展時序', icon: Clock },
    { type: 'PricingGrid', label: '課程方案', icon: CreditCard },
    { type: 'VideoSection', label: '影片主覺', icon: Play },
    { type: 'FAQ', label: '常見問題', icon: MessageCircle },
    { type: 'TextContent', label: '純文版塊', icon: Type }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col pt-32 px-12 pb-20 text-white selection:bg-primary selection:text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/10">
             <Layout className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">twEFT Command Center</h1>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">System Administrator v2.0 • Live Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/5 transition-all hover:border-white/10">
              <button 
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${viewMode === 'edit' ? 'bg-white text-dark shadow-xl' : 'text-white/40 hover:text-white'}`}
              >
                <Monitor size={14} /> EDITOR
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${viewMode === 'preview' ? 'bg-accent text-dark shadow-xl' : 'text-white/40 hover:text-white'}`}
              >
                <Eye size={14} /> PREVIEW
              </button>
           </div>
           <button className="px-8 py-4 bg-primary text-white rounded-2xl text-sm font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <Save size={18} /> 同步發佈
           </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/5 rounded-[2rem] w-fit mb-12 backdrop-blur-3xl overflow-x-auto max-w-full">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-10 py-4 rounded-[1.5rem] text-sm font-black transition-all flex items-center gap-3 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-2xl shadow-primary/20 translate-y-[-2px]' 
                : 'text-white/30 hover:text-white/70 hover:bg-white/5'
            }`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? 'animate-bounce' : ''} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {activeTab === 'cms' && (
          <aside className="lg:col-span-1 space-y-8 h-fit sticky top-40">
             {/* Page Selector */}
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6 shadow-2xl backdrop-blur-2xl">
                <div className="space-y-4">
                   <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">管理頁面架構</h3>
                   <div className="grid grid-cols-1 gap-1.5">
                      {pagesMap.map((p) => (
                        <button 
                          key={p.id} 
                          onClick={() => setCurrentPage(p.id)}
                          className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-between group border ${currentPage === p.id ? 'bg-primary/20 text-primary border-primary/20' : 'text-white/30 border-transparent hover:bg-white/5 hover:text-white'}`}
                        >
                           {p.label}
                           <ArrowRight size={14} className={`transition-transform ${currentPage === p.id ? 'translate-x-0' : 'translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             {/* Module Library */}
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6 shadow-2xl backdrop-blur-2xl">
                <div className="space-y-4">
                   <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">新增區塊模板</h3>
                   <div className="grid grid-cols-1 gap-2">
                      {moduleTemplates.map((m) => (
                        <button 
                          key={m.type}
                          onClick={() => addModule(m.type)}
                          className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-white/50 hover:border-primary hover:text-white hover:bg-white/10 transition-all group"
                        >
                           <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                              <m.icon size={16} />
                           </div>
                           <span>{m.label}</span>
                           <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </aside>
        )}

        {/* Content Area */}
        <div className={activeTab === 'cms' ? "lg:col-span-3" : "lg:col-span-4"}>
            {viewMode === 'edit' ? (
               <AnimatePresence mode="wait">
                  {activeTab === 'cms' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                       <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2.5rem]">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                                <FileText size={20} />
                             </div>
                             <h2 className="text-2xl font-black">正在編輯：{pagesMap.find(p => p.id === currentPage)?.label}</h2>
                          </div>
                          <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest bg-black/20 px-5 py-2 rounded-full">
                             <Layout size={12} /> {pageModules.length} 個啟用的區塊
                          </div>
                       </div>

                       <div className="space-y-6">
                          {pageModules.map((module, i) => (
                            <motion.div key={module.id} layout className="p-10 bg-white/5 border border-white/5 rounded-[3rem] group hover:border-white/10 transition-all relative shadow-xl backdrop-blur-sm overflow-hidden">
                               <div className="absolute right-10 top-10 flex items-center gap-3">
                                  <div className="flex items-center bg-black/40 rounded-2xl p-1.5 border border-white/5">
                                    <button onClick={() => moveModule(i, 'up')} disabled={i === 0} className="p-2.5 hover:bg-white/10 disabled:opacity-20 rounded-xl text-white/40 hover:text-white transition-all"><MoveUp size={18} /></button>
                                    <button onClick={() => moveModule(i, 'down')} disabled={i === pageModules.length - 1} className="p-2.5 hover:bg-white/10 disabled:opacity-20 rounded-xl text-white/40 hover:text-white transition-all"><MoveDown size={18} /></button>
                                  </div>
                                  <button onClick={() => removeModule(module.id)} className="p-4 bg-red-500/10 hover:bg-red-500/80 rounded-2xl text-red-500 hover:text-white transition-all shadow-xl group/del">
                                     <Trash2 size={18} />
                                  </button>
                               </div>

                               <div className="flex items-start gap-10">
                                  <div className="p-7 bg-white/5 border border-white/10 rounded-[2.5rem] text-primary shadow-2xl ring-1 ring-white/10 group-hover:scale-110 transition-transform">
                                      {moduleTemplates.find(t => t.type === module.type)?.icon ? (
                                        React.createElement(moduleTemplates.find(t => t.type === module.type)!.icon, { size: 36 })
                                      ) : <Layout size={36} />}
                                  </div>
                                  <div className="flex-grow max-w-3xl space-y-8">
                                     <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-2">
                                           <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-md">Template: {module.type}</span>
                                           {module.background && <span className="px-3 py-1 bg-white/10 text-white/60 text-[9px] font-black uppercase tracking-[0.2em] rounded-md">Style: {module.background}</span>}
                                        </div>
                                        <input className="text-4xl font-black text-white bg-transparent border-none p-0 focus:ring-0 w-full placeholder:text-white/10" defaultValue={module.title} placeholder="輸入主標題..." />
                                        <input className="text-sm font-bold text-primary/60 bg-transparent border-none p-0 focus:ring-0 w-full uppercase tracking-widest placeholder:text-white/5" defaultValue={module.subtitle} placeholder="輸入小標題或核心分類..." />
                                     </div>
                                     
                                     <div className="space-y-4">
                                        <div className="flex items-center gap-2 group/label">
                                           <Type size={12} className="text-white/20 group-hover/label:text-primary transition-colors" />
                                           <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">內容描述與文案區域</label>
                                        </div>
                                        <textarea defaultValue={module.content} rows={4} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-base text-white/60 focus:border-primary outline-none focus:text-white transition-all shadow-inner focus:shadow-primary/5" />
                                     </div>

                                     {module.items && (
                                       <div className="grid grid-cols-2 gap-4">
                                          {module.items.slice(0, 4).map((_, idx) => (
                                             <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                   <div className="w-2 h-2 rounded-full bg-primary" />
                                                   <span className="text-xs font-bold text-white/40">列入項目 #{idx+1}</span>
                                                </div>
                                                <Settings size={14} className="text-white/20" />
                                             </div>
                                          ))}
                                          <button className="p-4 border-2 border-dashed border-white/10 rounded-2xl text-white/20 text-xs font-black hover:border-primary hover:text-primary transition-all">+ 新增清單子項</button>
                                       </div>
                                     )}
                                  </div>
                               </div>
                            </motion.div>
                          ))}
                          <button onClick={() => addModule('Hero')} className="w-full py-20 border-4 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center gap-4 text-white/20 hover:border-primary/40 hover:text-primary transition-all group">
                             <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all scale-110 group-hover:rotate-12">
                                <Plus size={32} />
                             </div>
                             <span className="text-xl font-black tracking-tighter">在頁面結尾添加新版塊</span>
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'course_mgr' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                        <div className="flex items-end justify-between">
                           <div>
                              <h2 className="text-5xl font-black text-white">課程管理大綱</h2>
                              <p className="text-white/40 font-bold mt-2 uppercase tracking-widest text-xs">Total 8 Core Trainings • 3 Seminars</p>
                           </div>
                           <button className="px-10 py-5 bg-accent text-dark font-black rounded-[1.5rem] text-sm flex items-center gap-3 shadow-[0_20px_40px_rgba(255,191,0,0.2)] hover:scale-105 transition-all">
                              <Plus size={20} fill="currentColor" /> 建立新系列課程
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {courses.map(course => (
                             <div key={course.id} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] group hover:border-accent transition-all relative overflow-hidden backdrop-blur-2xl">
                                <div className="absolute top-10 right-10 flex items-center gap-3">
                                   <button onClick={() => setEditItem({ ...course, type: 'course' })} className="p-4 bg-white/5 rounded-[1.2rem] hover:bg-accent hover:text-dark transition-all shadow-xl">
                                      <Settings size={22} />
                                   </button>
                                </div>
                                <div className="space-y-6">
                                   <div className="flex items-center gap-3">
                                      <span className="px-4 py-1.5 bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest rounded-lg">{course.category}</span>
                                      <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${course.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                         {course.status === 'Active' ? '穩定開課中' : '草稿審核'}
                                      </div>
                                   </div>
                                   <div className="space-y-2">
                                      <h4 className="text-3xl font-black text-white leading-tight">{course.title}</h4>
                                      <p className="text-xl font-black text-white/60 tracking-tighter">{course.price}</p>
                                   </div>
                                   <div className="pt-6 border-t border-white/10 space-y-4">
                                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Syllabus Highlights</div>
                                      <div className="flex flex-wrap gap-2">
                                         {course.syllabus.map((s, i) => (
                                           <span key={i} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-medium text-white/40">{s}</span>
                                         ))}
                                      </div>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                    </motion.div>
                  )}

                  {activeTab === 'news_mgr' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                       <div className="flex items-end justify-between">
                           <div>
                              <h2 className="text-5xl font-black text-white">消息發佈管理</h2>
                              <p className="text-white/40 font-bold mt-2 uppercase tracking-widest text-xs">Official Announcements • Research Articles</p>
                           </div>
                           <button className="px-10 py-5 bg-primary text-white font-black rounded-[1.5rem] text-sm flex items-center gap-3 shadow-[0_20px_40px_rgba(230,126,34,0.3)] hover:scale-105 transition-all">
                              <Plus size={20} /> 撰寫深度報導
                           </button>
                        </div>
                        <div className="space-y-4">
                           {news.map(item => (
                             <div key={item.id} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-primary transition-all backdrop-blur-3xl">
                                <div className="flex items-center gap-10">
                                   <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl border border-primary/20 text-primary">
                                      <span className="text-2xl font-black">{item.date.split('-')[2]}</span>
                                      <span className="text-[9px] font-black uppercase tracking-widest">MARCH</span>
                                   </div>
                                   <div className="space-y-1">
                                      <h4 className="text-xl font-black text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                      <div className="flex items-center gap-4 text-xs text-white/30 font-bold">
                                         <span className="flex items-center gap-2 underline">由 {item.author} 撰寫</span>
                                         <span>於 {item.date}</span>
                                      </div>
                                   </div>
                                </div>
                                <div className="flex items-center gap-4">
                                   <button onClick={() => setEditItem({ ...item, type: 'news' })} className="px-6 py-3 bg-white/5 rounded-xl text-xs font-black text-white/40 hover:bg-white/10 hover:text-white transition-all underline decoration-primary decoration-2 underline-offset-4">編輯內容</button>
                                   <button className="p-4 bg-red-500/10 hover:bg-red-500 rounded-2xl text-red-500 hover:text-white transition-all shadow-xl"><Trash2 size={18} /></button>
                                </div>
                             </div>
                           ))}
                        </div>
                    </motion.div>
                  )}

                  {activeTab === 'users' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                       <div className="flex items-end justify-between">
                          <div>
                             <h2 className="text-5xl font-black text-white">權限與核准中心</h2>
                             <p className="text-white/40 font-bold mt-2 uppercase tracking-widest text-xs">Manage Member Roles & Platform Permissions</p>
                          </div>
                          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                             <div className="relative">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input 
                                  className="bg-black/20 border-none pl-12 pr-6 py-3 rounded-xl text-sm focus:ring-1 focus:ring-primary w-64 placeholder:text-white/10" 
                                  placeholder="搜尋姓名或電子郵件..." 
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                />
                             </div>
                             <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"><Filter size={18} className="text-white/40" /></button>
                          </div>
                       </div>

                       <div className="overflow-hidden bg-white/5 border border-white/5 rounded-[3rem] shadow-2xl backdrop-blur-3xl">
                          <table className="w-full text-left border-collapse">
                             <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
                                   <th className="px-10 py-8">會員身份識別</th>
                                   <th className="px-10 py-8">目前的權限</th>
                                   <th className="px-10 py-8">驗證狀態</th>
                                   <th className="px-10 py-8 text-right">管理操作</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-white/5">
                                {filteredUsers.map(user => (
                                  <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                     <td className="px-10 py-10">
                                        <div className="flex items-center gap-5">
                                           <div className="w-14 h-14 bg-slate-800 rounded-2xl border-2 border-white/5 flex items-center justify-center font-black text-xl text-white/20">{user.name[0]}</div>
                                           <div className="space-y-1">
                                              <p className="text-lg font-black text-white">{user.name}</p>
                                              <p className="text-xs text-white/30 font-medium">{user.email}</p>
                                           </div>
                                        </div>
                                     </td>
                                     <td className="px-10 py-10">
                                        <div className="flex flex-wrap gap-2">
                                           <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.role === 'Professional' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/10 text-white/40 border border-white/10'}`}>
                                              {user.role}
                                           </span>
                                           {user.permissions.map(p => (
                                             <span key={p} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-white/40">{p}</span>
                                           ))}
                                        </div>
                                     </td>
                                     <td className="px-10 py-10">
                                        {user.status === 'Verified' ? (
                                           <div className="flex items-center gap-3 text-green-500 bg-green-500/10 w-fit px-4 py-1.5 rounded-full border border-green-500/20">
                                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                              <span className="text-[10px] font-black uppercase tracking-widest">已完全驗證</span>
                                           </div>
                                        ) : (
                                          <div className="flex items-center gap-3 text-yellow-500 bg-yellow-500/10 w-fit px-4 py-1.5 rounded-full border border-yellow-500/20">
                                             <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                             <span className="text-[10px] font-black uppercase tracking-widest">等待人工審核</span>
                                          </div>
                                        )}
                                     </td>
                                     <td className="px-10 py-10 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                           <button onClick={() => setEditItem({ ...user, type: 'user' })} className="p-4 bg-white/5 rounded-2xl text-white/40 hover:bg-white/10 hover:text-white transition-all shadow-inner border border-white/10"><Settings size={18} /></button>
                                           {user.status === 'Pending' && (
                                              <button className="px-8 py-4 bg-green-500 text-white text-xs font-black rounded-2xl shadow-2xl shadow-green-500/20 hover:scale-105 active:scale-95 transition-all">正式核准進階身份</button>
                                           )}
                                        </div>
                                     </td>
                                  </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            ) : (
               /* Preview Mode - Simplified Visual Wrapper */
               <div className="space-y-12">
                  <div className="flex items-center justify-between">
                     <h2 className="text-3xl font-black">即時預覽：{pagesMap.find(p => p.id === currentPage)?.label}</h2>
                     <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10">
                        <button className="px-6 py-2 rounded-xl bg-white text-dark text-[10px] font-black">Desktop</button>
                        <button className="px-6 py-2 rounded-xl text-white/30 text-[10px] font-black">Mobile</button>
                     </div>
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[4rem] overflow-hidden min-h-[900px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative border-[12px] border-dark">
                    <div className="absolute top-10 right-10 z-50 px-8 py-4 bg-accent text-dark font-black rounded-full text-xs shadow-2xl flex items-center gap-4 ring-4 ring-accent/20">
                       <div className="w-3 h-3 bg-dark rounded-full animate-ping" />
                       REAL-TIME LIVE STREAMING
                    </div>
                    
                    <div className="h-full overflow-y-auto custom-scrollbar bg-slate-50">
                       <ModuleRenderer modules={pageModules} />
                    </div>
                  </motion.div>
               </div>
            )}
        </div>
      </div>

      {/* Detail Editor Modal - Replaces the frozen UI feeling */}
      <AnimatePresence>
        {editItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-12 backdrop-blur-3xl bg-black/60">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 30 }}
               className="bg-[#141416] border border-white/10 w-full max-w-5xl rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.8)] overflow-hidden flex"
             >
                {/* Modal Sidebar */}
                <div className="w-1/3 bg-black/40 border-r border-white/5 p-12 space-y-12">
                   <div className="space-y-4">
                      <div className="w-20 h-20 bg-primary/20 rounded-[2.5rem] flex items-center justify-center text-primary shadow-2xl">
                         {editItem.type === 'course' ? <BookOpen size={40} /> : editItem.type === 'news' ? <List size={40} /> : <Users size={40} />}
                      </div>
                      <h2 className="text-4xl font-black tracking-tighter capitalize">{editItem.type} 詳情編輯</h2>
                      <p className="text-white/30 text-xs font-bold leading-relaxed">請確認所有資訊都符合學會的專業規範，變更後將立即同步至資料庫。</p>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">系統管理動作</div>
                      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"><Save size={16} /> 保存所有變更</button>
                      <button onClick={() => setEditItem(null)} className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl text-[11px] font-black hover:bg-red-500 hover:text-white transition-all">關閉不儲存</button>
                   </div>
                </div>

                {/* Modal Content */}
                <div className="flex-grow p-16 overflow-y-auto max-h-[85vh] custom-scrollbar bg-gradient-to-br from-transparent to-primary/5">
                   <div className="space-y-10">
                      {editItem.type === 'course' && (
                        <>
                           <div className="space-y-4">
                              <label className="text-xs font-black text-primary uppercase tracking-widest">課程主標題</label>
                              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xl font-bold focus:border-primary outline-none" defaultValue={editItem.title} />
                           </div>
                           <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-4">
                               <label className="text-xs font-black text-white/40 uppercase tracking-widest">課程類別</label>
                               <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" defaultValue={editItem.category} />
                              </div>
                              <div className="space-y-4">
                               <label className="text-xs font-black text-white/40 uppercase tracking-widest">開課價格</label>
                               <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm" defaultValue={editItem.price} />
                              </div>
                           </div>
                           <div className="space-y-4">
                              <label className="text-xs font-black text-white/40 uppercase tracking-widest">Syllabus 課程大綱單元</label>
                              <div className="space-y-2">
                                 {editItem.syllabus.map((s: string, idx: number) => (
                                    <div key={idx} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group">
                                       <span className="text-sm font-bold text-white/60">Stage {idx+1}: {s}</span>
                                       <div className="flex gap-2">
                                          <button className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-white"><MoveUp size={14} /></button>
                                          <button className="p-2 bg-white/5 rounded-lg text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                                       </div>
                                    </div>
                                 ))}
                                 <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-3xl text-sm font-black text-white/20 hover:border-primary hover:text-primary transition-all">+ 添加新教學單元</button>
                              </div>
                           </div>
                        </>
                      )}

                      {editItem.type === 'news' && (
                         <>
                            <div className="space-y-4">
                              <label className="text-xs font-black text-primary uppercase tracking-widest">報導主標題</label>
                              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xl font-bold focus:border-primary outline-none" defaultValue={editItem.title} />
                            </div>
                            <div className="space-y-4">
                              <label className="text-xs font-black text-white/40 uppercase tracking-widest">文章內容 (Markdown Support)</label>
                              <textarea rows={10} className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-base text-white/60 focus:border-primary outline-none whitespace-pre-line" defaultValue={editItem.content} />
                            </div>
                         </>
                      )}

                      {editItem.type === 'user' && (
                        <div className="space-y-12">
                           <div className="space-y-6">
                              <h3 className="text-2xl font-black text-white border-l-4 border-primary pl-6">調整會員角色與權限架構</h3>
                              <div className="grid grid-cols-2 gap-4">
                                 {['SuperAdmin', 'Editor', 'Professional', 'Member', 'Guest'].map(role => (
                                   <div key={role} className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${editItem.role === role ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-transparent text-white/40'}`}>
                                      <p className="text-sm font-black mb-1">{role}</p>
                                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                                         {role === 'SuperAdmin' ? '擁有全平台完整操作權限' : role === 'Editor' ? '僅能編輯網頁內容與消息' : '一般使用者權限'}
                                      </p>
                                   </div>
                                 ))}
                              </div>
                           </div>
                           
                           <div className="space-y-6">
                              <h3 className="text-2xl font-black text-white border-l-4 border-accent pl-6">平台操作權限細節 (Permissions Matrix)</h3>
                              <div className="space-y-3">
                                 {[
                                   { id: 'view_cms', label: '檢視內容管理區', desc: '唯讀權限' },
                                   { id: 'edit_cms', label: '編輯全站頁面架構', desc: '可新增、刪除、排序區塊' },
                                   { id: 'manage_courses', label: '管理課程大綱與報名', desc: '可調整價格與單元' },
                                   { id: 'verify_users', label: '人工審核會員身份', desc: '最高層級管理動作' }
                                 ].map(p => (
                                   <div key={p.id} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl group">
                                      <div className="space-y-1">
                                         <p className="text-sm font-black text-white group-hover:text-accent transition-colors">{p.label}</p>
                                         <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{p.desc}</p>
                                      </div>
                                      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${editItem.permissions.includes(p.id) ? 'bg-green-500' : 'bg-white/10'}`}>
                                         <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editItem.permissions.includes(p.id) ? 'translate-x-6' : 'translate-x-0'}`} />
                                      </div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                      )}
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
