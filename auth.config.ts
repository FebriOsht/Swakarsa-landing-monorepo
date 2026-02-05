import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Halaman login custom Anda
  },
  callbacks: {
    // Logika untuk membatasi akses (Middleware)
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // 1. Definisikan halaman-halaman yang Wajib Login (Protected Routes)
      // Perhatikan: Folder (platform) tidak masuk ke URL.
      const protectedPaths = ['/admin', '/lab', '/guild', '/settings'];
      
      // Cek apakah user sedang membuka salah satu halaman di atas
      const isOnProtectedPage = protectedPaths.some(path => 
        nextUrl.pathname.startsWith(path)
      );

      if (isOnProtectedPage) {
        if (isLoggedIn) return true;
        return false; // Redirect otomatis ke /login jika belum login
      } 
      
      // 2. Jika user sudah login tapi membuka halaman /login, redirect mereka
      else if (isLoggedIn) {
        if (nextUrl.pathname === '/login') {
          // Redirect ke default dashboard. 
          // Idealnya disesuaikan role, tapi redirect ke /admin atau /home cukup aman.
          return Response.redirect(new URL('/admin', nextUrl));
        }
      }
      
      // Izinkan akses ke halaman lain (public) seperti /, /blog, /contact
      return true;
    },

    // Callback JWT: Menyimpan role dari User ke Token saat login
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore: Mengabaikan error TypeScript jika tipe belum didefinisikan
        token.role = user.role;
      }
      return token;
    },

    // Callback Session: Menyalin data dari Token ke Session agar bisa diakses di Client/Server Component
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // @ts-ignore
        session.user.role = token.role as string; 
      }
      return session;
    },
  },
  providers: [], // Biarkan kosong. Providers diisi di auth.ts untuk menghindari isu environment Edge.
} satisfies NextAuthConfig;