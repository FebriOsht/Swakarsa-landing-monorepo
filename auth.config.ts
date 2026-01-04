import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Redirect user yang belum login ke sini
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // Tentukan path yang DILINDUNGI (Wajib Login)
      // Dalam kasus ini: semua yang ada di dalam folder (platform) yaitu /lab dan /guild
      const isProtectedPlatform = nextUrl.pathname.startsWith('/lab') || nextUrl.pathname.startsWith('/guild');
      
      if (isProtectedPlatform) {
        if (isLoggedIn) return true;
        return false; // Redirect ke /login jika mencoba akses halaman private tanpa login
      }
      
      // Halaman publik (Home, Portfolio, Jobs, Login) boleh diakses siapa saja
      return true;
    },
  },
  providers: [], // Providers didefinisikan di auth.ts untuk menghindari isu dependensi pada Edge runtime
} satisfies NextAuthConfig;