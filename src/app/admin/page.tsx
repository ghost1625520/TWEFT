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
  CheckCircle2,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleRenderer, type ModuleData, type ModuleType } from '@/components/ModuleRenderer';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('cms');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  
  // Real CMS State for "Modular Page Building"
  const [pageModules, setPageModules] = useState<ModuleData[]>([
    { 
      id: '1', 
      type: 'Hero', 
      title: '情緒焦點治療 (EFT) 的專業殿堂', 
      subtitle: 'Asia EFT Training Center',
      content: '我們致力於推廣以科學實證為基礎的治療模式，協助心理專業人員深化情感連結與治療轉化。',
      primaryAction: { label: '查看專業課程', href: '/courses' },
      background: 'dark'
    },
    { 
      id: '2', 
      type: 'Stats', 
      items: [
        { label: '實務訓練時數', value: '1,200+' },
        { label: '認證心理師', value: '450+' },
        { label: '年均舉辦講座', value: '24+' },
        { label: '國際合作機構', value: '12' }
      ]
    },
    { 
      id: '3', 
      type: 'Features', 
      title: '為何選擇 twEFT？', 
      content: '橫跨學術研究與臨床實務，提供最完整的專業成長路徑。',
      items: ['國際 ICEEFT 認證', '深度實務督導', '全球資源對接'] 
    }
  ]);

  const addModule = (type: ModuleType) => {
    const newModule: ModuleData = {
      id: Date.now().toString(),
      type,
      title: `新 ${type} 模塊`,
      content: '請在此輸入內容...',
      items: type === 'Stats' ? [{ label: '數據名稱', value: '0' }] : ['新項目 1', '新項目 2']
    };
    setPageModules([...pageModules, newModule]);
  };

  const removeModule = (id: string | number) => {
    setPageModules(pageModules.filter(m => m.id !== id));
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const newModules = [...pageModules];
    const newPos = direction === 'up' ? index - 1 : index + 1;
    if (newPos < 0 || newPos >= newModules.length) return;
    [newModules[index], newModules[newPos]] = [newModules[newPos], newModules[index]];
    setPageModules(newModules);
  };

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
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
             <Layout className="text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">twEFT 管理大後台</h1>
            <p className="text-white/40 mt-1 font-bold uppercase tracking-widest text-[10px]">Unified CMS & Platform Control</p>
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
              儲存並發佈
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
           <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-8">
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">選擇編輯頁面</h3>
                 <div className="space-y-1">
                    {['首頁', '關於學會', '什麼是 EFT', '認證路徑', '最新公告'].map((page, i) => (
                      <button key={i} className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${i === 0 ? 'bg-primary/20 text-primary' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                         {page}
                         {i === 0 && <CheckCircle2 size={14} />}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">模塊庫 (Module Library)</h3>
                 <div className="grid grid-cols-1 gap-2">
                    {[
                      { type: 'Hero', icon: Layout },
                      { type: 'Features', icon: List },
                      { type: 'Stats', icon: CheckCircle2 },
                      { type: 'FAQ', icon: Settings },
                      { type: 'TextContent', icon: Type }
                    ].map((m) => (
                      <button 
                        key={m.type}
                        onClick={() => addModule(m.type as ModuleType)}
                        className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-white/60 hover:border-primary hover:text-white transition-all group"
                      >
                         <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-all">
                            <m.icon size={14} />
                         </div>
                         <span>{m.type} 模塊</span>
                         <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
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
                          <h2 className="text-2xl font-black text-white">頁面結構：首頁</h2>
                          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Drag or use arrows to reorder</p>
                       </div>

                       <div className="space-y-4">
                          {pageModules.map((module, i) => (
                            <motion.div 
                              key={module.id} 
                              layout
                              className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] group hover:border-white/10 transition-all relative"
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
                                  <div className="p-5 bg-white/5 border border-white/5 rounded-3xl text-primary">
                                     {module.type === 'Hero' ? <Layout size={28} /> : module.type === 'Stats' ? <CheckCircle2 size={28} /> : <List size={28} />}
                                  </div>
                                  <div className="space-y-6 flex-grow max-w-2xl">
                                     <div>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 block">{module.type} Module</span>
                                        <input 
                                           className="text-2xl font-black text-white bg-transparent border-none p-0 focus:ring-0 w-full"
                                           defaultValue={module.title}
                                        />
                                     </div>
                                     
                                     {/* Simple Text field */}
                                     {module.content && (
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">內容文字</label>
                                          <textarea 
                                             defaultValue={module.content}
                                             rows={3}
                                             className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white/60 focus:border-primary outline-none focus:text-white transition-all"
                                          />
                                       </div>
                                     )}

                                     {/* Stats/Items Mock */}
                                     {module.items && (
                                       <div className="grid grid-cols-2 gap-3 mt-4">
                                          {module.items.map((item, idx) => (
                                            <div key={idx} className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white/40 flex items-center justify-between">
                                               <span>{typeof item === 'string' ? item : item.label}</span>
                                               <Settings size={12} />
                                            </div>
                                          ))}
                                          <button className="px-4 py-3 border border-dashed border-white/10 rounded-xl text-xs text-white/20 hover:text-primary hover:border-primary transition-all">
                                             + 新增項目
                                          </button>
                                       </div>
                                     )}
                                  </div>
                               </div>
                            </motion.div>
                          ))}
                          
                          {pageModules.length === 0 && (
                            <div className="py-20 bg-white/5 border-2 border-dashed border-white/5 rounded-[3rem] text-center space-y-4">
                               <Layout size={48} className="mx-auto text-white/10" />
                               <p className="text-white/20 font-bold tracking-widest uppercase">此頁面目前沒有模塊，請從左側新增</p>
                            </div>
                          )}
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'orders' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-20 bg-white/5 border border-white/5 rounded-[3rem] items-center justify-center flex flex-col text-center space-y-6"
                    >
                       <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-white/20">
                          <ShoppingCart size={48} />
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">訂單管理系統</h3>
                          <p className="text-white/30 text-sm max-w-xs">目前暫時沒有用戶報名課程。當有新訂單時會顯示在此處進行管理。</p>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-[3rem] overflow-hidden min-h-[600px] shadow-2xl relative"
              >
                {/* Floating Preview Badge */}
                <div className="absolute top-8 right-8 z-20 px-4 py-2 bg-accent text-dark font-black rounded-full text-xs shadow-xl flex items-center gap-2">
                   <div className="w-2 h-2 bg-dark rounded-full animate-pulse" />
                   LIVE PREVIEW
                </div>
                
                {/* Custom rendering logic for preview */}
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
