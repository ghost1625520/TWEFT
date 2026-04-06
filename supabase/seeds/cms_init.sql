-- 1. Create the CMS Pages Table
CREATE TABLE IF NOT EXISTS public.cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL, -- e.g., 'home', 'about', 'news'
    title TEXT NOT NULL,
    modules JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT false,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_by UUID REFERENCES auth.users(id)
);

-- 2. Seed the Database with "Current Page" Content (Extracted from src/app/page.tsx)
-- This allows the Admin Dashboard to "Edit based on current content"
INSERT INTO public.cms_pages (slug, title, modules, is_published)
VALUES (
    'home', 
    '首頁', 
    '[
        {
            "id": "hero-1",
            "type": "HeroSlider",
            "title": "建立深層連結，重塑依附關係",
            "subtitle": "Emotionally Focused Therapy",
            "content": "我們是「臺灣EFT治療學會」，致力於推廣情緒焦點治療 (EFT)，協助治療師與大眾建立更安全、更親密的關係。",
            "image": "https://images.unsplash.com/photo-1573497620053-ea5310f94a17?auto=format&fit=crop&q=80&w=1000",
            "background": "dark"
        },
        {
            "id": "stats-1",
            "type": "Stats",
            "items": [
                {"label": "認證會員", "value": "500+"},
                {"label": "國際督導", "value": "20+"},
                {"label": "年度課程", "value": "100+"}
            ]
        },
        {
            "id": "features-1",
            "type": "Features",
            "items": [
                {"title": "專業課程", "description": "從初階到進階的完整認證體系", "href": "/courses"},
                {"title": "國際認證心理師", "description": "媒合最受專業認證的 EFT 治療師", "href": "/find-therapist"},
                {"title": "認證路徑", "description": "邁向國際認證治療師的必經之路", "href": "/certification"}
            ]
        },
        {
            "id": "pricing-1",
            "type": "PricingGrid",
            "title": "即將開課",
            "items": [
                {"title": "EFT 伴侶治療國際認證：初階", "price": "NT$ 28,000", "description": "2024/05/20 - 05/23"},
                {"title": "情緒焦點個人治療 (EFIT)：一階課程", "price": "NT$ 25,000", "description": "2024/07/08 - 07/11"}
            ]
        }
    ]'::jsonb,
    true
)
ON CONFLICT (slug) DO UPDATE 
SET modules = EXCLUDED.modules, 
    title = EXCLUDED.title, 
    is_published = EXCLUDED.is_published;

-- 3. Seed Resources Page
INSERT INTO public.cms_pages (slug, title, modules, is_published)
VALUES (
    'resources', 
    '專業資源庫', 
    '[
        {
            "id": "hero-res",
            "type": "Hero",
            "title": "專業資源庫",
            "subtitle": "Professional Resources",
            "content": "匯集全球 EFT 臨床實務與學術研究資源。無論是諮商師的專業進修，或是對心理學有興趣的讀者，都能在此找到權威、深度的學習素材。",
            "background": "slate"
        },
        {
            "id": "res-grid",
            "type": "Features",
            "title": "最新文獻與工具",
            "items": [
                {
                    "title": "EFT 治療核心成效研究綜述 (2024 更新版)",
                    "description": "學術論文 | 1.2 MB | 2024/02/10",
                    "isPremium": false
                },
                {
                    "title": "第一階段深度介入技術演示：修復負面循環",
                    "description": "臨床影音 | 45 mins | 2023/11/25",
                    "isPremium": true
                },
                {
                    "title": "伴侶諮商初次會談評估量表 (中文版)",
                    "description": "工具清單 | 450 KB | 2023/09/12",
                    "isPremium": false
                }
            ]
        }
    ]'::jsonb,
    true
)
ON CONFLICT (slug) DO UPDATE 
SET modules = EXCLUDED.modules, 
    title = EXCLUDED.title, 
    is_published = EXCLUDED.is_published;
