'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Monitor, Smartphone, Layout, Save, Trash2, Plus, MoveUp, MoveDown, Globe, X, CheckCircle2, Monitor as MonitorIcon, 
  Settings as SettingsIcon, BookOpen, List, ShoppingCart, Users, ShieldCheck, CreditCard, Type, Zap, Clock, MessageCircle, Image as ImageIcon, FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModuleData, ModuleType } from '@/components/ModuleRenderer';
import CourseForm from '@/components/admin/CourseForm';
import NewsForm from '@/components/admin/NewsForm';
import ModuleEditor from '@/components/admin/ModuleEditor';
import ReviewQueue from '@/components/admin/ReviewQueue';

const INITIAL_LAYOUTS: { [key: string]: ModuleData[] } = {
  home: [
    { id: 'h1', type: 'HeroSlider', title: '建立深層連結，重塑依附關係', subtitle: 'Emotionally Focused Therapy', content: '我們是「臺灣EFT治療學會」，致力於推廣情緒焦點治療 (EFT)。', background: 'dark' },
    { id: 's1', type: 'Stats', items: [{label: '認證會員', value: '500+'}, {label: '國際督導', value: '20+'}] }
  ],
  about: [{ id: 'ab1', type: 'HeroSlider', title: '推廣與連結的專業社群', subtitle: 'Our Mission', content: '臺灣EFT治療學會是經由 ICEEFT 授權的專業組織。', background: 'slate' }]
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [currentPage, setCurrentPage] = useState('home');
  const [siteData, setSiteData] = useState<{ [key: string]: ModuleData[] }>({});
  const [selectedModuleId, setSelectedModuleId] = useState<string | number | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [simulatorWidth, setSimulatorWidth] = useState(0);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [editItem, setEditItem] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([
    { id: 'm-c1', title: 'EFT 基礎認證課程 (Externship)', price: 'NT$ 18,000', author: 'Dr. Liu' },
    { id: 'm-c2', title: '進階核心技能訓練', price: 'NT$ 22,000', author: 'ICEEFT Supervisor' }
  ]);
  const [news, setNews] = useState<any[]>([
    { id: 'm-n1', title: '2024 春季中階培訓工作坊報名中', date: '2024-04-10' },
    { id: 'm-n2', title: '學會章程修正草案公告', date: '2024-03-25' }
  ]);
  const [orders, setOrders] = useState<any[]>([
    { id: 'm-o1', user_name: '測試帳號 A', amount: '12,000', status: 'pending' },
    { id: 'm-o2', user_name: '測試帳號 B', amount: '8,000', status: 'approved' }
  ]);
  const [users, setUsers] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([
    { id: 'mock-u1', full_name: '張書平', membership_type: '專業會員', region: '台北市', certification_level: 'Externship', created_at: new Date().toISOString() },
    { id: 'mock-u2', full_name: '李艾倫', membership_type: '學生會員', region: '台中市', certification_level: '無', created_at: new Date().toISOString() },
    { id: 'mock-u3', full_name: '陳美玲', membership_type: '專業會員', region: '高雄市', certification_level: 'Certified', created_at: new Date().toISOString() }
  ]);
  
  const workspaceRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const pageModules = siteData[currentPage] || INITIAL_LAYOUTS[currentPage] || [];
  const selectedModule = pageModules.find(m => m.id === selectedModuleId);

  useEffect(() => {
    if (!workspaceRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) { if (entry.contentRect.width > 0) setSimulatorWidth(entry.contentRect.width); }
    });
    observer.observe(workspaceRef.current);
    setSimulatorWidth(workspaceRef.current.offsetWidth);
    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    const data = JSON.stringify(pageModules);
    localStorage.setItem('cms_preview_data', data);
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'UPDATE_CMS_PREVIEW', modules: pageModules }, '*');
    }
  }, [pageModules, currentPage]);

  const baseWidth = previewDevice === 'desktop' ? 1280 : 390;
  const scale = simulatorWidth > 0 ? Math.max(0.1, Math.min(1, (simulatorWidth - 120) / baseWidth)) : 0.5;

  useEffect(() => { fetchPageData(currentPage); fetchGlobalData(); }, [currentPage]);
  const fetchGlobalData = async () => {
    const { data: n } = await supabase.from('news').select('*').order('date', { ascending: false });
    const { data: c } = await supabase.from('courses').select('*').order('id', { ascending: true });
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    const { data: u } = await supabase.from('profiles').select('*');
    const { data: pu } = await supabase.from('profiles').select('*').eq('status', 'pending');
    if (n) setNews(n); if (c) setCourses(c); if (o) setOrders(o); if (u) setUsers(u); if (pu) setPendingUsers(pu);
  };
  const fetchPageData = async (slug: string) => {
    const { data, error } = await supabase.from('cms_pages').select('*').eq('slug', slug).single();
    if (!error && data?.modules) setSiteData(prev => ({ ...prev, [slug]: data.modules }));
    else setSiteData(prev => ({ ...prev, [slug]: INITIAL_LAYOUTS[slug] || [] }));
  };

  const handlePublish = async () => {
    setSaveStatus('saving');
    const { error } = await supabase.from('cms_pages').upsert({ slug: currentPage, title: pagesMap.find(p => p.id === currentPage)?.label || currentPage, modules: pageModules, is_published: true, last_updated_at: new Date().toISOString() }, { onConflict: 'slug' });
    if (error) { setSaveStatus('error'); showToast('發佈失敗', 'error'); } 
    else { setSaveStatus('success'); showToast('發佈成功！'); setTimeout(() => setSaveStatus('idle'), 3000); }
  };

  const addModule = (type: ModuleType) => {
    const newModule: ModuleData = { id: Date.now().toString(), type, title: `新 ${type} 版塊`, subtitle: '編輯小標題', content: '在此輸入描述內容...', items: type === 'Stats' ? [{ label: '數據項目', value: '100' }] : [] };
    setSiteData({ ...siteData, [currentPage]: [...pageModules, newModule] });
    setSelectedModuleId(newModule.id);
  };

  const updateModule = (id: string | number, data: Partial<ModuleData>) => {
    setSiteData({ ...siteData, [currentPage]: pageModules.map(m => m.id === id ? { ...m, ...data } : m) });
  };

  const removeModule = (id: string | number) => {
    setSiteData({ ...siteData, [currentPage]: pageModules.filter(m => m.id !== id) });
    if (selectedModuleId === id) setSelectedModuleId(null);
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    const newModules = [...pageModules];
    const newPos = direction === 'up' ? index - 1 : index + 1;
    if (newPos < 0 || newPos >= newModules.length) return;
    [newModules[index], newModules[newPos]] = [newModules[newPos], newModules[index]];
    setSiteData({ ...siteData, [currentPage]: newModules });
  };

  const handleSaveCourse = async (data: any) => {
    const { id, type, ...rest } = data;
    const { error } = id ? await supabase.from('courses').update(rest).eq('id', id) : await supabase.from('courses').insert([rest]);
    if (error) showToast('儲存失敗', 'error');
    else { showToast('課程已儲存'); setEditItem(null); fetchGlobalData(); }
  };

  const tabs = [
    { id: 'dashboard', label: '總覽', icon: MonitorIcon }, { id: 'reviews', label: '申請審核', icon: FileCheck }, { id: 'cms', label: '頁面編輯', icon: Layout }, 
    { id: 'course_mgr', label: '課程管理', icon: BookOpen }, { id: 'news_mgr', label: '消息管理', icon: List }, 
    { id: 'orders', label: '訂單審核', icon: ShoppingCart }, { id: 'settings', label: '系統設定', icon: ShieldCheck }
  ];
  const pagesMap = [{ id: 'home', label: '首頁' }, { id: 'about', label: '關於學會' }, { id: 'eft-intro', label: '什麼是 EFT' }, { id: 'news', label: '最新消息' }, { id: 'membership', label: '加入會員' }, { id: 'contact', label: '聯絡我們' }];
  const moduleTemplates: { type: ModuleType; label: string; icon: any }[] = [
    { type: 'HeroSlider', label: '主要大氣輪播', icon: Monitor }, { type: 'SubpageHero', label: '內頁標題區', icon: Layout }, { type: 'TextContent', label: '純文字內文', icon: Type }, { type: 'Features', label: '功能亮點', icon: Zap }, { type: 'Stats', label: '數據統計', icon: CheckCircle2 }, { type: 'ImageTextGrid', label: '圖文排列', icon: Layout }, { type: 'Timeline', label: '發展大事記', icon: Clock }, { type: 'PricingGrid', label: '方案報價', icon: CreditCard }, { type: 'FAQ', label: '常見問題', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-[#0E1B22] flex flex-col text-white">
      <header className="px-12 py-8 flex items-center justify-between border-b border-white/5 bg-dark/20 backdrop-blur-3xl sticky top-0 z-[100]">
        <div className="flex items-center gap-6"><div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary"><Layout size={24} /></div><div><h1 className="text-2xl font-black">twEFT Command Center</h1><p className="text-white/20 text-[8px] uppercase tracking-widest">Masterpiece v9.0 • Review Queue & Analytics Enabled</p></div></div>
        <div className="flex items-center gap-6">{activeTab === 'cms' && (<div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/10"><button onClick={() => setViewMode('edit')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black", viewMode === 'edit' ? 'bg-white text-dark' : 'text-white/20')}>EDITOR</button><button onClick={() => setViewMode('preview')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black", viewMode === 'preview' ? 'bg-accent text-dark' : 'text-white/20')}>PREVIEW</button></div>)}<button onClick={handlePublish} className="px-8 py-3 bg-primary rounded-2xl text-xs font-black shadow-2xl">發佈更新</button></div>
      </header>
      <nav className="px-12 py-6 bg-white/[0.02] border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("px-8 py-3.5 rounded-2xl text-[11px] font-black border transition-all whitespace-nowrap flex items-center gap-3", activeTab === tab.id ? "bg-white text-dark scale-105 shadow-2xl" : "bg-white/5 border-white/5 text-white/30")}>
            <tab.icon size={16} /> 
            {tab.label.toUpperCase()}
            {tab.id === 'reviews' && pendingUsers.length > 0 && (
              <span className="w-5 h-5 bg-primary text-white flex items-center justify-center rounded-full text-[8px] animate-pulse">{pendingUsers.length}</span>
            )}
          </button>
        ))}
      </nav>
      <main className="flex-grow flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'cms' ? (
            <motion.div key="cms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-[calc(100vh-210px)] overflow-hidden">
               <aside className="w-80 border-r border-white/5 bg-[#0A1419] flex flex-col p-8"><label className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">目前編輯目標</label><select value={currentPage} onChange={(e)=>setCurrentPage(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs font-black mb-10">{pagesMap.map(p => <option key={p.id} value={p.id} className="bg-dark">{p.label}</option>)}</select><div className="space-y-2 overflow-y-auto no-scrollbar">{pageModules.map((m, i) => (<div key={m.id} onClick={() => setSelectedModuleId(m.id)} className={cn("group p-4 rounded-2xl cursor-pointer transition-all", selectedModuleId === m.id ? "bg-primary text-white" : "bg-white/5 text-white/30")}><div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase truncate max-w-[120px]">{m.title || m.type}</span><div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={(e)=>{e.stopPropagation(); moveModule(i,'up');}}><MoveUp size={10}/></button><button onClick={(e)=>{e.stopPropagation(); removeModule(m.id);}}><Trash2 size={10}/></button></div></div></div>))}</div></aside>
               <section ref={workspaceRef} className="flex-grow bg-[#050B0A] relative flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark/40">
                     <div className="flex items-center bg-black/40 rounded-2xl p-1 border border-white/5"><button onClick={() => setPreviewDevice('desktop')} className={cn("px-4 py-2 rounded-xl text-[9px] font-black", previewDevice === 'desktop' ? "bg-white text-dark" : "text-white/20")}>DESKTOP</button><button onClick={() => setPreviewDevice('mobile')} className={cn("px-4 py-2 rounded-xl text-[9px] font-black", previewDevice === 'mobile' ? "bg-white text-dark" : "text-white/20")}>MOBILE</button></div>
                     <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em]">PROPORTIONAL RENDER ENGINE • {Math.round(scale*100)}%</div>
                  </div>
                  <div className="flex-grow overflow-auto p-12 flex justify-center items-start custom-scrollbar bg-black/90">
                     <div style={{ width: baseWidth * scale, height: 'max-content', transition: 'all 0.5s ease', marginTop: '48px' }} className="relative">
                        <div className="absolute -top-12 left-0 right-0 h-12 bg-[#1A252B] rounded-t-[2.5rem] border border-white/10 border-b-0 flex items-center px-8 gap-3 z-[60] shadow-2xl">
                           <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#FF5F56]"/><div className="w-3 h-3 rounded-full bg-[#FFBD2E]"/><div className="w-3 h-3 rounded-full bg-[#27C93F]"/></div>
                           <div className="mx-auto bg-black/40 px-12 py-2 rounded-xl text-[9px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center gap-3"><Globe size={10}/> https://tweft.org/{currentPage}</div>
                        </div>
                        <motion.div style={{ width: baseWidth, height: previewDevice === 'mobile' ? '844px' : '1000px', transform: `scale(${scale})`, transformOrigin: 'top left' }} className={cn("bg-white overflow-hidden shadow-2xl", previewDevice === 'mobile' ? "rounded-b-[4rem]" : "rounded-b-[2.5rem]")}>
                           <iframe ref={iframeRef} src="/admin/preview" className="w-full h-full border-none pointer-events-none" />
                        </motion.div>
                     </div>
                  </div>
               </section>
               <aside className="w-[480px] border-l border-white/5 bg-[#0E1B22] flex flex-col">
                  {selectedModule ? (<div className="h-full flex flex-col p-10"><h3 className="text-2xl font-black mb-8">屬性編輯器</h3><div className="flex-grow overflow-y-auto"><ModuleEditor module={selectedModule} onChange={(data) => updateModule(selectedModuleId!, data)} /></div></div>) : 
                  (<div className="p-12"><h3 className="text-4xl font-black mb-8 leading-none">組件庫</h3><div className="grid grid-cols-2 gap-4">{moduleTemplates.map(m => (<button key={m.type} onClick={() => addModule(m.type)} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:bg-primary transition-all flex flex-col items-center"><m.icon size={24} className="mb-4"/><span className="text-[10px] font-black uppercase text-white/30">{m.label}</span></button>))}</div></div>)}
               </aside>
            </motion.div>
          ) : (
            <motion.div key="others" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-12 py-10 space-y-12">
               {activeTab === 'reviews' && (<ReviewQueue pendingUsers={pendingUsers} onApprove={async (id)=>{ await supabase.from('profiles').update({status:'active'}).eq('id',id); fetchGlobalData(); showToast('審核通過！'); }} onReject={async (id)=>{ await supabase.from('profiles').update({status:'rejected'}).eq('id',id); fetchGlobalData(); showToast('已駁回','error'); }} />)}
               {activeTab === 'dashboard' && (
                 <div className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {[{ label: '學會總會員', value: users.length, color: 'text-primary' }, { label: '待審核項目', value: pendingUsers.length, color: 'text-amber-500' }, { label: '運作中模件', value: news.length, color: 'text-green-400' }, { label: 'API 健全度', value: '100%', color: 'text-purple-400' }].map((k, i) => (
                       <div key={i} className="p-10 bg-white/5 border border-white/5 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 mask-diagonal group-hover:scale-150 transition-transform"/>
                         <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">{k.label}</p>
                         <h4 className={cn("text-6xl font-black", k.color)}>{k.value}</h4>
                       </div>
                     ))}
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 p-12 bg-white/5 border border-white/5 rounded-[4rem] flex flex-col justify-between h-[400px]">
                         <div><h3 className="text-3xl font-black mb-2">營收與互動趨勢</h3><p className="text-white/20 text-xs font-bold uppercase tracking-widest">Analytics Dashboard • PRO</p></div>
                         <div className="flex items-end gap-2 h-40">
                            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                              <div key={i} style={{ height: `${h}%` }} className="flex-grow bg-primary/20 rounded-t-xl hover:bg-primary transition-all cursor-pointer relative group">
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">DAY {i+1}</div>
                              </div>
                            ))}
                         </div>
                      </div>
                      <div className="p-12 bg-gradient-to-br from-primary/20 to-accent/5 border border-primary/20 rounded-[4rem] flex flex-col justify-between">
                         <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter">數據導出中心</h3>
                         <div className="space-y-4">
                            <button className="w-full py-5 bg-white text-dark rounded-3xl font-black text-xs">導出會員名錄 (.CSV)</button>
                            <button className="w-full py-5 bg-white/5 border border-white/10 rounded-3xl font-black text-[10px] text-white/30 uppercase tracking-widest">營收分析報告</button>
                         </div>
                      </div>
                   </div>
                 </div>
               )}
               {activeTab === 'course_mgr' && (<div className="space-y-8"><div className="flex justify-between items-end"><h2 className="text-4xl font-black">全球教育課程庫</h2><button onClick={()=>setEditItem({type:'course'})} className="px-10 py-5 bg-accent text-dark rounded-2xl font-black">建立新課程</button></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{courses.map(c => (<div key={c.id} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] group relative"><h3 className="text-3xl font-black mb-2">{c.title}</h3><p className="text-xl text-white/30 font-bold">{c.price}</p></div>))}</div></div>)}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <AnimatePresence>{editItem && (<motion.div className="fixed inset-0 z-[600] flex items-center justify-center bg-dark/95 backdrop-blur-3xl p-6"><motion.div className="w-full max-w-4xl h-[80vh] bg-[#1A252B] rounded-[4rem] p-10 overflow-y-auto no-scrollbar relative"><button onClick={()=>setEditItem(null)} className="absolute top-10 right-10 p-4"><X/></button>{editItem.type === 'course' && <CourseForm initialData={editItem.id ? editItem : null} onSave={handleSaveCourse} onCancel={()=>setEditItem(null)} />}</motion.div></motion.div>)}</AnimatePresence>
      <AnimatePresence>{toast && (<motion.div className={cn("fixed bottom-12 right-12 z-[1000] px-8 py-5 rounded-3xl bg-green-500 text-white font-black")}>{toast.msg}</motion.div>)}</AnimatePresence>
    </div>
  );
}
