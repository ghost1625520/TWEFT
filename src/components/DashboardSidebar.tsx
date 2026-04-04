'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  UserCircle, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  CreditCard,
  LogOut,
  ChevronRight,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DashboardSidebar() {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { 
      label: '總覽', 
      icon: LayoutDashboard, 
      href: '/portal/dashboard',
      roles: ['Guest', 'Member', 'Professional', 'Certified', 'Instructor', 'Editor', 'Staff', 'Admin']
    },
    { 
      label: '我的課程', 
      icon: BookOpen, 
      href: '/portal/dashboard/courses',
      roles: ['Member', 'Professional', 'Certified', 'Instructor']
    },
    { 
      label: '訂單記錄', 
      icon: CreditCard, 
      href: '/portal/dashboard/orders',
      roles: ['Member', 'Professional', 'Certified', 'Instructor']
    },
    { 
      label: '認證進度', 
      icon: FileCheck, 
      href: '/portal/dashboard/certification',
      roles: ['Professional', 'Certified', 'Instructor']
    },
    { 
      label: '名錄設定', 
      icon: UserCircle, 
      href: '/portal/dashboard/directory-settings',
      roles: ['Professional', 'Certified', 'Instructor']
    },
    { 
      divider: true,
      roles: ['Editor', 'Staff', 'Admin']
    },
    { 
      label: '後台首頁', 
      icon: ShieldCheck, 
      href: '/admin',
      roles: ['Editor', 'Staff', 'Admin']
    },
    { 
      label: '內容管理 (CMS)', 
      icon: Globe, 
      href: '/admin/cms',
      roles: ['Editor', 'Admin']
    },
    { 
      label: '帳號設定', 
      icon: Settings, 
      href: '/portal/dashboard/settings',
      roles: ['Guest', 'Member', 'Professional', 'Certified', 'Instructor', 'Editor', 'Staff', 'Admin']
    }
  ];

  const allowedItems = menuItems.filter(item => 
    !item.roles || (profile && item.roles.includes(profile.role))
  );

  return (
    <aside className="w-80 h-full bg-dark border-r border-white/5 flex flex-col pt-32 pb-12 px-6">
      {/* User Info */}
      <div className="mb-12 px-4 py-6 bg-white/5 rounded-[2rem] border border-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <UserCircle size={80} />
         </div>
         <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold">
               {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
            </div>
            <div>
               <h4 className="text-white font-bold leading-none mb-2">{profile?.full_name || '使用者'}</h4>
               <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-bold uppercase tracking-widest">{profile?.role || 'Guest'}</span>
            </div>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2">
         {allowedItems.map((item, i) => {
            if (item.divider) return <div key={i} className="h-px bg-white/5 my-6 mx-4" />;
            const Icon = item.icon!;
            const isActive = pathname === item.href;

            return (
               <Link 
                key={i} 
                href={item.href!}
                className={cn(
                  "flex items-center justify-between group px-6 py-4 rounded-2xl transition-all duration-300",
                  isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
               >
                 <div className="flex items-center gap-4">
                    <Icon size={20} className={cn(isActive ? "text-white" : "group-hover:text-primary transition-colors")} />
                    <span className="font-bold tracking-wide">{item.label}</span>
                 </div>
                 {isActive && (
                    <motion.div layoutId="activeInd" className="text-white">
                       <ChevronRight size={16} />
                    </motion.div>
                 )}
               </Link>
            );
         })}
      </nav>

      {/* Logout */}
      <button 
        onClick={signOut}
        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/30 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
      >
        <LogOut size={20} />
        <span className="font-bold">登出系統</span>
      </button>
    </aside>
  );
}
