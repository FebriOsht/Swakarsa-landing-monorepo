Swakarsa Digital Platform (Monorepo)

Platform digital terintegrasi untuk Swakarsa Digital Agency & Freelancer Guild.

Proyek ini telah direfaktor dari arsitektur Monolithic Landing Page menjadi Next.js App Router Monorepo yang memisahkan area publik (Agency) dan area privat (Platform Aplikasi) menggunakan database PostgreSQL.

🏗 Tech Stack

Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS + Framer Motion

Database: PostgreSQL (via Neon / Local)

ORM: Prisma

Auth: NextAuth.js v5 (Beta)

Icons: Lucide React

✅ Progress: Fitur yang Sudah Selesai (Completed)

Berdasarkan Tech Guide v3.1, kita telah menyelesaikan Phase 1 (Foundation) dan sebagian Phase 2 (Platform Core).

1. Arsitektur & Database

[x] Route Groups: Implementasi struktur folder (agency) untuk publik dan (platform) untuk aplikasi.

[x] Database Schema: Model Prisma lengkap untuk User, HeroProfile, TeamMember, Portfolio, Skills, dan JobApplication.

[x] Seeding Script: Script otomatis (prisma/seed.ts) untuk mengisi data awal Admin, Tim, dan Portfolio.

2. Module Agency (Public Website)

Semua halaman publik kini bersifat Dinamis (Server Components) yang mengambil data langsung dari Database.

[x] Home Page: Refactoring UI menjadi komponen modular (Hero, Stats, Services).

[x] Dynamic Portfolio: Halaman /portfolio menampilkan semua proyek dari DB.

[x] Dynamic Team: Halaman /team menampilkan semua anggota tim dari DB.

[x] Jobs / Arise MVP: Halaman /jobs dengan formulir pelamaran kerja yang menyimpan data pelamar ke tabel JobApplication.

3. Module Platform (Private App)

Sistem autentikasi dan dashboard dasar telah dibangun.

[x] Authentication: Login aman menggunakan NextAuth v5 + Bcrypt (Password Hashing).

[x] Middleware Protection: Melindungi rute /lab dan /guild dari akses tanpa login.

[x] Login Page: UI Login khusus yang terpisah dari layout platform.

[x] Dashboard "The Lab": Tampilan Dashboard untuk Klien (Status proyek, XP, Rank).

[x] Dashboard "The Guild": Tampilan Dashboard untuk Konsultan (Active Quests).

[x] Layouting: Sidebar navigasi khusus platform dengan fitur Sign Out.

🚀 Roadmap: Fitur yang Belum / Perlu Dikerjakan (To-Do)

Berikut adalah fitur dari Tech Guide yang perlu dikerjakan selanjutnya:

1. Integrasi Email & Notifikasi

[ ] Resend Integration: Menghubungkan API Resend di lib/actions.ts agar saat ada pelamar kerja (Jobs) atau pesan kontak, email notifikasi benar-benar terkirim ke Admin.

[ ] User Welcome Email: Kirim email otomatis saat user baru didaftarkan.

2. Fitur "The Brain" (AI)

[ ] OpenAI Integration: Menghubungkan API OpenAI untuk fitur rekomendasi tim otomatis di Dashboard Klien.

[ ] Quest Generation: Menggunakan AI untuk men-generate deskripsi tugas (Quest) dari brief proyek.

3. Manajemen Proyek (CRUD)

Saat ini Dashboard hanya menampilkan data dummy/kosong ("0 Active Projects").

[ ] Create Project UI: Form bagi Admin/Klien untuk memulai proyek baru di "The Lab".

[ ] Assign Quest: Fitur bagi Admin untuk memecah proyek menjadi Quest dan menugaskannya ke member (The Guild).

[ ] Progress Tracking: Mengupdate status proyek secara real-time.

4. Admin Panel & Settings

[ ] Applicant Viewer: Halaman khusus admin untuk melihat daftar pelamar kerja (JobApplication) tanpa membuka Prisma Studio.

[ ] Profile Settings: Halaman /settings untuk mengubah password atau foto profil.

🛠 Cara Menjalankan Project

1. Persiapan Environment

Pastikan file .env memiliki variabel berikut:

DATABASE_URL="postgresql://..."
AUTH_SECRET="string_acak_untuk_enkripsi"
AUTH_URL="http://localhost:3000"
# RESEND_API_KEY="..." (Nanti)
# OPENAI_API_KEY="..." (Nanti)


2. Instalasi & Database

# Install dependensi
npm install

# Sinkronisasi Database (Membuat Tabel)
npx prisma db push

# Isi Data Awal (Admin & Content)
npx tsx prisma/seed.ts


3. Menjalankan Server

npm run dev


Akses website di http://localhost:3000.

4. Akun Login (Admin)

Gunakan akun ini untuk masuk ke Dashboard:

Email: admin@swakarsa.id

Password: admin123

📂 Struktur Folder Baru

app/
├── (agency)/           # Area Publik (Navbar & Footer Website)
│   ├── portfolio/      # Halaman Portfolio Dinamis
│   ├── team/           # Halaman Team Dinamis
│   ├── jobs/           # Halaman Lowongan Kerja (Form)
│   └── page.tsx        # Halaman Utama (Landing Page)
├── (platform)/         # Area Private (Sidebar Dashboard)
│   ├── lab/            # Dashboard Client
│   └── guild/          # Dashboard Consultant
├── api/auth/           # Endpoint NextAuth
├── login/              # Halaman Login (Standalone)
├── components/         
│   ├── agency/         # Komponen UI Website (Hero, Stats, dll)
│   └── platform/       # Komponen UI App (Sidebar, LoginForm)
└── lib/                # Konfigurasi Backend (Prisma, Auth Actions)


© 2025 Swakarsa Digital. All Rights Reserved.