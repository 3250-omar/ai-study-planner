-- Initial Database Schema

 -- Ensure UUID generation is available
 create extension if not exists "uuid-ossp";
 create extension if not exists "pgcrypto";
 
-- Custom types
CREATE TYPE study_status AS ENUM ('planned', 'in-progress', 'completed', 'missed');

-- Table: user_profiles
-- Extends the auth.users table. We can use a trigger to auto-create this record.
CREATE TABLE public.user_profiles (
    id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own profile." ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);


-- Table: library_documents
-- Stores metadata about the documents uploaded to the Supabase Storage Bucket ('library_files')
CREATE TABLE public.library_documents (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Path in the storage bucket
    file_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.library_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own documents." ON public.library_documents
    FOR ALL USING (auth.uid() = user_id);

-- Table: study_sessions
CREATE TABLE public.study_sessions (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status study_status DEFAULT 'planned' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own study sessions." ON public.study_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Function and Trigger to automatically create a user profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name)
  VALUES (new.id, raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- STORAGE BUCKETS
-- ==============================================================================

-- Create a storage bucket for library materials
INSERT INTO storage.buckets (id, name, public) VALUES ('library_files', 'library_files', false) ON CONFLICT DO NOTHING;

-- Storage Policies for 'library_files'

-- Allow users to upload their own files
CREATE POLICY "Users can upload their own documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'library_files' AND 
        auth.uid() = owner
    );

-- Allow users to view their own files
CREATE POLICY "Users can view their own documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'library_files' AND 
        auth.uid() = owner
    );

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'library_files' AND 
        auth.uid() = owner
    );

