'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  ArrowRight,
  DownloadCloud,
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleRenderer, type ModuleData, type ModuleType } from '@/components/ModuleRenderer';
import { supabase, type Course, type NewsItem, type ResourceItem, type SiteModule } from '@/lib/supabase';

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('cms');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // --- REAL DATA STATE ---
  const [siteData, setSiteData] = useState<{ [key: string]: ModuleData[] }>({});
  const [currentPage, setCurrentPage] = useState('home');
  const [courses, setCourses] = useState<Course[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [editItem, setEditItem] = useState<any>(null);

  // --- DATA FETCHING ---
  const fetchData = useCallback(async () => {
    // 1. Fetch Pages & Modules
    const { data: pages } = await supabase.from('pages').select('*');
    const { data: modules } = await supabase.from('modules').select('*').order('order_index');
    
    const organizedData: { [key: string]: ModuleData[] } = {};
    pages?.forEach(page => {
      organizedData[page.slug] = modules?.filter(m => m.page_id === page.id).map(m => ({
        id: m.id,
        type: m.type as ModuleType,
        title: m.title || '',
        subtitle: m.subtitle || '',
        content: m.content || '',
        items: m.items || [],
        image: m.image_url || '',
        background: 'white'
      })) || [];
    });
    setSiteData(organizedData);

    // 2. Fetch Collections
    const { data: coursesData } = await supabase.from('courses').select('*');
    if (coursesData) setCourses(coursesData);

    const { data: newsData } = await supabase.from('news').select('*');
    if (newsData) setNews(newsData);

    const { data: resourcesData } = await supabase.from('resources').select('*');
    if (resourcesData) setResources(resourcesData);

    const { data: usersData } = await supabase.from('profiles').select('*');
    if (usersData) setUsers(usersData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- CMS ACTIONS (CONTROLLED STATE) ---
  const updateModuleField = (id: string | number, field: string, value: any) => {
    const updatedModules = (siteData[currentPage] || []).map(m => 
      m.id === id ? { ...m, [field]: value } : m
    );
    setSiteData({ ...siteData, [currentPage]: updatedModules });
  };

  const addModule = async (type: ModuleType) => {
    const { data: page } = await supabase.from('pages').select('id').eq('slug', currentPage).single();
    if (!page) return;

    const newModule: Partial<SiteModule> = {
      page_id: page.id,
      type,
      title: `新 ${type} 模塊`,
      subtitle: '',
      content: '',
      items: [],
      order_index: (siteData[currentPage]?.length || 0)
    };

    const { data, error } = await supabase.from('modules').insert(newModule).select().single();
    if (!error && data) {
       fetchData(); // Refresh from DB
    }
  };

  const removeModule = async (id: string | number) => {
    await supabase.from('modules').delete().eq('id', id);
    fetchData();
  };

  const saveAllChanges = async () => {
    setIsSaving(true);
    const currentModules = siteData[currentPage] || [];
    
    // Batch update modules
    for (let i = 0; i < currentModules.length; i++) {
      const m = currentModules[i];
      await supabase.from('modules').update({
        title: m.title,
        subtitle: m.subtitle,
        content: m.content,
        items: m.items,
        order_index: i
      }).eq('id', m.id);
    }
    
    setIsSaving(false);
    alert('所有變更已同步至資料庫！');
  };

  // --- COLLECTION ACTIONS ---
  const deleteResource = async (id: string) => {
    if (confirm('確定要刪除此資源嗎？')) {
      await supabase.from('resources').delete().eq('id', id);
      fetchData();
    }
  };

  const pagesMap = [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於學會' },
    { id: 'eft-intro', label: '什麼是 EFT' },
    { id: 'courses', label: '課程總覽' },
    { id: 'news', label: '消息公告' },
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

  const tabs = [
    { id: 'cms', label: '頁面編輯器', icon: Layout },
    { id: 'course_mgr', label: '課程大綱', icon: BookOpen },
    { id: 'news_mgr', label: '消息管理', icon: List },
    { id: 'resources', label: '下載專區', icon: DownloadCloud },
    { id: 'users', label: '權限審核', icon: ShieldCheck },
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
               <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Real-Time Database Connected • v2.1</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/5">
              <button onClick={() => setViewMode('edit')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${viewMode === 'edit' ? 'bg-white text-dark' : 'text-white/40 hover:text-white'}`}>EDITOR</button>
              <button onClick={() => setViewMode('preview')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${viewMode === 'preview' ? 'bg-accent text-dark' : 'text-white/40 hover:text-white'}`}>PREVIEW</button>
           </div>
           <button 
             onClick={saveAllChanges}
             disabled={isSaving}
             className="px-8 py-4 bg-primary text-white rounded-2xl text-sm font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
           >
              {isSaving ? <Clock className="animate-spin" /> : <Save size={18} />}
              {isSaving ? '正在同步...' : '立即同步至資料庫'}
           </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/5 rounded-[2rem] w-fit mb-12 backdrop-blur-3xl overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-10 py-4 rounded-[1.5rem] text-sm font-black transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-2xl' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {activeTab === 'cms' && (
          <aside className="lg:col-span-1 space-y-8 h-fit sticky top-40">
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6 shadow-2xl">
                <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">管理頁面架構</h3>
                <div className="grid grid-cols-1 gap-1.5">
                   {pagesMap.map((p) => (
                     <button key={p.id} onClick={() => setCurrentPage(p.id)} className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-between group border ${currentPage === p.id ? 'bg-primary/20 text-primary border-primary/20' : 'text-white/30 border-transparent hover:bg-white/5'}`}>
                        {p.label}
                        <ChevronRight size={14} className={currentPage === p.id ? 'opacity-100' : 'opacity-0'} />
                     </button>
                   ))}
                </div>
             </div>
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6 shadow-2xl">
                <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">新增區塊模板</h3>
                <div className="grid grid-cols-1 gap-2">
                   {moduleTemplates.map((m) => (
                     <button key={m.type} onClick={() => addModule(m.type)} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-white/50 hover:border-primary hover:text-white transition-all group">
                        <m.icon size={16} />
                        <span>{m.label}</span>
                        <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                     </button>
                   ))}
                </div>
             </div>
          </aside>
        )}

        <div className={activeTab === 'cms' ? "lg:col-span-3" : "lg:col-span-4"}>
           <AnimatePresence mode="wait">
              {activeTab === 'cms' && viewMode === 'edit' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                   {(siteData[currentPage] || []).map((module, i) => (
                     <div key={module.id} className="p-10 bg-white/5 border border-white/5 rounded-[3rem] group hover:border-white/10 transition-all relative">
                        <div className="absolute right-10 top-10 flex gap-3">
                           <button onClick={() => removeModule(module.id)} className="p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all"><Trash2 size={18} /></button>
                        </div>
                        <div className="flex items-start gap-10">
                           <div className="p-7 bg-white/5 border border-white/10 rounded-[2.5rem] text-primary">{moduleTemplates.find(t => t.type === module.type)?.icon ? React.createElement(moduleTemplates.find(t => t.type === module.type)!.icon, { size: 36 }) : <Layout size={36} />}</div>
                           <div className="flex-grow space-y-8">
                              <div className="space-y-4">
                                 <input 
                                   className="text-4xl font-black text-white bg-transparent border-none p-0 focus:ring-0 w-full placeholder:text-white/10" 
                                   value={module.title} 
                                   onChange={(e) => updateModuleField(module.id, 'title', e.target.value)}
                                   placeholder="輸入主標題..." 
                                 />
                                 <textarea 
                                   className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-base text-white/60 focus:border-primary outline-none" 
                                   value={module.content} 
                                   onChange={(e) => updateModuleField(module.id, 'content', e.target.value)}
                                   rows={3}
                                   placeholder="輸入詳細內容..." 
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </motion.div>
              )}

              {activeTab === 'resources' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="flex items-center justify-between">
                     <h2 className="text-4xl font-black">下載資源庫</h2>
                     <button className="px-8 py-4 bg-accent text-dark font-black rounded-2xl flex items-center gap-2"><Plus size={20} /> 上傳新檔案</button>
                   </div>
                   <div className="grid gap-4">
                     {resources.map(res => (
                       <div key={res.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between">
                         <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary"><DownloadCloud /></div>
                           <div>
                             <h4 className="font-bold">{res.title}</h4>
                             <p className="text-xs text-white/40">{res.category || '一般資源'} • {res.description || '無描述'}</p>
                           </div>
                         </div>
                         <button onClick={() => deleteResource(res.id)} className="p-3 text-red-500/40 hover:text-red-500"><Trash2 size={18} /></button>
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'course_mgr' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-8">
                   {courses.map(course => (
                     <div key={course.id} className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6">
                        <div className="flex justify-between items-start">
                           <span className="px-4 py-1 bg-accent/20 text-accent text-[10px] font-black rounded-lg uppercase">{course.category}</span>
                           <button onClick={() => setEditItem({ ...course, type: 'course' })} className="p-3 bg-white/5 rounded-xl"><Settings size={18} /></button>
                        </div>
                        <h4 className="text-2xl font-black">{course.title}</h4>
                        <div className="text-xl font-bold text-primary">{course.price}</div>
                     </div>
                   ))}
                </motion.div>
              )}

              {activeTab === 'users' && (
                 <div className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
                    <table className="w-full text-left">
                       <thead className="bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                          <tr><th className="px-10 py-6">用戶</th><th className="px-10 py-6">角色</th><th className="px-10 py-6">細節權限</th><th className="px-10 py-6 text-right">操作</th></tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {users.map(user => (
                            <tr key={user.id} className="group hover:bg-white/[0.02]">
                               <td className="px-10 py-8 font-bold">{user.full_name || user.email}</td>
                               <td className="px-10 py-8"><span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-lg">{user.role}</span></td>
                               <td className="px-10 py-8 flex gap-2">
                                  {(user.permissions || []).map((p: string) => (
                                    <span key={p} className="px-2 py-0.5 bg-white/5 text-[9px] rounded-md">{p}</span>
                                  ))}
                               </td>
                               <td className="px-10 py-8 text-right"><button className="p-3 bg-white/5 rounded-xl"><ShieldCheck size={18} /></button></td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              )}
           </AnimatePresence>
           
           {viewMode === 'preview' && activeTab === 'cms' && (
              <div className="bg-white rounded-[4rem] min-h-[800px] overflow-hidden border-[12px] border-dark shadow-2xl">
                 <ModuleRenderer modules={siteData[currentPage] || []} />
              </div>
           )}
        </div>
      </div>

      {/* Modal Re-implemented for real Edit */}
      {editItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-12 backdrop-blur-3xl bg-black/60">
           <div className="bg-[#141416] w-full max-w-4xl rounded-[4rem] p-16 space-y-12 shadow-2xl relative">
              <button onClick={() => setEditItem(null)} className="absolute right-12 top-12 text-white/20 hover:text-white"><X size={32} /></button>
              <h2 className="text-4xl font-black tracking-tighter">編輯：{editItem.title}</h2>
              <div className="space-y-6">
                 <div><label className="text-xs font-black text-primary uppercase">名稱</label><input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2" defaultValue={editItem.title} /></div>
                 <div><label className="text-xs font-black text-primary uppercase">價格</label><input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 mt-2" defaultValue={editItem.price} /></div>
                 <button className="w-full py-5 bg-primary text-white font-black rounded-2xl">確認更新</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
