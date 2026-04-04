'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Download, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Receipt,
  FileCheck
} from 'lucide-react';

export default function OrdersPage() {
  const transactions = [
    { 
      id: 'TRX-9482', 
      title: '2026 年度專業會員年費', 
      amount: '$1,500', 
      date: '2026/01/15', 
      status: 'paid',
      type: 'Membership'
    },
    { 
      id: 'TRX-8231', 
      title: 'EFT Core Skills Module 1', 
      amount: '$4,200', 
      date: '2025/12/05', 
      status: 'paid',
      type: 'Course'
    },
    { 
      id: 'TRX-7710', 
      title: '個別督導時數 (2小時)', 
      amount: '$3,000', 
      date: '2025/11/20', 
      status: 'paid',
      type: 'Supervision'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-white tracking-tight">訂單與繳費記錄</h1>
           <p className="text-white/40 mt-2 font-medium uppercase tracking-widest text-[10px]">Payment History & Subscriptions</p>
        </div>
        
        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
           <Download size={18} />
           下載全年度報稅憑證
        </button>
      </div>

      {/* Subscription Card */}
      <div className="p-10 bg-primary/5 border border-primary/20 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <Receipt size={140} />
         </div>
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
               <CreditCard size={32} />
            </div>
            <div className="space-y-1">
               <h3 className="text-2xl font-bold text-white tracking-tight">專業會員（年繳制）</h3>
               <p className="text-white/40 text-sm">目前的會籍狀態為：**正常運行**。下次續約日期：2027/01/15</p>
            </div>
         </div>
         <div className="flex items-center gap-4 relative z-10 w-full lg:w-auto">
            <button className="flex-grow lg:flex-grow-0 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 text-sm font-bold">變更扣款方式</button>
            <button className="flex-grow lg:flex-grow-0 px-8 py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary/20">立即續約</button>
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between px-4">
            <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest">歷史交易明細</h3>
            <span className="text-[10px] text-white/20 font-bold">顯示最近 10 筆記錄</span>
         </div>

         <div className="space-y-3">
            {transactions.map((trx, i) => (
              <motion.div
                key={trx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-white/[0.08] transition-all flex flex-col md:flex-row items-center justify-between gap-6 group"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      {trx.type === 'Membership' ? <FileCheck size={24} /> : <CreditCard size={24} />}
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{trx.id}</p>
                      <h4 className="font-bold text-white">{trx.title}</h4>
                      <p className="text-xs text-white/30">{trx.date}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-12">
                   <div className="text-right">
                      <p className="text-xl font-black text-white">{trx.amount}</p>
                      <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">正式收據已開立</span>
                   </div>
                   <button className="p-4 bg-white/5 rounded-2xl text-white/20 hover:text-white hover:bg-white/10 transition-all">
                      <ExternalLink size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
