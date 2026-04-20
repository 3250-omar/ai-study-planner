-- Dashboard schema extensions (subjects, tasks, richer library docs)

-- Ensure UUID generation is available (Supabase commonly enables this already)
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- LIBRARY DOCUMENTS (extend to match UploadModal + future processing)
-- ==============================================================================

alter table public.library_documents
  add column if not exists subject text not null default '',
  add column if not exists description text not null default '',
  add column if not exists original_filename text,
  add column if not exists storage_bucket text not null default 'library_files',
  add column if not exists processed_status text not null default 'uploaded';

-- ==============================================================================
-- SUBJECTS
-- ==============================================================================

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text,
  exam_date date,
  difficulty smallint check (difficulty between 1 and 5),
  tags text[] not null default '{}',
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.subjects enable row level security;

drop policy if exists "Users can manage their own subjects." on public.subjects;
create policy "Users can manage their own subjects." on public.subjects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists subjects_user_id_idx on public.subjects(user_id);

-- ==============================================================================
-- STUDY TASKS (for TaskCompletion + future planning)
-- ==============================================================================

create table if not exists public.study_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  title text not null,
  due_at timestamp with time zone,
  status text not null default 'pending',
  completed_at timestamp with time zone,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.study_tasks enable row level security;

drop policy if exists "Users can manage their own study tasks." on public.study_tasks;
create policy "Users can manage their own study tasks." on public.study_tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists study_tasks_user_id_idx on public.study_tasks(user_id);
create index if not exists study_tasks_subject_id_idx on public.study_tasks(subject_id);
create index if not exists study_tasks_status_idx on public.study_tasks(status);

-- ==============================================================================
-- STUDY SESSIONS (tie to subjects)
-- ==============================================================================

alter table public.study_sessions
  add column if not exists subject_id uuid references public.subjects(id) on delete set null;

create index if not exists study_sessions_user_id_idx on public.study_sessions(user_id);
create index if not exists study_sessions_subject_id_idx on public.study_sessions(subject_id);
create index if not exists study_sessions_start_time_idx on public.study_sessions(start_time);

