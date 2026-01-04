import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Menginisialisasi NextAuth dengan konfigurasi aturan halaman
// dan mengekspor properti 'auth' sebagai default middleware
export default NextAuth(authConfig).auth;

export const config = {
  // Matcher ini menentukan rute mana saja yang akan diperiksa oleh middleware.
  // UPDATE: Regex diperbarui untuk mengecualikan lebih banyak file statis (css, js, svg, dll)
  // agar tampilan tidak rusak dan performa lebih cepat.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)'],
};