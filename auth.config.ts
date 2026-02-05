import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // Deteksi jika user sedang mengakses halaman di dalam folder (platform) atau admin
      const isOnDashboard = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/(platform)');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Jika user sudah login dan mencoba akses halaman login lagi, lempar ke admin
        if (nextUrl.pathname === '/login') {
            return Response.redirect(new URL('/admin', nextUrl));
        }
      }
      return true;
    },
    // Pastikan session user menyimpan Role
    async session({ session, token }) {
        if (token.sub && session.user) {
            // @ts-ignore
            session.user.id = token.sub;
            // @ts-ignore
            session.user.role = token.role; 
        }
        return session;
    },
    async jwt({ token, user }) {
        if (user) {
            // @ts-ignore
            token.role = user.role;
        }
        return token;
    }
  },
  providers: [], // Providers diatur di auth.ts
} satisfies NextAuthConfig;