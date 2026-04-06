import { type ModuleData } from "@/components/ModuleRenderer";

export const CMS_DEFAULTS: { [key: string]: ModuleData[] } = {
  home: [
    {
      id: "def-home-hero",
      type: "HeroSlider",
      title: "建立深層連結 重塑依附關係",
      subtitle: "Emotionally Focused Therapy",
      content: "我們是「臺灣EFT治療學會」，致力於推廣情緒焦點治療 (EFT)，透過實證研究與專業培訓，協助治療師與大眾建立更安全、更親密的關係。",
      items: ["探索認證課程", "什麼是 EFT？"]
    },
    {
      id: "def-home-features",
      type: "Features",
      title: "專業服務與發展路徑",
      subtitle: "Professional Services",
      content: "提供從初學者到資深治療師的完整職涯規劃",
      items: [
        { icon: "BookOpen", title: "專業課程", desc: "從初階到進階的完整認證體系" },
        { icon: "Users", title: "國際認證心理師", desc: "媒合最受專業認證的 EFT 治療師" },
        { icon: "Award", title: "認證路徑", desc: "邁向國際認證治療師的必經之路" }
      ]
    },
    {
      id: "def-home-stats",
      type: "Stats",
      title: "學會成就指標",
      subtitle: "Our Milestones",
      items: [
        { label: "認證會員", value: "500+" },
        { label: "國際督導", value: "20+" },
        { label: "年度課程", value: "100+" }
      ]
    }
  ],
  resources: [
    {
      id: "def-res-hero",
      type: "HeroSlider",
      title: "專業資源庫",
      subtitle: "Professional Resources",
      content: "匯集全球 EFT 臨床實務與學術研究資源。無論是諮商師的專業進修，或是對心理學有興趣的讀者，都能在此找到權威、深度的學習素材。"
    },
    {
       id: "def-res-files",
       type: "Features",
       title: "最新學術文獻",
       items: [
         { title: "EFT 治療核心成效研究綜述 (2024 更新版)", category: "學術論文", type: "PDF" },
         { title: "第一階段深度介入技術演示：修復負面循環", category: "臨床影音", type: "VIDEO" },
         { title: "伴侶諮商初次會談評估量表 (中文版)", category: "工具清單", type: "DOC" }
       ]
    }
  ],
  news: [
    {
      id: "def-news-hero",
      type: "HeroSlider",
      title: "活動公告",
      subtitle: "News & Events",
      content: "掌握臺灣 EFT 治療學會的最新動向、課程資訊與重要公告。"
    }
  ]
};

export const NEWS_DEFAULTS = [
  {
    type: '公告',
    title: '2026 年度國際導師專題演講：EFT 在數位時代的挑戰',
    date: '2026/04/10',
    description: '本次專題演講將由 ICEEFT 創辦人特別預錄談話，探討線上諮商中情緒連結的維度。',
    tag: '重要'
  },
  {
    type: '課程',
    title: '【熱烈報名中】六月份台北 Externship 基礎訓練名額倒數',
    date: '2026/04/02',
    description: '年度重點認證課程 Externship 目前僅剩個位數名額。',
    tag: '熱門'
  }
];
