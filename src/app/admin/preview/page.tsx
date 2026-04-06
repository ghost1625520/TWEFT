'use client';

import React, { useEffect, useState } from 'react';
import { ModuleRenderer, type ModuleData } from '@/components/ModuleRenderer';

export default function AdminPreviewPage() {
  const [modules, setModules] = useState<ModuleData[]>([]);

  useEffect(() => {
    // 1. Listen for data updates from parent
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'UPDATE_CMS_PREVIEW') {
        setModules(event.data.modules);
      }
    };
    window.addEventListener('message', handleMessage);
    
    // 2. Report actual content height to parent (Eliminate clipping)
    const resizeObserver = new ResizeObserver(() => {
      window.parent.postMessage({ 
        type: 'IFRAME_RESIZE', 
        height: document.body.scrollHeight 
      }, '*');
    });
    resizeObserver.observe(document.body);

    // Initial check for localStorage fallback
    const saved = localStorage.getItem('cms_preview_data');
    if (saved) { try { setModules(JSON.parse(saved)); } catch (e) {} }

    return () => {
      window.removeEventListener('message', handleMessage);
      resizeObserver.disconnect();
    };
  }, []);

  const handleSelectModule = (id: string | number) => {
    window.parent.postMessage({ type: 'SELECT_MODULE', id }, '*');
  };

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
        <ModuleRenderer 
           modules={modules} 
           isAdmin={true} 
           onSelect={handleSelectModule}
        />
      </main>

      {/* Mock Footer for Context */}
      <footer className="py-20 bg-dark text-white/20 text-center text-[10px] tracking-widest font-black uppercase">
        &copy; {new Date().getFullYear()} TWEFT ASSOCIATION ARCHIVE
      </footer>
    </div>
  );
}
