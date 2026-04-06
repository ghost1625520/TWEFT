import { createClient } from '@supabase/supabase-js';

// MOCK SEED DATA FOR TWEFT ADMIN v9.0
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🌱 Starting Mock Seed...');

  // 1. Seed Pending Users (for Review Queue)
  const mockProfiles = [
    { id: 'mock-u1', full_name: '張書平', role: 'Member', status: 'pending', membership_type: '專業會員', region: '台北市', certification_level: 'ICEEFT Externship', created_at: new Date().toISOString() },
    { id: 'mock-u2', full_name: '李艾倫', role: 'Member', status: 'pending', membership_type: '學生會員', region: '台中市', certification_level: '無', created_at: new Date().toISOString() },
    { id: 'mock-u3', full_name: '陳美玲', role: 'Member', status: 'pending', membership_type: '專業會員', region: '高雄市', certification_level: 'ICEEFT Certified', created_at: new Date().toISOString() }
  ];

  const { error: uErr } = await supabase.from('profiles').upsert(mockProfiles);
  if (uErr) console.error('Error seeding profiles:', uErr);
  else console.log('✅ Mock Profiles Seeded');

  // 2. Seed News
  const mockNews = [
    { title: '2024 春季中階培訓工作坊報名中', date: '2024-04-10', category: '課程公告', content: '本次工作坊由劉婷老師親自領軍...' },
    { title: '最新 EFT 伴侶治療文獻中譯本發布', date: '2024-03-25', category: '學術資源', content: '收錄於下載專區，歡迎會員下載。' }
  ];
  const { error: nErr } = await supabase.from('news').upsert(mockNews);
  if (nErr) console.error('Error seeding news:', nErr);
  else console.log('✅ Mock News Seeded');

  // 3. Seed Courses
  const mockCourses = [
    { title: 'EFT 基礎認證課程 (Externship)', category: '認證培訓', price: 'NT$ 18,000', description: '為期四天的密集成長課程。' }
  ];
  const { error: cErr } = await supabase.from('courses').upsert(mockCourses);
  if (cErr) console.error('Error seeding courses:', cErr);
  else console.log('✅ Mock Courses Seeded');

  // 4. Seed Orders
  const mockOrders = [
    { user_name: '測試帳號 A', amount: '12,000', status: 'pending', created_at: new Date().toISOString() },
    { user_name: '測試帳號 B', amount: '8,000', status: 'approved', created_at: new Date().toISOString() }
  ];
  const { error: oErr } = await supabase.from('orders').upsert(mockOrders);
  if (oErr) console.error('Error seeding orders:', oErr);
  else console.log('✅ Mock Orders Seeded');

  console.log('🌿 Seed Process Finished');
}

seed();
