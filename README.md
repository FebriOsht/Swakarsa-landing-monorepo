Swakarsa Digital Platform (Monorepo) v1.2 🚀

Status Project: Phase 2 (Platform Core) - COMPLETED (MVP)
Last Update: Januari 2026
Version: 1.2 (Final Core Features)

Platform digital terintegrasi untuk Swakarsa Digital Agency & Freelancer Guild. Project ini menggunakan arsitektur Next.js App Router Monorepo yang memisahkan area publik (Agency) dan area privat (Platform Aplikasi) dengan sistem keamanan berbasis peran (RBAC).

🛠 Tech Stack

Aplikasi ini dibangun dengan teknologi modern untuk performa dan skalabilitas:

Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS + Framer Motion

Database: PostgreSQL (via Prisma ORM)

Auth: NextAuth.js v5 (Credentials + Smart Redirect + RBAC)

Core Libraries:

@dnd-kit: Logika Drag & Drop untuk "The Lab".

lucide-react: Icon set modern.

resend: Integrasi Email Transaksional (Mockup Ready).

bcryptjs: Security hashing untuk password user.

📖 Cara Kerja Sistem (Alur 3 Pilar)

Aplikasi ini menghubungkan 3 peran pengguna (Role) dalam satu ekosistem kerja:

1. 💼 Client (Klien) - "The Creator"

Akses: /lab

Alur Kerja:

Login dan masuk ke Dashboard The Lab.

Membuat proyek baru di menu "Drafting Board".

Menggunakan Drag & Drop untuk memilih tim (Hero) dari daftar konsultan ("The Bench").

Melihat estimasi biaya bulanan (Burn Rate) secara real-time.

Menekan tombol "Hire Squad" untuk menyimpan proyek.

Status awal proyek: NEGOTIATION (Menunggu persetujuan Admin).

2. 👑 Admin (Pemilik) - "The Approver"

Akses: /admin

Alur Kerja:

Melihat statistik global (Pesan Masuk, Pelamar Kerja, Total Proyek).

Memantau daftar "Project Requests" yang diajukan Klien.

Menekan tombol "Activate" pada proyek yang statusnya NEGOTIATION.

Status proyek berubah menjadi ACTIVE.

3. ⚔️ Consultant (Tim/Hero) - "The Executor"

Akses: /guild

Alur Kerja:

Login (Hanya bisa jika akunnya sudah dimasukkan ke dalam Squad oleh Klien).

Masuk ke The Guild Hall.

Melihat daftar proyek aktif di mana dia ditugaskan.

Klik "View Quest" untuk melihat detail misi (Briefing & Rekan Tim).

✅ Progress Log (Laporan Pengerjaan)

Berikut adalah rekapitulasi fitur yang sudah dikerjakan dari versi awal hingga sekarang.

🟢 Phase 1: Foundation & Agency (Selesai di v1.0)

Fokus pada halaman publik (Marketing) dan struktur database.

[x] Route Groups: Pemisahan folder (agency) vs (platform).

[x] Database Schema: Model Prisma lengkap (User, Hero, Project, Team, dll).

[x] Seeding Script: Script otomatis pengisi data awal (seed.ts).

[x] Public Pages: Home, Portfolio, Team (Data dinamis dari DB).

[x] Arise (Jobs): Form lamaran kerja yang menyimpan data ke DB.

[x] Contact: Form kontak dengan validasi & simulasi email.

🔵 Phase 2: Platform Core (Selesai di v1.2 - Hari Ini)

Fokus pada logika bisnis aplikasi, dashboard, dan keamanan.

[x] Smart Authentication:

Login System dengan Role-Based Access Control (RBAC).

Smart Redirect: Admin -> /admin, Client -> /lab, Consultant -> /guild.

Security Middleware: Mencegah Konsultan masuk ke area Klien, dan sebaliknya.

[x] The Lab (Client Area):

Drafting Board: Drag & Drop Team Builder fungsional.

Checkout: Menyimpan komposisi tim ke Database (ClientProject).

Dashboard: Monitoring status proyek & biaya.

Project Detail: Halaman detail status & timeline proyek.

[x] The Guild (Consultant Area):

Personal Dashboard: Hanya menampilkan proyek yang ditugaskan ke user tersebut.

Quest Detail View: Halaman detail misi (Briefing Mode).

[x] Admin Command Center:

Approval Workflow: Mengubah status project menjadi ACTIVE.

Monitoring: Melihat Inbox Pesan & Pelamar Kerja.

[x] Settings Module (New):

Update Profil (Nama).

Real Password Change: Fitur ganti password aman dengan hashing bcrypt.

🚧 Next Steps (Roadmap v2.0)

Fitur-fitur ini belum diimplementasikan dan masuk ke rencana pengembangan tahap selanjutnya:

[ ] Detailed Quest System: Memecah "Project" menjadi tiket tugas kecil (To-Do List).

[ ] The Brain (AI): Integrasi OpenAI untuk "Ask Swakarsa" (Estimasi harga otomatis).

[ ] Payment Gateway: Integrasi Midtrans/Xendit untuk pembayaran invoice Klien.

[ ] File Upload: Upload CV & Foto Profil ke Cloud Storage (AWS S3/Uploadthing).

🚀 Cara Menjalankan Project

1. Instalasi & Database

Pastikan PostgreSQL sudah aktif.

# 1. Install dependencies
npm install

# 2. Sinkronisasi Database (Membuat Tabel)
# HATI-HATI: Perintah ini akan mereset data jika struktur berubah
npx prisma db push

# 3. PENTING: Isi Data Awal (Seeding)
# Wajib dijalankan agar akun Admin, Klien, & Konsultan tersedia
npx tsx prisma/seed.ts


2. Menjalankan Server Dev

npm run dev


Akses di browser: http://localhost:3000

🔑 Akun Login (Testing Credentials)

Gunakan akun-akun berikut untuk menguji sistem (password default dari seed.ts):

Role

Email

Password

Akses URL

Fungsi Utama

ADMIN

admin@swakarsa.id

admin123

/admin

Approve Project, Monitor Inbox

CLIENT

client@company.com

client123

/lab

Create Project, Hire Squad

CONSULTANT

ahmad@swakarsa.id

hero123

/guild

View Assigned Quests

📂 Struktur Folder Utama

app/
├── (agency)/               # AREA PUBLIK (Server Components)
│   ├── home/               # Landing Page Utama
│   ├── portfolio/          # Daftar Proyek
│   ├── team/               # Profil Tim Inti
│   ├── jobs/               # Form Lamaran Kerja
│   └── contact/            # Form Kontak
│
├── (platform)/             # AREA PRIVAT (Login Required)
│   ├── admin/              # Dashboard Admin
│   ├── lab/                # Dashboard Client
│   │   ├── draft/          # Drag & Drop Builder
│   │   └── project/[id]/   # Detail Project
│   ├── guild/              # Dashboard Consultant
│   │   └── project/[id]/   # Detail Quest
│   └── settings/           # Pengaturan Akun (Profile/Pass)
│
├── api/auth/               # NextAuth Endpoints
├── components/
│   ├── agency/             # Komponen UI Publik
│   ├── platform/           # Komponen UI Dashboard (Sidebar)
│   └── lab/                # Logika Drag & Drop
│
└── lib/
    ├── actions.ts          # [BACKEND] Server Actions (Otak Aplikasi)
    ├── auth.ts             # Konfigurasi Auth & Session
    └── prisma.ts           # Koneksi Database
