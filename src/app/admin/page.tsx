'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
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
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ModuleRenderer, type ModuleData, type ModuleType } from '@/components/ModuleRenderer';

// --- NEW ADMIN COMPONENTS ---
import CourseForm from '@/components/admin/CourseForm';
import NewsForm from '@/components/admin/NewsForm';
import ModuleEditor from '@/components/admin/ModuleEditor';

const INITIAL_LAYOUTS: { [key: string]: ModuleData[] } = {
  home: [
    { id: 'h1', type: 'HeroSlider', title: '建立深層連結，重塑依附關係', subtitle: 'Emotionally Focused Therapy', content: '我們是「臺灣EFT治療學會」，致力於推廣情緒焦點治療 (EFT)，協助治療師與大眾建立更安全、更親密的關係。', background: 'dark' },
    { id: 's1', type: 'Stats', items: [{label: '認證會員', value: '500+'}, {label: '國際督導', value: '20+'}, {label: '年度課程', value: '100+'}] },
    { id: 'f1', type: 'Features', title: '核心發展亮點', items: [{title: '專業認證體系', description: '從初階到進階的完整認證路徑'}, {title: '國際師資與顧問', description: '媒合全球頂尖 EFT 專業見解'}, {title: '臨床培訓中心', description: '提供實務督導與專業團體支持'}] }
  ],
  about: [
    { id: 'ab1', type: 'HeroSlider', title: '推廣愛與連結的專業社群', subtitle: 'Our Mission & Vision', content: '臺灣EFT治療學會 (twEFT) 是經由 ICEEFT 授權，在台灣推廣情緒焦點治療的專業組織。我們致力於培訓專業治療師，並在大眾中推廣健康的依附關係與情感連結。', background: 'slate' },
    { id: 'ab2', type: 'Timeline', title: '協會發展里程碑', subtitle: 'Our History', items: [{title: '學會正式成立', description: '2013年由劉婷老師引進並正式創立學會'}, {title: '國際認證轉型', description: '正式取得 ICEEFT 在台教學與認證授權'}, {title: '邁向多元發展', description: '發展多樣化進階工作坊與專業督導社群'}] }
  ],
  'eft-intro': [
    { id: 'eft1', type: 'HeroSlider', title: '看見情緒背後的依附訊息', subtitle: 'What is EFT?', content: '情緒焦點治療 (EFT) 是一套結合人本主義與依附理論的短期治療方式，廣泛應用於個人、伴侶及家庭諮商。它能幫助我們在情緒混亂中，找到安全感的出口。', background: 'primary-light' },
    { id: 'eft2', type: 'Features', title: 'EFT 的核心重點', items: [{title: '情緒就是能量', description: '情緒並非干擾，而是引導改變的主要動力'}, {title: '修復依附連結', description: '處理深刻的核心依賴需求，建立安全感'}, {title: '改變循環脈絡', description: '打破重複的負向互動與防衛機制'}] }
  ],
  international: [
    { id: 'int1', type: 'HeroSlider', title: '接軌國際：ICEEFT 全球聯盟', subtitle: 'Global Partnership', content: 'twEFT 與加拿大 ICEEFT 緊密連結，確保台灣的培訓品質符合全球統一的高標準認證體系。', background: 'dark' },
    { id: 'int2', type: 'Features', title: '國際合作夥伴', items: [{title: 'ICEEFT', description: '加拿大國際情緒焦點治療中心'}, {title: 'Regional Networks', description: '與全球 80+ 地區分會進行學術交流'}] }
  ],
  membership: [
    { id: 'm1', type: 'HeroSlider', title: '專業之路，與你同行', subtitle: 'Membership Plans', content: '加入 twEFT，享受國際級電子通訊報、專業課程優惠以及社群同儕支持。', background: 'slate' },
    { id: 'm2', type: 'PricingGrid', title: '年度會員方案', items: [{title: '專業會員', price: 'NT$ 2,000/年', description: '適用於心理師、輔導老師相關領域工作者'}, {title: '一般會員', price: 'NT$ 1,500/年', description: '適用於對 EFT 有興趣之相關人士'}, {title: '學生會員', price: 'NT$ 1,000/年', description: '需提供在學相關證明'}] }
  ],
  contact: [
    { id: 'c1', type: 'HeroSlider', title: '持續性的專業對話', subtitle: 'Get in Touch', content: '如果您有任何課程、合作或入會需求，請隨時與我們秘書處聯繫。', background: 'dark' },
    { id: 'c2', type: 'ImageTextGrid', title: '協會辦事處', subtitle: 'Office Info', content: '服務時間：週一至週五 09:30 - 17:30。電話：(02) ****-**** 信箱：secretary@tweft.org.tw' }
  ],
  resources: [
    { id: 'r1', type: 'HeroSlider', title: '深化學習：專業文獻與資源', subtitle: 'Resource Hub', content: '這裡收集了 EFT 的學術研究、臨床工具手冊與相關中文化量表。', background: 'slate' },
    { id: 'r2', type: 'Features', title: '精選下載資源', items: [{title: '伴侶治療效能研究', description: '2024 中文譯本'}, {title: '依附風格評估表', description: '臨床實務使用參考'}] }
  ],
  courses: [
      { id: 'co1', type: 'HeroSlider', title: '系統化的專業認證路徑', subtitle: 'LMS & Training', content: '從初階 Externship 到專題工作坊，我們提供完整的專業成長地圖。', background: 'dark' }
  ]
};

