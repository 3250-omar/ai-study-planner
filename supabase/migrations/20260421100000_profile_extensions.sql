-- Profile extensions: bio, avatar, study preferences
-- This extends the user_profiles table with fields needed for the Profile page

alter table public.user_profiles
  add column if not exists display_name text,
  add column if not exists bio text default '',
  add column if not exists avatar_url text,
  add column if not exists study_method text default 'Pomodoro Technique',
  add column if not exists weekly_goal_hours integer default 20;

-- Allow insert for the trigger (auto-create on signup)
drop policy if exists "Users can insert their own profile." on public.user_profiles;
create policy "Users can insert their own profile." on public.user_profiles
  for insert with check (auth.uid() = id);
