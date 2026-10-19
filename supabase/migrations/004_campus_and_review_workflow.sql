-- VEZEI Platform Database Migration 004: Campus Inquiries, Content Review Workflow & Exam Wave Taxonomy

-- 1. Create Campus Inquiries Table
CREATE TABLE IF NOT EXISTS public.campus_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    college_institution TEXT NOT NULL,
    role_type TEXT DEFAULT 'student' CHECK (role_type IN ('student', 'faculty', 'club_lead', 'administrator', 'other')),
    inquiry_type TEXT DEFAULT 'campus_launch' CHECK (inquiry_type IN ('campus_launch', 'ambassador', 'diagnostic_test', 'institutional_access', 'general')),
    target_exams TEXT[] DEFAULT '{}',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on campus_inquiries
ALTER TABLE public.campus_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a campus inquiry
CREATE POLICY "Public can insert campus inquiries"
    ON public.campus_inquiries FOR INSERT
    WITH CHECK (true);

-- Only admins can view and manage campus inquiries
CREATE POLICY "Admins can view campus inquiries"
    ON public.campus_inquiries FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'main_admin')
        )
    );

CREATE POLICY "Admins can update campus inquiries"
    ON public.campus_inquiries FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'main_admin')
        )
    );

-- 2. Add Wave & Rights Verification Columns to Exams Table if not exists
DO $$ BEGIN
    ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS launch_wave TEXT DEFAULT 'wave_1' CHECK (launch_wave IN ('wave_1', 'wave_2', 'wave_3', 'wave_4'));
    ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS verified_rights BOOLEAN DEFAULT FALSE;
    ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS expert_reviewer TEXT;
    ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS readiness_status TEXT DEFAULT 'in_preparation' CHECK (readiness_status IN ('available', 'in_preparation', 'planned'));
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Update existing exams with Wave and Readiness status matching booklet & project overview
UPDATE public.exams SET 
    launch_wave = 'wave_1', 
    readiness_status = 'available', 
    verified_rights = TRUE, 
    expert_reviewer = 'VEZEI Academic Council'
WHERE slug = 'cat';

UPDATE public.exams SET 
    launch_wave = 'wave_2', 
    readiness_status = 'in_preparation', 
    verified_rights = TRUE
WHERE slug IN ('gmat', 'gre');

UPDATE public.exams SET 
    launch_wave = 'wave_3', 
    readiness_status = 'planned'
WHERE slug IN ('sat', 'ielts');

UPDATE public.exams SET 
    launch_wave = 'wave_4', 
    readiness_status = 'planned'
WHERE slug IN ('gate-cs', 'jee-adv', 'neet-ug');

-- 3. Content Review Workflow Table
CREATE TABLE IF NOT EXISTS public.content_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
    exam_id TEXT REFERENCES public.exams(id) ON DELETE CASCADE,
    stage TEXT NOT NULL DEFAULT 'draft' CHECK (stage IN ('draft', 'expert_review', 'approved', 'published')),
    reviewer_id UUID REFERENCES auth.users(id),
    reviewer_notes TEXT,
    accuracy_confirmed BOOLEAN DEFAULT FALSE,
    explanation_clear BOOLEAN DEFAULT FALSE,
    rights_cleared BOOLEAN DEFAULT FALSE,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.content_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and reviewers can view content reviews"
    ON public.content_reviews FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role IN ('super_admin', 'main_admin', 'developer_1', 'developer_2', 'developer_3')
        )
    );