export default function AdminDashboard() {
  const { profile } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  const [siteData, setSiteData] = useState<{ [key: string]: ModuleData[] }>({});
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedModuleId, setSelectedModuleId] = useState<string | number | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const pageModules = siteData[currentPage] || INITIAL_LAYOUTS[currentPage] || [];
  const selectedModule = pageModules.find(m => m.id === selectedModuleId);

  // --- COLLECTION STATE ---
  const [courses, setCourses] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [editItem, setEditItem] = useState<any>(null);



  // --- DATABASE SYNC ---
  useEffect(() => {
    fetchPageData(currentPage);
    fetchGlobalData();
  }, [currentPage]);

  // Scroll to selected module in simulator
  useEffect(() => {
    if (selectedModuleId) {
      const element = document.getElementById(`preview-${selectedModuleId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedModuleId]);

  const fetchGlobalData = async () => {
    try {
      const { data: n } = await supabase.from('news').select('*').order('date', { ascending: false });
      const { data: c } = await supabase.from('courses').select('*').order('id', { ascending: true });
      const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: d } = await supabase.from('downloads_resources').select('*').order('uploaded_at', { ascending: false });
      const { data: u } = await supabase.from('profiles').select('*');
      
      if (n) setNews(n);
      if (c) setCourses(c);
      if (o) setOrders(o);
      if (d) setDownloads(d);
      if (u) setUsers(u);
    } catch (err) {
      console.error('Error fetching global data:', err);
    }
  };

  const fetchPageData = async (slug: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data && data.modules && data.modules.length > 0) {
        setSiteData(prev => ({ ...prev, [slug]: data.modules }));
      } else {
        const defaultLayout = INITIAL_LAYOUTS[slug] || [];
        setSiteData(prev => ({ ...prev, [slug]: defaultLayout }));
      }
    } catch (err) {
      console.error('Error fetching page data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('resources')
        .upload(`${Date.now()}_${file.name}`, file);

      if (error) throw error;
      
      const { error: dbErr } = await supabase
        .from('downloads_resources')
        .insert({
           name: file.name,
           file_path: data.path,
           file_type: file.type,
           uploaded_by: profile?.id
        });

      if (dbErr) throw dbErr;
      
      showToast('檔案上傳成功並已記錄至資料庫！');
      fetchGlobalData();
    } catch (err) {
      console.error('Error uploading file:', err);
      showToast('上傳失敗', 'error');
    } finally {
      setLoading(false);
    }
  };

  const restoreDefault = () => {
    if (confirm('確定要恢復此頁面的初始模板嗎？這將覆蓋您目前尚未儲存的所有編輯。')) {
      const defaultLayout = INITIAL_LAYOUTS[currentPage] || [];
      setSiteData({ ...siteData, [currentPage]: defaultLayout });
    }
  };

  // --- DATA MUTATIONS ---
  const handleSaveCourse = async (courseData: any) => {
    setLoading(true);
    try {
      const { id, type, ...rest } = courseData;
      const { error } = id 
        ? await supabase.from('courses').update(rest).eq('id', id)
        : await supabase.from('courses').insert([rest]);

      if (error) throw error;
      showToast(id ? '課程已更新' : '新課程已發佈');
      setEditItem(null);
      fetchGlobalData();
    } catch (err) {
      console.error('Error saving course:', err);
      showToast('儲存失敗', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNews = async (newsData: any) => {
    setLoading(true);
    try {
      const { id, type, ...rest } = newsData;
      const { error } = id 
        ? await supabase.from('news').update(rest).eq('id', id)
        : await supabase.from('news').insert([rest]);

      if (error) throw error;
      showToast(id ? '公告已更新' : '新消息已發佈');
      setEditItem(null);
      fetchGlobalData();
    } catch (err) {
      console.error('Error saving news:', err);
      showToast('儲存失敗', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: true })
        .eq('id', userId);

      if (error) throw error;
      showToast('會員已成功核准並開啟進階權限');
      fetchGlobalData();
    } catch (err) {
      console.error('Error verifying user:', err);
      showToast('操作失敗', 'error');
    }
  };

  const handleApproveOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'approved' })
        .eq('id', orderId);

      if (error) throw error;
      showToast('訂單已核准，會員權限已開通');
      fetchGlobalData();
    } catch (err) {
      console.error('Error approving order:', err);
      showToast('核准失敗', 'error');
    }
  };

  const handlePublish = async () => {
    setSaveStatus('saving');
    try {
      const { error } = await supabase
        .from('cms_pages')
        .upsert({
          slug: currentPage,
          title: pagesMap.find((p: any) => p.id === currentPage)?.label || currentPage,
          modules: siteData[currentPage],
          is_published: true,
          last_updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });

      if (error) throw error;
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Error saving page:', err);
      setSaveStatus('error');
    }
  };

  // --- CMS ACTIONS ---
  const addModule = (type: ModuleType) => {
    const newModule: ModuleData = {
      id: Date.now().toString(),
      type,
      title: `新 ${type} 模塊`,
      subtitle: '編輯小標題',
      content: '在此輸入描述...',
      items: type === 'Stats' ? [{ label: '新數據', value: '100' }] : []
    };
    setSiteData({ ...siteData, [currentPage]: [...pageModules, newModule] });
  };

  const updateModule = (id: string | number, data: Partial<ModuleData>) => {
    const newModules = [...pageModules];
    const index = newModules.findIndex(m => m.id === id);
    if (index === -1) return;
    newModules[index] = { ...newModules[index], ...data };
    setSiteData({ ...siteData, [currentPage]: newModules });
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

  const tabs = [
    { id: 'dashboard', label: '總覽', icon: Monitor },
    { id: 'cms', label: '頁面編輯', icon: Layout },
    { id: 'course_mgr', label: '課程管理', icon: BookOpen },
    { id: 'news_mgr', label: '消息管理', icon: List },
    { id: 'orders', label: '訂單審核', icon: ShoppingCart },
    { id: 'downloads', label: '資源管理', icon: Download },
    { id: 'users', label: '會員審核', icon: Users },
    { id: 'settings', label: '系統設定', icon: ShieldCheck },
  ];

  const pagesMap = [
    { id: 'home', label: '首頁' },
    { id: 'about', label: '關於學會' },
    { id: 'eft-intro', label: '什麼是 EFT' },
    { id: 'international', label: '國際連結' },
    { id: 'courses', label: '課程總覽' },
    { id: 'news', label: '最新消息' },
    { id: 'faculty', label: '師資團隊' },
    { id: 'resources', label: '下載專區' },
    { id: 'membership', label: '加入會員' },
    { id: 'contact', label: '聯絡我們' }
  ];

  const moduleTemplates: { type: ModuleType; label: string; icon: any }[] = [
    { type: 'HeroSlider', label: '大氣輪播', icon: Monitor },
    { type: 'ImageTextGrid', label: '圖文排列', icon: Layout },
    { type: 'Features', label: '功能特性', icon: Zap },
    { type: 'Stats', label: '數據統計', icon: CheckCircle2 },
    { type: 'Timeline', label: '發展時序', icon: Clock },
    { type: 'PricingGrid', label: '方案報價', icon: CreditCard },
    { type: 'FAQ', label: '常見問題', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-[#0E1B22] flex flex-col px-12 pb-20 text-white selection:bg-primary selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 right-8 z-[500] px-8 py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-3 transition-all ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/10">
             <Layout className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">twEFT Command Center</h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Live Management v2.5</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {activeTab === 'cms' && (
             <div className="flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/5">
                <button onClick={() => setViewMode('edit')} className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${viewMode === 'edit' ? 'bg-white text-dark' : 'text-white/40'}`}>EDITOR</button>
                <button onClick={() => setViewMode('preview')} className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${viewMode === 'preview' ? 'bg-accent text-dark' : 'text-white/40'}`}>PREVIEW</button>
             </div>
           )}
           <button onClick={handlePublish} disabled={saveStatus === 'saving'} className="px-8 py-4 bg-primary text-white rounded-2xl text-sm font-black shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
             {saveStatus === 'saving' ? '儲存中...' : '同步發佈'}
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/5 rounded-[2rem] w-fit mb-12 overflow-x-auto max-w-full">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-10 py-4 rounded-[1.5rem] text-sm font-black transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-2xl shadow-primary/20 translate-y-[-2px]' : 'text-white/30 hover:text-white/70 hover:bg-white/5'}`}>
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {activeTab === 'cms' && (
          <aside className="lg:col-span-1 space-y-8 h-fit sticky top-40">
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6 shadow-2xl">
                <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">頁面導覽</h3>
                <div className="grid grid-cols-1 gap-1.5">
                   {pagesMap.map(p => (
                     <button key={p.id} onClick={() => setCurrentPage(p.id)} className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black transition-all ${currentPage === p.id ? 'bg-primary/20 text-primary border border-primary/20' : 'text-white/30 border-transparent hover:bg-white/5'}`}>{p.label}</button>
                   ))}
                </div>
             </div>
             <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6 shadow-2xl">
                <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">模組庫</h3>
                <div className="grid grid-cols-1 gap-2">
                   {moduleTemplates.map(m => (
                     <button key={m.type} onClick={() => addModule(m.type)} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl text-[11px] font-black text-white/50 hover:border-primary transition-all group">
                        <m.icon size={16} className="group-hover:text-primary" /> <span>{m.label}</span>
                     </button>
                   ))}
                </div>
             </div>
          </aside>
        )}

        <div className={activeTab === 'cms' ? "lg:col-span-3" : "lg:col-span-4"}>
            {viewMode === 'edit' ? (
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                    <h2 className="text-4xl font-black">Admin 數據主控台</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                       {[
                         { label: '學員總數', value: users.length, color: 'text-primary' },
                         { label: '當月課程', value: courses.length, color: 'text-accent' },
                         { label: '待審訂單', value: orders.filter(o=>o.status!=='approved').length, color: 'text-yellow-400' },
                         { label: '最新消息', value: news.length, color: 'text-green-400' }
                       ].map((k, i) => (
                         <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-2">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{k.label}</p>
                            <p className={`text-5xl font-black ${k.color}`}>{k.value}</p>
                         </div>
                       ))}
                    </div>
                    <div className="flex gap-4">
                       <button onClick={()=>setActiveTab('course_mgr')} className="px-8 py-4 bg-white/5 rounded-2xl text-xs font-black hover:bg-primary transition-all">管理全球課程</button>
                       <button onClick={()=>setActiveTab('news_mgr')} className="px-8 py-4 bg-white/5 rounded-2xl text-xs font-black hover:bg-primary transition-all">發佈今日公告</button>
                       <button onClick={async ()=>{
                          setLoading(true);
                          try {
                             for (const p of pagesMap) {
                                const { error } = await supabase.from('cms_pages').upsert({
                                   slug: p.id,
                                   title: p.label,
                                   modules: INITIAL_LAYOUTS[p.id] || [],
                                   is_published: true
                                }, { onConflict: 'slug' });
                                if (error) throw error;
                             }
                             showToast('全站模板初始化成功！');
                             fetchPageData(currentPage);
                          } catch (err) {
                             console.error(err);
                             showToast('初始化失敗', 'error');
                          } finally {
                             setLoading(false);
                          }
                       }} className="px-8 py-4 bg-primary/20 text-primary border border-primary/20 rounded-2xl text-xs font-black hover:bg-primary hover:text-white transition-all">一鍵初始化全站內容模板</button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'cms' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-[calc(100vh-280px)] -mx-12 -mb-20 overflow-hidden border-t border-white/5 bg-[#0A1211]">
                    {/* CMS Left Sidebar: Structure & Navigation */}
                    <div className="w-80 bg-[#0E1B22] border-r border-white/5 flex flex-col pt-8">
                       <div className="px-8 mb-8">
                          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">目標頁面</h3>
                          <select 
                             className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-xs font-black text-white outline-none focus:border-primary appearance-none"
                             value={currentPage}
                             onChange={(e) => {
                                setCurrentPage(e.target.value);
                                setSelectedModuleId(null);
                             }}
                          >
                             {pagesMap.map(p => (
                               <option key={p.id} value={p.id} className="bg-dark">{p.label}</option>
                             ))}
                          </select>
                       </div>

                       <div className="flex-grow overflow-y-auto px-6 custom-scrollbar space-y-2">
                          <h3 className="px-2 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">版塊結構</h3>
                          {pageModules.map((m, i) => (
                            <div 
                               key={m.id} 
                               onClick={() => setSelectedModuleId(m.id)}
                               className={cn(
                                  "group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all",
                                  selectedModuleId === m.id ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" : "bg-white/5 text-white/40 hover:bg-white/10"
                               )}
                            >
                               <div className="flex items-center gap-4">
                                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", selectedModuleId === m.id ? "bg-white/20" : "bg-primary/20 text-primary")}>
                                     <Layout size={14}/>
                                  </div>
                                  <span className="text-[11px] font-black tracking-tight">{m.title || m.type}</span>
                               </div>
                               <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={(e) => { e.stopPropagation(); moveModule(i, 'up'); }} className="p-1.5 hover:text-white"><MoveUp size={12}/></button>
                                  <button onClick={(e) => { e.stopPropagation(); moveModule(i, 'down'); }} className="p-1.5 hover:text-white"><MoveDown size={12}/></button>
                                  <button onClick={(e) => { e.stopPropagation(); removeModule(m.id); }} className="p-1.5 hover:text-red-400"><Trash2 size={12}/></button>
                               </div>
                            </div>
                          ))}
                          <button 
                             onClick={() => addModule('HeroSlider')}
                             className="w-full py-4 mt-6 border-2 border-dashed border-white/5 rounded-2xl text-[10px] font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all uppercase tracking-widest"
                          >
                             + 添加版塊模組
                          </button>
                       </div>
                    </div>

                    {/* CMS Center: Live Interactive Simulator */}
                    <div className="flex-grow flex flex-col bg-[#050B0A] relative overflow-hidden">
                       <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark/20 backdrop-blur-3xl z-40">
                          <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
                             <button onClick={() => setPreviewDevice('desktop')} className={cn("p-2 rounded-xl transition-all", previewDevice === 'desktop' ? "bg-white text-dark shadow-xl" : "text-white/40 hover:text-white")}><Monitor size={18}/></button>
                             <button onClick={() => setPreviewDevice('mobile')} className={cn("p-2 rounded-xl transition-all", previewDevice === 'mobile' ? "bg-white text-dark shadow-xl" : "text-white/40 hover:text-white")}><Smartphone size={18}/></button>
                          </div>
                          <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Live CMS Simulator v2.0</div>
                          <div className="text-accent text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                             <div className="w-2 h-2 bg-accent rounded-full animate-pulse"/> 所見即所得模式
                          </div>
                       </div>

                       <div className="flex-grow p-12 flex justify-center items-start overflow-y-auto custom-scrollbar">
                          <motion.div 
                             layout
                             className={cn(
                                "bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-[12px] border-dark overflow-hidden transition-all duration-500 origin-top",
                                previewDevice === 'desktop' ? "w-full max-w-[1280px]" : "w-[390px] min-h-[844px]"
                             )}
                          >
                             <ModuleRenderer 
                                modules={pageModules} 
                                isAdmin={true}
                                selectedId={selectedModuleId}
                                onSelect={(id) => setSelectedModuleId(id)}
                             />
                          </motion.div>
                       </div>
                    </div>

                    {/* CMS Right Sidebar: Contextual Field Editor */}
                    <div className="w-[450px] bg-[#0E1B22] border-l border-white/5 flex flex-col">
                       {selectedModule ? (
                          <div className="h-full flex flex-col">
                             <div className="p-8 border-b border-white/5 space-y-2">
                                <div className="flex items-center justify-between">
                                   <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center shadow-lg"><Layout size={24}/></div>
                                   <button onClick={() => setSelectedModuleId(null)} className="p-3 bg-white/5 rounded-xl hover:text-red-400 transition-colors"><X size={18}/></button>
                                </div>
                                <div>
                                   <h3 className="text-xl font-black text-white">版塊內容設定</h3>
                                   <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Type: {selectedModule.type}</p>
                                </div>
                             </div>
                             <div className="flex-grow overflow-y-auto p-10 custom-scrollbar pb-32">
                                <ModuleEditor 
                                   module={selectedModule} 
                                   onChange={(data) => updateModule(selectedModuleId!, data)} 
                                />
                             </div>
                          </div>
                       ) : (
                          <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-[#0E1B22]">
                             <div className="w-28 h-28 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-center text-white/10 animate-pulse">
                                <Layout size={56} />
                             </div>
                             <div className="space-y-4">
                                <h3 className="text-2xl font-black text-white/30 tracking-tight">選擇一個版塊來編輯</h3>
                                <p className="text-sm text-white/10 font-bold leading-relaxed max-w-[240px] mx-auto">
                                   點擊左側列表或中間模擬視窗中的 內容，即可在此開啟即時編輯器
                                </p>
                             </div>
                             <div className="grid grid-cols-2 gap-3 w-full pt-8">
                                {moduleTemplates.slice(0, 4).map(m => (
                                  <button key={m.type} onClick={() => addModule(m.type)} className="p-6 bg-white/5 border border-white/5 rounded-[2rem] text-[9px] font-black text-white/20 hover:bg-primary/20 hover:text-primary hover:border-primary/20 transition-all uppercase tracking-widest flex flex-col items-center gap-3">
                                     <m.icon size={20} /> {m.label}
                                  </button>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'course_mgr' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                     <div className="flex justify-between items-end">
                        <h2 className="text-4xl font-black">全球教育課程庫</h2>
                        <button onClick={()=>setEditItem({ type: 'course' })} className="px-10 py-5 bg-accent text-dark rounded-2xl font-black shadow-2xl shadow-accent/20">建立新課程</button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {courses.map(c => (
                          <div key={c.id} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] relative group hover:border-accent transition-all">
                             <button onClick={()=>setEditItem({ ...c, type: 'course' })} className="absolute top-10 right-10 p-4 bg-white/5 rounded-2xl hover:bg-accent hover:text-dark transition-all"><Settings size={20}/></button>
                             <div className="space-y-4">
                                <span className="px-4 py-1 bg-accent/20 text-accent rounded-lg text-[10px] font-black uppercase tracking-widest">{c.category}</span>
                                <h3 className="text-3xl font-black">{c.title}</h3>
                                <p className="text-xl text-white/40 font-bold">{c.price}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}

                {activeTab === 'news_mgr' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <div className="flex justify-between items-end mb-4">
                        <h2 className="text-4xl font-black">學會公告管理</h2>
                        <button onClick={()=>setEditItem({ type: 'news' })} className="px-10 py-5 bg-primary text-white rounded-2xl font-black">發佈新消息</button>
                     </div>
                     {news.map(n => (
                       <div key={n.id} className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-primary transition-all">
                          <div>
                             <h4 className="text-xl font-black">{n.title}</h4>
                             <p className="text-xs text-white/20 font-bold uppercase tracking-widest">{n.date} • {n.category || '活動消息'}</p>
                          </div>
                          <button onClick={()=>setEditItem({ ...n, type: 'news' })} className="px-6 py-3 bg-white/5 hover:bg-primary hover:text-white rounded-xl text-xs font-black transition-all">詳情與編輯</button>
                       </div>
                     ))}
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
                     <table className="w-full text-left">
                        <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                           <tr><th className="px-10 py-8">訂單 ID</th><th className="px-10 py-8">訂購人</th><th className="px-10 py-8">金額</th><th className="px-10 py-8 text-right">核操作</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {orders.map(o => (
                             <tr key={o.id} className="hover:bg-white/5 group">
                                <td className="px-10 py-8 font-bold text-primary">{o.id}</td>
                                <td className="px-10 py-8 font-black">{o.user_name}</td>
                                <td className="px-10 py-8 text-white/60">{o.amount}</td>
                                <td className="px-10 py-8 text-right">
                                   {o.status === 'approved' 
                                     ? <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">已核核</span>
                                     : <button onClick={()=>handleApproveOrder(o.id)} className="px-6 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black border border-primary/20 hover:bg-primary hover:text-white transition-all">核准入帳</button>}
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </motion.div>
                )}

                {activeTab === 'users' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                           <tr><th className="px-10 py-8">用戶名稱</th><th className="px-10 py-8">級別角色</th><th className="px-10 py-8">狀態</th><th className="px-10 py-8 text-right">操作</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {users.map(u => (
                             <tr key={u.id} className="hover:bg-white/5 group">
                                <td className="px-10 py-8 font-black">{u.full_name || u.email}</td>
                                <td className="px-10 py-8 text-[10px] font-black uppercase text-primary tracking-widest">{u.role}</td>
                                <td className="px-10 py-8">
                                   {u.is_verified 
                                     ? <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> 
                                     : <div className="w-2 h-2 rounded-full bg-yellow-500"/>}
                                </td>
                                <td className="px-10 py-8 text-right">
                                   <button onClick={()=>setEditItem({ ...u, type: 'user' })} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white/30 hover:text-white"><Settings size={16}/></button>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                      </table>
                   </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                    <h2 className="text-4xl font-black">核心系統設定</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] space-y-6">
                          <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.3em]">網站元數據</h3>
                          <div className="space-y-4">
                             {['網站標題', 'SEO描述', '聯絡信箱'].map(f=>(
                               <div key={f} className="space-y-2">
                                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest">{f}</label>
                                  <input className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl outline-none focus:border-primary" />
                               </div>
                             ))}
                          </div>
                       </div>
                       <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] space-y-6">
                          <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.3em]">系統連線狀態</h3>
                          {[ {n:'Supabase DB', s:'Online'}, {n:'Storage', s:'Ready'}, {n:'Auth', s:'Secure'} ].map(s=>(
                            <div key={s.n} className="flex justify-between items-center p-5 bg-black/20 rounded-2xl">
                               <span className="font-bold">{s.n}</span>
                               <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{s.s}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
                <div className="space-y-12">
                   <h2 className="text-3xl font-black">即時預覽：{pagesMap.find(p => p.id === currentPage)?.label}</h2>
                   <div className="bg-white rounded-[4rem] overflow-hidden min-h-[900px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-[12px] border-dark relative">
                      <div className="absolute top-10 right-10 z-50 px-8 py-4 bg-accent text-dark font-black rounded-full text-xs shadow-2xl flex items-center gap-4">
                         <div className="w-3 h-3 bg-dark rounded-full animate-ping" />
                         LIVE PREVIEW MODE
                      </div>
                      <div className="h-full overflow-y-auto custom-scrollbar">
                         <ModuleRenderer modules={pageModules} />
                      </div>
                   </div>
                </div>
            )}
        </div>
      </div>

      {/* Enhanced Multi-purpose Edit Modal */}
      <AnimatePresence>
        {editItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] flex items-center justify-center p-6 md:p-12 lg:p-20 bg-dark/95 backdrop-blur-3xl">
             <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="w-full max-w-6xl h-full bg-[#1A252B] rounded-[4rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_50px_150px_rgba(0,0,0,0.8)]">
                <button onClick={() => setEditItem(null)} className="absolute top-8 right-8 z-50 p-4 bg-white/5 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><X size={24}/></button>
                
                <div className="flex-grow overflow-hidden">
                   {editItem.type === 'course' && <CourseForm initialData={editItem.id ? editItem : null} onSave={handleSaveCourse} onCancel={()=>setEditItem(null)} loading={loading} />}
                   {editItem.type === 'news' && <NewsForm initialData={editItem.id ? editItem : null} onSave={handleSaveNews} onCancel={()=>setEditItem(null)} loading={loading} />}
                   
                   {editItem.type === 'cms_module' && (
                     <div className="h-full flex flex-col">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#1A252B] z-10">
                           <div className="flex items-center gap-6">
                              <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center text-primary shadow-2xl"><Layout size={32}/></div>
                              <div><h2 className="text-3xl font-black text-white">模組數據編輯器</h2><p className="text-white/20 text-[10px] font-black uppercase tracking-widest mt-1">Schema Identifier: {editItem.id}</p></div>
                           </div>
                           <button onClick={()=>{updateModule(editItem.index, editItem); setEditItem(null); showToast('暫存已更新，請點擊同步發佈');}} className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">確認儲存暫存</button>
                        </div>
                        <div className="flex-grow overflow-y-auto p-12 custom-scrollbar pb-32">
                           <ModuleEditor module={editItem} onChange={(d)=>setEditItem({...editItem, ...d})} />
                        </div>
                     </div>
                   )}

                   {editItem.type === 'user' && (
                     <div className="p-20 flex flex-col justify-center h-full max-w-4xl mx-auto space-y-12">
                        <div className="flex items-center gap-8">
                           <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center font-black text-3xl">{(editItem.full_name || editItem.email)[0].toUpperCase()}</div>
                           <div className="space-y-1">
                              <h2 className="text-5xl font-black text-white">{editItem.full_name || '未設姓名'}</h2>
                              <p className="text-primary font-bold text-xl">{editItem.email}</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 bg-white/5 p-10 rounded-[3rem] border border-white/10">
                           <div className="space-y-1"><p className="text-[10px] font-black text-white/20 uppercase tracking-widest">目前系統角色</p><p className="text-white/80 font-bold text-lg">{editItem.role || 'Member'}</p></div>
                           <div className="space-y-1"><p className="text-[10px] font-black text-white/20 uppercase tracking-widest">身分驗證狀態</p><p className="text-white/80 font-bold text-lg">{editItem.is_verified ? '已核准專業人員' : '一般用戶 / 待審核'}</p></div>
                        </div>
                        <div className="flex gap-4">
                           {!editItem.is_verified && <button onClick={()=>{handleVerifyUser(editItem.id); setEditItem(null);}} className="px-12 py-5 bg-green-500 text-white font-black rounded-3xl shadow-2xl hover:bg-green-600 transition-all flex items-center gap-3"><CheckCircle2 size={24}/> 核准專業身份</button>}
                           <button className="px-12 py-5 bg-white/5 text-white/40 font-black rounded-3xl hover:bg-white/10 transition-all">手動調整賦權</button>
                           <button className="px-12 py-5 bg-red-500/10 text-red-500 font-black rounded-3xl hover:bg-red-500 transition-all ml-auto">封鎖帳號</button>
                        </div>
                     </div>
                   )}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
