'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { supabaseConfig } from '@/lib/supabase/config';
import { LayoutDashboard, CheckCircle2, XCircle, AlertTriangle, Database, Lock, Key, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SupabaseDebugPage() {
  const [status, setStatus] = useState<{
    config: { ok: boolean; message: string; details: any };
    auth: { ok: boolean; message: string; details: any };
    db: { ok: boolean; message: string; details: any };
  }>({
    config: { ok: false, message: '正在檢查配置...', details: null },
    auth: { ok: false, message: '等待配置檢查...', details: null },
    db: { ok: false, message: '等待 Auth 檢查...', details: null },
  });

  const runDiagnostics = async () => {
    // 1. Check Config
    const url = supabaseConfig.url;
    const key = supabaseConfig.anonKey;
    const isUrlWrong = url?.includes('/rest/v1');
    
    const configOk = !!url && !!key && !isUrlWrong;
    let configMsg = '✅ 配置正常';
    if (!url || !key) configMsg = '❌ 缺少環境變數 (NEXT_PUBLIC_SUPABASE_URL 或 ANON_KEY)';
    if (isUrlWrong) configMsg = '⚠️ URL 格式錯誤：不應包含 /rest/v1/';

    setStatus(prev => ({
      ...prev,
      config: { 
        ok: configOk, 
        message: configMsg, 
        details: { 
          url: url ? `${url.substring(0, 20)}...` : 'MISSING',
          key: key ? `${key.substring(0, 10)}...${key.substring(key.length - 5)}` : 'MISSING',
          urlValid: !isUrlWrong
        }
      }
    }));

    if (!configOk) return;

    // 2. Check Auth Service
    try {
      const { data, error } = await supabase!.auth.getSession();
      if (error) throw error;
      setStatus(prev => ({
        ...prev,
        auth: { ok: true, message: '✅ Auth 服務連線正常', details: data }
      }));
    } catch (err: any) {
      setStatus(prev => ({
        ...prev,
        auth: { ok: false, message: `❌ Auth 服務異常: ${err.message}`, details: err }
      }));
    }

    // 3. Check Database Access
    try {
      // Attempt to read from healthcheck table or a common table
      const { data, error } = await supabase!
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        if (error.message.includes('Database error querying schema')) {
          setStatus(prev => ({
            ...prev,
            db: { ok: false, message: '❌ 資料庫 Schema 異常 (500 Error)，請重啟 Supabase 專案', details: error }
          }));
        } else {
          setStatus(prev => ({
            ...prev,
            db: { ok: false, message: `❌ 資料庫存取異常: ${error.message}`, details: error }
          }));
        }
      } else {
        setStatus(prev => ({
          ...prev,
          db: { ok: true, message: '✅ 資料庫連線正常 (Profiles 表可存取)', details: data }
        }));
      }
    } catch (err: any) {
      setStatus(prev => ({
        ...prev,
        db: { ok: false, message: `❌ 資料庫連線崩潰: ${err.message}`, details: err }
      }));
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-indigo-500/20 rounded-2xl">
            <LayoutDashboard className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Supabase 診斷面板</h1>
            <p className="text-slate-400">即時檢測連線狀態、環境變數與資料庫權限</p>
          </div>
        </header>

        <div className="grid gap-6">
          {/* Config Card */}
          <StatusCard 
            title="環境變數配置" 
            icon={<Globe className="w-5 h-5" />} 
            status={status.config} 
          />

          {/* Auth Card */}
          <StatusCard 
            title="Auth 服務狀態" 
            icon={<Lock className="w-5 h-5" />} 
            status={status.auth} 
          />

          {/* DB Card */}
          <StatusCard 
            title="資料庫 (PostgREST)" 
            icon={<Database className="w-5 h-5" />} 
            status={status.db} 
          />
        </div>

        <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            疑難排解指引
          </h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>• 如果出現 <strong>500 Database error querying schema</strong>，請到 Supabase Dashboard 執行 <strong>Restart Project</strong>。</li>
            <li>• 如果 URL 包含 <code>/rest/v1</code>，請在 Vercel 中修正 <code>NEXT_PUBLIC_SUPABASE_URL</code>。</li>
            <li>• 如果 Auth 正常但 DB 報錯，請檢查資料表的 **RLS Policies**。</li>
          </ul>
          <button 
            onClick={runDiagnostics}
            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
          >
            重新執行診斷
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ title, icon, status }: { title: string; icon: any; status: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border transition-all ${
        status.ok ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${status.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className={`text-sm mt-1 ${status.ok ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
              {status.message}
            </p>
          </div>
        </div>
        {status.ok ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <XCircle className="w-6 h-6 text-rose-500" />}
      </div>
      
      {status.details && (
        <pre className="mt-4 p-4 bg-black/30 rounded-xl text-xs overflow-auto max-h-32 text-slate-400 border border-white/5 font-mono">
          {JSON.stringify(status.details, null, 2)}
        </pre>
      )}
    </motion.div>
  );
}
