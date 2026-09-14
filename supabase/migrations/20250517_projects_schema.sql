-- ============================================================
-- CrossThink — full schema
-- Supabase Dashboard → SQL Editor → paste everything → Run
-- ============================================================

-- ── 1. profiles ───────────────────────────────────────────────
-- Mirrors auth.users so client-side joins work via PostgREST

CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  text,
  email      text,
  role       text,
  university text,
  major      text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read profiles"
  ON public.profiles FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Backfill existing users who signed up before this migration
INSERT INTO public.profiles (id, full_name, email, role, university, major)
SELECT
  au.id,
  au.raw_user_meta_data->>'full_name',
  au.email,
  au.raw_user_meta_data->>'role',
  au.raw_user_meta_data->>'university',
  au.raw_user_meta_data->>'major'
FROM auth.users au
ON CONFLICT (id) DO NOTHING;

-- Auto-create profile on every new signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, university, major)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'role',
    new.raw_user_meta_data->>'university',
    new.raw_user_meta_data->>'major'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── 2. projects ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.projects (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at         timestamptz DEFAULT now(),
  owner_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title              text NOT NULL,
  dept               text,
  description        text,
  tech               text[]  DEFAULT '{}',
  open_roles         jsonb   DEFAULT '[]',
  image_url          text,
  difficulty         text    DEFAULT 'Intermediate',
  duration           text,
  deadline           text,
  team_size_capacity int     DEFAULT 10,
  is_public          boolean DEFAULT true
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public projects readable by everyone"
  ON public.projects FOR SELECT
  USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = owner_id);


-- ── 3. applications ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.applications (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at         timestamptz DEFAULT now(),
  project_id         text NOT NULL,
  -- references profiles so PostgREST can join; null when applied anonymously
  applicant_user_id  uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  name               text NOT NULL,
  email              text NOT NULL,
  role               text,
  major              text,
  tech_stack         text,
  github             text,
  linkedin           text,
  portfolio          text,
  prev_projects      text,
  motivation         text,
  status             text DEFAULT 'pending'
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit
CREATE POLICY "Anyone can submit an application"
  ON public.applications FOR INSERT
  WITH CHECK (true);

-- Project owners can read all applications for their projects
CREATE POLICY "Project owners can view applications"
  ON public.applications FOR SELECT
  USING (
    project_id IN (
      SELECT id::text FROM public.projects WHERE owner_id = auth.uid()
    )
  );

-- Logged-in applicants can see their own
CREATE POLICY "Applicants can view their own applications"
  ON public.applications FOR SELECT
  USING (applicant_user_id = auth.uid());

-- Owners can change status (approve / reject)
CREATE POLICY "Project owners can update application status"
  ON public.applications FOR UPDATE
  USING (
    project_id IN (
      SELECT id::text FROM public.projects WHERE owner_id = auth.uid()
    )
  );

-- Owners can link anonymous applicants once they create an account
CREATE POLICY "Applicants can update their own user_id link"
  ON public.applications FOR UPDATE
  USING (email = (SELECT email FROM public.profiles WHERE id = auth.uid()));


-- ── 4. project_members ────────────────────────────────────────
-- user_id references profiles (not auth.users directly) so
-- PostgREST can auto-join: project_members.select('*, profiles(*)')

CREATE TABLE IF NOT EXISTS public.project_members (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz DEFAULT now(),
  project_id     uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id        uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id uuid REFERENCES public.applications(id) ON DELETE SET NULL,
  role           text,
  UNIQUE (project_id, user_id)
);

ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members and owners can view team"
  ON public.project_members FOR SELECT
  USING (
    user_id = auth.uid() OR
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

CREATE POLICY "Project owners can add members"
  ON public.project_members FOR INSERT
  WITH CHECK (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );

CREATE POLICY "Project owners can remove members"
  ON public.project_members FOR DELETE
  USING (
    project_id IN (SELECT id FROM public.projects WHERE owner_id = auth.uid())
  );


-- ── 5. Storage bucket (run separately if needed) ──────────────
-- Dashboard → Storage → New bucket
--   Name: project-images
--   Public: ON
--
-- Then in SQL Editor run:
--
-- insert into storage.buckets (id, name, public)
-- values ('project-images', 'project-images', true)
-- on conflict (id) do nothing;
--
-- create policy "Public read project images"
--   on storage.objects for select
--   using (bucket_id = 'project-images');
--
-- create policy "Auth users can upload project images"
--   on storage.objects for insert
--   with check (bucket_id = 'project-images' and auth.uid() is not null);
--
-- create policy "Auth users can delete their own project images"
--   on storage.objects for delete
--   using (bucket_id = 'project-images' and auth.uid() is not null);
