'use client';

import React from 'react';
import { CheckCircle2, XCircle, Eye, User, MapPin, Award, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface ReviewQueueProps {
  pendingUsers: any[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ReviewQueue({ pendingUsers, onApprove, onReject }: ReviewQueueProps) {
  if (!pendingUsers || pendingUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white/5 border border-white/5 rounded-[3.5rem] border-dashed">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/10">
          <Clock size={40} />
        </div>
        <h3 className="text-xl font-black text-white/20 uppercase tracking-widest">目前沒有待審核項目</h3>
        <p className="text-xs text-white/5 font-bold mt-2">所有的入會申請都已處理完畢。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-black tracking-tight">待審核隊列</h2>
          <p className="text-white/30 font-bold mt-2 font-mono text-[10px] uppercase tracking-[0.3em]">
            Review Queue • {pendingUsers.length} PENDING APPLICATIONS
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {pendingUsers.map((user) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-8 bg-white/5 border border-white/5 rounded-[3rem] group hover:border-primary/40 transition-all flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-8 flex-grow">
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary relative overflow-hidden">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-2xl font-black">{user.full_name || '未命名申請者'}</h4>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[9px] font-black rounded-lg uppercase tracking-widest">
                      {user.membership_type || '一般會員'} 申請
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[10px] font-black text-white/30 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><MapPin size={12}/> {user.region || '台灣'}</span>
                    <span className="flex items-center gap-1.5"><Award size={12}/> {user.certification_level || '無認證'}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12}/> {new Date(user.created_at).toLocaleDateString()} 提交</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onApprove(user.id)}
                  className="px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={16}/> 批准入會
                </button>
                <button 
                  onClick={() => onReject(user.id)}
                  className="px-8 py-4 bg-white/5 text-white/30 border border-white/5 rounded-2xl text-[11px] font-black hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <XCircle size={16}/> 駁回
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
