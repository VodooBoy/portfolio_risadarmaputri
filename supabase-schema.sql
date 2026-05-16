-- ============================================================
-- JALANKAN SQL INI DI SUPABASE SQL EDITOR
-- Dashboard Supabase → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. Tabel projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('branding', 'socmed', 'uiux')),
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index untuk performa
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- 3. Row Level Security (RLS) — PENTING untuk keamanan!
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Siapa saja bisa baca (untuk halaman publik)
CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  USING (true);

-- Hanya admin yang bisa insert/update/delete
CREATE POLICY "Admin can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- 4. Storage bucket untuk gambar
-- Buat bucket bernama "portfolio-images" di Supabase Dashboard → Storage
-- Atau jalankan ini:
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: siapa saja bisa lihat gambar
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

-- Hanya admin bisa upload/hapus gambar
CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-images');

-- ============================================================
-- SETELAH MENJALANKAN SQL:
-- 1. Pergi ke Authentication → Users
-- 2. Klik "Invite user" atau "Add user"
-- 3. Masukkan email dan password kamu
-- 4. Itulah akun admin kamu — tidak bisa register dari luar
-- ============================================================
