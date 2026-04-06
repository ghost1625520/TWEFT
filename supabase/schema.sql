-- 1. Profiles (RBAC Extension)
-- Note: Middleware and AuthContext already use 'role' from profiles
-- This adds missing fields for membership management
ALTER TABLE IF EXISTS public.profiles 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending', -- Pending, Verified, Suspended
ADD COLUMN IF NOT EXISTS permissions TEXT[] DEFAULT '{}';

-- 2. News/Announcements
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT '活動公告',
    content TEXT,
    author TEXT DEFAULT 'Secretary',
    publish_date DATE DEFAULT current_date,
    is_featured BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Courses (Full Syllabus for LMS/Registration)
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Core Training', 'Specialized'
    price TEXT NOT NULL, -- e.g., 'NT$ 28,000'
    status TEXT DEFAULT 'Active', -- Active, Draft, Archived
    syllabus JSONB DEFAULT '[]'::jsonb, -- Array of strings or {stage: string, content: string}
    enrollment_deadline DATE,
    start_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Resources (Downloads)
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT '專業文獻',
    file_url TEXT NOT NULL,
    file_type TEXT, -- pdf, zip, etc.
    access_level TEXT DEFAULT 'Member', -- Guest, Member, Professional, Certified
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Orders & Payments
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    item_type TEXT NOT NULL, -- 'Course' or 'Membership'
    item_id UUID NOT NULL, -- ID of course or membership level
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'Pending', -- Pending, Paid, Cancelled, Refunded
    payment_method TEXT, -- Stripe, Bank Transfer
    payment_proof_url TEXT, -- For bank transfer screenshots
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
