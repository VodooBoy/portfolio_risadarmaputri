# 🎨 Portfolio Website — Setup Guide

Website portofolio dengan admin panel. Dibangun dengan Next.js + Supabase + Vercel.

---

## 📦 Apa yang ada di project ini

```
portfolio-website/
├── app/
│   ├── page.tsx              ← Halaman Home
│   ├── portfolio/page.tsx    ← Halaman Portfolio (dengan filter)
│   ├── about/page.tsx        ← Halaman About
│   ├── contact/page.tsx      ← Halaman Contact
│   ├── admin/
│   │   ├── login/page.tsx    ← Halaman login admin
│   │   └── dashboard/page.tsx ← Panel admin (upload, kelola, settings)
│   └── api/contact/route.ts  ← API pengiriman email
├── components/
│   ├── layout/               ← Navbar, Footer, PublicLayout
│   └── ui/                   ← PortfolioClient, ContactForm
├── lib/
│   ├── supabase.ts           ← Koneksi Supabase + tipe data
│   └── supabase-server.ts    ← Server-side Supabase
├── middleware.ts              ← Proteksi route admin
└── supabase-schema.sql       ← SQL untuk setup database
```

---

## 🚀 Cara Setup (Step by Step)

### Step 1 — Buat akun Supabase (GRATIS)

1. Pergi ke [supabase.com](https://supabase.com) dan daftar
2. Klik **"New Project"**, isi nama project, pilih region **Southeast Asia (Singapore)**
3. Tunggu project selesai dibuat (~1 menit)
4. Pergi ke **Settings → API**, copy:
   - **Project URL** → ini `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → ini `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → ini `SUPABASE_SERVICE_ROLE_KEY`

### Step 2 — Setup Database

1. Di Supabase Dashboard, klik **SQL Editor** di sidebar kiri
2. Klik **"New Query"**
3. Copy-paste seluruh isi file `supabase-schema.sql`
4. Klik **"Run"** — tunggu sampai muncul "Success"

### Step 3 — Buat Akun Admin

1. Di Supabase Dashboard, klik **Authentication** → **Users**
2. Klik **"Add user"** → **"Create new user"**
3. Masukkan email dan password kamu
4. Klik **"Create user"**
5. ✅ Ini akun admin kamu — tidak ada yang bisa register selain dari sini

### Step 4 — Setup Resend (pengiriman email form kontak)

1. Pergi ke [resend.com](https://resend.com) dan daftar (GRATIS)
2. Klik **"API Keys"** → **"Create API Key"**
3. Copy API key-nya → ini `RESEND_API_KEY`
4. Optional: tambahkan domain kamu untuk email yang lebih profesional

### Step 5 — Upload ke GitHub

1. Buat akun [GitHub](https://github.com) jika belum punya
2. Buat repository baru (klik **+** → **New repository**)
3. Beri nama misalnya `portfolio-website`, set ke **Private**
4. Upload semua file project ini ke repository tersebut
   - Cara termudah: klik **"uploading an existing file"** di GitHub

### Step 6 — Deploy ke Vercel (GRATIS)

1. Pergi ke [vercel.com](https://vercel.com) dan daftar pakai akun GitHub
2. Klik **"Add New Project"**
3. Pilih repository `portfolio-website` yang tadi dibuat
4. Klik **"Deploy"** — tunggu sebentar

### Step 7 — Tambahkan Environment Variables di Vercel

1. Di Vercel, buka project kamu
2. Klik **Settings** → **Environment Variables**
3. Tambahkan satu per satu:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL dari Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key dari Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key dari Supabase |
| `RESEND_API_KEY` | API key dari Resend |
| `CONTACT_TO_EMAIL` | Email kamu (yang menerima pesan kontak) |

4. Klik **"Redeploy"** setelah menambahkan semua variable

### Step 8 — Selesai! 🎉

Websitemu sudah live di `https://nama-project.vercel.app`

---

## 🎯 Cara Pakai Admin Panel

1. Buka `https://websitemu.vercel.app/admin/login`
2. Login dengan email + password yang dibuat di Step 3
3. Klik **"UploadaryaDarma Putri"** untuk tambah project baru
4. Klik **"KelolaaryaDarma Putri"** untuk edit atau hapus project
5. Check **"Featured"** saat upload untuk tampil di Home

---

## ✏️ Cara Personalisasi

Cari dan ganti teks-teks berikut di file yang sesuai:

| Yang diganti | Ada di file |
|---|---|
| "Risa Darma Putri" | `app/layout.tsx`, `app/about/page.tsx`, `app/contact/page.tsx` |
| "Risa Darma Putri@email.com" | `app/contact/page.tsx`, `app/api/contact/route.ts` |
| "+62 812-3456-7890" | `app/contact/page.tsx` |
| "Jakarta, Indonesia" | `app/contact/page.tsx` |
| Teks hero | `app/page.tsx` |
| Skill & experience | `app/about/page.tsx` |

---

## 🔒 Keamanan

- ✅ Admin panel dilindungi middleware (tidak bisa diakses tanpa login)
- ✅ Database pakai Row Level Security (RLS) — data tidak bisa dimanipulasi dari luar
- ✅ Gambar disimpan di Supabase Storage (backup otomatis)
- ✅ Tidak ada fitur register — hanya kamu yang bisa masuk
- ✅ Semua form divalidasi sebelum dikirim ke database
- ✅ Password di-hash otomatis oleh Supabase Auth

---

## ⚡ Tips Performa

- Gambar otomatis dioptimasi oleh Next.js Image (`<Image />`)
- Halaman portfolio di-cache 60 detik — tetap cepat meski banyakaryaDarma Putri
- Font Poppins di-load dari Google Fonts dengan optimasi Next.js
- Tailwind CSS di-purge otomatis saat build — CSS sangat kecil

---

Selamat! Website portofoliomu sudah jadi. 🎨
