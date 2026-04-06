'use client';

import React from 'react';
import { Plus, Trash2, MoveUp, MoveDown, Image as ImageIcon, Type, Layout, List, CheckCircle2, HelpCircle, Clock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ModuleData, type ModuleType } from '@/components/ModuleRenderer';

interface ModuleEditorProps {
  module: ModuleData;
  onChange: (data: Partial<ModuleData>) => void;
}

export default function ModuleEditor({ module, onChange }: ModuleEditorProps) {
  const updateItem = (index: number, fieldData: any) => {
    const newItems = [...(module.items || [])];
    newItems[index] = { ...newItems[index], ...fieldData };
    onChange({ items: newItems });
  };

  const addItem = (defaultObj: any) => {
    onChange({ items: [...(module.items || []), defaultObj] });
  };

  const removeItem = (index: number) => {
    onChange({ items: (module.items || []).filter((_, i) => i !== index) });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...(module.items || [])];
    const newPos = direction === 'up' ? index - 1 : index + 1;
    if (newPos < 0 || newPos >= newItems.length) return;
    [newItems[index], newItems[newPos]] = [newItems[newPos], newItems[index]];
    onChange({ items: newItems });
  };

  const renderItemEditor = () => {
    switch (module.type) {
      case 'Stats':
        return (
          <div className="space-y-4">
            {(module.items || []).map((item: any, i: number) => (
              <div key={i} className="flex gap-4 items-end bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">數據標籤 (Label)</label>
                    <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                      value={item.label || ''} onChange={(e) => updateItem(i, { label: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">數值 (Value)</label>
                    <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none text-primary font-bold" 
                      value={item.value || ''} onChange={(e) => updateItem(i, { value: e.target.value })} />
                  </div>
                </div>
                <button onClick={() => removeItem(i)} className="p-2 text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              </div>
            ))}
            <button onClick={() => addItem({ label: '新數據', value: '100+' })} className="w-full py-3 border-2 border-dashed border-white/5 rounded-2xl text-xs font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all">+ 新增數據項</button>
          </div>
        );
      case 'Features':
      case 'Timeline':
        return (
          <div className="space-y-4">
            {(module.items || []).map((item: any, i: number) => (
              <div key={i} className="space-y-4 bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group">
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem(i, 'up')} className="p-2 bg-black/40 rounded-lg text-white/40 hover:text-white"><MoveUp size={14}/></button>
                  <button onClick={() => moveItem(i, 'down')} className="p-2 bg-black/40 rounded-lg text-white/40 hover:text-white"><MoveDown size={14}/></button>
                  <button onClick={() => removeItem(i)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">標題 (Title/Year)</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-primary outline-none" 
                    value={item.title || ''} onChange={(e) => updateItem(i, { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">描述內容 (Description)</label>
                  <textarea rows={2} className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-primary outline-none" 
                    value={item.description || ''} onChange={(e) => updateItem(i, { description: e.target.value })} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem({ title: '新項目', description: '描述文字內容...' })} className="w-full py-4 border-2 border-dashed border-white/5 rounded-[2rem] text-xs font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all">+ 新增功能/時序項</button>
          </div>
        );
      case 'FacultyGrid':
        return (
          <div className="space-y-4">
            {(module.items || []).map((item: any, i: number) => (
              <div key={i} className="space-y-4 bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group">
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem(i, 'up')} className="p-2 bg-black/40 rounded-lg text-white/40 hover:text-white"><MoveUp size={14}/></button>
                  <button onClick={() => moveItem(i, 'down')} className="p-2 bg-black/40 rounded-lg text-white/40 hover:text-white"><MoveDown size={14}/></button>
                  <button onClick={() => removeItem(i)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">專家姓名</label>
                    <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                      value={item.name || ''} onChange={(e) => updateItem(i, { name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">職稱/頭銜</label>
                    <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                      value={item.title || ''} onChange={(e) => updateItem(i, { title: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">大頭照 URL</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                    value={item.image || ''} onChange={(e) => updateItem(i, { image: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">個人簡介 (Bio)</label>
                  <textarea rows={2} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                    value={item.bio || ''} onChange={(e) => updateItem(i, { bio: e.target.value })} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem({ name: '新專家', title: '認證導師', bio: '簡介文字...', image: '' })} className="w-full py-4 border-2 border-dashed border-white/5 rounded-[2rem] text-xs font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all">+ 新增團隊成員</button>
          </div>
        );
      case 'LogoCloud':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(module.items || []).map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                   <input className="bg-transparent text-[10px] font-black text-white outline-none focus:text-primary" 
                     value={typeof item === 'string' ? item : item.name} 
                     onChange={(e) => updateItem(i, typeof item === 'string' ? e.target.value : { name: e.target.value })} />
                   <button onClick={() => removeItem(i)} className="text-white/20 hover:text-red-500"><Trash2 size={10}/></button>
                </div>
              ))}
            </div>
            <button onClick={() => addItem('NEW PARTNER')} className="w-full py-3 border-2 border-dashed border-white/5 rounded-2xl text-xs font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all">+ 新增合作組織</button>
          </div>
        );
      case 'ImageTextGrid':
        return (
          <div className="space-y-4">
            {(module.items || []).map((item: any, i: number) => (
              <div key={i} className="space-y-4 bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group">
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem(i, 'up')} className="p-2 bg-black/40 rounded-lg text-white/40 hover:text-white"><MoveUp size={14}/></button>
                  <button onClick={() => moveItem(i, 'down')} className="p-2 bg-black/40 rounded-lg text-white/40 hover:text-white"><MoveDown size={14}/></button>
                  <button onClick={() => removeItem(i)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">區塊標題</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                    value={item.title || ''} onChange={(e) => updateItem(i, { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">圖片 URL</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                    value={item.image || ''} onChange={(e) => updateItem(i, { image: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">描述內容</label>
                  <textarea rows={2} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none" 
                    value={item.description || ''} onChange={(e) => updateItem(i, { description: e.target.value })} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem({ title: '新圖文區塊', description: '描述文字...', image: '' })} className="w-full py-4 border-2 border-dashed border-white/5 rounded-[2rem] text-xs font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all">+ 新增圖文內容</button>
          </div>
        );
      case 'PricingGrid':
        return (
          <div className="space-y-4">
            {(module.items || []).map((item: any, i: number) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group">
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => removeItem(i)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/></button>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">方案標題</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:border-primary outline-none" 
                    value={item.title || ''} onChange={(e) => updateItem(i, { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">價格 (Price)</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-sm text-primary font-black focus:border-primary outline-none" 
                    value={item.price || ''} onChange={(e) => updateItem(i, { price: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">簡短描述</label>
                  <input className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3 text-sm focus:border-primary outline-none" 
                    value={item.description || ''} onChange={(e) => updateItem(i, { description: e.target.value })} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem({ title: '新方案', price: 'NT$ 0', description: '方案說明' })} className="w-full py-4 border-2 border-dashed border-white/5 rounded-[2rem] text-xs font-black text-white/20 hover:border-primary/40 hover:text-primary transition-all">+ 新增報價方案</button>
          </div>
        );
      default:
        return (
          <div className="p-8 border-2 border-dashed border-white/5 rounded-[2rem] text-center">
            <p className="text-xs font-black text-white/20 uppercase tracking-widest">此類型模組無需子項編輯，或目前不支援子項動態新增</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-10">
      {/* Visibility & Draft Controls */}
      <div className="flex items-center justify-between p-6 bg-primary/5 border border-primary/20 rounded-3xl">
        <div className="flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", module.isHidden ? "bg-amber-500/10 text-amber-500" : "bg-green-500/10 text-green-500")}>
            {module.isHidden ? <EyeOff size={20}/> : <Eye size={20}/>}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">狀態：{module.isHidden ? '草稿 / 隱藏' : '已發佈 / 可見'}</p>
            <h4 className="text-sm font-black uppercase tracking-tighter">顯示設定 (Visibility)</h4>
          </div>
        </div>
        <button 
          onClick={() => onChange({ isHidden: !module.isHidden })}
          className={cn(
            "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all shadow-xl",
            module.isHidden ? "bg-amber-500 text-white" : "bg-white text-dark"
          )}
        >
          {module.isHidden ? '還原為可見' : '切換為草稿'}
        </button>
      </div>

      {/* Advanced Styling (Hero Slider specific) */}
      {module.type === 'HeroSlider' && (
        <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">進階樣式控制 (Styling)</h4>
            <div className="text-[10px] font-black text-primary uppercase">Opacity: {Math.round((module.overlayOpacity ?? 1) * 100)}%</div>
          </div>
          <div className="space-y-4">
            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">文字對比度 (Overlay Opacity)</label>
            <input 
              type="range" min="0" max="1" step="0.05"
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              value={module.overlayOpacity ?? 1}
              onChange={(e) => onChange({ overlayOpacity: parseFloat(e.target.value) })}
            />
            <div className="flex justify-between text-[8px] font-black text-white/10">
              <span>LIGHT TEXT</span>
              <span>READABLE (DARK)</span>
            </div>
          </div>
        </div>
      )}

      {/* Primary Content Editor */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
              <Type size={12}/> 主標題 (Title)
            </label>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:border-primary outline-none transition-all" 
              value={module.title || ''} 
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
              <Type size={12}/> 副標題/導言 (Subtitle)
            </label>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary outline-none transition-all" 
              value={module.subtitle || ''} 
              onChange={(e) => onChange({ subtitle: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
            <List size={12}/> 描述內容 (Content)
          </label>
          <textarea 
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-base text-white/60 focus:border-primary outline-none transition-all"
            value={module.content || ''}
            onChange={(e) => onChange({ content: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={12}/> 背景/裝飾圖片 URL
            </label>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-primary outline-none transition-all" 
              value={module.image || ''} 
              onChange={(e) => onChange({ image: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
              <Layout size={12}/> 背景風格 (Background Style)
            </label>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-primary outline-none appearance-none"
              value={module.background || 'white'}
              onChange={(e) => onChange({ background: e.target.value as any })}
            >
              <option value="white" className="bg-[#1A252B]">亮色白底 (White)</option>
              <option value="dark" className="bg-[#1A252B]">深色霧面 (Dark)</option>
              <option value="primary-light" className="bg-[#1A252B]">主調粉藍 (Primary Light)</option>
              <option value="slate" className="bg-[#1A252B]">岩灰色調 (Slate)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Items Editor */}
      <div className="pt-10 border-t border-white/5">
        <div className="flex items-center gap-3 mb-8">
          <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em]">子項目資料編輯器</h3>
          <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-white/20 uppercase tracking-widest">
            {module.type} Data Schema
          </span>
        </div>
        {renderItemEditor()}
      </div>
    </div>
  );
}
