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
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleRenderer, type ModuleData, type ModuleType } from '@/components/ModuleRenderer';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('cms');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  
  // Real CMS State for "Modular Page Building"
  const [siteData, setSiteData] = useState<{ [key: string]: ModuleData[] }>({
    'home': [
      { id: '1', type: 'Hero', title: '情緒焦點治療 (EFT) 的專業殿堂', subtitle: 'Asia EFT Training Center', content: '我們致力於推廣以科學實證為基礎的治療模式，協助心理專業人員深化情感連接與治療轉化。', background: 'dark' },
      { id: '2', type: 'Stats', items: [{ label: '實務訓練時數', value: '1,200+' }, { label: '認證心理師', value: '450+' }] },
    ],
    'about': [
       { id: 'a1', type: 'TextContent', title: '關於我們', content: '臺灣EFT治療學會是國際認證的專業機構...' }
    ],
    'courses': [
       { id: 'c1', type: 'Hero', title: '專業認證課程', subtitle: 'Certification Path' }
    ]
  });

  const [currentPage, setCurrentPage] = useState('home');
  const pageModules = siteData[currentPage] || [];
  
  // News & Courses Collection State
  const [courses, setCourses] = useState([
    { id: 1, title: 'EFT 國際認證初階 (Externship)', category: 'Core Training', status: 'Active' },
    { id: 2, title: '情緒焦點個人治療 (EFIT)', category: 'Specialized', status: 'Draft' }
  ]);

  const [news, setNews] = useState([
    { id: 1, title: '2024 年度研討會公告', date: '2024-03-15', author: 'Secretary' },
    { id: 2, title: '新書：依附科學新進展', date: '2024-02-28', author: 'Admin' }
  ]);

  const [users, setUsers] = useState([
    { id: 'u1', name: '王小明', email: 'ming@example.com', role: 'Guest', status: 'Pending' },
    { id: 'u2', name: '李華', email: 'hua@example.com', role: 'Professional', status: 'Verified' }
  ]);

  const addModule = (type: ModuleType) => {
    const newModule: ModuleData = {
      id: Date.now().toString(),
      type,
      title: `新 ${type} 模塊`,
      content: '請在此輸入內容...',
      items: type === 'Stats' ? [{ label: '數據名稱', value: '0' }] : ['新項目 1']
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

  const tabs = [
    { id: 'cms', label: '頁面編輯', icon: Layout },
    { id: 'course_mgr', label: '課程大綱', icon: BookOpen },
    { id: 'news_mgr', label: '消息管理', icon: List },
    { id: 'users', label: '權限審核', icon: Users },
    { id: 'settings', label: '系統設定', icon: Settings },
  ];

  const pagesMap = [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於學會' },
    { id: 'eft-intro', label: '什麼是 EFT' },
    { id: 'courses', label: '課程介紹' },
    { id: 'news', label: '最新公告' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col pt-32 px-12 pb-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
             <Layout className="text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">twEFT 管理大後台</h1>
            <p className="text-white/40 mt-1 font-bold uppercase tracking-widest text-[10px]">Unified Platform Command Center</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5 mr-4">
              <button 
                onClick={() => setViewMode('edit')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'edit' ? 'bg-primary text-white shadow-lg' : 'text-white/30 hover:text-white'}`}
              >
                <Monitor size={18} />
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'preview' ? 'bg-accent text-dark shadow-lg' : 'text-white/30 hover:text-white'}`}
              >
                <Eye size={18} />
              </button>
           </div>
           <button className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
              <Save size={18} />
              發佈變更
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl w-fit mb-12 backdrop-blur-md">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {activeTab === 'cms' && (
          <div className="lg:col-span-1 space-y-6">
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-8 backdrop-blur-3xl shadow-2xl">
                <div className="space-y-4">
                   <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">選擇編輯頁面</h3>
                   <div className="space-y-1">
                      {pagesMap.map((p) => (
                        <button 
                          key={p.id} 
                          onClick={() => setCurrentPage(p.id)}
                          className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${currentPage === p.id ? 'bg-primary/20 text-primary border border-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                           {p.label}
                           {currentPage === p.id && <CheckCircle2 size={14} />}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4">
                   <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">模塊庫庫 (Module Library)</h3>
                   <div className="grid grid-cols-1 gap-2">
                      {[
                        { type: 'Hero', icon: Layout },
                        { type: 'VideoSection', icon: Play },
                        { type: 'Features', icon: List },
                        { type: 'Stats', icon: CheckCircle2 },
                        { type: 'FAQ', icon: Settings },
                        { type: 'TextContent', icon: Type },
                        { type: 'CTA', icon: ShoppingCart }
                      ].map((m) => (
                        <button 
                          key={m.type}
                          onClick={() => addModule(m.type as ModuleType)}
                          className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-white/60 hover:border-primary hover:text-white transition-all group shadow-sm hover:shadow-primary/5"
                        >
                           <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-all">
                              <m.icon size={14} />
                           </div>
                           <span>{m.type} 模板</span>
                           <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Content Area */}
        <div className={activeTab === 'cms' ? "lg:col-span-3" : "lg:col-span-4"}>
            {viewMode === 'edit' ? (
               <AnimatePresence mode="wait">
                  {activeTab === 'cms' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                       <div className="flex items-center justify-between mb-2">
                          <h2 className="text-2xl font-black text-white">頁面結構：{pagesMap.find(p => p.id === currentPage)?.label}</h2>
                          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">點擊箭頭調整順序或垃圾桶刪除</p>
                       </div>

                       <div className="space-y-4">
                          {pageModules.map((module, i) => (
                            <motion.div 
                              key={module.id} 
                              layout
                              className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] group hover:border-white/10 transition-all relative backdrop-blur-sm"
                            >
                               <div className="absolute right-8 top-8 flex items-center gap-2">
                                  <div className="flex items-center bg-black/20 rounded-xl p-1">
                                    <button 
                                      onClick={() => moveModule(i, 'up')}
                                      disabled={i === 0}
                                      className="p-2 hover:bg-white/10 disabled:opacity-20 rounded-lg text-white/40 hover:text-white transition-colors"
                                    >
                                       <MoveUp size={16} />
                                    </button>
                                    <button 
                                      onClick={() => moveModule(i, 'down')}
                                      disabled={i === pageModules.length - 1}
                                      className="p-2 hover:bg-white/10 disabled:opacity-20 rounded-lg text-white/40 hover:text-white transition-colors"
                                    >
                                       <MoveDown size={16} />
                                    </button>
                                  </div>
                                  <button 
                                    onClick={() => removeModule(module.id)}
                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 transition-colors"
                                  >
                                     <Trash2 size={16} />
                                  </button>
                               </div>

                               <div className="flex items-start gap-8">
                                  <div className="p-5 bg-white/5 border border-white/5 rounded-3xl text-primary shadow-inner">
                                     {module.type === 'Hero' ? <Layout size={28} /> : module.type === 'VideoSection' ? <Play size={28} /> : <List size={28} />}
                                  </div>
                                  <div className="space-y-6 flex-grow max-w-2xl">
                                     <div>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 block">{module.type} Module</span>
                                        <input 
                                           className="text-2xl font-black text-white bg-transparent border-none p-0 focus:ring-0 w-full"
                                           defaultValue={module.title}
                                        />
                                     </div>
                                     
                                     {module.content && (
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">核心內容區</label>
                                          <textarea 
                                             defaultValue={module.content}
                                             rows={3}
                                             className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white/60 focus:border-primary outline-none focus:text-white transition-all shadow-inner"
                                          />
                                       </div>
                                     )}
                                  </div>
                               </div>
                            </motion.div>
                          ))}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'course_mgr' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <div className="flex items-center justify-between">
                           <h2 className="text-3xl font-black text-white">課程管理</h2>
                           <button className="px-5 py-2.5 bg-accent text-dark font-black rounded-xl text-xs flex items-center gap-2">
                              <Plus size={16} /> 新增課程
                           </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {courses.map(course => (
                             <div key={course.id} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group">
                                <div className="space-y-1">
                                   <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{course.category}</span>
                                   <h4 className="text-xl font-bold text-white">{course.title}</h4>
                                   <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${course.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                      <span className="text-xs text-white/40">{course.status}</span>
                                   </div>
                                </div>
                                <button className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-white hover:bg-primary transition-all">
                                   <Settings size={20} />
                                </button>
                             </div>
                           ))}
                        </div>
                    </motion.div>
                  )}

                  {activeTab === 'news_mgr' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                       <div className="flex items-center justify-between">
                           <h2 className="text-3xl font-black text-white">消息發佈管理</h2>
                           <button className="px-5 py-2.5 bg-primary text-white font-black rounded-xl text-xs flex items-center gap-2">
                              <Plus size={16} /> 撰寫文章
                           </button>
                        </div>
                        <div className="space-y-3">
                           {news.map(item => (
                             <div key={item.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-primary/50 transition-all">
                                <div className="flex items-center gap-6">
                                   <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary font-bold">{item.date.split('-')[1]}</div>
                                   <div>
                                      <h4 className="font-bold text-white">{item.title}</h4>
                                      <p className="text-xs text-white/20">由 {item.author} 發佈於 {item.date}</p>
                                   </div>
                                </div>
                                <Trash2 size={18} className="text-red-500/40 hover:text-red-500 cursor-pointer transition-colors" />
                             </div>
                           ))}
                        </div>
                    </motion.div>
                  )}

                  {activeTab === 'users' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                       <h2 className="text-3xl font-black text-white">權限審核中心</h2>
                       <div className="overflow-hidden bg-white/5 border border-white/5 rounded-[2.5rem]">
                          <table className="w-full text-left border-collapse">
                             <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                   <th className="px-8 py-6">會員姓名</th>
                                   <th className="px-8 py-6">電子郵件</th>
                                   <th className="px-8 py-6">目前身份</th>
                                   <th className="px-8 py-6 text-right">動作</th>
                                </tr>
                             </thead>
                             <tbody>
                                {users.map(user => (
                                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                     <td className="px-8 py-6 font-bold text-white">{user.name}</td>
                                     <td className="px-8 py-6 text-white/40">{user.email}</td>
                                     <td className="px-8 py-6 text-white/60">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${user.role === 'Professional' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/40'}`}>
                                           {user.role}
                                        </span>
                                     </td>
                                     <td className="px-8 py-6 text-right">
                                        {user.status === 'Pending' ? (
                                          <button className="px-4 py-2 bg-green-500 text-white text-[10px] font-black rounded-lg hover:bg-green-600 transition-colors">審核通過</button>
                                        ) : (
                                          <button className="px-4 py-2 bg-white/5 text-white/20 text-[10px] font-black rounded-lg cursor-not-allowed">已驗證</button>
                                        )}
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
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-[3rem] overflow-hidden min-h-[700px] shadow-2xl relative border-8 border-dark"
              >
                <div className="absolute top-8 right-8 z-20 px-6 py-3 bg-accent text-dark font-black rounded-full text-xs shadow-xl flex items-center gap-3">
                   <div className="w-2.5 h-2.5 bg-dark rounded-full animate-pulse" />
                   LIVE PREVIEW MODE
                </div>
                
                <div className="h-full overflow-y-auto custom-scrollbar">
                   <ModuleRenderer modules={pageModules} />
                </div>
              </motion.div>
            )}
        </div>
      </div>
    </div>
  );
}
