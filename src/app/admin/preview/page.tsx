'use client';

import React, { useEffect, useState } from 'react';
import { ModuleRenderer, type ModuleData } from '@/components/ModuleRenderer';

export default function AdminPreviewPage() {
  const [modules, setModules] = useState<ModuleData[]>([]);

  useEffect(() => {
    // Listen for data from the parent admin dashboard
    const handleMessage = (event: MessageEvent) => {
      // Security: In a real app, check event.origin
      if (event.data.type === 'UPDATE_CMS_PREVIEW') {
        setModules(event.data.modules);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Check localStorage for initial load
    const saved = localStorage.getItem('cms_preview_data');
    if (saved) {
      try { setModules(JSON.parse(saved)); } catch (e) {}
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Mock Header for Context */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center px-10 shrink-0">
        <div className="w-32 h-6 bg-gray-100 rounded-lg animate-pulse" />
        <div className="ml-auto flex gap-6">
          <div className="w-16 h-3 bg-gray-50 rounded" />
          <div className="w-16 h-3 bg-gray-50 rounded" />
        </div>
      </header>

      <main className="flex-grow">
        <ModuleRenderer modules={modules} isAdmin={false} />
      </main>

      {/* Mock Footer for Context */}
      <footer className="py-20 bg-dark text-white/20 text-center text-[10px] tracking-widest font-black uppercase">
        &copy; {new Date().getFullYear()} TWEFT ASSOCIATION ARCHIVE
      </footer>
    </div>
  );
}
