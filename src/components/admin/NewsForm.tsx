'use client';

import React, { useState } from 'react';
import { Save, X, Plus, Trash2, Type, Calendar, User, Tag, FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function NewsForm({ initialData, onSave, onCancel, loading }: NewsFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '活動公告',
    tag: '重要',
    date: new Date().toISOString().split('T')[0],
    author: 'twEFT 管理團隊',
    excerpt: '',
    content: '',
    image_url: '',
    ...initialData
  });

  const categories = ['活動公告', '專業課程', '國際消息', '學術研究'];
  const tags = ['重要', '熱門', '喜訊', '更新', '招募中'];

  return (
    <div className="flex flex-col h-full bg-[#1A252B]">
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#1A252B] z-10">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{initialData ? '編輯消息公告' : '撰寫新消息'}</h2>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-1">
              Official Announcements • News & Media
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white/60 transition-all"
          >
            取消
          </button>
          <button 
            onClick={() => onSave(formData)}
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
            發佈公告
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-10 space-y-12 pb-32">
        {/* Title and Metadata */}
        <div className="space-y-8">
          <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] border-l-4 border-primary pl-4">標題與核心屬性</h3>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">報導/公告主標題</label>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-2xl font-bold text-white focus:border-primary outline-none transition-all placeholder:text-white/10" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="輸入吸引人的高品質標題..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <Tag size={12} /> 分類
              </div>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-primary outline-none transition-all appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c} className="bg-[#1A252B]">{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <Tag size={12} /> 標籤氣氛
              </div>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-primary outline-none transition-all appearance-none"
                value={formData.tag}
                onChange={(e) => setFormData({...formData, tag: e.target.value})}
              >
                {tags.map(t => <option key={t} value={t} className="bg-[#1A252B]">{t}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <Calendar size={12} /> 發佈日期
              </div>
              <input 
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-primary outline-none" 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <User size={12} /> 作者/署名
              </div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-primary outline-none" 
                value={formData.author} 
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Featured Image URL */}
        <div className="space-y-8 pt-10 border-t border-white/5">
          <h3 className="text-sm font-black text-accent uppercase tracking-[0.3em] border-l-4 border-accent pl-4">精選預覽圖片</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2 space-y-4">
               <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">封面圖片 URL (選填)</label>
               <div className="relative">
                  <ImageIcon size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-accent outline-none" 
                    value={formData.image_url} 
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                  />
               </div>
               <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">建議使用 16:9 比例的高規格攝影圖片</p>
            </div>
            <div className="h-40 bg-white/5 rounded-[2rem] border border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                {formData.image_url ? (
                  <img src={formData.image_url} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-white/10" />
                )}
            </div>
          </div>
        </div>

        {/* Content & Excerpt */}
        <div className="space-y-10 pt-10 border-t border-white/5">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">列表摘要 (簡短描述)</h3>
            <textarea 
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-sm text-white/60 focus:border-primary outline-none"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              placeholder="在消息列表顯示的簡短引言..."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">報導詳情內容</h3>
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-1 overflow-hidden">
               {/* Tool Bar Mockup for future rich text */}
               <div className="flex items-center gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-400/50" />
                     <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
                     <span className="w-2 h-2 rounded-full bg-green-400/50" />
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Support Markdown & Simple HTML</span>
               </div>
               <textarea 
                 rows={12}
                 className="w-full bg-transparent border-none px-8 py-6 text-base text-white/80 focus:ring-0 outline-none leading-relaxed"
                 value={formData.content}
                 onChange={(e) => setFormData({...formData, content: e.target.value})}
                 placeholder="在這裡開始撰寫協會正式公告內容..."
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
