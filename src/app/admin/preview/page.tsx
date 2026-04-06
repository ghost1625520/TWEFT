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
    <div className="bg-white min-h-screen">
      <ModuleRenderer modules={modules} isAdmin={false} />
    </div>
  );
}
