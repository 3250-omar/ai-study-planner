-- Add summary column to library_documents for caching AI-generated summaries
ALTER TABLE public.library_documents ADD COLUMN IF NOT EXISTS summary TEXT;
