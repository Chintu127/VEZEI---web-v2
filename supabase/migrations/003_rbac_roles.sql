-- VEZEI Platform Database Migration 003: RBAC Roles & System Permissions
-- Roles: super_admin, main_admin, developer_1, developer_2, developer_3, student

-- 1. Create User Role Enum
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM (
        'super_admin',
        'main_admin',
        'developer_1',
        'developer_2',
        'developer_3',
        'student'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. User Roles Association Table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role_enum NOT NULL DEFAULT 'student',
    assigned_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

-- 3. System Permissions Definition Table
CREATE TABLE IF NOT EXISTS public.system_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Seed System Permissions
INSERT INTO public.system_permissions (code, category, description)
VALUES
    ('platform.view', 'Platform', 'View platform-wide health & system status'),
    ('platform.configure', 'Platform', 'Modify global platform configuration & maintenance mode'),
    ('users.view', 'Users', 'View student & admin user directory'),
    ('users.manage', 'Users', 'Manage users and account statuses'),
    ('roles.view', 'RBAC', 'View roles and permission matrices'),
    ('roles.assign', 'RBAC', 'Assign or revoke administrative and developer roles'),
    ('exams.view', 'Academic', 'View competitive exam catalog'),
    ('exams.manage', 'Academic', 'Create, edit, or configure exams & marking rules'),
    ('content.view', 'Academic', 'View syllabus, lessons, and question repository'),
    ('content.edit', 'Academic', 'Draft or modify questions and lesson modules'),
    ('content.publish', 'Academic', 'Review, approve and publish verified questions'),
    ('analytics.view', 'Analytics', 'View operational and learning telemetry'),
    ('audit.view', 'Security', 'Inspect security audit logs and privileged events'),
    ('developer.tasks.view', 'Engineering', 'View engineering tasks & issue boards'),
    ('developer.tasks.manage', 'Engineering', 'Manage and update sprint tasks'),
    ('diagnostics.view', 'Engineering', 'Access sanitized API and database error diagnostics'),
    ('qa.execute', 'QA', 'Execute automated test suites and validation runs'),
    ('security.review', 'Security', 'Conduct incident reviews and access policy checks')
ON CONFLICT (code) DO NOTHING;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_permissions ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for user_roles
CREATE POLICY "Users can view their own role assignments"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Super Admins can view all role assignments"
    ON public.user_roles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'
        )
    );

CREATE POLICY "Super Admins can insert/update role assignments"
    ON public.user_roles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'
        )
    );

-- 6. RLS Policies for system_permissions
CREATE POLICY "Authenticated users can view permissions dictionary"
    ON public.system_permissions FOR SELECT
    TO authenticated
    USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
