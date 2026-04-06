'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, MoveUp, MoveDown, Image as ImageIcon, BookOpen, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CourseFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function CourseForm({ initialData, onSave, onCancel, loading }: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '核心課程',
    price: '',
    status: 'Active',
    instructor_name: '',
    instructor_title: '',
    instructor_image: '',
    date_info: '',
    location: '',
    capacity: '',
    hours: '',
    description: '',
    syllabus: [] as string[],
    highlights: [] as string[],
    ...initialData
  });

  const categories = ['核心課程', '專題講座', '督導團體', '進階工作坊'];
  const statusOptions = [
    { value: 'Active', label: '穩定開課中', color: 'bg-green-500/20 text-green-500' },
    { value: 'Upcoming', label: '即將開放', color: 'bg-blue-500/20 text-blue-400' },
    { value: 'Draft', label: '草稿審核', color: 'bg-yellow-500/20 text-yellow-500' }
  ];

  const handleAddField = (field: 'syllabus' | 'highlights') => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleUpdateField = (field: 'syllabus' | 'highlights', index: number, value: string) => {
    const newList = [...formData[field]];
    newList[index] = value;
    setFormData(prev => ({ ...prev, [field]: newList }));
  };

  const handleRemoveField = (field: 'syllabus' | 'highlights', index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleMoveField = (field: 'syllabus' | 'highlights', index: number, direction: 'up' | 'down') => {
    const newList = [...formData[field]];
    const newPos = direction === 'up' ? index - 1 : index + 1;
    if (newPos < 0 || newPos >= newList.length) return;
    [newList[index], newList[newPos]] = [newList[newPos], newList[index]];
    setFormData((prev: any) => ({ ...prev, [field]: newList }));
  };

  return (
    <div className="flex flex-col h-full bg-[#1A252B]">
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#1A252B] z-10">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{initialData ? '編輯課程' : '建立新課程'}</h2>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-1">
              Course Management System • {formData.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white/60 transition-all"
          >
            取消變更
          </button>
          <button 
            onClick={() => onSave(formData)}
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
            儲存課程
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-10 space-y-12 pb-32">
        {/* Basic Info */}
        <div className="space-y-8">
          <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] border-l-4 border-primary pl-4">基本資訊與狀態</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">課程主標題</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary outline-none transition-all" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="例如：EFT 核心課程 Externship"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">開課類別</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-primary outline-none transition-all appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(c => <option key={c} value={c} className="bg-[#1A252B]">{c}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">報名金額</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:border-primary outline-none" 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="NT$ 1,500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">發佈狀態</label>
             <div className="flex gap-4">
                {statusOptions.map(opt => (
                   <button
                    key={opt.value}
                    onClick={() => setFormData({...formData, status: opt.value})}
                    className={cn(
                      "flex-1 py-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest",
                      formData.status === opt.value 
                        ? opt.color + " border-transparent" 
                        : "bg-white/5 border-transparent text-white/20 hover:bg-white/10"
                    )}
                   >
                     {opt.label}
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Scheduling Details */}
        <div className="space-y-8 pt-10 border-t border-white/5">
          <h3 className="text-sm font-black text-accent uppercase tracking-[0.3em] border-l-4 border-accent pl-4">排程與容量資訊</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <Clock size={12} /> 開課日期
              </div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-accent outline-none transition-all" 
                value={formData.date_info} 
                onChange={(e) => setFormData({...formData, date_info: e.target.value})}
                placeholder="2024/05/20 - 05/24"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <MapPin size={12} /> 地點
              </div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-accent outline-none" 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="臺北市 (實體) / Zoom"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <Users size={12} /> 容納人數
              </div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-accent outline-none" 
                value={formData.capacity} 
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                placeholder="例如：60 人"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <Clock size={12} /> 總時數
              </div>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-accent outline-none" 
                value={formData.hours} 
                onChange={(e) => setFormData({...formData, hours: e.target.value})}
                placeholder="例如：24 小時"
              />
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="space-y-8 pt-10 border-t border-white/5">
          <h3 className="text-sm font-black text-secondary uppercase tracking-[0.3em] border-l-4 border-secondary pl-4">講師資訊元件</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">講師全名</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-secondary transition-all outline-none" 
                  value={formData.instructor_name} 
                  onChange={(e) => setFormData({...formData, instructor_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">講師職稱與頭銜</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-secondary outline-none transition-all" 
                  value={formData.instructor_title} 
                  onChange={(e) => setFormData({...formData, instructor_title: e.target.value})}
                  placeholder="例如：ICEEFT Certified Trainer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">講師照片 URL</label>
                <div className="relative">
                  <ImageIcon size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm focus:border-secondary outline-none" 
                    value={formData.instructor_image} 
                    onChange={(e) => setFormData({...formData, instructor_image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/5 rounded-[3rem] border border-dashed border-white/10 p-10 group overflow-hidden">
                {formData.instructor_image ? (
                  <img src={formData.instructor_image} className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-white/10 transition-transform group-hover:scale-110" />
                ) : (
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                    <ImageIcon size={40} />
                  </div>
                )}
                <p className="mt-6 text-xs font-black text-white/20 uppercase tracking-[0.2em]">教職員照片預覽</p>
            </div>
          </div>
        </div>

        {/* Description & List Management */}
        <div className="space-y-12 pt-10 border-t border-white/5">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">課程詳細描述</h3>
            <textarea 
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-8 py-6 text-base text-white/60 focus:border-primary outline-none transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="詳細描述課程內容、目標與受眾..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Syllabus Editor */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">Syllabus 教學單元</h3>
                <button 
                  onClick={() => handleAddField('syllabus')}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                >
                  + 新增單元
                </button>
              </div>
              <div className="space-y-3">
                {formData.syllabus.map((item: string, idx: number) => (
                  <motion.div 
                    layout 
                    key={idx} 
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col gap-1">
                      <button onClick={() => handleMoveField('syllabus', idx, 'up')} className="text-white/20 hover:text-white"><MoveUp size={12} /></button>
                      <button onClick={() => handleMoveField('syllabus', idx, 'down')} className="text-white/20 hover:text-white"><MoveDown size={12} /></button>
                    </div>
                    <input 
                      className="flex-grow bg-transparent border-none p-0 text-sm focus:ring-0 text-white/80" 
                      value={item} 
                      onChange={(e) => handleUpdateField('syllabus', idx, e.target.value)}
                      placeholder={`單元 ${idx + 1}...`}
                    />
                    <button 
                      onClick={() => handleRemoveField('syllabus', idx)}
                      className="p-2 opacity-0 group-hover:opacity-100 text-red-500/40 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights Editor */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">課程亮點 / 包含資源</h3>
                <button 
                  onClick={() => handleAddField('highlights')}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-xl text-[10px] font-black hover:bg-accent hover:text-dark transition-all uppercase tracking-widest"
                >
                  + 新增亮點
                </button>
              </div>
              <div className="space-y-3">
                {formData.highlights.map((item: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all"
                  >
                    <input 
                      className="flex-grow bg-transparent border-none p-0 text-sm focus:ring-0 text-white/80" 
                      value={item} 
                      onChange={(e) => handleUpdateField('highlights', idx, e.target.value)}
                      placeholder={`亮點項目 ${idx + 1}...`}
                    />
                    <button 
                      onClick={() => handleRemoveField('highlights', idx)}
                      className="p-2 opacity-0 group-hover:opacity-100 text-red-500/40 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
