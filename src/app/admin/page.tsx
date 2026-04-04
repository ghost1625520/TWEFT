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
  MoveDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('cms');
  
  // Mock CMS State for "Modular Page Building"
  const [pageModules, setPageModules] = useState([
    { id: 1, type: 'Hero', title: '首頁主視覺', content: '情緒焦點治療 (EFT) 的專業殿堂' },
    { id: 2, type: 'Features', title: '三大優勢', items: ['國際認證', '實務導向', '社群支援'] },
    { id: 3, type: 'TextContent', title: '關於學會', text: '我們致力於推廣 EFT...' }
  ]);

  const tabs = [
    { id: 'cms', label: '內容管理', icon: Layout },
    { id: 'orders', label: '訂單管理', icon: ShoppingCart },
    { id: 'applications', label: '審核中心', icon: FileCheck },
    { id: 'users', label: '會員清單', icon: Users },
    { id: 'settings', label: '系統設定', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col pt-32 px-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">大後台管理系統</h1>
          <p className="text-white/40 mt-1 font-bold uppercase tracking-widest text-xs">Full Association CMS & Management</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
              <Eye size={18} />
              預覽前台
           </button>
           <button className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
              <Save size={18} />
              即時發佈
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl w-fit mb-12">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
        {/* Sidebar for specific tab */}
        <div className="lg:col-span-1 space-y-6">
           <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-6">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {activeTab === 'cms' ? '頁面編輯器' : '快速過濾'}
              </h3>
              {activeTab === 'cms' && (
                <div className="space-y-3">
                   {['首頁', '關於學會', '探索EFT', '臨床培訓', '活動公告'].map((page, i) => (
                     <button key={i} className="w-full text-left px-5 py-3 rounded-xl text-sm font-medium hover:bg-white/5 text-white/40 hover:text-white transition-all flex items-center justify-between group">
                        {page}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                     </button>
                   ))}
                </div>
              )}
           </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
           <AnimatePresence mode="wait">
              {activeTab === 'cms' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                   <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-black text-white">模組化配置：首頁</h2>
                      <button className="px-5 py-2.5 bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                         <Plus size={16} />
                         新增模塊
                      </button>
                   </div>

                   <div className="space-y-4">
                      {pageModules.map((module, i) => (
                        <div key={module.id} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] group hover:border-white/10 transition-all relative">
                           <div className="absolute right-8 top-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                                 <MoveUp size={16} />
                              </button>
                              <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                                 <MoveDown size={16} />
                              </button>
                              <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-500/40 hover:text-red-500 transition-colors">
                                 <Trash2 size={16} />
                              </button>
                           </div>

                           <div className="flex items-start gap-6">
                              <div className="p-4 bg-white/5 rounded-2xl text-primary">
                                 {module.type === 'Hero' ? <Layout size={24} /> : module.type === 'Features' ? <ImageIcon size={24} /> : <Type size={24} />}
                              </div>
                              <div className="space-y-4 flex-grow">
                                 <div>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1 block">{module.type} Module</span>
                                    <h4 className="text-lg font-bold text-white tracking-tight">{module.title}</h4>
                                 </div>
                                 
                                 {/* Edit Fields Mock */}
                                 <div className="space-y-3">
                                    <div className="space-y-1">
                                       <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">標題文字</label>
                                       <input 
                                          type="text" 
                                          defaultValue={module.content || module.title}
                                          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-primary outline-none"
                                       />
                                    </div>
                                    {module.type === 'Hero' && (
                                       <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">主視覺圖片</label>
                                          <div className="w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-white/20 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                             <ImageIcon size={32} />
                                             <span className="text-xs font-bold">點擊上傳新圖片</span>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-12 bg-white/5 border border-white/5 rounded-[3rem] items-center justify-center flex flex-col text-center space-y-4"
                >
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                      <ShoppingCart size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-white">尚未有活動訂單</h3>
                   <p className="text-white/30 text-sm max-w-xs">目前暫時沒有用戶報名課程。當有新訂單時會顯示在此處進行管理。</p>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className: string }) {
   return (
      <svg 
         width={size} 
         height={size} 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         strokeWidth="2" 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         className={className}
      >
         <line x1="5" y1="12" x2="19" y2="12"></line>
         <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
   );
}
